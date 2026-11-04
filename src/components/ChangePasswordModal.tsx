import React, { useState } from 'react';
import { X, KeyRound, Lock, CheckCircle2, ShieldAlert, Eye, EyeOff, Sparkles, Smartphone, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  isForced?: boolean; // Bắt buộc đổi mật khẩu lần đầu (không thể bỏ qua)
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  isForced = false,
}) => {
  const { currentUser, changePassword, logout, isStandalonePWA } = useAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !currentUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!oldPassword.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu hiện tại (khởi tạo).');
      return;
    }

    if (!newPassword.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu mới.');
      return;
    }

    if (newPassword.trim().length < 6) {
      setErrorMsg('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    if (newPassword.trim() !== confirmPassword.trim()) {
      setErrorMsg('Mật khẩu xác nhận không trùng khớp với mật khẩu mới.');
      return;
    }

    if (oldPassword.trim() === newPassword.trim()) {
      setErrorMsg('Mật khẩu mới phải khác với mật khẩu khởi tạo hiện tại.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await changePassword(oldPassword.trim(), newPassword.trim());
      if (res.success) {
        setSuccessMsg(res.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          onClose();
          setSuccessMsg('');
        }, 1200);
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg('Đã có lỗi xảy ra khi đổi mật khẩu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        // Disallow outside click close if forced
        if (!isForced && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isForced
                ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400'
                : 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'
            }`}>
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-slate-900 dark:text-white font-extrabold text-base">
                  {isForced ? 'Yêu Cầu Đổi Mật Khẩu Lần Đầu' : 'Đổi Mật Khẩu Tài Khoản'}
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                {isForced
                  ? 'Thiết lập mật khẩu cá nhân để kích hoạt tài khoản'
                  : 'Cập nhật mật khẩu định kỳ để bảo vệ tài khoản'}
              </p>
            </div>
          </div>

          {!isForced && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Forced notice banner */}
          {isForced && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>CHÍNH SÁCH BẢO MẬT BẮT BUỘC</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                Bạn đang đăng nhập lần đầu tiên trên{' '}
                <strong className="underline">
                  {isStandalonePWA ? 'Ứng dụng điện thoại (PWA)' : 'Website học tập'}
                </strong>
                . Vui lòng đổi mật khẩu khởi tạo sang mật khẩu cá nhân mới để kích hoạt đầy đủ bài học, phòng thi và trò chơi 3D.
              </p>
            </div>
          )}

          {/* User badge */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentUser.avatar || '🧑‍🎓'}</span>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{currentUser.name}</span>
                <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400">@{currentUser.username}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              {isStandalonePWA ? <Smartphone className="w-3 h-3 text-emerald-500" /> : <Globe className="w-3 h-3 text-blue-500" />}
              <span>{isStandalonePWA ? 'App di động' : 'Website'}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 border border-rose-200 dark:border-rose-900/50 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 border border-emerald-200 dark:border-emerald-900/50 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Old Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {isForced ? 'Mật khẩu khởi tạo hiện tại:' : 'Mật khẩu hiện tại:'} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type={showOldPass ? 'text' : 'password'}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="12345678"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPass(!showOldPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mật khẩu mới: <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Xác nhận lại mật khẩu mới: <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại chính xác mật khẩu mới"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 pt-2">
              {isForced ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  Hủy
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-98 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? 'Đang cập nhật...' : isForced ? 'Đổi mật khẩu & Bắt đầu học' : 'Lưu mật khẩu mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
