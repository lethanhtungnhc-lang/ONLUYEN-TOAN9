import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Filter,
  Layers,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { MathView } from './MathView';
import { Question, CognitiveLevel, QuestionType } from '../types';

export const PracticeView: React.FC = () => {
  const { questions, chapters, recordExerciseAttempt } = useApp();
  
  // Filters
  const [selectedChapter, setSelectedChapter] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const filteredQuestions = React.useMemo(() => {
    return questions.filter((q) => {
      const matchChapter = selectedChapter === 'ALL' || q.chapterId === selectedChapter;
      const matchLevel = selectedLevel === 'ALL' || q.level === selectedLevel;
      return matchChapter && matchLevel;
    });
  }, [questions, selectedChapter, selectedLevel]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentQ: Question | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // User input states
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [fillInAnswer, setFillInAnswer] = useState<string>('');
  const [essayAnswer, setEssayAnswer] = useState<string>('');
  const [trueFalseAnswer, setTrueFalseAnswer] = useState<string>('');

  // Submission state
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const resetInputs = () => {
    setSelectedOption('');
    setFillInAnswer('');
    setEssayAnswer('');
    setTrueFalseAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetInputs();
    } else {
      setCurrentIndex(0);
      resetInputs();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetInputs();
    }
  };

  const handleCheckAnswer = () => {
    if (!currentQ || isAnswered) return;

    let userAns = '';
    let correct = false;

    if (currentQ.type === 'MULTIPLE_CHOICE') {
      userAns = selectedOption;
      correct = selectedOption.trim() === String(currentQ.correctAnswer).trim();
    } else if (currentQ.type === 'TRUE_FALSE') {
      userAns = trueFalseAnswer;
      correct = trueFalseAnswer.trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    } else if (currentQ.type === 'FILL_IN' || currentQ.type === 'SHORT_ANSWER') {
      userAns = fillInAnswer.trim();
      correct = fillInAnswer.trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    } else if (currentQ.type === 'ESSAY') {
      userAns = essayAnswer.trim();
      correct = essayAnswer.trim().length > 5; // Self-evaluated essay completion
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    // Record to persistent student notebook
    recordExerciseAttempt(
      currentQ.id,
      correct,
      userAns,
      currentQ.title,
      String(currentQ.correctAnswer),
      currentQ.stepByStepSolution.map(s => `${s.title}: ${s.content}`).join(' | ')
    );
  };

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Không tìm thấy câu hỏi phù hợp</h3>
        <p className="text-xs text-slate-500 mt-1">Vui lòng điều chỉnh lại bộ lọc chương hoặc mức độ nhận thức.</p>
        <button
          onClick={() => { setSelectedChapter('ALL'); setSelectedLevel('ALL'); }}
          className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Đặt lại bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" /> Luyện Tập Tương Tác Đa Dạng
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Trắc nghiệm, Đúng/Sai, Điền số & Tự luận kèm phân tích sai lầm và phương pháp giải nhanh.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedChapter}
            onChange={(e) => { setSelectedChapter(e.target.value); setCurrentIndex(0); resetInputs(); }}
            className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="ALL">Tất cả các chương</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title.split(':')[0]}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => { setSelectedLevel(e.target.value); setCurrentIndex(0); resetInputs(); }}
            className="text-xs px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
          >
            <option value="ALL">Mọi mức độ</option>
            <option value="NHAN_BIET">Nhận biết</option>
            <option value="THONG_HIEU">Thông hiểu</option>
            <option value="VAN_DUNG">Vận dụng</option>
            <option value="VAN_DUNG_CAO">Vận dụng cao</option>
          </select>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Meta badges & Counter */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Câu {currentIndex + 1} / {filteredQuestions.length}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
              currentQ.level === 'NHAN_BIET' ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
              currentQ.level === 'THONG_HIEU' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
              currentQ.level === 'VAN_DUNG' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
              'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {currentQ.level === 'NHAN_BIET' ? 'Nhận biết' :
               currentQ.level === 'THONG_HIEU' ? 'Thông hiểu' :
               currentQ.level === 'VAN_DUNG' ? 'Vận dụng' : 'Vận dụng cao'}
            </span>
            <span className="text-[11px] text-slate-400">
              {currentQ.type === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm 4 lựa chọn' :
               currentQ.type === 'TRUE_FALSE' ? 'Đúng / Sai' :
               currentQ.type === 'FILL_IN' ? 'Điền kết quả' : 'Tự luận giải từng bước'}
            </span>
          </div>

          <span className="text-xs font-bold text-slate-500">
            {currentQ.points} điểm
          </span>
        </div>

        {/* Question Content */}
        <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
          <MathView>{currentQ.title}</MathView>
        </div>

        {/* Interactive Answer Input Area */}
        <div className="pt-2">
          {/* MULTIPLE CHOICE */}
          {currentQ.type === 'MULTIPLE_CHOICE' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, i) => {
                const optLetter = String.fromCharCode(65 + i);
                const isSelected = selectedOption === opt;
                let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-blue-400 bg-white dark:bg-slate-800';

                if (isAnswered) {
                  if (opt === currentQ.correctAnswer) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500';
                }

                return (
                  <button
                    key={i}
                    disabled={isAnswered}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700/60 font-bold text-xs flex items-center justify-center shrink-0">
                      {optLetter}
                    </span>
                    <span className="flex-1">
                      <MathView>{opt}</MathView>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* TRUE / FALSE */}
          {currentQ.type === 'TRUE_FALSE' && (
            <div className="flex gap-4">
              {['Đúng', 'Sai'].map((val) => (
                <button
                  key={val}
                  disabled={isAnswered}
                  onClick={() => setTrueFalseAnswer(val)}
                  className={`flex-1 py-3 rounded-xl border text-sm font-bold transition cursor-pointer ${
                    trueFalseAnswer === val
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          )}

          {/* FILL IN */}
          {(currentQ.type === 'FILL_IN' || currentQ.type === 'SHORT_ANSWER') && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Nhập kết quả số hoặc biểu thức của bạn:
              </label>
              <input
                type="text"
                disabled={isAnswered}
                value={fillInAnswer}
                onChange={(e) => setFillInAnswer(e.target.value)}
                placeholder="Ví dụ: 5 hoặc 1/2..."
                className="w-full sm:w-80 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          {/* ESSAY */}
          {currentQ.type === 'ESSAY' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Nhập tóm tắt các bước giải hoặc kết quả rút gọn của bạn:
              </label>
              <textarea
                rows={3}
                disabled={isAnswered}
                value={essayAnswer}
                onChange={(e) => setEssayAnswer(e.target.value)}
                placeholder="Trình bày lời giải hoặc kết quả cuối cùng..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Action Button: Kiểm tra / Nộp bài */}
        {!isAnswered ? (
          <button
            onClick={handleCheckAnswer}
            disabled={
              (currentQ.type === 'MULTIPLE_CHOICE' && !selectedOption) ||
              (currentQ.type === 'TRUE_FALSE' && !trueFalseAnswer) ||
              ((currentQ.type === 'FILL_IN' || currentQ.type === 'SHORT_ANSWER') && !fillInAnswer) ||
              (currentQ.type === 'ESSAY' && !essayAnswer)
            }
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            Kiểm tra đáp án
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-2"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={resetInputs}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Làm lại câu này
            </button>
          </div>
        )}

        {/* Detailed Feedback & Step-by-Step Explanation */}
        {isAnswered && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
            {/* Status Alert */}
            <div className={`p-4 rounded-xl flex items-start gap-3 border ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-900'
            }`}>
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-sm">
                  {isCorrect ? 'Chính xác! Bạn đã trả lời đúng.' : 'Chưa chính xác! Hãy đối chiếu lời giải chi tiết dưới đây.'}
                </div>
                <div className="text-xs mt-1">
                  Đáp án chuẩn xác:{' '}
                  <span className="font-bold underline">
                    <MathView>{String(currentQ.correctAnswer)}</MathView>
                  </span>
                </div>
              </div>
            </div>

            {/* Step-by-step Solution */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs space-y-3">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                <BookOpen className="w-4 h-4 text-blue-600" /> Lời giải chi tiết từng bước:
              </div>

              <div className="space-y-2 pl-2 border-l-2 border-blue-500">
                {currentQ.stepByStepSolution.map((s, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">• {s.title}:</div>
                    <div className="text-slate-700 dark:text-slate-300 pl-2">
                      <MathView>{s.content}</MathView>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formulas applied */}
              {currentQ.formulasUsed && currentQ.formulasUsed.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Kiến thức / Công thức vận dụng:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentQ.formulasUsed.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono text-[11px]">
                        <MathView>{f}</MathView>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Common mistakes to avoid */}
              {currentQ.commonMistakes && (
                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900/40 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Lỗi sai học sinh thường gặp:</span> {currentQ.commonMistakes}
                  </div>
                </div>
              )}

              {/* Quick tips */}
              {currentQ.quickTips && (
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Phương pháp giải nhanh:</span> {currentQ.quickTips}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Navigation between questions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            ← Câu trước
          </button>

          <span className="text-slate-400">
            {currentIndex + 1} / {filteredQuestions.length} câu
          </span>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredQuestions.length - 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Câu kế tiếp →
          </button>
        </div>
      </div>
    </div>
  );
};
