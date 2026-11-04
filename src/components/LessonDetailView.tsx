import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Award,
  ChevronRight,
  Calculator,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Chapter } from '../types';
import { MathView } from './MathView';
import { useApp } from '../context/AppContext';

interface LessonDetailViewProps {
  lesson: Lesson;
  chapter: Chapter;
  onBack: () => void;
  onNextLesson?: () => void;
}

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lesson,
  chapter,
  onBack,
  onNextLesson,
}) => {
  const { markLessonComplete, studentProgress } = useApp();
  const [activeSection, setActiveSection] = useState<'THEORY' | 'EXAMPLES' | 'EXERCISES' | 'INTERACTIVE'>('THEORY');
  const isCompleted = studentProgress.completedLessons.includes(lesson.id);

  // Exercise reveal states
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (exId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [exId]: !prev[exId] }));
  };

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại {chapter.title.split(':')[0]}</span>
        </button>

        <button
          onClick={handleMarkComplete}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Đã hoàn thành bài học' : 'Đánh dấu đã học xong'}</span>
        </button>
      </div>

      {/* Lesson Title Header */}
      <div>
        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
          HỌC KỲ {chapter.semester} • {chapter.title}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {lesson.title}
        </h1>
      </div>

      {/* Internal Navigation Tabs (12 Standard SGK Elements) */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-2 pb-1">
        <button
          onClick={() => setActiveSection('THEORY')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap rounded-xl transition cursor-pointer ${
            activeSection === 'THEORY'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          1. Lý thuyết & Công thức
        </button>
        <button
          onClick={() => setActiveSection('EXAMPLES')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap rounded-xl transition cursor-pointer ${
            activeSection === 'EXAMPLES'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          2. Ví dụ có lời giải từng bước
        </button>
        <button
          onClick={() => setActiveSection('EXERCISES')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap rounded-xl transition cursor-pointer ${
            activeSection === 'EXERCISES'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          3. Bài tập phân cấp (Cơ bản - Vận dụng)
        </button>
      </div>

      {/* SECTION 1: THEORY & FORMULAS */}
      {activeSection === 'THEORY' && (
        <div className="space-y-6">
          
          {/* Objectives Box */}
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
            <h3 className="font-bold text-sm text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" /> Mục tiêu bài học cần đạt
            </h3>
            <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {lesson.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Key Remember Points */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600" /> Kiến thức trọng tâm cần ghi nhớ
            </h3>
            <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {lesson.rememberPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>

          {/* Theory Text */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Nội dung lý thuyết khoa học
            </h3>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <MathView>{lesson.theoryContent}</MathView>
            </div>
          </div>

          {/* Important Formulas */}
          {lesson.importantFormulas.length > 0 && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" /> Hệ thống công thức quan trọng
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lesson.importantFormulas.map((f, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <span className="text-xs font-semibold text-slate-500">{f.name}</span>
                    <div className="text-sm font-mono text-blue-600 dark:text-blue-400">
                      <MathView block formula={f.latex} />
                    </div>
                    {f.note && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        {f.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: EXAMPLES WITH STEP BY STEP SOLUTION */}
      {activeSection === 'EXAMPLES' && (
        <div className="space-y-6">
          {lesson.stepExamples.map((ex, idx) => (
            <div
              key={ex.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                  Ví dụ minh họa {idx + 1}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Chuẩn sư phạm
                </span>
              </div>

              <div className="font-semibold text-slate-900 dark:text-white text-sm">
                <MathView>{ex.problem}</MathView>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Các bước giải chi tiết:
                </div>
                {ex.solutionSteps.map((step, sIdx) => (
                  <div key={sIdx} className="leading-relaxed text-slate-600 dark:text-slate-300">
                    <MathView>{step}</MathView>
                  </div>
                ))}

                <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-emerald-700 dark:text-emerald-300">
                  {ex.result}
                </div>

                {ex.notes && (
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-[11px] mt-2">
                    <strong>Ghi chú:</strong> {ex.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: EXERCISES */}
      {activeSection === 'EXERCISES' && (
        <div className="space-y-6">
          {lesson.exercises.map((exe, idx) => {
            const isOpen = !!revealedSolutions[exe.id];
            return (
              <div
                key={exe.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Bài tập {idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      exe.type === 'BASIC' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                      exe.type === 'APPLIED' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                    }`}>
                      {exe.type === 'BASIC' ? 'Cơ bản' : exe.type === 'APPLIED' ? 'Vận dụng' : 'Vận dụng cao'}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleSolution(exe.id)}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {isOpen ? 'Ẩn hướng dẫn giải' : 'Xem đáp án & hướng dẫn giải'}
                  </button>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  <MathView>{exe.questionText}</MathView>
                </div>

                {isOpen && (
                  <div className="mt-3 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs text-slate-700 dark:text-slate-300 leading-relaxed animate-in fade-in duration-150">
                    <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                      Lời giải và kết luận:
                    </div>
                    <MathView>{exe.solution}</MathView>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom pagination */}
      {onNextLesson && (
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onNextLesson}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <span>Học bài học kế tiếp</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
