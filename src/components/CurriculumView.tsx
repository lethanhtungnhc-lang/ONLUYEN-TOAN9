import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ListOrdered,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Chapter, Lesson, SpecialTopic } from '../types';
import { SPECIAL_TOPICS } from '../data/curriculumData';
import { MathView } from './MathView';
import { LessonDetailView } from './LessonDetailView';

export const CurriculumView: React.FC = () => {
  const { chapters, studentProgress } = useApp();
  const [selectedSemester, setSelectedSemester] = useState<1 | 2 | 'TOPICS'>(1);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [activeLesson, setActiveLesson] = useState<{ lesson: Lesson; chapter: Chapter } | null>(null);

  // If viewing a specific lesson
  if (activeLesson) {
    return (
      <LessonDetailView
        lesson={activeLesson.lesson}
        chapter={activeLesson.chapter}
        onBack={() => setActiveLesson(null)}
        onNextLesson={() => {
          const currentList = activeLesson.chapter.lessons;
          const currentIndex = currentList.findIndex(l => l.id === activeLesson.lesson.id);
          if (currentIndex < currentList.length - 1) {
            setActiveLesson({
              lesson: currentList[currentIndex + 1],
              chapter: activeLesson.chapter,
            });
          } else {
            setActiveLesson(null);
          }
        }}
      />
    );
  }

  const semesterChapters = chapters.filter(c => c.semester === selectedSemester);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-2">
          <BookOpen className="w-3.5 h-3.5" /> Chương Trình GDPT 2018
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Chương Trình Học Tập Toán 9 Toàn Diện
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Tổ chức khoa học theo 2 học kỳ, từng chương, bài học và chuyên đề ôn thi tuyển sinh vào lớp 10.
        </p>
      </div>

      {/* Semester Switcher Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-3 pb-2">
        <button
          onClick={() => { setSelectedSemester(1); setActiveChapter(null); }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            selectedSemester === 1
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Học kỳ I (Chương I - V)</span>
        </button>

        <button
          onClick={() => { setSelectedSemester(2); setActiveChapter(null); }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            selectedSemester === 2
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>Học kỳ II (Chương VI - X)</span>
        </button>

        <button
          onClick={() => { setSelectedSemester('TOPICS'); setActiveChapter(null); }}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
            selectedSemester === 'TOPICS'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>5 Chuyên đề Tuyển sinh vào 10</span>
        </button>
      </div>

      {/* CHAPTERS OF SELECTED SEMESTER */}
      {selectedSemester !== 'TOPICS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {semesterChapters.map((ch) => {
            const completedCount = ch.lessons.filter(l => studentProgress.completedLessons.includes(l.id)).length;
            const progressPct = ch.lessons.length > 0 ? Math.round((completedCount / ch.lessons.length) * 100) : 0;

            return (
              <div
                key={ch.id}
                className="flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 transition-all p-6"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Chương {ch.chapterNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {completedCount} / {ch.lessons.length} bài đã học ({progressPct}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full my-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {ch.title}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1">
                  {ch.summary}
                </p>

                {/* Lessons in Chapter */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Các bài học thành phần:
                  </div>
                  {ch.lessons.map((lesson) => {
                    const isDone = studentProgress.completedLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson({ lesson, chapter: ch })}
                        className="w-full p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/50 dark:bg-slate-800/40 text-left text-xs font-medium flex items-center justify-between transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" />
                          )}
                          <span className="truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {lesson.title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SPECIAL ENTRANCE 10 TOPICS */}
      {selectedSemester === 'TOPICS' && (
        <div className="space-y-6">
          {SPECIAL_TOPICS.map((topic, index) => (
            <div
              key={topic.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-extrabold text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {topic.title}
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold self-start sm:self-auto">
                  {topic.targetExam}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {topic.description}
              </p>

              {/* Methods */}
              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-2 text-xs">
                <div className="font-bold text-purple-900 dark:text-purple-300">
                  Phương pháp giải & Kỹ thuật then chốt:
                </div>
                <ul className="space-y-1 pl-4 list-disc text-slate-700 dark:text-slate-300">
                  {topic.keyMethods.map((m, mIdx) => (
                    <li key={mIdx}>{m}</li>
                  ))}
                </ul>
              </div>

              {/* Sample Problem */}
              {topic.sampleProblems.map((sp, pIdx) => (
                <div key={pIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-2 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">
                    Bài toán điển hình trong đề thi:
                  </div>
                  <div className="text-slate-800 dark:text-slate-200">
                    <MathView>{sp.problem}</MathView>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-blue-600 dark:text-blue-400">Hướng dẫn giải:</span>{' '}
                    <MathView>{sp.solution}</MathView>
                  </div>
                  <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                    💡 Bí quyết làm bài: {sp.tips}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
