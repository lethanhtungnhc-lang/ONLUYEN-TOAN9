import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  BarChart2,
  Calendar,
  Layers,
  Star,
  KeyRound,
  Trophy,
  Flame,
  Crown,
  Medal,
  Target,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

type RankingPeriod = 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR';

interface LeaderboardItem {
  rank: number;
  name: string;
  className: string;
  score: number;
  correctRate: number;
  exercisesDone: number;
  streakDays: number;
  xp: number;
  badgeTitle: string;
  badgeIcon: string;
  avatarBg: string;
}

const LEADERBOARD_DATA: Record<RankingPeriod, { title: string; subtitle: string; list: LeaderboardItem[] }> = {
  DAY: {
    title: 'Bảng Vàng Thi Đua Hôm Nay',
    subtitle: 'Cập nhật theo thời gian thực kết quả rèn luyện trong ngày',
    list: [
      { rank: 1, name: 'Nguyễn Thảo Linh', className: '9A1', score: 10.0, correctRate: 98, exercisesDone: 28, streakDays: 24, xp: 580, badgeTitle: 'Huy chương Vàng Ngày', badgeIcon: '🥇', avatarBg: 'from-amber-400 to-yellow-500' },
      { rank: 2, name: 'Trần Quang Khải', className: '9A2', score: 9.8, correctRate: 95, exercisesDone: 25, streakDays: 19, xp: 520, badgeTitle: 'Huy chương Bạc Ngày', badgeIcon: '🥈', avatarBg: 'from-slate-300 to-slate-400' },
      { rank: 3, name: 'Lê Hoàng Nam', className: '9A1', score: 9.5, correctRate: 92, exercisesDone: 22, streakDays: 16, xp: 470, badgeTitle: 'Huy chương Đồng Ngày', badgeIcon: '🥉', avatarBg: 'from-amber-600 to-amber-700' },
      { rank: 4, name: 'Vũ Đức Anh', className: '9A1', score: 9.2, correctRate: 90, exercisesDone: 20, streakDays: 14, xp: 430, badgeTitle: 'Chiến binh Bứt phá', badgeIcon: '🎖️', avatarBg: 'from-blue-500 to-indigo-600' },
      { rank: 5, name: 'Phạm Minh Châu', className: '9A3', score: 9.0, correctRate: 88, exercisesDone: 19, streakDays: 12, xp: 400, badgeTitle: 'Ngôi sao Chăm chỉ', badgeIcon: '⭐', avatarBg: 'from-purple-500 to-pink-600' },
      { rank: 6, name: 'Đỗ Phương Thảo', className: '9A2', score: 8.8, correctRate: 86, exercisesDone: 18, streakDays: 11, xp: 370, badgeTitle: 'Bậc thầy Đại số', badgeIcon: '🔥', avatarBg: 'from-rose-500 to-red-600' },
      { rank: 7, name: 'Hoàng Quốc Huy', className: '9A4', score: 8.5, correctRate: 84, exercisesDone: 16, streakDays: 9, xp: 340, badgeTitle: 'Kiện tướng Hình học', badgeIcon: '📐', avatarBg: 'from-emerald-500 to-teal-600' },
    ]
  },
  WEEK: {
    title: 'Bảng Xếp Hạng Tuần Này',
    subtitle: 'Thi đua giải bài tập & đề kiểm tra định kỳ trong tuần',
    list: [
      { rank: 1, name: 'Nguyễn Thảo Linh', className: '9A1', score: 9.9, correctRate: 97, exercisesDone: 86, streakDays: 24, xp: 1850, badgeTitle: 'Huy chương Vàng Tuần', badgeIcon: '🥇', avatarBg: 'from-amber-400 to-yellow-500' },
      { rank: 2, name: 'Trần Quang Khải', className: '9A2', score: 9.7, correctRate: 94, exercisesDone: 78, streakDays: 19, xp: 1680, badgeTitle: 'Huy chương Bạc Tuần', badgeIcon: '🥈', avatarBg: 'from-slate-300 to-slate-400' },
      { rank: 3, name: 'Lê Hoàng Nam', className: '9A1', score: 9.5, correctRate: 91, exercisesDone: 72, streakDays: 16, xp: 1520, badgeTitle: 'Huy chương Đồng Tuần', badgeIcon: '🥉', avatarBg: 'from-amber-600 to-amber-700' },
      { rank: 4, name: 'Vũ Đức Anh', className: '9A1', score: 9.1, correctRate: 89, exercisesDone: 65, streakDays: 14, xp: 1390, badgeTitle: 'Chiến binh Bứt phá', badgeIcon: '🎖️', avatarBg: 'from-blue-500 to-indigo-600' },
      { rank: 5, name: 'Phạm Minh Châu', className: '9A3', score: 8.9, correctRate: 87, exercisesDone: 60, streakDays: 12, xp: 1260, badgeTitle: 'Ngôi sao Chăm chỉ', badgeIcon: '⭐', avatarBg: 'from-purple-500 to-pink-600' },
      { rank: 6, name: 'Nguyễn Văn An', className: '9A1', score: 8.7, correctRate: 85, exercisesDone: 58, streakDays: 10, xp: 1180, badgeTitle: 'Siêu tốc Toán học', badgeIcon: '⚡', avatarBg: 'from-cyan-500 to-blue-600' },
      { rank: 7, name: 'Đỗ Phương Thảo', className: '9A2', score: 8.5, correctRate: 83, exercisesDone: 52, streakDays: 11, xp: 1090, badgeTitle: 'Bậc thầy Đại số', badgeIcon: '🔥', avatarBg: 'from-rose-500 to-red-600' },
    ]
  },
  MONTH: {
    title: 'Bảng Xếp Hạng Tháng Này',
    subtitle: 'Vinh danh những gương mặt xuất sắc dẫn đầu cả tháng',
    list: [
      { rank: 1, name: 'Trần Quang Khải', className: '9A2', score: 9.9, correctRate: 97, exercisesDone: 290, streakDays: 28, xp: 4850, badgeTitle: 'Huy chương Vàng Tháng', badgeIcon: '🥇', avatarBg: 'from-amber-400 to-yellow-500' },
      { rank: 2, name: 'Nguyễn Thảo Linh', className: '9A1', score: 9.8, correctRate: 96, exercisesDone: 275, streakDays: 24, xp: 4620, badgeTitle: 'Huy chương Bạc Tháng', badgeIcon: '🥈', avatarBg: 'from-slate-300 to-slate-400' },
      { rank: 3, name: 'Phạm Minh Châu', className: '9A3', score: 9.4, correctRate: 92, exercisesDone: 240, streakDays: 21, xp: 4100, badgeTitle: 'Huy chương Đồng Tháng', badgeIcon: '🥉', avatarBg: 'from-amber-600 to-amber-700' },
      { rank: 4, name: 'Lê Hoàng Nam', className: '9A1', score: 9.2, correctRate: 90, exercisesDone: 228, streakDays: 16, xp: 3890, badgeTitle: 'Chiến binh Bứt phá', badgeIcon: '🎖️', avatarBg: 'from-blue-500 to-indigo-600' },
      { rank: 5, name: 'Vũ Đức Anh', className: '9A1', score: 9.0, correctRate: 88, exercisesDone: 215, streakDays: 14, xp: 3640, badgeTitle: 'Ngôi sao Chăm chỉ', badgeIcon: '⭐', avatarBg: 'from-purple-500 to-pink-600' },
      { rank: 6, name: 'Hoàng Quốc Huy', className: '9A4', score: 8.8, correctRate: 85, exercisesDone: 198, streakDays: 15, xp: 3350, badgeTitle: 'Kiện tướng Hình học', badgeIcon: '📐', avatarBg: 'from-emerald-500 to-teal-600' },
      { rank: 7, name: 'Đỗ Phương Thảo', className: '9A2', score: 8.6, correctRate: 84, exercisesDone: 185, streakDays: 11, xp: 3120, badgeTitle: 'Bậc thầy Đại số', badgeIcon: '🔥', avatarBg: 'from-rose-500 to-red-600' },
    ]
  },
  QUARTER: {
    title: 'Bảng Xếp Hạng Quý Này',
    subtitle: 'Đấu trường tranh tài suốt giai đoạn thi đua giữa kì & cuối kì',
    list: [
      { rank: 1, name: 'Nguyễn Thảo Linh', className: '9A1', score: 9.9, correctRate: 98, exercisesDone: 680, streakDays: 45, xp: 9850, badgeTitle: 'Huy chương Vàng Quý', badgeIcon: '🥇', avatarBg: 'from-amber-400 to-yellow-500' },
      { rank: 2, name: 'Trần Quang Khải', className: '9A2', score: 9.8, correctRate: 96, exercisesDone: 645, streakDays: 40, xp: 9320, badgeTitle: 'Huy chương Bạc Quý', badgeIcon: '🥈', avatarBg: 'from-slate-300 to-slate-400' },
      { rank: 3, name: 'Lê Hoàng Nam', className: '9A1', score: 9.4, correctRate: 92, exercisesDone: 590, streakDays: 32, xp: 8450, badgeTitle: 'Huy chương Đồng Quý', badgeIcon: '🥉', avatarBg: 'from-amber-600 to-amber-700' },
      { rank: 4, name: 'Phạm Minh Châu', className: '9A3', score: 9.3, correctRate: 91, exercisesDone: 560, streakDays: 30, xp: 8100, badgeTitle: 'Chiến binh Bứt phá', badgeIcon: '🎖️', avatarBg: 'from-blue-500 to-indigo-600' },
      { rank: 5, name: 'Vũ Đức Anh', className: '9A1', score: 9.1, correctRate: 89, exercisesDone: 520, streakDays: 28, xp: 7650, badgeTitle: 'Ngôi sao Chăm chỉ', badgeIcon: '⭐', avatarBg: 'from-purple-500 to-pink-600' },
      { rank: 6, name: 'Nguyễn Văn An', className: '9A1', score: 8.9, correctRate: 87, exercisesDone: 495, streakDays: 25, xp: 7200, badgeTitle: 'Siêu tốc Toán học', badgeIcon: '⚡', avatarBg: 'from-cyan-500 to-blue-600' },
      { rank: 7, name: 'Đỗ Phương Thảo', className: '9A2', score: 8.7, correctRate: 85, exercisesDone: 470, streakDays: 22, xp: 6850, badgeTitle: 'Bậc thầy Đại số', badgeIcon: '🔥', avatarBg: 'from-rose-500 to-red-600' },
    ]
  },
  YEAR: {
    title: 'Bảng Vinh Danh Toàn Niên Khóa (Năm học 2026 - 2027)',
    subtitle: 'Đại hội Chiến Binh Toán 9 – Trường TH, THCS Nguyễn Hữu Cảnh',
    list: [
      { rank: 1, name: 'Nguyễn Thảo Linh', className: '9A1', score: 9.9, correctRate: 98, exercisesDone: 1450, streakDays: 60, xp: 21500, badgeTitle: 'Huy chương Vàng Toàn Khóa', badgeIcon: '🥇', avatarBg: 'from-amber-400 to-yellow-500' },
      { rank: 2, name: 'Trần Quang Khải', className: '9A2', score: 9.8, correctRate: 96, exercisesDone: 1380, streakDays: 55, xp: 20400, badgeTitle: 'Huy chương Bạc Toàn Khóa', badgeIcon: '🥈', avatarBg: 'from-slate-300 to-slate-400' },
      { rank: 3, name: 'Phạm Minh Châu', className: '9A3', score: 9.5, correctRate: 93, exercisesDone: 1260, streakDays: 48, xp: 18700, badgeTitle: 'Huy chương Đồng Toàn Khóa', badgeIcon: '🥉', avatarBg: 'from-amber-600 to-amber-700' },
      { rank: 4, name: 'Lê Hoàng Nam', className: '9A1', score: 9.3, correctRate: 91, exercisesDone: 1200, streakDays: 44, xp: 17800, badgeTitle: 'Chiến binh Tinh hoa', badgeIcon: '🎖️', avatarBg: 'from-blue-500 to-indigo-600' },
      { rank: 5, name: 'Vũ Đức Anh', className: '9A1', score: 9.1, correctRate: 89, exercisesDone: 1140, streakDays: 40, xp: 16900, badgeTitle: 'Ngôi sao Sáng tạo', badgeIcon: '⭐', avatarBg: 'from-purple-500 to-pink-600' },
      { rank: 6, name: 'Hoàng Quốc Huy', className: '9A4', score: 9.0, correctRate: 88, exercisesDone: 1080, streakDays: 38, xp: 16100, badgeTitle: 'Kiện tướng Hình học', badgeIcon: '📐', avatarBg: 'from-emerald-500 to-teal-600' },
      { rank: 7, name: 'Nguyễn Văn An', className: '9A1', score: 8.8, correctRate: 86, exercisesDone: 1020, streakDays: 35, xp: 15300, badgeTitle: 'Chiến binh Bền bỉ', badgeIcon: '⚡', avatarBg: 'from-cyan-500 to-blue-600' },
    ]
  }
};

export const StudentDashboard: React.FC<{ onNavigateToReview: () => void }> = ({ onNavigateToReview }) => {
  const { studentProgress, chapters } = useApp();
  const { currentUser } = useAuth();
  const [showChangePassModal, setShowChangePassModal] = useState<boolean>(false);
  const [rankingPeriod, setRankingPeriod] = useState<RankingPeriod>('WEEK');

  const currentLeaderboard = LEADERBOARD_DATA[rankingPeriod];
  const top1 = currentLeaderboard.list[0];
  const top2 = currentLeaderboard.list[1];
  const top3 = currentLeaderboard.list[2];
  const others = currentLeaderboard.list.slice(3);

  const correctRate = studentProgress.totalAnswersCount > 0
    ? Math.round((studentProgress.correctAnswersCount / studentProgress.totalAnswersCount) * 100)
    : 85;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Welcome Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Bảng Theo Dõi Học Tập Cá Nhân
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Xin chào, {currentUser?.name || 'Học sinh'}! 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-blue-100 max-w-lg">
            Trường TH, THCS Nguyễn Hữu Cảnh • Năm học 2026 - 2027. Hãy cùng bứt phá điểm 9, 10 môn Toán 9 và vươn lên giành huy chương danh giá!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10">
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/25 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xl flex items-center justify-center shadow-md">
              {studentProgress.averageScore}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold opacity-85">Điểm trung bình</div>
              <div className="text-sm font-black flex items-center gap-1">
                <span>Xếp loại: Giỏi</span>
                <span className="text-amber-300">★</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowChangePassModal(true)}
            className="px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-98 text-white font-semibold text-xs border border-white/25 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            title="Đổi mật khẩu tài khoản học sinh"
          >
            <KeyRound className="w-4 h-4 text-amber-300" />
            <span>Đổi mật khẩu</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bài học hoàn thành</span>
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {studentProgress.completedLessons.length}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Đang theo đúng tiến độ SGK
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bài tập đã làm</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {studentProgress.completedExercisesCount}
          </div>
          <p className="text-[11px] text-slate-500">
            {studentProgress.correctAnswersCount} câu trả lời chính xác
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tỉ lệ đúng</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {correctRate}%
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">
            Tỉ lệ chính xác rất cao
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Huy hiệu đạt được</span>
            <Award className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {studentProgress.badges.length}
          </div>
          <p className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
            <Trophy className="w-3 h-3" /> Chiến binh Toán 9
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* KHU VỰC VINH DANH THÀNH TÍCH & BẢNG XẾP HẠNG HUY CHƯƠNG THEO 5 KỲ HỌC */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        
        {/* Header & 5 Period Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Trophy className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Bảng Vinh Danh Thành Tích & Huy Chương Toán 9
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {currentLeaderboard.subtitle} • Trường TH, THCS Nguyễn Hữu Cảnh
            </p>
          </div>

          {/* Period selector: Ngày, Tuần, Tháng, Quý, Năm */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 self-stretch sm:self-auto overflow-x-auto">
            <button
              onClick={() => setRankingPeriod('DAY')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                rankingPeriod === 'DAY'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span>📅 Ngày</span>
            </button>

            <button
              onClick={() => setRankingPeriod('WEEK')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                rankingPeriod === 'WEEK'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span>📆 Tuần</span>
            </button>

            <button
              onClick={() => setRankingPeriod('MONTH')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                rankingPeriod === 'MONTH'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span>🗓️ Tháng</span>
            </button>

            <button
              onClick={() => setRankingPeriod('QUARTER')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                rankingPeriod === 'QUARTER'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span>🏆 Quý</span>
            </button>

            <button
              onClick={() => setRankingPeriod('YEAR')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                rankingPeriod === 'YEAR'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span>🎓 Năm</span>
            </button>
          </div>
        </div>

        {/* TOP 3 PODIUM - HUY CHƯƠNG VÀNG 🥇, HUY CHƯƠNG BẠC 🥈, HUY CHƯƠNG ĐỒNG 🥉 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-4">
          
          {/* HẠNG 2: HUY CHƯƠNG BẠC 🥈 (Left) */}
          <div className="order-2 md:order-1 p-5 rounded-3xl bg-gradient-to-b from-slate-100/90 via-slate-50 to-white dark:from-slate-800/80 dark:via-slate-850 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-600 shadow-md text-center space-y-3 relative hover:-translate-y-1 transition duration-200">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 shadow-xs">
              <span>🥈 HẠNG 2 • HUY CHƯƠNG BẠC</span>
            </div>

            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-400 to-slate-200 p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-black text-slate-700 dark:text-slate-200">
                  {top2.name.split(' ').slice(-1)[0][0]}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white flex items-center justify-center text-lg font-bold shadow-md border-2 border-white dark:border-slate-900">
                🥈
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{top2.name}</h4>
              <p className="text-xs text-slate-500 font-semibold">Lớp {top2.className} • Trường Nguyễn Hữu Cảnh</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Điểm trung bình:</span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">{top2.score} / 10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Chuỗi ngày (Streak):</span>
                <span className="font-bold text-amber-500 flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" /> {top2.streakDays} ngày
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Điểm kinh nghiệm:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{top2.xp.toLocaleString()} XP</span>
              </div>
            </div>

            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 py-1 px-2 rounded-xl">
              Danh hiệu: {top2.badgeTitle}
            </div>
          </div>

          {/* HẠNG 1: HUY CHƯƠNG VÀNG 🥇 (Center - Taller, Prominent) */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-100/90 via-amber-50/70 to-white dark:from-amber-950/60 dark:via-slate-850 dark:to-slate-900 border-2 border-amber-400 dark:border-amber-500 shadow-xl text-center space-y-3.5 relative hover:-translate-y-1 transition duration-200 md:-translate-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 shadow-md">
              <Crown className="w-4 h-4 fill-slate-900" />
              <span>🥇 QUÁN QUÂN • HUY CHƯƠNG VÀNG</span>
            </div>

            <div className="relative mx-auto w-24 h-24">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-500 p-1.5 shadow-xl flex items-center justify-center animate-pulse">
                <div className="w-full h-full rounded-full bg-amber-50 dark:bg-slate-800 flex items-center justify-center text-4xl font-black text-amber-600 dark:text-amber-400">
                  {top1.name.split(' ').slice(-1)[0][0]}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-xl font-bold shadow-lg border-2 border-white dark:border-slate-900">
                🥇
              </div>
            </div>

            <div>
              <h4 className="font-black text-lg text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
                <span>{top1.name}</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-300 font-bold">Lớp {top1.className} • Trường Nguyễn Hữu Cảnh</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-amber-900 dark:text-amber-200 font-medium">Điểm trung bình:</span>
                <span className="font-black text-amber-600 dark:text-amber-400 text-base">{top1.score} / 10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-900 dark:text-amber-200 font-medium">Chuỗi ngày (Streak):</span>
                <span className="font-extrabold text-amber-500 flex items-center gap-0.5">
                  <Flame className="w-4 h-4 fill-amber-500" /> {top1.streakDays} ngày liên tiếp
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-900 dark:text-amber-200 font-medium">Điểm kinh nghiệm:</span>
                <span className="font-bold text-slate-900 dark:text-white">{top1.xp.toLocaleString()} XP</span>
              </div>
            </div>

            <div className="text-xs font-black text-amber-800 dark:text-amber-200 bg-amber-200/70 dark:bg-amber-900/60 py-1.5 px-3 rounded-xl border border-amber-300 dark:border-amber-700">
              👑 {top1.badgeTitle}
            </div>
          </div>

          {/* HẠNG 3: HUY CHƯƠNG ĐỒNG 🥉 (Right) */}
          <div className="order-3 md:order-3 p-5 rounded-3xl bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-white dark:from-amber-950/30 dark:via-slate-850 dark:to-slate-900 border-2 border-amber-700/50 dark:border-amber-700/60 shadow-md text-center space-y-3 relative hover:-translate-y-1 transition duration-200">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              <span>🥉 HẠNG 3 • HUY CHƯƠNG ĐỒNG</span>
            </div>

            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-amber-50 dark:bg-slate-800 flex items-center justify-center text-3xl font-black text-amber-800 dark:text-amber-300">
                  {top3.name.split(' ').slice(-1)[0][0]}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg font-bold shadow-md border-2 border-white dark:border-slate-900">
                🥉
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{top3.name}</h4>
              <p className="text-xs text-slate-500 font-semibold">Lớp {top3.className} • Trường Nguyễn Hữu Cảnh</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Điểm trung bình:</span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">{top3.score} / 10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Chuỗi ngày (Streak):</span>
                <span className="font-bold text-amber-500 flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" /> {top3.streakDays} ngày
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Điểm kinh nghiệm:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{top3.xp.toLocaleString()} XP</span>
              </div>
            </div>

            <div className="text-[11px] font-bold text-amber-800 dark:text-amber-200 bg-amber-100/70 dark:bg-amber-950 py-1 px-2 rounded-xl">
              Danh hiệu: {top3.badgeTitle}
            </div>
          </div>

        </div>

        {/* Motivational Banner for the logged-in student */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-blue-200 dark:border-blue-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Target className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Thành tích của bạn: Hạng #4 • {studentProgress.averageScore} điểm
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Chỉ còn cách Huy chương Đồng 🥉 khoảng <strong>0.3 điểm</strong>! Hãy hoàn thành thêm 1 đề thi thử hôm nay để bứt phá vào Top 3 vinh dự!
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToReview}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs shadow-md transition shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Luyện đề để thăng hạng</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Top 4 to 10 Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              Chiến binh Toán 9 trong Top 10 ({currentLeaderboard.title})
            </h4>
            <span className="text-xs text-slate-500">Xếp theo điểm & số bài tập</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-3 text-center">Hạng</th>
                  <th className="py-3 px-3">Học sinh & Lớp</th>
                  <th className="py-3 px-3 text-center">Điểm TB</th>
                  <th className="py-3 px-3 text-center">Tỉ lệ đúng</th>
                  <th className="py-3 px-3 text-center">Chuỗi Streak</th>
                  <th className="py-3 px-3 text-center">Bài tập</th>
                  <th className="py-3 px-3 text-right">Danh hiệu vinh danh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {others.map((item) => (
                  <tr key={item.rank} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 text-center font-bold text-slate-700 dark:text-slate-300">
                      <span className="w-6 h-6 inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                        #{item.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                          {item.className}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">Trường TH, THCS Nguyễn Hữu Cảnh</div>
                    </td>
                    <td className="py-3 px-3 text-center font-black text-blue-600 dark:text-blue-400 text-sm">
                      {item.score}
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-emerald-600">
                      {item.correctRate}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-amber-500">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" /> {item.streakDays}d
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-semibold text-slate-600 dark:text-slate-400">
                      {item.exercisesDone} bài
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800 text-[11px]">
                        <span>{item.badgeIcon}</span>
                        <span>{item.badgeTitle}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Main Grid: Progress by Chapter + Weak Topics & Badges Collection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress by Chapter (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              Tiến độ học tập theo từng chương
            </h3>
            <span className="text-xs text-slate-500 font-semibold">Chương trình GDPT 2018</span>
          </div>

          <div className="space-y-4">
            {chapters.map((ch) => {
              const pct = studentProgress.chapterProgress[ch.id] || 0;
              return (
                <div key={ch.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-sm">
                      {ch.title}
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak Topics & Badges Collection (1 col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Kiến thức cần củng cố
              </h3>
            </div>

            <div className="space-y-2.5">
              {studentProgress.weakTopics.map((topic, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onNavigateToReview}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Vào ôn luyện khắc phục</span>
            </button>
          </div>

          {/* Badges Box: Huy hiệu & Huy chương đã mở khóa */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Bộ sưu tập Huy chương & Huy hiệu
              </h3>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                {studentProgress.badges.length} đã mở
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {studentProgress.badges.map((b) => (
                <div
                  key={b.id}
                  className="p-3 rounded-2xl bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/70 dark:to-slate-850 border border-slate-200 dark:border-slate-700/60 text-center space-y-1 hover:border-amber-400 transition"
                >
                  <div className="text-3xl filter drop-shadow-xs">{b.icon}</div>
                  <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 truncate">
                    {b.title}
                  </div>
                  <div className="text-[9.5px] text-slate-400 line-clamp-1">{b.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exam History Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          Lịch sử làm bài kiểm tra & thi thử
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Tên đề thi</th>
                <th className="py-2.5 px-3">Ngày hoàn thành</th>
                <th className="py-2.5 px-3">Thời gian làm</th>
                <th className="py-2.5 px-3 text-right">Điểm số</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {studentProgress.examHistory.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{h.examTitle}</td>
                  <td className="py-3 px-3 text-slate-500">{h.completedAt}</td>
                  <td className="py-3 px-3 text-slate-500">{Math.round(h.timeSpentSeconds / 60)} phút</td>
                  <td className="py-3 px-3 text-right">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                      {h.score}
                    </span>
                    <span className="text-slate-400"> / {h.maxScore}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Change Password */}
      <ChangePasswordModal
        isOpen={showChangePassModal}
        onClose={() => setShowChangePassModal(false)}
      />
    </div>
  );
};
