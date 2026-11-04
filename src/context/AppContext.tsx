import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chapter, Question, Exam, StudentProgress, Classroom } from '../types';
import { CHAPTERS_DATA } from '../data/curriculumData';
import { QUESTION_BANK } from '../data/questionBank';
import { EXAM_BANK } from '../data/examBank';

interface AppContextType {
  chapters: Chapter[];
  questions: Question[];
  exams: Exam[];
  classrooms: Classroom[];
  studentProgress: StudentProgress;
  darkMode: boolean;
  toggleDarkMode: () => void;
  // Progress actions
  markLessonComplete: (lessonId: string) => void;
  recordExerciseAttempt: (questionId: string, isCorrect: boolean, userAnswer: string, questionText: string, correctAnswer: string, explanation: string) => void;
  recordExamSubmission: (examId: string, examTitle: string, score: number, maxScore: number, timeSpentSeconds: number, wrongQuestionIds: string[]) => void;
  resolveMistake: (questionId: string) => void;
  // Admin & Content actions
  addQuestion: (q: Question) => void;
  updateQuestion: (q: Question) => void;
  deleteQuestion: (id: string) => void;
  addExam: (exam: Exam) => void;
  deleteExam: (id: string) => void;
  updateLessonContent: (chapterId: string, lessonId: string, updatedFields: Partial<Chapter['lessons'][0]>) => void;
  // Teacher actions
  createClassroom: (name: string, grade: number) => void;
  assignExamToClass: (classroomId: string, examId: string, dueDate: string) => void;
  // Backup & Restore
  exportBackupData: () => string;
  importBackupData: (jsonData: string) => boolean;
  resetToDefaultData: () => void;
}

const INITIAL_PROGRESS: StudentProgress = {
  userId: 'user-student',
  completedLessons: ['bai-1', 'bai-7', 'bai-11'],
  completedExercisesCount: 18,
  averageScore: 8.5,
  correctAnswersCount: 15,
  totalAnswersCount: 18,
  chapterProgress: {
    'chuong-1': 65,
    'chuong-2': 30,
    'chuong-3': 50,
    'chuong-4': 75,
    'chuong-5': 20,
    'chuong-6': 40,
    'chuong-9': 15,
    'chuong-10': 0,
  },
  weakTopics: ['Phương trình chứa ẩn ở mẫu', 'Đổi chiều bất đẳng thức khi nhân số âm'],
  examHistory: [
    {
      id: 'hist-1',
      examId: 'exam-gk1',
      examTitle: 'Đề kiểm tra Giữa Học kỳ I – Môn Toán 9',
      score: 8.75,
      maxScore: 10,
      completedAt: '2026-10-28',
      timeSpentSeconds: 2450,
      wrongQuestionIds: ['qb-c1-03'],
    },
  ],
  mistakeNotebook: [
    {
      questionId: 'qb-c1-03',
      questionText: 'Cho hệ phương trình mx + y = 3 và 4x + my = 6. Hệ phương trình vô nghiệm khi m nhận giá trị...',
      userAnswer: 'm = ±2',
      correctAnswer: 'm = -2',
      explanation: 'Khi m = 2, hai đường thẳng trùng nhau dẫn đến vô số nghiệm chứ không phải vô nghiệm!',
      failedAt: '2026-10-28',
      resolved: false,
    },
    {
      questionId: 'qb-c3-02',
      questionText: 'Biểu thức căn(-5 / (2x - 4)) xác định khi và chỉ khi...',
      userAnswer: 'x <= 2',
      correctAnswer: 'x < 2',
      explanation: 'Mẫu thức 2x - 4 phải khác 0 nên không thể lấy dấu bằng.',
      failedAt: '2026-10-30',
      resolved: false,
    },
  ],
  badges: [
    {
      id: 'badge-gold-1',
      title: 'Huy chương Vàng Đại số',
      description: 'Đạt điểm 10 tuyệt đối chuyên đề Rút gọn căn thức & Hệ phương trình',
      icon: '🥇',
      unlockedAt: '2026-10-15',
    },
    {
      id: 'badge-silver-1',
      title: 'Huy chương Bạc Hình học',
      description: 'Chứng minh tứ giác nội tiếp và tiếp tuyến đường tròn xuất sắc',
      icon: '🥈',
      unlockedAt: '2026-10-22',
    },
    {
      id: 'badge-bronze-1',
      title: 'Huy chương Đồng Tốc độ',
      description: 'Hoàn thành 12 câu trắc nghiệm đúng 100% trong thời gian siêu tốc',
      icon: '🥉',
      unlockedAt: '2026-10-28',
    },
    {
      id: 'badge-trophy-1',
      title: 'Cúp Chiến binh Vào 10',
      description: 'Vượt qua bài thi thử tuyển sinh vào lớp 10 với xếp loại Giỏi',
      icon: '🏆',
      unlockedAt: '2026-11-01',
    },
    {
      id: 'badge-crown-1',
      title: 'Vương miện Chăm chỉ',
      description: 'Duy trì chuỗi học tập liên tục 24 ngày không nghỉ',
      icon: '👑',
      unlockedAt: '2026-11-03',
    },
    {
      id: 'badge-star-1',
      title: 'Ngôi sao Cực trị Cauchy',
      description: 'Chinh phục trọn vẹn câu điểm 10 Bất đẳng thức nâng cao',
      icon: '⭐',
      unlockedAt: '2026-11-04',
    },
  ],
};

const INITIAL_CLASSROOMS: Classroom[] = [
  {
    id: 'class-9a1',
    name: 'Lớp 9A1 – Chuyên đề Nâng cao',
    grade: 9,
    teacherId: 'user-teacher',
    studentCount: 38,
    assignedExams: [
      {
        examId: 'exam-gk1',
        examTitle: 'Đề kiểm tra Giữa Học kỳ I – Môn Toán 9',
        dueDate: '2026-11-15',
        status: 'ACTIVE',
      },
      {
        examId: 'exam-tuyensinh10',
        examTitle: 'Đề khảo sát Tuyển sinh vào Lớp 10',
        dueDate: '2026-12-01',
        status: 'ACTIVE',
      },
    ],
  },
  {
    id: 'class-9a2',
    name: 'Lớp 9A2 – Ôn luyện Chuẩn kiến thức',
    grade: 9,
    teacherId: 'user-teacher',
    studentCount: 42,
    assignedExams: [
      {
        examId: 'exam-gk1',
        examTitle: 'Đề kiểm tra Giữa Học kỳ I – Môn Toán 9',
        dueDate: '2026-11-20',
        status: 'ACTIVE',
      },
    ],
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('toan9_theme');
      return stored ? stored === 'dark' : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('toan9_theme', darkMode ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Chapters data
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    try {
      const stored = localStorage.getItem('toan9_chapters');
      return stored ? JSON.parse(stored) : CHAPTERS_DATA;
    } catch {
      return CHAPTERS_DATA;
    }
  });

  // Questions bank data
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const stored = localStorage.getItem('toan9_questions');
      return stored ? JSON.parse(stored) : QUESTION_BANK;
    } catch {
      return QUESTION_BANK;
    }
  });

  // Exams data
  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const stored = localStorage.getItem('toan9_exams');
      return stored ? JSON.parse(stored) : EXAM_BANK;
    } catch {
      return EXAM_BANK;
    }
  });

  // Classrooms data
  const [classrooms, setClassrooms] = useState<Classroom[]>(() => {
    try {
      const stored = localStorage.getItem('toan9_classrooms');
      return stored ? JSON.parse(stored) : INITIAL_CLASSROOMS;
    } catch {
      return INITIAL_CLASSROOMS;
    }
  });

  // Student progress
  const [studentProgress, setStudentProgress] = useState<StudentProgress>(() => {
    try {
      const stored = localStorage.getItem('toan9_progress');
      return stored ? JSON.parse(stored) : INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('toan9_chapters', JSON.stringify(chapters));
    } catch (e) { console.error(e); }
  }, [chapters]);

  useEffect(() => {
    try {
      localStorage.setItem('toan9_questions', JSON.stringify(questions));
    } catch (e) { console.error(e); }
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem('toan9_exams', JSON.stringify(exams));
    } catch (e) { console.error(e); }
  }, [exams]);

  useEffect(() => {
    try {
      localStorage.setItem('toan9_classrooms', JSON.stringify(classrooms));
    } catch (e) { console.error(e); }
  }, [classrooms]);

  useEffect(() => {
    try {
      localStorage.setItem('toan9_progress', JSON.stringify(studentProgress));
    } catch (e) { console.error(e); }
  }, [studentProgress]);

  // Actions
  const markLessonComplete = (lessonId: string) => {
    setStudentProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const recordExerciseAttempt = (
    questionId: string,
    isCorrect: boolean,
    userAnswer: string,
    questionText: string,
    correctAnswer: string,
    explanation: string
  ) => {
    setStudentProgress((prev) => {
      const totalAnswersCount = prev.totalAnswersCount + 1;
      const correctAnswersCount = prev.correctAnswersCount + (isCorrect ? 1 : 0);
      const averageScore = Number(((correctAnswersCount / totalAnswersCount) * 10).toFixed(1));

      let updatedNotebook = [...prev.mistakeNotebook];
      if (!isCorrect) {
        // Add to notebook if not already there
        const exists = updatedNotebook.some((m) => m.questionId === questionId && !m.resolved);
        if (!exists) {
          updatedNotebook.unshift({
            questionId,
            questionText,
            userAnswer,
            correctAnswer,
            explanation,
            failedAt: new Date().toISOString().split('T')[0],
            resolved: false,
          });
        }
      }

      return {
        ...prev,
        completedExercisesCount: prev.completedExercisesCount + 1,
        totalAnswersCount,
        correctAnswersCount,
        averageScore,
        mistakeNotebook: updatedNotebook,
      };
    });
  };

  const recordExamSubmission = (
    examId: string,
    examTitle: string,
    score: number,
    maxScore: number,
    timeSpentSeconds: number,
    wrongQuestionIds: string[]
  ) => {
    setStudentProgress((prev) => {
      const newHistoryItem = {
        id: `sub-${Date.now()}`,
        examId,
        examTitle,
        score,
        maxScore,
        completedAt: new Date().toISOString().split('T')[0],
        timeSpentSeconds,
        wrongQuestionIds,
      };
      return {
        ...prev,
        examHistory: [newHistoryItem, ...prev.examHistory],
      };
    });
  };

  const resolveMistake = (questionId: string) => {
    setStudentProgress((prev) => ({
      ...prev,
      mistakeNotebook: prev.mistakeNotebook.map((m) =>
        m.questionId === questionId ? { ...m, resolved: true } : m
      ),
    }));
  };

  const addQuestion = (q: Question) => {
    setQuestions((prev) => [q, ...prev]);
  };

  const updateQuestion = (q: Question) => {
    setQuestions((prev) => prev.map((item) => (item.id === q.id ? q : item)));
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((item) => item.id !== id));
  };

  const addExam = (exam: Exam) => {
    setExams((prev) => [exam, ...prev]);
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((item) => item.id !== id));
  };

  const updateLessonContent = (
    chapterId: string,
    lessonId: string,
    updatedFields: Partial<Chapter['lessons'][0]>
  ) => {
    setChapters((prev) =>
      prev.map((c) => {
        if (c.id !== chapterId) return c;
        return {
          ...c,
          lessons: c.lessons.map((l) => (l.id === lessonId ? { ...l, ...updatedFields } : l)),
        };
      })
    );
  };

  const createClassroom = (name: string, grade: number) => {
    const newClass: Classroom = {
      id: `class-${Date.now()}`,
      name,
      grade,
      teacherId: 'user-teacher',
      studentCount: 0,
      assignedExams: [],
    };
    setClassrooms((prev) => [...prev, newClass]);
  };

  const assignExamToClass = (classroomId: string, examId: string, dueDate: string) => {
    const exam = exams.find((e) => e.id === examId);
    if (!exam) return;
    setClassrooms((prev) =>
      prev.map((c) => {
        if (c.id !== classroomId) return c;
        return {
          ...c,
          assignedExams: [
            ...c.assignedExams,
            {
              examId,
              examTitle: exam.title,
              dueDate,
              status: 'ACTIVE',
            },
          ],
        };
      })
    );
  };

  // Full backup and restore
  const exportBackupData = (): string => {
    const backup = {
      exportDate: new Date().toISOString(),
      author: 'Teacher Lê Thanh Tùng',
      version: '1.0',
      chapters,
      questions,
      exams,
      classrooms,
      studentProgress,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importBackupData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (data.chapters && data.questions && data.exams) {
        setChapters(data.chapters);
        setQuestions(data.questions);
        setExams(data.exams);
        if (data.classrooms) setClassrooms(data.classrooms);
        if (data.studentProgress) setStudentProgress(data.studentProgress);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Backup import error', e);
      return false;
    }
  };

  const resetToDefaultData = () => {
    setChapters(CHAPTERS_DATA);
    setQuestions(QUESTION_BANK);
    setExams(EXAM_BANK);
    setClassrooms(INITIAL_CLASSROOMS);
    setStudentProgress(INITIAL_PROGRESS);
    localStorage.removeItem('toan9_chapters');
    localStorage.removeItem('toan9_questions');
    localStorage.removeItem('toan9_exams');
    localStorage.removeItem('toan9_classrooms');
    localStorage.removeItem('toan9_progress');
  };

  return (
    <AppContext.Provider
      value={{
        chapters,
        questions,
        exams,
        classrooms,
        studentProgress,
        darkMode,
        toggleDarkMode,
        markLessonComplete,
        recordExerciseAttempt,
        recordExamSubmission,
        resolveMistake,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        addExam,
        deleteExam,
        updateLessonContent,
        createClassroom,
        assignExamToClass,
        exportBackupData,
        importBackupData,
        resetToDefaultData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
