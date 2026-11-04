import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CurriculumView } from './components/CurriculumView';
import { PracticeView } from './components/PracticeView';
import { ReviewView } from './components/ReviewView';
import { ExamRoom } from './components/ExamRoom';
import { MatrixSpecGenerator } from './components/MatrixSpecGenerator';
import { StepByStepSolver } from './components/StepByStepSolver';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherPanel } from './components/TeacherPanel';
import { AdminPanel } from './components/AdminPanel';
import { AuthModal } from './components/AuthModal';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { MathGames3D } from './components/MathGames3D';
import {
  Home,
  BookOpen,
  Layers,
  GraduationCap,
  User,
  Calculator,
  FileSpreadsheet,
  Gamepad2
} from 'lucide-react';

const MainApp: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState<boolean>(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const { role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenChangePassword={() => setChangePasswordModalOpen(true)}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 lg:pb-0">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={setCurrentTab}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenDownloadModal={() => setDownloadModalOpen(true)}
          />
        )}

        {currentTab === 'curriculum' && <CurriculumView />}

        {currentTab === 'practice' && <PracticeView />}

        {currentTab === 'review' && (
          <ReviewView
            onNavigateToExam={() => setCurrentTab('exams')}
            onNavigateToPractice={() => setCurrentTab('practice')}
          />
        )}

        {currentTab === 'games' && <MathGames3D />}

        {currentTab === 'exams' && <ExamRoom />}

        {currentTab === 'matrix' && <MatrixSpecGenerator />}

        {currentTab === 'solver' && <StepByStepSolver />}

        {currentTab === 'dashboard' && (
          <>
            {role === 'ADMIN' && <AdminPanel />}
            {role === 'TEACHER' && <TeacherPanel />}
            {role === 'STUDENT' && (
              <StudentDashboard onNavigateToReview={() => setCurrentTab('review')} />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Thumb Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around no-print">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition cursor-pointer ${
            currentTab === 'home' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Trang chủ</span>
        </button>

        <button
          onClick={() => setCurrentTab('curriculum')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition cursor-pointer ${
            currentTab === 'curriculum' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bài học</span>
        </button>

        <button
          onClick={() => setCurrentTab('practice')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition cursor-pointer ${
            currentTab === 'practice' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Luyện tập</span>
        </button>

        <button
          onClick={() => setCurrentTab('games')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition cursor-pointer ${
            currentTab === 'games' ? 'text-amber-500 font-bold' : 'text-slate-500'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Game 3D</span>
        </button>

        <button
          onClick={() => setCurrentTab('exams')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition cursor-pointer ${
            currentTab === 'exams' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Thi thử</span>
        </button>

        <button
          onClick={() => setCurrentTab('solver')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition cursor-pointer ${
            currentTab === 'solver' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Giải toán</span>
        </button>

        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-medium transition cursor-pointer ${
            currentTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Cá nhân</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
      />

      {/* Smartphone App Download Modal */}
      <AppDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AuthProvider>
  );
}
