import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Plus,
  Clock,
  BookOpen,
  CheckCircle2,
  ListChecks,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Exam, Question } from '../types';
import { MathView } from './MathView';

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (examTitle: string) => void;
}

export const AddExamModal: React.FC<AddExamModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { questions, addExam, chapters } = useApp();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [examType, setExamType] = useState<Exam['type']>('MID_TERM_1');
  const [semester, setSemester] = useState<1 | 2>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(90);
  const [description, setDescription] = useState(
    'Đề thi thử bám sát cấu trúc đề kiểm tra và tuyển sinh vào lớp 10 theo Chương trình GDPT 2018.'
  );
  const [author, setAuthor] = useState(currentUser?.name || 'Teacher Lê Thanh Tùng');

  // Question selection
  const [selectionMode, setSelectionMode] = useState<'AUTO' | 'MANUAL'>('AUTO');
  const [autoQuestionCount, setAutoQuestionCount] = useState<number>(16);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [filterChapter, setFilterChapter] = useState<string>('ALL');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const filteredQuestions = questions.filter((q) => {
    if (filterChapter !== 'ALL' && q.chapterId !== filterChapter) return false;
    return true;
  });

  const toggleSelectQuestion = (qId: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleSelectAllFiltered = () => {
    const ids = filteredQuestions.map((q) => q.id);
    setSelectedQuestionIds((prev) => {
      const merged = new Set([...prev, ...ids]);
      return Array.from(merged);
    });
  };

  const handleClearSelection = () => {
    setSelectedQuestionIds([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tên đề thi thử.');
      return;
    }

    let finalQuestions: Question[] = [];

    if (selectionMode === 'AUTO') {
      if (questions.length === 0) {
        setErrorMsg('Ngân hàng câu hỏi đang trống, không thể tạo đề tự động.');
        return;
      }
      // Shuffle or pick balanced questions
      const pool = [...questions].sort(() => 0.5 - Math.random());
      finalQuestions = pool.slice(0, Math.min(autoQuestionCount, pool.length));
    } else {
      if (selectedQuestionIds.length === 0) {
        setErrorMsg('Vui lòng chọn ít nhất 1 câu hỏi cho đề thi thử.');
        return;
      }
      finalQuestions = questions.filter((q) => selectedQuestionIds.includes(q.id));
    }

    const totalPoints = finalQuestions.reduce((sum, q) => sum + (q.points || 0.25), 0);

    const newExam: Exam = {
      id: `exam-${Date.now()}`,
      title: title.trim(),
      type: examType,
      semester,
      durationMinutes: Number(durationMinutes) || 90,
      totalPoints: Number(totalPoints.toFixed(2)) || 10,
      questions: finalQuestions,
      author: author.trim() || 'Teacher Lê Thanh Tùng',
      description: description.trim(),
    };

    addExam(newExam);
    if (onSuccess) {
      onSuccess(newExam.title);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Tạo Đề Thi Thử Mới
              </h3>
              <p className="text-xs text-slate-500">
                Dành cho Quản trị viên & Giáo viên bộ môn Toán 9
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tên đề thi thử <span className="text-rose-500">*</span>:
            </label>
            <input
              type="text"
              required
              placeholder="VD: Đề thi thử Tuyển sinh vào Lớp 10 – Trường THCS Chuyên đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            />
          </div>

          {/* Grid: Type, Semester, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Dạng đề thi:
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as Exam['type'])}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="MID_TERM_1">Giữa Học kỳ I</option>
                <option value="FINAL_1">Cuối Học kỳ I</option>
                <option value="MID_TERM_2">Giữa Học kỳ II</option>
                <option value="FINAL_2">Cuối Học kỳ II</option>
                <option value="ENTRANCE_10">Thi thử vào Lớp 10</option>
                <option value="CHAPTER">Kiểm tra theo Chương</option>
                <option value="REGULAR">Kiểm tra thường xuyên</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Học kỳ áp dụng:
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value) as 1 | 2)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value={1}>Học kỳ I</option>
                <option value={2}>Học kỳ II</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Thời gian làm bài:
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value={45}>45 phút (Đề 1 tiết)</option>
                <option value={60}>60 phút</option>
                <option value={90}>90 phút (Chuẩn thi HK & Vào 10)</option>
                <option value={120}>120 phút (Thi chuyên)</option>
              </select>
            </div>
          </div>

          {/* Description & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tác giả / Giáo viên ra đề:
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ghi chú / Hướng dẫn:
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Question Selection Strategy */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-purple-600" /> Chọn câu hỏi cho đề thi:
              </span>
              <div className="flex rounded-lg bg-slate-200 dark:bg-slate-700 p-0.5">
                <button
                  type="button"
                  onClick={() => setSelectionMode('AUTO')}
                  className={`px-3 py-1 rounded-md font-bold transition cursor-pointer ${
                    selectionMode === 'AUTO'
                      ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Tự động từ Ngân hàng
                </button>
                <button
                  type="button"
                  onClick={() => setSelectionMode('MANUAL')}
                  className={`px-3 py-1 rounded-md font-bold transition cursor-pointer ${
                    selectionMode === 'MANUAL'
                      ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Chọn thủ công ({selectedQuestionIds.length})
                </button>
              </div>
            </div>

            {selectionMode === 'AUTO' ? (
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Số lượng câu hỏi lấy tự động:</span>
                  <select
                    value={autoQuestionCount}
                    onChange={(e) => setAutoQuestionCount(Number(e.target.value))}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 font-bold"
                  >
                    <option value={10}>10 câu (Khoảng 2.5 - 5 điểm)</option>
                    <option value={15}>15 câu</option>
                    <option value={16}>16 câu (Chuẩn đề thi THCS)</option>
                    <option value={20}>20 câu</option>
                    <option value={25}>25 câu</option>
                  </select>
                </div>
                <p className="text-[11px] text-slate-500">
                  Hệ thống sẽ tự động cân đối câu hỏi theo các mức độ Nhận biết, Thông hiểu, Vận dụng và Vận dụng cao từ kho câu hỏi hiện có ({questions.length} câu).
                </p>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Lọc theo chương:</span>
                    <select
                      value={filterChapter}
                      onChange={(e) => setFilterChapter(e.target.value)}
                      className="p-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-[11px]"
                    >
                      <option value="ALL">Tất cả các chương</option>
                      {chapters.map((c) => (
                        <option key={c.id} value={c.id}>
                          Chương {c.chapterNumber}: {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSelectAllFiltered}
                      className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Chọn tất cả
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearSelection}
                      className="text-[11px] font-semibold text-slate-500 hover:underline cursor-pointer"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1.5 border border-slate-200 dark:border-slate-700 rounded-xl p-2 bg-white dark:bg-slate-900">
                  {filteredQuestions.map((q) => {
                    const isChecked = selectedQuestionIds.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition ${
                          isChecked
                            ? 'bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectQuestion(q.id)}
                          className="mt-1 rounded text-purple-600 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {q.points}đ
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                              {q.level}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-700 dark:text-slate-300 line-clamp-2">
                            <MathView>{q.title}</MathView>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              ← Hủy và trở về
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Hoàn tất tạo đề thi thử
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
