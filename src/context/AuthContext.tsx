import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Role } from '../types';
import {
  generateSalt,
  hashPassword,
  verifyPassword,
  generateSessionToken,
  SESSION_DURATION_MS,
  AuthSession
} from '../utils/security';

interface AuthContextType {
  currentUser: User | null;
  role: Role;
  isAuthenticated: boolean;
  isStandalonePWA: boolean;
  login: (identifier: string, password?: string) => Promise<{ success: boolean; message: string }>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    school?: string
  ) => Promise<{ success: boolean; message: string }>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  switchRole: (newRole: Role) => void;
  updateProfile: (updated: Partial<User>) => void;
  allUsers: User[];
  deleteUser: (id: string) => void;
  updateUserRole: (id: string, newRole: Role) => void;
  // Admin Management Operations
  toggleLockUser: (id: string, reason?: string) => void;
  adminResetPassword: (id: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  createUserByAdmin: (
    name: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    school?: string,
    className?: string
  ) => Promise<{ success: boolean; message: string }>;
  updateUserByAdmin: (id: string, updatedFields: Partial<User>) => void;
  revokeUserSession: (id: string) => void;
  toggleRequirePasswordChange: (id: string) => void;
}

// Check if running in standalone PWA mode on iOS or Android
export const isRunningStandalone = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
};

// Default initial accounts with requested admin credentials
const DEFAULT_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Teacher Lê Thanh Tùng',
    username: 'admin',
    email: 'lethanhtungnhc@gmail.com',
    password: '12345678',
    role: 'ADMIN',
    avatar: '👨‍🏫',
    school: 'Trường TH, THCS Nguyễn Hữu Cảnh',
    className: 'Tác giả & Quản trị viên Hệ thống',
    createdAt: '2026-01-01',
    isLocked: false,
    mustChangePassword: false,
  },
  {
    id: 'user-teacher',
    name: 'Giáo viên Toán',
    username: 'giaovien',
    email: 'giaovien@toan9.edu.vn',
    password: '12345678',
    role: 'TEACHER',
    avatar: '👩‍🏫',
    school: 'Trường TH, THCS Nguyễn Hữu Cảnh',
    className: 'Tổ Tự nhiên - Khối 9',
    createdAt: '2026-01-10',
    isLocked: false,
    mustChangePassword: true, // Yêu cầu đổi mật khẩu lần đầu
  },
  {
    id: 'user-student',
    name: 'Học sinh Lớp 9',
    username: 'hocsinh',
    email: 'hocsinh@toan9.edu.vn',
    password: '12345678',
    role: 'STUDENT',
    avatar: '🧑‍🎓',
    school: 'Trường TH, THCS Nguyễn Hữu Cảnh',
    className: 'Lớp 9',
    createdAt: '2026-02-15',
    isLocked: false,
    mustChangePassword: true, // Yêu cầu đổi mật khẩu lần đầu
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isStandalone = isRunningStandalone();

  // Users repository in LocalStorage
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('toan9_users');
      if (!stored) return DEFAULT_USERS;
      const parsed: User[] = JSON.parse(stored);
      // Ensure admin exists with username 'admin'
      const adminIndex = parsed.findIndex((u) => u.username === 'admin' || u.role === 'ADMIN');
      if (adminIndex >= 0) {
        parsed[adminIndex] = {
          ...parsed[adminIndex],
          username: 'admin',
          role: 'ADMIN',
          password: parsed[adminIndex].password || '12345678',
          school: parsed[adminIndex].school || 'Trường TH, THCS Nguyễn Hữu Cảnh',
          isLocked: false,
        };
      } else {
        parsed.unshift(DEFAULT_USERS[0]);
      }
      return parsed.map((u) => {
        // Migrate old default placeholder passwords to the required 12345678
        let pwd = u.password || '12345678';
        let pwdHash = u.passwordHash;
        let salt = u.salt;
        if (!u.passwordChangedAt && (pwd === 'toan@13579' || pwd === 'giaovien@123' || pwd === 'hocsinh@123')) {
          pwd = '12345678';
          pwdHash = undefined; // Will be re-hashed by upgradeSecurity()
          salt = undefined;
        }

        return {
          ...u,
          password: pwd,
          passwordHash: pwdHash,
          salt,
          username: u.username || u.email.split('@')[0],
          isLocked: !!u.isLocked,
          mustChangePassword:
            u.mustChangePassword !== undefined
              ? u.mustChangePassword
              : (!u.passwordChangedAt && u.role !== 'ADMIN'),
        };
      });
    } catch {
      return DEFAULT_USERS;
    }
  });

  // Current logged in user with session validation
  // Requirement: When app is installed, require fresh login for ALL accounts
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const isStandaloneMode = isRunningStandalone();
      const justInstalled = localStorage.getItem('toan9_just_installed') === 'true';
      const standaloneAuthed = localStorage.getItem('toan9_standalone_authenticated') === 'true';

      // If app was just installed or opened in standalone PWA without prior authentication inside the app, force login
      if (justInstalled || (isStandaloneMode && !standaloneAuthed)) {
        localStorage.removeItem('toan9_just_installed');
        localStorage.removeItem('toan9_auth_session');
        localStorage.removeItem('toan9_current_user');
        return null;
      }

      // 1. Check persistent secure session
      const storedSession = localStorage.getItem('toan9_auth_session');
      if (storedSession) {
        const session: AuthSession = JSON.parse(storedSession);

        // Check if token has expired
        if (session.expiresAt && Date.now() > session.expiresAt) {
          localStorage.removeItem('toan9_auth_session');
          localStorage.removeItem('toan9_current_user');
          return null;
        }

        // Match user by ID
        const storedUsers = localStorage.getItem('toan9_users');
        const userList: User[] = storedUsers ? JSON.parse(storedUsers) : DEFAULT_USERS;
        const matched = userList.find((u) => u.id === session.userId);

        if (matched) {
          if (matched.isLocked) {
            localStorage.removeItem('toan9_auth_session');
            localStorage.removeItem('toan9_current_user');
            return null;
          }
          // Validate token revocation
          if (matched.sessionToken && matched.sessionToken !== session.token) {
            localStorage.removeItem('toan9_auth_session');
            localStorage.removeItem('toan9_current_user');
            return null;
          }
          return matched;
        }
      }

      // 2. Check legacy current user cache if valid
      const storedUser = localStorage.getItem('toan9_current_user');
      if (storedUser) {
        const parsed: User = JSON.parse(storedUser);
        if (!parsed.isLocked) {
          return parsed;
        }
      }

      // Unauthenticated by default for fresh launch / Netlify deployment
      return null;
    } catch {
      return null;
    }
  });

  // Automatically upgrade unhashed passwords to salted SHA-256 hashes
  useEffect(() => {
    const upgradeSecurity = async () => {
      let changed = false;
      const upgraded = await Promise.all(
        users.map(async (u) => {
          if (!u.passwordHash && u.password) {
            changed = true;
            const salt = generateSalt();
            const passwordHash = await hashPassword(u.password, salt);
            return {
              ...u,
              salt,
              passwordHash,
            };
          }
          return u;
        })
      );

      if (changed) {
        setUsers(upgraded);
      }
    };

    upgradeSecurity();
  }, []);

  // Listen for app installation: strictly require re-login for all accounts upon install
  useEffect(() => {
    const handleAppInstalled = () => {
      localStorage.setItem('toan9_just_installed', 'true');
      localStorage.removeItem('toan9_standalone_authenticated');
      localStorage.removeItem('toan9_auth_session');
      localStorage.removeItem('toan9_current_user');
      setCurrentUser(null);
    };

    window.addEventListener('appinstalled', handleAppInstalled);
    return () => window.removeEventListener('appinstalled', handleAppInstalled);
  }, []);

  // Save users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('toan9_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users', e);
    }
  }, [users]);

  // Keep currentUser in sync with users state
  useEffect(() => {
    if (!currentUser) return;
    const fresh = users.find((u) => u.id === currentUser.id);
    if (fresh) {
      if (fresh.isLocked) {
        // User was locked by admin, immediately disconnect
        setCurrentUser(null);
        localStorage.removeItem('toan9_auth_session');
        localStorage.removeItem('toan9_current_user');
      } else {
        localStorage.setItem('toan9_current_user', JSON.stringify(fresh));
      }
    }
  }, [users, currentUser]);

  // Authenticate user with password verification and session token generation
  const login = async (
    identifier: string,
    password?: string
  ): Promise<{ success: boolean; message: string }> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanPass) {
      return {
        success: false,
        message:
          cleanId === 'admin'
            ? 'Tài khoản Quản trị viên bắt buộc phải nhập mật khẩu mới vào được hệ thống!'
            : 'Vui lòng nhập mật khẩu.',
      };
    }

    const found = users.find(
      (u) =>
        u.username.toLowerCase() === cleanId ||
        u.email.toLowerCase() === cleanId
    );

    if (!found) {
      return {
        success: false,
        message: 'Tên đăng nhập hoặc Email không tồn tại trong hệ thống.',
      };
    }

    if (found.role === 'ADMIN' && !cleanPass) {
      return {
        success: false,
        message: 'Tài khoản Quản trị viên bắt buộc phải nhập mật khẩu mới vào được!',
      };
    }

    if (found.isLocked) {
      return {
        success: false,
        message: `Tài khoản đã bị tạm khóa: ${
          found.lockedReason || 'Liên hệ Quản trị viên để được mở khóa.'
        }`,
      };
    }

    // Verify password using salted SHA-256 hash or legacy fallback
    let isMatch = false;
    if (found.passwordHash && found.salt) {
      isMatch = await verifyPassword(cleanPass, found.salt, found.passwordHash);
    } else if (found.password) {
      isMatch = cleanPass === found.password;
    }

    if (!isMatch) {
      return {
        success: false,
        message:
          found.role === 'ADMIN'
            ? 'Mật khẩu Quản trị viên không chính xác. Vui lòng nhập đúng mật khẩu!'
            : 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!',
      };
    }

    // Generate secure token & session with 30-day persistence
    const sessionToken = generateSessionToken();
    const tokenExpiresAt = Date.now() + SESSION_DURATION_MS;
    const nowIso = new Date().toISOString();

    const session: AuthSession = {
      userId: found.id,
      token: sessionToken,
      createdAt: Date.now(),
      expiresAt: tokenExpiresAt,
      isStandalonePWA: isStandalone,
    };

    localStorage.setItem('toan9_auth_session', JSON.stringify(session));

    // Ensure password hash exists
    let userSalt = found.salt;
    let userHash = found.passwordHash;
    if (!userHash) {
      userSalt = generateSalt();
      userHash = await hashPassword(cleanPass, userSalt);
    }

    // Check first login on website or installed mobile PWA without personal password change:
    const isFirstTimeLogin = !found.passwordChangedAt && found.role !== 'ADMIN';
    const isMobileFirstInstall = isStandalone && !found.passwordChangedAt;
    const shouldRequireChange = found.mustChangePassword === true || isFirstTimeLogin || isMobileFirstInstall;

    const updatedUser: User = {
      ...found,
      salt: userSalt,
      passwordHash: userHash,
      sessionToken,
      tokenExpiresAt,
      lastLoginAt: nowIso,
      mustChangePassword: shouldRequireChange,
    };

    setUsers((prev) => prev.map((u) => (u.id === found.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    localStorage.setItem('toan9_current_user', JSON.stringify(updatedUser));

    // When logging in in standalone PWA, mark as authenticated inside the installed app
    if (isStandalone) {
      localStorage.setItem('toan9_standalone_authenticated', 'true');
    }

    return {
      success: true,
      message: `Chào mừng ${found.name} đã đăng nhập thành công!`,
    };
  };

  // Register new account with salted SHA-256 password hashing
  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    school?: string
  ): Promise<{ success: boolean; message: string }> => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, message: 'Tên đăng nhập phải có ít nhất 3 ký tự.' };
    }

    if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
      return {
        success: false,
        message: `Tên đăng nhập "${username.trim()}" đã được sử dụng. Vui lòng chọn tên khác.`,
      };
    }

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return {
        success: false,
        message: `Địa chỉ Email "${email.trim()}" đã được đăng ký trong hệ thống.`,
      };
    }

    if (!password || password.trim().length < 6) {
      return { success: false, message: 'Mật khẩu phải có độ dài từ 6 ký tự trở lên.' };
    }

    // Hash password with cryptographically random salt
    const salt = generateSalt();
    const passwordHash = await hashPassword(password.trim(), salt);
    const sessionToken = generateSessionToken();
    const tokenExpiresAt = Date.now() + SESSION_DURATION_MS;
    const nowIso = new Date().toISOString();

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password: password.trim(), // Keep accessible for Admin display per user requirement
      passwordHash,
      salt,
      role,
      avatar: role === 'ADMIN' ? '👨‍🏫' : role === 'TEACHER' ? '👩‍🏫' : '🧑‍🎓',
      school: school?.trim() || 'Trường THCS',
      className: role === 'STUDENT' ? 'Lớp 9' : 'Bộ môn Toán',
      createdAt: nowIso.split('T')[0],
      isLocked: false,
      sessionToken,
      tokenExpiresAt,
      lastLoginAt: nowIso,
      mustChangePassword: true, // Yêu cầu đổi mật khẩu lần đầu đăng nhập trên website/app
    };

    const session: AuthSession = {
      userId: newUser.id,
      token: sessionToken,
      createdAt: Date.now(),
      expiresAt: tokenExpiresAt,
      isStandalonePWA: isStandalone,
    };

    localStorage.setItem('toan9_auth_session', JSON.stringify(session));
    localStorage.setItem('toan9_current_user', JSON.stringify(newUser));

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    return { success: true, message: 'Đăng ký tài khoản mới thành công!' };
  };

  // Change password with hash update
  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'Bạn chưa đăng nhập vào hệ thống.' };
    }

    // Verify old password
    let isMatch = false;
    if (currentUser.passwordHash && currentUser.salt) {
      isMatch = await verifyPassword(oldPassword.trim(), currentUser.salt, currentUser.passwordHash);
    } else if (currentUser.password) {
      isMatch = currentUser.password === oldPassword.trim();
    }

    if (!isMatch) {
      return { success: false, message: 'Mật khẩu hiện tại không chính xác!' };
    }

    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    // Hash new password
    const newSalt = generateSalt();
    const newHash = await hashPassword(newPassword.trim(), newSalt);
    const sessionToken = generateSessionToken();
    const tokenExpiresAt = Date.now() + SESSION_DURATION_MS;

    const updatedUser: User = {
      ...currentUser,
      password: newPassword.trim(),
      passwordHash: newHash,
      salt: newSalt,
      sessionToken,
      tokenExpiresAt,
      mustChangePassword: false, // Đã hoàn thành yêu cầu đổi mật khẩu
      passwordChangedAt: new Date().toISOString(),
    };

    const session: AuthSession = {
      userId: updatedUser.id,
      token: sessionToken,
      createdAt: Date.now(),
      expiresAt: tokenExpiresAt,
      isStandalonePWA: isStandalone,
    };

    localStorage.setItem('toan9_auth_session', JSON.stringify(session));
    localStorage.setItem('toan9_current_user', JSON.stringify(updatedUser));

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));

    return {
      success: true,
      message: 'Đổi mật khẩu thành công! Mật khẩu mới đã được băm bảo mật an toàn.',
    };
  };

  // Logout clears session and removes token
  const logout = () => {
    if (currentUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? { ...u, sessionToken: undefined } : u))
      );
    }
    setCurrentUser(null);
    localStorage.removeItem('toan9_auth_session');
    localStorage.removeItem('toan9_current_user');
    localStorage.removeItem('toan9_standalone_authenticated');
  };

  // Quick switch role (protected: Admin cannot be assumed without password login)
  const switchRole = (newRole: Role) => {
    // SECURITY: Admin account CANNOT be accessed through quick switch.
    // User MUST enter password via standard login()!
    if (newRole === 'ADMIN') {
      return false;
    }

    const target =
      users.find((u) => u.role === newRole && !u.isLocked) ||
      DEFAULT_USERS.find((u) => u.role === newRole);

    if (target) {
      setCurrentUser(target);
      const sessionToken = generateSessionToken();
      const tokenExpiresAt = Date.now() + SESSION_DURATION_MS;
      localStorage.setItem(
        'toan9_auth_session',
        JSON.stringify({
          userId: target.id,
          token: sessionToken,
          createdAt: Date.now(),
          expiresAt: tokenExpiresAt,
          isStandalonePWA: isStandalone,
        })
      );
      localStorage.setItem('toan9_current_user', JSON.stringify(target));
      return true;
    }
    return false;
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    const next = { ...currentUser, ...updated };
    setCurrentUser(next);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? next : u)));
    localStorage.setItem('toan9_current_user', JSON.stringify(next));
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(null);
      localStorage.removeItem('toan9_auth_session');
      localStorage.removeItem('toan9_current_user');
    }
  };

  const updateUserRole = (id: string, newRole: Role) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
  };

  // Admin capability: Toggle lock account with reason
  const toggleLockUser = (id: string, reason?: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newLockState = !u.isLocked;
        return {
          ...u,
          isLocked: newLockState,
          lockedReason: newLockState ? reason || 'Tạm khóa bởi Quản trị viên' : undefined,
          sessionToken: newLockState ? undefined : u.sessionToken, // Invalidate token on lock
        };
      })
    );

    // If locked user is currentUser, log them out immediately
    if (currentUser?.id === id) {
      setCurrentUser(null);
      localStorage.removeItem('toan9_auth_session');
      localStorage.removeItem('toan9_current_user');
    }
  };

  // Admin capability: Reset user password directly
  const adminResetPassword = async (
    id: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(newPassword.trim(), salt);

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        return {
          ...u,
          password: newPassword.trim(),
          passwordHash,
          salt,
          mustChangePassword: true, // Khi admin đặt lại mật khẩu tạm, buộc người dùng đổi mật khẩu ở lần đăng nhập tiếp theo
          passwordChangedAt: undefined,
          sessionToken: undefined, // Require user to login with new password
        };
      })
    );

    return {
      success: true,
      message: 'Đã cấp lại mật khẩu mới thành công và mã hóa băm SHA-256 an toàn.',
    };
  };

  // Admin capability: Create user directly from Admin Panel
  const createUserByAdmin = async (
    name: string,
    username: string,
    email: string,
    password: string,
    role: Role,
    school?: string,
    className?: string
  ): Promise<{ success: boolean; message: string }> => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, message: 'Tên đăng nhập phải có ít nhất 3 ký tự.' };
    }

    if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
      return {
        success: false,
        message: `Tên đăng nhập "${username.trim()}" đã tồn tại.`,
      };
    }

    if (!password || password.trim().length < 6) {
      return { success: false, message: 'Mật khẩu phải từ 6 ký tự trở lên.' };
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(password.trim(), salt);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      username: username.trim(),
      email: cleanEmail || `${cleanUsername}@toan9.edu.vn`,
      password: password.trim(),
      passwordHash,
      salt,
      role,
      avatar: role === 'ADMIN' ? '👨‍🏫' : role === 'TEACHER' ? '👩‍🏫' : '🧑‍🎓',
      school: school?.trim() || 'Trường THCS',
      className: className?.trim() || (role === 'STUDENT' ? 'Lớp 9' : 'Bộ môn Toán'),
      createdAt: new Date().toISOString().split('T')[0],
      isLocked: false,
      mustChangePassword: true, // Tài khoản mới bắt buộc đổi mật khẩu ở lần đăng nhập đầu tiên
    };

    setUsers((prev) => [...prev, newUser]);
    return { success: true, message: `Đã tạo tài khoản ${role} thành công cho ${name}!` };
  };

  // Admin capability: Update user information
  const updateUserByAdmin = (id: string, updatedFields: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedFields } : u))
    );
  };

  // Admin capability: Revoke active session
  const revokeUserSession = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, sessionToken: undefined } : u))
    );
  };

  // Admin capability: Enforce or remove required password change
  const toggleRequirePasswordChange = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const nextState = !u.mustChangePassword;
        return {
          ...u,
          mustChangePassword: nextState,
          ...(nextState ? { passwordChangedAt: undefined } : {}),
        };
      })
    );
    if (currentUser?.id === id) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              mustChangePassword: !prev.mustChangePassword,
            }
          : null
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'STUDENT',
        isAuthenticated: !!currentUser,
        isStandalonePWA: isStandalone,
        login,
        register,
        changePassword,
        logout,
        switchRole,
        updateProfile,
        allUsers: users,
        deleteUser,
        updateUserRole,
        toggleLockUser,
        adminResetPassword,
        createUserByAdmin,
        updateUserByAdmin,
        revokeUserSession,
        toggleRequirePasswordChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
