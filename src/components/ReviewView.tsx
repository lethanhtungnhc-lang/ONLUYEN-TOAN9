import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  RotateCcw,
  Layers,
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MathView } from './MathView';

export const ReviewView: React.FC<{ onNavigateToExam: () => void; onNavigateToPractice: () => void }> = ({
  onNavigateToExam,
  onNavigateToPractice,
}) => {
  const { studentProgress, resolveMistake, chapters } = useApp();
  const [activeZone, setActiveZone] = useState<'RECOMMENDED' | 'SEMESTER_1_MID' | 'SEMESTER_1_FINAL' | 'SEMESTER_2_MID' | 'SEMESTER_2_FINAL' | 'TOTAL_9'>('RECOMMENDED');

  const unresolvedMistakes = studentProgress.mistakeNotebook.filter(m => !m.resolved);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Hệ Thống Phân Tích & Ôn Tập Thông Minh
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Trung Tâm Ôn Tập Định Kỳ & Chuyên Đề
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Tự động chẩn đoán lỗ hổng kiến thức từ lịch sử làm bài và gợi ý lộ trình cải thiện điểm số.
        </p>
      </div>

      {/* Review Zone Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveZone('RECOMMENDED')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
            activeZone === 'RECOMMENDED'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Gợi ý theo lỗi sai ({unresolvedMistakes.length})</span>
        </button>

        <button
          onClick={() => setActiveZone('SEMESTER_1_MID')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeZone === 'SEMESTER_1_MID'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Ôn tập Giữa HK I
        </button>

        <button
          onClick={() => setActiveZone('SEMESTER_1_FINAL')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeZone === 'SEMESTER_1_FINAL'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Ôn tập Cuối HK I
        </button>

        <button
          onClick={() => setActiveZone('SEMESTER_2_MID')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeZone === 'SEMESTER_2_MID'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Ôn tập Giữa HK II
        </button>

        <button
          onClick={() => setActiveZone('SEMESTER_2_FINAL')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeZone === 'SEMESTER_2_FINAL'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Ôn tập Cuối HK II
        </button>

        <button
          onClick={() => setActiveZone('TOTAL_9')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
            activeZone === 'TOTAL_9'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Tổng hợp Toán 9 & Tuyển sinh 10
        </button>
      </div>

      {/* ZONE 1: RECOMMENDED MISTAKES */}
      {activeZone === 'RECOMMENDED' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Sổ tay câu hỏi sai cần phục hồi
              </h3>
              <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1">
                Bạn có {unresolvedMistakes.length} câu hỏi làm sai trong quá trình luyện tập và làm bài thi.
              </p>
            </div>
            <button
              onClick={onNavigateToPractice}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Luyện tập lại ngay
            </button>
          </div>

          {unresolvedMistakes.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Tuyệt vời! Bạn không có câu hỏi nào đang bị sai sót.
              </h3>
              <p className="text-xs text-slate-500">
                Hãy duy trì phong độ bằng cách làm thêm các đề kiểm tra hoặc đề thi thử vào 10!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {unresolvedMistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-xs text-rose-600 dark:text-rose-400">
                      Câu sai số {idx + 1}
                    </span>
                    <button
                      onClick={() => resolveMistake(m.questionId)}
                      className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã hiểu và khắc phục
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    <MathView>{m.questionText}</MathView>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
                      <span className="font-bold">Câu bạn đã chọn:</span> {m.userAnswer}
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
                      <span className="font-bold">Đáp án đúng:</span> {m.correctAnswer}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Lý giải khắc phục:</span>{' '}
                    <MathView>{m.explanation}</MathView>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ZONE 2-5: PERIODIC REVIEWS */}
      {activeZone !== 'RECOMMENDED' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {activeZone === 'SEMESTER_1_MID' ? 'Đề cương & Nội dung Ôn tập Giữa Học kỳ I' :
                 activeZone === 'SEMESTER_1_FINAL' ? 'Đề cương & Nội dung Ôn tập Cuối Học kỳ I' :
                 activeZone === 'SEMESTER_2_MID' ? 'Đề cương & Nội dung Ôn tập Giữa Học kỳ II' :
                 activeZone === 'SEMESTER_2_FINAL' ? 'Đề cương & Nội dung Ôn tập Cuối Học kỳ II' :
                 'Ôn tập Tổng hợp Toàn diện Toán 9 & Chiến lược Thi vào 10'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Trọng tâm kiến thức, dạng bài hay thi và ngân hàng câu hỏi chọn lọc.
              </p>
            </div>

            <button
              onClick={onNavigateToExam}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Vào thi thử ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Chủ đề Đại số trọng tâm</h4>
              <p>• Rút gọn biểu thức chứa căn bậc hai, tìm x để biểu thức nguyên.</p>
              <p>• Giải hệ phương trình bậc nhất hai ẩn (phương pháp thế & cộng đại số).</p>
              <p>• Bài toán thực tế giải bằng cách lập hệ phương trình (chuyển động, năng suất).</p>
              <p>• Phương trình bậc hai một ẩn và ứng dụng định lý Viète.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Chủ đề Hình học & Thực tiễn</h4>
              <p>• Tỉ số lượng giác góc nhọn và hệ thức lượng trong tam giác vuông.</p>
              <p>• Tiếp tuyến của đường tròn và tính chất hai tiếp tuyến cắt nhau.</p>
              <p>• Góc nội tiếp chắn nửa đường tròn và số đo cung bị chắn.</p>
              <p>• Chứng minh tứ giác nội tiếp và hình khối thực tiễn (trụ, nón, cầu).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
