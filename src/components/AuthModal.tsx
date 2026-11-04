import React, { useState } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  User,
  Mail,
  School,
  Sparkles,
  Eye,
  EyeOff,
  AtSign,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'LOGIN' | 'REGISTER';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'LOGIN',
}) => {
  const { login, register, switchRole } = useAuth();
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER' | 'FORGOT'>(initialMode);

  // Form states
  const [identifier, setIdentifier] = useState(''); // Username or Email
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('STUDENT');
  const [schoolName, setSchoolName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      if (mode === 'LOGIN') {
        if (!identifier.trim()) {
          setErrorMsg('Vui lòng nhập Tên đăng nhập hoặc Email.');
          setIsSubmitting(false);
          return;
        }
        if (!password.trim()) {
          setErrorMsg('Vui lòng nhập mật khẩu.');
          setIsSubmitting(false);
          return;
        }

        const res = await login(identifier.trim(), password.trim());
        if (!res.success) {
          setErrorMsg(res.message);
          setIsSubmitting(false);
          return;
        }

        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
        }, 700);
      } else if (mode === 'REGISTER') {
        if (!fullName.trim()) {
          setErrorMsg('Vui lòng điền họ và tên đầy đủ.');
          setIsSubmitting(false);
          return;
        }
        if (!username.trim() || username.trim().length < 3) {
          setErrorMsg('Vui lòng chọn tên đăng nhập (tối thiểu 3 ký tự, không dấu hoặc có dấu chấm).');
          setIsSubmitting(false);
          return;
        }
        if (!email.trim()) {
          setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ.');
          setIsSubmitting(false);
          return;
        }
        if (!password.trim() || password.trim().length < 6) {
          setErrorMsg('Vui lòng đặt mật khẩu có ít nhất 6 ký tự.');
          setIsSubmitting(false);
          return;
        }
        if (password.trim() !== confirmPassword.trim()) {
          setErrorMsg('Mật khẩu xác nhận không trùng khớp.');
          setIsSubmitting(false);
          return;
        }

        const res = await register(
          fullName.trim(),
          username.trim(),
          email.trim(),
          password.trim(),
          selectedRole,
          schoolName.trim()
        );

        if (!res.success) {
          setErrorMsg(res.message);
          setIsSubmitting(false);
          return;
        }

        setSuccessMsg(res.message);
        setTimeout(() => {
          onClose();
        }, 700);
      } else if (mode === 'FORGOT') {
        if (!identifier.trim()) {
          setErrorMsg('Vui lòng nhập tên đăng nhập hoặc email.');
          setIsSubmitting(false);
          return;
        }
        if (identifier.trim().toLowerCase() === 'admin') {
          setSuccessMsg('Tài khoản quản trị mặc định: tên đăng nhập "admin", mật khẩu ban đầu là "toan@13579".');
        } else {
          setSuccessMsg('Hệ thống đã ghi nhận yêu cầu khôi phục mật khẩu cho tài khoản ' + identifier);
        }
      }
    } catch {
      setErrorMsg('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillAdmin = () => {
    setMode('LOGIN');
    setIdentifier('admin');
    setPassword('toan@13579');
    setErrorMsg('');
    setSuccessMsg('Đã điền tài khoản Quản trị viên (admin / toan@13579). Nhấn "Đăng nhập ngay" để tiếp tục.');
  };

  const handleQuickDemo = (role: Role) => {
    switchRole(role);
    setSuccessMsg(
      `Đã chuyển sang vai trò: ${
        role === 'ADMIN'
          ? 'Quản trị viên (Teacher Lê Thanh Tùng - admin)'
          : role === 'TEACHER'
          ? 'Giáo viên (Cô Nguyễn Thu Hà)'
          : 'Học sinh (Em Trần Minh Đức)'
      }`
    );
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Top Return Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Trở về</span>
          </button>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {mode === 'LOGIN' ? 'Cổng Đăng Nhập' : mode === 'REGISTER' ? 'Tạo Tài Khoản Mới' : 'Khôi Phục Mật Khẩu'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <button
            type="button"
            onClick={() => {
              setMode('LOGIN');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3.5 text-center text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'LOGIN'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <LogIn className="w-4 h-4" /> Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('REGISTER');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3.5 text-center text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'REGISTER'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Đăng ký mới
          </button>
          <button
            onClick={onClose}
            className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {/* Admin Credentials Quick Hint */}
          <div className="mb-4 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 flex items-center justify-between gap-2">
            <div className="text-xs text-purple-900 dark:text-purple-200">
              <span className="font-bold">Tài khoản Admin:</span>{' '}
              <span className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-purple-700 dark:text-purple-300">
                admin
              </span>{' '}
              | Mật khẩu:{' '}
              <span className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-purple-700 dark:text-purple-300">
                toan@13579
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillAdmin}
              className="text-[11px] px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold cursor-pointer shrink-0 transition"
            >
              Điền nhanh
            </button>
          </div>

          {/* Quick Demo Selector */}
          <div className="mb-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Chuyển nhanh vai trò kiểm thử:
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs hover:border-purple-500 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-0.5 transition cursor-pointer"
              >
                <span>👨‍🏫 Admin</span>
                <span className="text-[10px] text-slate-500 font-mono">admin</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('TEACHER')}
                className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs hover:border-emerald-500 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-0.5 transition cursor-pointer"
              >
                <span>👩‍🏫 Giáo viên</span>
                <span className="text-[10px] text-slate-500">Cô Thu Hà</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('STUDENT')}
                className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold shadow-xs hover:border-blue-500 border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-0.5 transition cursor-pointer"
              >
                <span>🧑‍🎓 Học sinh</span>
                <span className="text-[10px] text-slate-500">Minh Đức</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 border border-rose-200 dark:border-rose-900/50">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 border border-emerald-200 dark:border-emerald-900/50">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* REGISTER FIELDS */}
            {mode === 'REGISTER' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Họ và tên đầy đủ
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tên đăng nhập (do bạn tự đặt để đăng nhập)
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Ví dụ: vanan.toan9 hoặc annguyen"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Dùng để đăng nhập cùng mật khẩu sau này.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vai trò đăng ký
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('STUDENT')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition cursor-pointer ${
                        selectedRole === 'STUDENT'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      🧑‍🎓 Học sinh lớp 9
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('TEACHER')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition cursor-pointer ${
                        selectedRole === 'TEACHER'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      👩‍🏫 Giáo viên Toán
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vanan@gmail.com"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Trường THCS / Tỉnh thành (tùy chọn)
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ví dụ: THCS Chu Văn An, Hà Nội"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mật khẩu (tối thiểu 6 ký tự)
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Đặt mật khẩu của bạn"
                      className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Xác nhận lại mật khẩu
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* LOGIN FIELDS */}
            {mode === 'LOGIN' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tên đăng nhập hoặc Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="Nhập 'admin', tên đăng nhập hoặc email"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Mật khẩu
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('FORGOT')}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 dark:bg-slate-800 border-slate-300 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    Ghi nhớ đăng nhập trên thiết bị này
                  </label>
                </div>
              </>
            )}

            {/* FORGOT PASSWORD */}
            {mode === 'FORGOT' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nhập tên đăng nhập hoặc email cần khôi phục:
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Ví dụ: admin hoặc hocsinh9@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mode === 'LOGIN' && 'Đăng nhập ngay'}
              {mode === 'REGISTER' && 'Đăng ký tài khoản'}
              {mode === 'FORGOT' && 'Kiểm tra thông tin tài khoản'}
            </button>

            {mode === 'FORGOT' && (
              <button
                type="button"
                onClick={() => setMode('LOGIN')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 pt-1 cursor-pointer"
              >
                Quay lại màn hình đăng nhập
              </button>
            )}

            {/* Back button if user chooses not to continue */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Trở về nếu không muốn tiếp tục</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
