export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  username: string; // Tên đăng nhập
  email: string;
  password?: string; // Mật khẩu tài khoản (dành cho cấp lại/hiển thị Admin nếu có)
  passwordHash?: string; // Mã băm mật khẩu bảo mật (Salted SHA-256)
  salt?: string; // Chuỗi muối ngẫu nhiên chống Rainbow table
  role: Role;
  avatar?: string;
  school?: string;
  className?: string;
  createdAt: string;
  isLocked?: boolean; // Trạng thái khóa tài khoản bởi Admin
  lockedReason?: string; // Lý do tài khoản bị tạm khóa
  lastLoginAt?: string; // Thời điểm đăng nhập thành công gần nhất
  sessionToken?: string; // Token xác thực phiên đăng nhập an toàn
  tokenExpiresAt?: number; // Thời gian hết hạn phiên đăng nhập (timestamp ms)
  mustChangePassword?: boolean; // Bắt buộc đổi mật khẩu lần đầu đăng nhập trên web/app di động
  passwordChangedAt?: string; // Thời điểm hoàn thành đổi mật khẩu cá nhân
}

export type CognitiveLevel = 'NHAN_BIET' | 'THONG_HIEU' | 'VAN_DUNG' | 'VAN_DUNG_CAO';

export type QuestionType = 
  | 'MULTIPLE_CHOICE' 
  | 'TRUE_FALSE' 
  | 'FILL_IN' 
  | 'MATCHING' 
  | 'SHORT_ANSWER' 
  | 'ESSAY';

export interface Question {
  id: string;
  chapterId: string;
  lessonId?: string;
  title: string;
  type: QuestionType;
  level: CognitiveLevel;
  points: number;
  options?: string[]; // For multiple choice
  matchingPairs?: { left: string; right: string }[]; // For matching
  correctAnswer: string | number | boolean | Record<string, string>;
  stepByStepSolution: {
    title: string;
    content: string;
  }[];
  formulasUsed: string[];
  commonMistakes?: string;
  quickTips?: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  lessonNumber: number;
  title: string;
  objectives: string[];
  rememberPoints: string[];
  theoryContent: string;
  importantFormulas: {
    name: string;
    latex: string;
    note?: string;
  }[];
  stepExamples: {
    id: string;
    problem: string;
    solutionSteps: string[];
    result: string;
    notes?: string;
  }[];
  exercises: {
    id: string;
    type: 'BASIC' | 'APPLIED' | 'ADVANCED';
    questionText: string;
    solution: string;
  }[];
  interactiveQuestions: Question[];
}

export interface Chapter {
  id: string;
  semester: 1 | 2;
  chapterNumber: number;
  title: string;
  summary: string;
  objectives: string[];
  coreKnowledge: string[];
  keyFormulas: {
    name: string;
    latex: string;
    note?: string;
  }[];
  mindmapPoints: string[];
  lessons: Lesson[];
}

export interface SpecialTopic {
  id: string;
  title: string;
  description: string;
  targetExam: string;
  keyMethods: string[];
  sampleProblems: {
    problem: string;
    solution: string;
    tips: string;
  }[];
}

export interface Exam {
  id: string;
  title: string;
  type: 'REGULAR' | 'MID_TERM_1' | 'FINAL_1' | 'MID_TERM_2' | 'FINAL_2' | 'ENTRANCE_10' | 'CHAPTER';
  durationMinutes: number;
  totalPoints: number;
  questions: Question[];
  semester?: 1 | 2;
  chapterId?: string;
  author: string;
  description: string;
}

export interface MatrixItem {
  id: string;
  topic: string;
  nhanBietTN: number;
  nhanBietTL: number;
  thongHieuTN: number;
  thongHieuTL: number;
  vanDungTN: number;
  vanDungTL: number;
  vanDungCaoTN: number;
  vanDungCaoTL: number;
  totalPoints: number;
  percentage: number;
}

export interface SpecificationItem {
  id: string;
  topic: string;
  knowledgeUnit: string;
  learningOutcomes: string;
  cognitiveLevel: CognitiveLevel;
  questionFormat: 'TN' | 'TL';
  questionCount: number;
  pointsPerQuestion: number;
}

export interface StudentProgress {
  userId: string;
  completedLessons: string[]; // lessonIds
  completedExercisesCount: number;
  averageScore: number;
  correctAnswersCount: number;
  totalAnswersCount: number;
  chapterProgress: Record<string, number>; // chapterId -> percentage (0 - 100)
  weakTopics: string[];
  examHistory: {
    id: string;
    examId: string;
    examTitle: string;
    score: number;
    maxScore: number;
    completedAt: string;
    timeSpentSeconds: number;
    wrongQuestionIds: string[];
  }[];
  mistakeNotebook: {
    questionId: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
    failedAt: string;
    resolved: boolean;
  }[];
  badges: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
  }[];
}

export interface Classroom {
  id: string;
  name: string;
  grade: number;
  teacherId: string;
  studentCount: number;
  assignedExams: {
    examId: string;
    examTitle: string;
    dueDate: string;
    status: 'ACTIVE' | 'EXPIRED';
  }[];
}

export interface GameScore {
  id: string;
  gameId: string;
  gameTitle: string;
  playerName: string;
  score: number;
  accuracy: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  timestamp: string;
}

export interface CustomExamConfig {
  title: string;
  durationMinutes: number;
  questionCount: number;
  selectedChapterIds: string[];
  ratio: {
    nhanBiet: number;
    thongHieu: number;
    vanDung: number;
    vanDungCao: number;
  };
  format: '100_TN' | '70_TN_30_TL' | '100_TL';
}

export interface UploadedDocument {
  id: string;
  title: string;
  category: 'EXAM_PAPER' | 'MATRIX_SPEC' | 'REVIEW_TOPIC' | 'SYLLABUS' | 'LESSON_PLAN' | 'EXAM' | 'MATRIX' | 'SPECIFICATION';
  fileName: string;
  fileSize: string;
  fileType: string;
  description?: string;
  dataUrl?: string;
  contentPreview?: string;
  uploadedBy: string;
  uploadedAt: string;
  assignedClass?: string;
  note?: string;
}

