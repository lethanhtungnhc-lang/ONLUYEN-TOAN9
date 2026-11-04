import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
  FileSpreadsheet,
  Calculator,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Flame,
  Zap,
  Users,
  Star,
  ChevronRight,
  Gamepad2,
  Smartphone
} from 'lucide-react';
import { MathView } from './MathView';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenDownloadModal?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenAuth, onOpenDownloadModal }) => {
  const { currentUser, role } = useAuth();
  const { studentProgress, chapters } = useApp();

  const featureCards = [
    {
      id: 'curriculum',
      title: 'Chương trình & Bài học',
      desc: '10 chương sách Toán 9 bám sát GDPT 2018 với 12 mục chuẩn sư phạm.',
      icon: BookOpen,
      color: 'from-blue-600 to-indigo-600',
      badge: '100% Chuẩn SGK',
    },
    {
      id: 'practice',
      title: 'Luyện tập tương tác',
      desc: 'Trắc nghiệm 4 lựa chọn, đúng/sai, điền kết quả, giải thích chi tiết & mẹo giải nhanh.',
      icon: Layers,
      color: 'from-sky-500 to-blue-600',
      badge: 'Đa dạng dạng câu',
    },
    {
      id: 'review',
      title: 'Ôn tập thông minh',
      desc: 'Tự động chẩn đoán câu sai, ôn tập định kỳ giữa kỳ, cuối kỳ & chuyên đề vào 10.',
      icon: Sparkles,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Chẩn đoán AI',
    },
    {
      id: 'exams',
      title: 'Phòng thi & Đề kiểm tra',
      desc: 'Làm bài thi trực tuyến với đồng hồ đếm ngược, tự động chấm điểm & hướng dẫn giải chi tiết.',
      icon: GraduationCap,
      color: 'from-purple-600 to-pink-600',
      badge: 'Thang điểm 10',
    },
    {
      id: 'matrix',
      title: 'Ma trận & Bản đặc tả',
      desc: 'Công cụ lập ma trận 2 chiều chuẩn Bộ GD&ĐT, sinh nhiều mã đề và xuất Word (.doc).',
      icon: FileSpreadsheet,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Dành cho Thầy Cô',
    },
    {
      id: 'games',
      title: 'Trò chơi Toán học 3D',
      desc: '8 mini-games 3D không gian vũ trụ: Vượt chướng ngại vật, Vòng quay may mắn, Đấu trường toán học...',
      icon: Gamepad2,
      color: 'from-amber-500 via-rose-500 to-indigo-600',
      badge: '3D WebGL',
    },
    {
      id: 'solver',
      title: 'Hệ thống giải toán 6 bước',
      desc: 'Phân tích dữ kiện, chọn phương pháp, giải trình tự phương trình, căn thức và hình học.',
      icon: Calculator,
      color: 'from-amber-500 to-orange-600',
      badge: 'Trợ giảng Toán',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-blue-50/60 via-indigo-50/30 to-transparent dark:from-blue-950/20 dark:via-slate-900 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Attribution Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-blue-100/80 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shadow-xs backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Chương Trình GDPT 2018 • Teacher Lê Thanh Tùng</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              TOÁN 9 –{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                CHINH PHỤC TRI THỨC
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Nền tảng học tập, luyện thi và giảng dạy Toán 9 hiện đại theo Chương trình GDPT 2018. Hiển thị công thức Toán chuẩn KaTeX, giải toán 6 bước và ma trận đặc tả tự động.
            </p>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('curriculum')}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-5 h-5" />
                <span>Bắt đầu học ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDownloadModal}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
                title="Tải và cài đặt ứng dụng cho điện thoại iPhone và Android"
              >
                <Smartphone className="w-5 h-5" />
                <span>Tải App về điện thoại</span>
              </button>

              <button
                onClick={() => onNavigate('games')}
                className="px-5 py-3 rounded-2xl border border-rose-200 dark:border-rose-900/60 hover:border-rose-400 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer group"
              >
                <Gamepad2 className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
                <span>Trò chơi Toán 3D</span>
              </button>

              <button
                onClick={() => onNavigate('matrix')}
                className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-purple-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                <span>Tạo ma trận đề thi</span>
              </button>

              <button
                onClick={() => onNavigate('solver')}
                className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-5 h-5 text-amber-500" />
                <span>Giải toán 6 bước</span>
              </button>
            </div>

            {/* Quick Math Preview strip */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 shadow-xs">
                <MathView formula="\sqrt{A^2} = |A|" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 shadow-xs">
                <MathView formula="\Delta = b^2 - 4ac" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 shadow-xs">
                <MathView formula="x_1 + x_2 = -\frac{b}{a}" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800 shadow-xs">
                <MathView formula="\widehat{A} + \widehat{C} = 180^\circ" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE 6 HUBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            10 Chức Năng Học Tập & Khảo Thí Đỉnh Cao
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Đầy đủ mọi công cụ dành cho Học sinh đạt điểm 9, 10 và Giáo viên soạn giảng chuyên nghiệp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="group relative flex flex-col p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                  {card.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Khám phá ngay</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK STATS & PEDAGOGICAL HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30">
                Chương Trình GDPT 2018
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Thiết Kế Chuyên Biệt Cho Lớp 9 & Thi Tuyển Sinh Vào 10
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Được biên soạn công phu bởi Teacher Lê Thanh Tùng, tích hợp các phương pháp giải toán mới nhất, bảng đặc tả trắc nghiệm tự luận và hướng dẫn chấm theo thang điểm 0.25đ.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
                <div className="text-3xl font-black text-amber-400">10 Chương</div>
                <div className="text-xs font-semibold text-slate-300">Chuẩn Chương trình GDPT 2018</div>
                <div className="text-[10px] text-slate-400">Đầy đủ Đại số & Hình học</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
                <div className="text-3xl font-black text-emerald-400">5 Chuyên đề</div>
                <div className="text-xs font-semibold text-slate-300">Luyện thi vào lớp 10</div>
                <div className="text-[10px] text-slate-400">Rút gọn, Viète, Tứ giác nội tiếp</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
                <div className="text-3xl font-black text-sky-400">100% KaTeX</div>
                <div className="text-xs font-semibold text-slate-300">Công thức hiển thị mượt mà</div>
                <div className="text-[10px] text-slate-400">Phân số, căn thức, hệ phương trình</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1">
                <div className="text-3xl font-black text-purple-400">PWA 1-Click</div>
                <div className="text-xs font-semibold text-slate-300">Cài đặt trên Android & iOS</div>
                <div className="text-[10px] text-slate-400">Sử dụng mọi lúc mọi nơi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FOR ROLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Trải nghiệm với cả 3 vai trò: Quản trị viên, Giáo viên hoặc Học sinh
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Đăng nhập tức thì hoặc đăng ký tài khoản mới để lưu trữ tiến độ học tập và quản lý lớp học.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              Đăng nhập / Đăng ký
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Vào bảng điều khiển
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
