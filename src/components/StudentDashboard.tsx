import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Clock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BarChart2,
  Calendar,
  Layers,
  Star,
  KeyRound
} from 'lucide-react';
import { ChangePasswordModal } from './ChangePasswordModal';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { MathView } from './MathView';

export const StudentDashboard: React.FC<{ onNavigateToReview: () => void }> = ({ onNavigateToReview }) => {
  const { studentProgress, chapters } = useApp();
  const { currentUser } = useAuth();
  const [showChangePassModal, setShowChangePassModal] = useState<boolean>(false);

  const correctRate = studentProgress.totalAnswersCount > 0
    ? Math.round((studentProgress.correctAnswersCount / studentProgress.totalAnswersCount) * 100)
    : 85;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Welcome Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Bảng Theo Dõi Học Tập Cá Nhân
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Xin chào, {currentUser?.name || 'Học sinh'}! 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-blue-100 max-w-lg">
            Hôm nay hãy tiếp tục hành trình chinh phục điểm 9, 10 môn Toán 9 và sẵn sàng bứt phá kỳ thi vào lớp 10!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xl flex items-center justify-center shadow-md">
              {studentProgress.averageScore}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold opacity-80">Điểm trung bình</div>
              <div className="text-sm font-bold">Xếp loại: Giỏi</div>
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
          <p className="text-[11px] text-amber-600 font-semibold">
            Chiến binh Toán 9
          </p>
        </div>
      </div>

      {/* Main Grid: Progress by Chapter + Weekly Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress by Chapter (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              Tiến độ học tập theo từng chương
            </h3>
            <span className="text-xs text-slate-500">Toán 9 GDPT 2018</span>
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

        {/* Weak Topics & Warnings (1 col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
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

          {/* Badges Box */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" /> Huy hiệu đã mở khóa
            </h3>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {studentProgress.badges.map((b) => (
                <div
                  key={b.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-1"
                >
                  <div className="text-2xl">{b.icon}</div>
                  <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                    {b.title}
                  </div>
                  <div className="text-[9px] text-slate-400 line-clamp-1">{b.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exam History Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
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
