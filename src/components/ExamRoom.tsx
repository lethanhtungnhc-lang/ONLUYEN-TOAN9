import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flag,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
  XCircle,
  ShieldCheck,
  Plus,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { MathView } from './MathView';
import { Exam, Question } from '../types';
import { AddExamModal } from './AddExamModal';

export const ExamRoom: React.FC = () => {
  const { exams, recordExamSubmission } = useApp();
  const { role } = useAuth();
  
  // State: selecting exam or taking exam
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showAddExamModal, setShowAddExamModal] = useState<boolean>(false);
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Exam taking state
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Result state
  const [finalScore, setFinalScore] = useState<number>(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);

  // Start exam
  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setTimeLeft(exam.durationMinutes * 60);
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    setExamStarted(true);
  };

  // Timer countdown
  useEffect(() => {
    if (!examStarted || isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: string, value: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitExam = () => {
    if (!selectedExam || isSubmitted) return;

    let totalPoints = 0;
    let earnedPoints = 0;
    const wrongs: string[] = [];

    selectedExam.questions.forEach((q) => {
      totalPoints += q.points;
      const ans = userAnswers[q.id];

      if (q.type === 'MULTIPLE_CHOICE') {
        if (ans && ans.trim() === String(q.correctAnswer).trim()) {
          earnedPoints += q.points;
        } else {
          wrongs.push(q.id);
        }
      } else if (q.type === 'TRUE_FALSE') {
        if (ans && ans.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
          earnedPoints += q.points;
        } else {
          wrongs.push(q.id);
        }
      } else if (q.type === 'FILL_IN' || q.type === 'SHORT_ANSWER') {
        if (ans && ans.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()) {
          earnedPoints += q.points;
        } else {
          wrongs.push(q.id);
        }
      } else {
        // Essay question auto-awarded if student answered thoughtfully
        if (ans && ans.trim().length > 10) {
          earnedPoints += q.points * 0.9;
        } else {
          wrongs.push(q.id);
        }
      }
    });

    const scaledScore = Number(((earnedPoints / totalPoints) * 10).toFixed(2));
    setFinalScore(scaledScore);
    setWrongQuestionIds(wrongs);
    setIsSubmitted(true);

    if (scaledScore >= 8) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    const timeSpent = selectedExam.durationMinutes * 60 - timeLeft;
    recordExamSubmission(
      selectedExam.id,
      selectedExam.title,
      scaledScore,
      10,
      timeSpent,
      wrongs
    );
  };

  // If in exam mode
  if (examStarted && selectedExam) {
    const q = selectedExam.questions[currentQuestionIndex];
    const isAnswered = !!userAnswers[q.id];
    const isFlagged = !!flaggedQuestions[q.id];

    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Top Control Bar */}
        <div className="sticky top-16 z-30 mb-6 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
              {selectedExam.title}
            </h2>
            <div className="text-xs text-slate-500">
              Câu {currentQuestionIndex + 1} / {selectedExam.questions.length} • {q.points} điểm
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Countdown timer */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
              timeLeft < 300
                ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/50 dark:border-rose-800 animate-pulse'
                : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-300'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
              >
                Nộp bài thi
              </button>
            ) : (
              <button
                onClick={() => setExamStarted(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition cursor-pointer"
              >
                Trở về danh sách đề
              </button>
            )}
          </div>
        </div>

        {/* Exam Body: Question and Question Grid Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Question Box */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white text-base">
                  Câu hỏi số {currentQuestionIndex + 1}:
                </span>
                <button
                  onClick={() => toggleFlag(q.id)}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                    isFlagged
                      ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{isFlagged ? 'Đã đánh dấu xem lại' : 'Đánh dấu câu này'}</span>
                </button>
              </div>

              {/* Title & LaTeX */}
              <div className="text-base sm:text-lg text-slate-900 dark:text-white font-medium leading-relaxed">
                <MathView>{q.title}</MathView>
              </div>

              {/* Options */}
              <div className="pt-2">
                {q.type === 'MULTIPLE_CHOICE' && q.options && (
                  <div className="space-y-3">
                    {q.options.map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      const isSelected = userAnswers[q.id] === opt;
                      return (
                        <button
                          key={i}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(q.id, opt)}
                          className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/70 text-blue-900 dark:bg-blue-950/50 dark:text-blue-200 ring-2 ring-blue-500'
                              : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 bg-white dark:bg-slate-800/60'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {letter}
                          </span>
                          <span className="flex-1 font-medium">
                            <MathView>{opt}</MathView>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === 'TRUE_FALSE' && (
                  <div className="flex gap-4">
                    {['Đúng', 'Sai'].map((val) => (
                      <button
                        key={val}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, val)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-bold transition cursor-pointer ${
                          userAnswers[q.id] === val
                            ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 ring-2 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                )}

                {(q.type === 'FILL_IN' || q.type === 'SHORT_ANSWER') && (
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">
                      Nhập đáp số của bạn:
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleSelectOption(q.id, e.target.value)}
                      placeholder="Nhập kết quả..."
                      className="w-full sm:w-80 p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {q.type === 'ESSAY' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-500 block mb-1">
                      Nhập lời giải hoặc tóm tắt các bước giải của bạn:
                    </label>
                    <textarea
                      rows={4}
                      disabled={isSubmitted}
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleSelectOption(q.id, e.target.value)}
                      placeholder="Trình bày lời giải toán..."
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  ← Câu trước
                </button>

                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.min(selectedExam.questions.length - 1, prev + 1))}
                  disabled={currentQuestionIndex === selectedExam.questions.length - 1}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 text-white disabled:opacity-30 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                >
                  Câu tiếp theo →
                </button>
              </div>

              {/* If submitted, show full step-by-step solution */}
              {isSubmitted && (
                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                    <BookOpen className="w-4 h-4 text-emerald-600" /> Hướng dẫn giải chi tiết và đáp án:
                  </div>

                  <p>
                    <strong>Đáp án chính xác:</strong>{' '}
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                      <MathView>{String(q.correctAnswer)}</MathView>
                    </span>
                  </p>

                  <div className="pl-3 border-l-2 border-emerald-500 space-y-1.5">
                    {q.stepByStepSolution.map((s, idx) => (
                      <div key={idx}>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">• {s.title}:</span>{' '}
                        <MathView>{s.content}</MathView>
                      </div>
                    ))}
                  </div>

                  {q.commonMistakes && (
                    <p className="text-amber-700 dark:text-amber-300 text-[11px] pt-1 border-t border-slate-200 dark:border-slate-700">
                      <strong>Lỗi sai thường gặp:</strong> {q.commonMistakes}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Question Grid Sidebar */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Danh sách câu hỏi
              </h3>

              <div className="grid grid-cols-5 gap-2">
                {selectedExam.questions.map((item, index) => {
                  const answered = !!userAnswers[item.id];
                  const flagged = !!flaggedQuestions[item.id];
                  const isCurrent = currentQuestionIndex === index;

                  let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                  if (answered) {
                    bgClass = 'bg-blue-600 text-white';
                  }
                  if (flagged) {
                    bgClass = 'bg-amber-500 text-white';
                  }
                  if (isSubmitted) {
                    const isWrong = wrongQuestionIds.includes(item.id);
                    bgClass = isWrong ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white';
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`h-9 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${bgClass} ${
                        isCurrent ? 'ring-2 ring-slate-900 dark:ring-white scale-105' : ''
                      }`}
                    >
                      <span>{index + 1}</span>
                      {flagged && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white dark:ring-slate-900" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-blue-600" />
                  <span>Đã trả lời</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700" />
                  <span>Chưa trả lời</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-amber-500" />
                  <span>Đã đánh dấu xem lại</span>
                </div>
              </div>
            </div>

            {/* Score box if submitted */}
            {isSubmitted && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-3 text-center">
                <Award className="w-10 h-10 mx-auto text-amber-300" />
                <div className="text-xs uppercase tracking-wider font-semibold opacity-80">
                  Kết quả kiểm tra
                </div>
                <div className="text-4xl font-black">
                  {finalScore} <span className="text-lg font-normal opacity-80">/ 10.0</span>
                </div>
                <p className="text-xs opacity-90">
                  {finalScore >= 8
                    ? 'Xuất sắc! Bạn nắm rất vững kiến thức Toán 9.'
                    : finalScore >= 6.5
                    ? 'Khá tốt! Hãy xem lại các câu sai để hoàn thiện kỹ năng.'
                    : 'Cần ôn tập thêm các dạng bài quan trọng.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If selecting from exam bank list
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-3">
            <GraduationCap className="w-4 h-4" /> Ngân Hàng Đề Thi Chuẩn GDPT 2018
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Phòng Thi & Khảo Sát Kiến Thức Toán 9
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Làm bài thi trực tuyến với đồng hồ đếm ngược, chấm điểm tự động, lời giải chi tiết và biểu điểm sư phạm.
          </p>
        </div>

        {(role === 'ADMIN' || role === 'TEACHER') && (
          <button
            onClick={() => setShowAddExamModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo đề thi thử mới</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 transition-all p-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                exam.type === 'ENTRANCE_10'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
              }`}>
                {exam.type === 'MID_TERM_1' ? 'Giữa HK1' :
                 exam.type === 'FINAL_1' ? 'Cuối HK1' :
                 exam.type === 'MID_TERM_2' ? 'Giữa HK2' :
                 exam.type === 'FINAL_2' ? 'Cuối HK2' : 'Tuyển sinh vào 10'}
              </span>

              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{exam.durationMinutes} phút</span>
              </div>
            </div>

            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white leading-snug">
              {exam.title}
            </h3>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">
              {exam.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>{exam.questions.length} câu hỏi</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Thang điểm 10</span>
            </div>

            <button
              onClick={() => handleStartExam(exam)}
              className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Vào phòng thi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal Add Trial Exam for Teacher/Admin */}
      <AddExamModal
        isOpen={showAddExamModal}
        onClose={() => setShowAddExamModal(false)}
      />
    </div>
  );
};
