import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  currentUser: User | null;
  role: Role;
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
}

// Default initial accounts with requested admin credentials
const DEFAULT_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Teacher Lê Thanh Tùng',
    username: 'admin',
    email: 'lethanhtungnhc@gmail.com',
    password: 'toan@13579',
    role: 'ADMIN',
    avatar: '👨‍🏫',
    school: 'Tác giả & Quản trị viên Hệ thống',
    className: 'Toán 9 GDPT 2018',
    createdAt: '2026-01-01',
  },
  {
    id: 'user-teacher',
    name: 'Cô Nguyễn Thu Hà',
    username: 'giaovien.thuha',
    email: 'thuha.toan9@edu.vn',
    password: 'giaovien@123',
    role: 'TEACHER',
    avatar: '👩‍🏫',
    school: 'THCS Giảng Võ',
    className: 'Chủ nhiệm 9A1 & 9A2',
    createdAt: '2026-01-10',
  },
  {
    id: 'user-student',
    name: 'Em Trần Minh Đức',
    username: 'hocsinh.minhduc',
    email: 'minhduc.hocsinh9@gmail.com',
    password: 'hocsinh@123',
    role: 'STUDENT',
    avatar: '🧑‍🎓',
    school: 'THCS Lê Quý Đôn',
    className: 'Lớp 9A1',
    createdAt: '2026-02-15',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem('toan9_users');
      if (!stored) return DEFAULT_USERS;
      const parsed: User[] = JSON.parse(stored);
      // Ensure admin exists with username 'admin' and password 'toan@13579'
      const adminIndex = parsed.findIndex((u) => u.username === 'admin' || u.role === 'ADMIN');
      if (adminIndex >= 0) {
        parsed[adminIndex] = {
          ...parsed[adminIndex],
          username: 'admin',
          password: parsed[adminIndex].password || 'toan@13579',
        };
      } else {
        parsed.unshift(DEFAULT_USERS[0]);
      }
      return parsed.map((u) => ({
        ...u,
        username: u.username || u.email.split('@')[0],
        password: u.password || '123456',
      }));
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('toan9_current_user');
      if (stored) {
        const parsed: User = JSON.parse(stored);
        if (parsed.username === 'admin' || parsed.role === 'ADMIN') {
          return {
            ...parsed,
            username: 'admin',
            password: parsed.password || 'toan@13579',
          };
        }
        return parsed;
      }
      return DEFAULT_USERS[0]; // Default to Admin Teacher Lê Thanh Tùng
    } catch {
      return DEFAULT_USERS[0];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('toan9_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('toan9_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('toan9_current_user');
      }
    } catch (e) {
      console.error('Failed to save current user', e);
    }
  }, [currentUser]);

  const login = async (identifier: string, password?: string): Promise<{ success: boolean; message: string }> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = (password || '').trim();

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

    if (found.password && cleanPass !== found.password) {
      return {
        success: false,
        message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!',
      };
    }

    setCurrentUser(found);
    return {
      success: true,
      message: `Chào mừng ${found.name} đã đăng nhập thành công!`,
    };
  };

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
      return { success: false, message: `Tên đăng nhập "${username.trim()}" đã được sử dụng. Vui lòng chọn tên khác.` };
    }

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: `Địa chỉ Email "${email.trim()}" đã được đăng ký trong hệ thống.` };
    }

    if (!password || password.trim().length < 6) {
      return { success: false, message: 'Mật khẩu phải có độ dài từ 6 ký tự trở lên.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      role,
      avatar: role === 'ADMIN' ? '👨‍🏫' : role === 'TEACHER' ? '👩‍🏫' : '🧑‍🎓',
      school: school?.trim() || 'Trường THCS',
      className: role === 'STUDENT' ? 'Lớp 9' : 'Bộ môn Toán',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Đăng ký tài khoản mới thành công!' };
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'Bạn chưa đăng nhập vào hệ thống.' };
    }

    if (currentUser.password && currentUser.password !== oldPassword.trim()) {
      return { success: false, message: 'Mật khẩu hiện tại không chính xác!' };
    }

    if (!newPassword || newPassword.trim().length < 6) {
      return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' };
    }

    const updatedUser = { ...currentUser, password: newPassword.trim() };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));

    return { success: true, message: 'Đổi mật khẩu thành công! Mật khẩu mới đã được lưu an toàn.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (newRole: Role) => {
    const target = users.find((u) => u.role === newRole) || DEFAULT_USERS.find((u) => u.role === newRole);
    if (target) {
      setCurrentUser(target);
    } else if (currentUser) {
      const updated = { ...currentUser, role: newRole };
      setCurrentUser(updated);
      setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    }
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    const next = { ...currentUser, ...updated };
    setCurrentUser(next);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? next : u)));
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(DEFAULT_USERS[0]);
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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'STUDENT',
        login,
        register,
        changePassword,
        logout,
        switchRole,
        updateProfile,
        allUsers: users,
        deleteUser,
        updateUserRole,
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
