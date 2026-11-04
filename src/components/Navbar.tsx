import React, { useState } from 'react';
import {
  BookOpen,
  Home,
  GraduationCap,
  Layers,
  Sparkles,
  FileSpreadsheet,
  Calculator,
  User,
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Gamepad2,
  KeyRound,
  Smartphone,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { PWAInstallButton } from './PWAInstallButton';
import { Role } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenChangePassword?: () => void;
  onOpenDownloadModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  onOpenChangePassword,
  onOpenDownloadModal,
}) => {
  const { currentUser, role, switchRole, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'curriculum', label: 'Chương trình', icon: BookOpen },
    { id: 'practice', label: 'Luyện tập', icon: Layers },
    { id: 'review', label: 'Ôn tập', icon: Sparkles },
    { id: 'games', label: 'Trò chơi 3D', icon: Gamepad2, badge: '3D' },
    { id: 'exams', label: 'Đề kiểm tra', icon: GraduationCap },
    { id: 'matrix', label: 'Ma trận & Bản đặc tả', icon: FileSpreadsheet, badge: 'Mới' },
    { id: 'solver', label: 'Giải toán 6 bước', icon: Calculator },
    {
      id: 'dashboard',
      label: role === 'ADMIN' ? 'Quản trị' : role === 'TEACHER' ? 'Lớp học' : 'Tiến độ học',
      icon: User,
      highlight: true,
    },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  const handleRoleChange = (newRole: Role) => {
    if (newRole === 'ADMIN' && currentUser?.role !== 'ADMIN') {
      setRoleDropdownOpen(false);
      onOpenAuth();
      return;
    }
    switchRole(newRole);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  TOÁN 9
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                  GDPT 2018
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Chinh Phục Tri Thức • Teacher Lê Thanh Tùng
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: App Download, Login/Register, PWA Button, Theme Toggle, Role Switcher / Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* App Download Button */}
            <button
              onClick={onOpenDownloadModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs shadow-emerald-500/20 transition active:scale-95 cursor-pointer"
              title="Tải ứng dụng và cài đặt trên điện thoại thông minh"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tải App</span>
            </button>

            {/* Quick Top Auth Button */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 transition active:scale-95 cursor-pointer"
              title="Đăng nhập hoặc Đăng ký tài khoản mới"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đăng nhập / ĐK</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Dark mode button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={darkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User Account / Login State */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition cursor-pointer"
                >
                  <span className="text-base">{currentUser.avatar || '🧑‍🎓'}</span>
                  <span className="max-w-[90px] sm:max-w-[120px] truncate hidden md:inline">
                    {currentUser.name}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                    role === 'ADMIN'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                      : role === 'TEACHER'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {role === 'ADMIN' ? 'Admin' : role === 'TEACHER' ? 'G.Viên' : 'Học sinh'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {currentUser.name}
                      </div>
                      <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono truncate">
                        @{currentUser.username}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {currentUser.school || 'Trường THCS'}
                      </div>
                    </div>

                    {/* Only ADMIN can quick switch roles for testing */}
                    {currentUser?.role === 'ADMIN' && (
                      <>
                        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Chuyển nhanh vai trò (Admin)
                        </div>

                        <button
                          onClick={() => handleRoleChange('ADMIN')}
                          className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                            (role as string) === 'ADMIN' ? 'font-bold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-950/30' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>👨‍🏫 Quản trị viên</span>
                          {(role as string) === 'ADMIN' && <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />}
                        </button>

                        <button
                          onClick={() => handleRoleChange('TEACHER')}
                          className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                            (role as string) === 'TEACHER' ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>👩‍🏫 Giáo viên</span>
                          {(role as string) === 'TEACHER' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>

                        <button
                          onClick={() => handleRoleChange('STUDENT')}
                          className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer ${
                            (role as string) === 'STUDENT' ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>🧑‍🎓 Học sinh</span>
                          {(role as string) === 'STUDENT' && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                      </>
                    )}

                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      onOpenChangePassword?.();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center gap-1.5 font-semibold cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Đổi mật khẩu...</span>
                  </button>

                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 font-semibold cursor-pointer"
                  >
                    Đăng nhập tài khoản khác...
                  </button>

                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      logout();
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : null}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
