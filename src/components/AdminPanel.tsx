import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  BookOpen,
  FileQuestion,
  GraduationCap,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  Layers,
  BarChart3,
  Printer,
  FileSpreadsheet,
  AlertCircle,
  TrendingUp,
  FileUp,
  KeyRound,
  Eye,
  EyeOff,
  Search,
  X,
  ShieldCheck,
  Pencil
} from 'lucide-react';
import { ChangePasswordModal } from './ChangePasswordModal';
import { AddExamModal } from './AddExamModal';
import { exportStudentsToXLSX, StudentExportData } from '../utils/excelExport';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Role, Question, QuestionType, CognitiveLevel } from '../types';
import { MathView } from './MathView';

export const AdminPanel: React.FC = () => {
  const {
    chapters,
    questions,
    exams,
    studentProgress,
    addQuestion,
    deleteQuestion,
    exportBackupData,
    importBackupData,
    resetToDefaultData
  } = useApp();

  const {
    allUsers,
    deleteUser,
    updateUserRole,
    currentUser,
    role,
    toggleLockUser,
    adminResetPassword,
    createUserByAdmin,
    updateUserByAdmin,
    revokeUserSession,
    toggleRequirePasswordChange
  } = useAuth();

  // User management states
  const [showCreateUserModal, setShowCreateUserModal] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<Role>('STUDENT');
  const [newUserSchool, setNewUserSchool] = useState('');
  const [newUserClass, setNewUserClass] = useState('');
  const [createUserStatus, setCreateUserStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [resetPasswordTarget, setResetPasswordTarget] = useState<any | null>(null);
  const [adminNewPass, setAdminNewPass] = useState('');
  const [resetPassStatus, setResetPassStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [lockTarget, setLockTarget] = useState<any | null>(null);
  const [lockReason, setLockReason] = useState('Tạm khóa tài khoản theo chính sách bảo mật hoặc yêu cầu quản trị viên');

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'ALL' | Role>('ALL');
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => setActionNotification(null), 3500);
  };

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'USERS' | 'QUESTIONS' | 'REPORTS' | 'BACKUP'>('OVERVIEW');

  // New question form state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [qTitle, setQTitle] = useState('');
  const [qChapter, setQChapter] = useState('chuong-1');
  const [qType, setQType] = useState<QuestionType>('MULTIPLE_CHOICE');
  const [qLevel, setQLevel] = useState<CognitiveLevel>('NHAN_BIET');
  const [qPoints, setQPoints] = useState<number>(0.25);
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [qCorrect, setQCorrect] = useState('');
  const [qSolutionStep, setQSolutionStep] = useState('');

  // Bulk question import state
  const [showBulkImportModal, setShowBulkImportModal] = useState<boolean>(false);
  const [bulkImportText, setBulkImportText] = useState<string>('');
  const [bulkImportStatus, setBulkImportStatus] = useState<string>('');

  // Change password modal state
  const [showChangePassModal, setShowChangePassModal] = useState<boolean>(false);

  // Add exam modal state
  const [showAddExamModal, setShowAddExamModal] = useState<boolean>(false);

  // Admin password reveal toggle per user ID
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});
  const toggleRevealPassword = (id: string) => {
    setRevealedPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Backup file upload state
  const [backupStatus, setBackupStatus] = useState<string>('');

  // Stats calculation
  const totalStudents = allUsers.filter(u => u.role === 'STUDENT').length;
  const totalTeachers = allUsers.filter(u => u.role === 'TEACHER').length;
  let totalLessons = 0;
  chapters.forEach(c => totalLessons += c.lessons.length);

  // User Management Handlers
  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateUserStatus(null);
    if (!newUserName.trim() || !newUserUsername.trim() || !newUserPassword.trim() || !newUserEmail.trim()) {
      setCreateUserStatus({ type: 'error', text: 'Vui lòng điền đầy đủ họ tên, tên đăng nhập, email và mật khẩu.' });
      return;
    }
    const res = await createUserByAdmin(
      newUserName.trim(),
      newUserUsername.trim(),
      newUserEmail.trim(),
      newUserPassword.trim(),
      newUserRole,
      newUserSchool.trim() || 'THCS',
      newUserClass.trim() || undefined
    );
    if (res.success) {
      setCreateUserStatus({ type: 'success', text: res.message });
      setTimeout(() => {
        setShowCreateUserModal(false);
        setNewUserName('');
        setNewUserUsername('');
        setNewUserEmail('');
        setNewUserPassword('');
        setNewUserSchool('');
        setNewUserClass('');
        setCreateUserStatus(null);
      }, 900);
      showToast(`Đã tạo thành công tài khoản ${newUserUsername.trim()}`);
    } else {
      setCreateUserStatus({ type: 'error', text: res.message });
    }
  };

  const handleAdminResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPasswordTarget) return;
    if (!adminNewPass.trim() || adminNewPass.trim().length < 6) {
      setResetPassStatus({ type: 'error', text: 'Mật khẩu mới tối thiểu 6 ký tự.' });
      return;
    }
    const res = await adminResetPassword(resetPasswordTarget.id, adminNewPass.trim());
    if (res.success) {
      setResetPassStatus({ type: 'success', text: res.message });
      showToast(`Đã đặt lại mật khẩu cho ${resetPasswordTarget.username || resetPasswordTarget.name}`);
      setTimeout(() => {
        setResetPasswordTarget(null);
        setAdminNewPass('');
        setResetPassStatus(null);
      }, 1000);
    } else {
      setResetPassStatus({ type: 'error', text: res.message });
    }
  };

  const handleToggleLockSubmit = () => {
    if (!lockTarget) return;
    const isCurrentlyLocked = !!lockTarget.isLocked;
    toggleLockUser(lockTarget.id, isCurrentlyLocked ? undefined : lockReason.trim());
    showToast(isCurrentlyLocked ? `Đã mở khóa tài khoản ${lockTarget.name}` : `Đã khóa tài khoản ${lockTarget.name}`);
    setLockTarget(null);
  };

  const handleRevokeSession = (userId: string, userName: string) => {
    revokeUserSession(userId);
    showToast(`Đã thu hồi phiên đăng nhập của ${userName}. Người dùng phải đăng nhập lại.`);
  };

  // Edit user state and handlers
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<Role>('STUDENT');
  const [editSchool, setEditSchool] = useState('');
  const [editClass, setEditClass] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editIsLocked, setEditIsLocked] = useState(false);
  const [editLockedReason, setEditLockedReason] = useState('');
  const [editMustChangePass, setEditMustChangePass] = useState(false);
  const [editUserStatus, setEditUserStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleOpenEditUser = (u: any) => {
    setEditingUser(u);
    setEditName(u.name || '');
    setEditUsername(u.username || '');
    setEditEmail(u.email || '');
    setEditRole(u.role || 'STUDENT');
    setEditSchool(u.school || '');
    setEditClass(u.className || '');
    setEditPassword('');
    setEditIsLocked(!!u.isLocked);
    setEditLockedReason(u.lockedReason || '');
    setEditMustChangePass(!!u.mustChangePassword);
    setEditUserStatus(null);
  };

  const handleSaveEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!editName.trim() || !editUsername.trim() || !editEmail.trim()) {
      setEditUserStatus({ type: 'error', text: 'Vui lòng điền đủ họ tên, username và email.' });
      return;
    }

    const updates: any = {
      name: editName.trim(),
      username: editUsername.trim(),
      email: editEmail.trim(),
      role: editRole,
      school: editSchool.trim(),
      className: editClass.trim(),
      isLocked: editIsLocked,
      lockedReason: editIsLocked ? (editLockedReason.trim() || 'Tạm khóa bởi Admin') : undefined,
      mustChangePassword: editMustChangePass,
    };

    if (editPassword.trim()) {
      if (editPassword.trim().length < 6) {
        setEditUserStatus({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
        return;
      }
      await adminResetPassword(editingUser.id, editPassword.trim());
    }

    updateUserByAdmin(editingUser.id, updates);
    setEditUserStatus({ type: 'success', text: 'Cập nhật tài khoản thành công!' });
    showToast(`Đã lưu thay đổi cho tài khoản ${editUsername.trim()}`);
    setTimeout(() => {
      setEditingUser(null);
      setEditUserStatus(null);
    }, 1000);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTitle.trim() || !qCorrect.trim()) return;

    const newQ: Question = {
      id: `q-custom-${Date.now()}`,
      chapterId: qChapter,
      title: qTitle.trim(),
      type: qType,
      level: qLevel,
      points: Number(qPoints) || 0.25,
      options: qType === 'MULTIPLE_CHOICE' ? [optA, optB, optC, optD].filter(Boolean) : undefined,
      correctAnswer: qCorrect.trim(),
      stepByStepSolution: [
        {
          title: 'Lời giải chi tiết',
          content: qSolutionStep || 'Áp dụng các kiến thức chuẩn SGK Toán 9.',
        },
      ],
      formulasUsed: ['Toán 9 GDPT 2018'],
      commonMistakes: 'Đọc kỹ đề bài và điều kiện xác định.',
      quickTips: 'Thử lại kết quả sau khi tìm nghiệm.',
    };

    addQuestion(newQ);
    setShowAddQuestionModal(false);
    // Reset form
    setQTitle('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setQCorrect('');
    setQSolutionStep('');
  };

  const handleBulkImportQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkImportText.trim()) return;

    try {
      // First attempt JSON array parse
      const parsed = JSON.parse(bulkImportText.trim());
      if (Array.isArray(parsed)) {
        let count = 0;
        parsed.forEach((item: Partial<Question>) => {
          if (item.title && item.correctAnswer) {
            addQuestion({
              id: item.id || `q-imported-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              chapterId: item.chapterId || 'chuong-1',
              title: item.title,
              type: item.type || 'MULTIPLE_CHOICE',
              level: item.level || 'THONG_HIEU',
              points: item.points || 0.25,
              options: item.options || ['A', 'B', 'C', 'D'],
              correctAnswer: item.correctAnswer,
              stepByStepSolution: item.stepByStepSolution || [{ title: 'Lời giải chi tiết', content: 'Phương pháp giải chuẩn GDPT 2018.' }],
              formulasUsed: item.formulasUsed || ['GDPT 2018'],
              commonMistakes: item.commonMistakes || 'Đọc kỹ đề bài.',
              quickTips: item.quickTips || 'Kiểm tra lại nghiệm.'
            });
            count++;
          }
        });
        setBulkImportStatus(`Đã nhập thành công ${count} câu hỏi vào hệ thống!`);
        setTimeout(() => {
          setShowBulkImportModal(false);
          setBulkImportStatus('');
          setBulkImportText('');
        }, 1500);
        return;
      }
    } catch {
      // Fallback: parse Delimited format: Title | CorrectAnswer | Level | OptionA | OptionB | OptionC | OptionD
      const lines = bulkImportText.trim().split('\n');
      let count = 0;
      lines.forEach((line) => {
        const parts = line.split('|').map(s => s.trim());
        if (parts.length >= 2 && parts[0]) {
          const title = parts[0];
          const correctAnswer = parts[1];
          const level: CognitiveLevel = (parts[2] as CognitiveLevel) || 'THONG_HIEU';
          const options = parts.slice(3).filter(Boolean);
          addQuestion({
            id: `q-csv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            chapterId: 'chuong-1',
            title,
            type: options.length >= 2 ? 'MULTIPLE_CHOICE' : 'FILL_IN',
            level,
            points: 0.25,
            options: options.length >= 2 ? options : undefined,
            correctAnswer,
            stepByStepSolution: [{ title: 'Lời giải chi tiết', content: 'Phương pháp giải chuẩn GDPT 2018.' }],
            formulasUsed: ['Toán 9'],
            commonMistakes: 'Đọc kỹ yêu cầu đề bài.',
            quickTips: 'Thử lại bằng máy tính cầm tay.'
          });
          count++;
        }
      });
      if (count > 0) {
        setBulkImportStatus(`Đã nhập thành công ${count} câu hỏi từ dữ liệu bảng!`);
        setTimeout(() => {
          setShowBulkImportModal(false);
          setBulkImportStatus('');
          setBulkImportText('');
        }, 1500);
      } else {
        setBulkImportStatus('Không tìm thấy dữ liệu hợp lệ. Vui lòng kiểm tra định dạng.');
      }
    }
  };

  const handleExportComprehensiveReport = () => {
    const bom = "\uFEFF";
    let csv = bom + "BÁO CÁO TỔNG KẾT ĐÁNH GIÁ NĂNG LỰC HỌC SINH MÔN TOÁN 9\n";
    csv += "CHƯƠNG TRÌNH TOÁN 9 - CHUẨN THÔNG TƯ 22/2021/TT-BGDĐT\n";
    csv += `Thời gian xuất báo cáo: ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}\n`;
    csv += `Quản trị viên / Tác giả: Teacher Lê Thanh Tùng\n\n`;
    csv += "STT,Họ và tên,Email,Lớp,Điểm TB,Xếp loại Thông tư 22,Tiến độ hoàn thành,Chuyên đề cần củng cố\n";

    const sampleStudents = [
      { name: 'Trần Minh Đức', email: 'minhduc.hocsinh9@gmail.com', class: '9A1', avg: 8.75, grade: 'Tốt', progress: '85%', weak: 'Cực trị bất đẳng thức' },
      { name: 'Lê Hoàng Nam', email: 'hoangnam9a1@gmail.com', class: '9A1', avg: 8.2, grade: 'Tốt', progress: '78%', weak: 'Tham số m phương trình bậc hai' },
      { name: 'Nguyễn Thảo Linh', email: 'thaolinh.toan@gmail.com', class: '9A1', avg: 9.5, grade: 'Tốt', progress: '98%', weak: 'Không' },
      { name: 'Vũ Đức Anh', email: 'ducanh9a1@gmail.com', class: '9A1', avg: 5.2, grade: 'Đạt', progress: '58%', weak: 'Hệ thức Viète' },
      { name: 'Phạm Quỳnh Chi', email: 'quynhchi9@gmail.com', class: '9A2', avg: 9.0, grade: 'Tốt', progress: '92%', weak: 'Đường tròn ngoại tiếp tam giác' },
      { name: 'Nguyễn Văn Hùng', email: 'vanhung9b@gmail.com', class: '9A2', avg: 4.8, grade: 'Chưa đạt', progress: '42%', weak: 'Tứ giác nội tiếp' },
      { name: 'Trần Thị Mai', email: 'thimai9a2@gmail.com', class: '9A2', avg: 5.5, grade: 'Đạt', progress: '55%', weak: 'Rút gọn căn thức' }
    ];

    sampleStudents.forEach((st, i) => {
      csv += `${i + 1},"${st.name}","${st.email}","${st.class}",${st.avg},"${st.grade}","${st.progress}","${st.weak}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bao-cao-nang-luc-Toan-9-TT22-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportExcelReport = () => {
    const studentUsers = allUsers.filter(u => u.role === 'STUDENT');
    const defaultData: StudentExportData[] = [
      { stt: 1, fullName: 'Trần Minh Đức', username: 'hocsinh.minhduc', email: 'minhduc.hocsinh9@gmail.com', className: '9A1', school: 'THCS Lê Quý Đôn', avgScore: 8.75, rankTT22: 'Tốt', progress: '85%', weakTopics: 'Cực trị bất đẳng thức' },
      { stt: 2, fullName: 'Lê Hoàng Nam', username: 'lehoangnam9a1', email: 'hoangnam9a1@gmail.com', className: '9A1', school: 'THCS Giảng Võ', avgScore: 8.2, rankTT22: 'Tốt', progress: '78%', weakTopics: 'Tham số m phương trình bậc hai' },
      { stt: 3, fullName: 'Nguyễn Thảo Linh', username: 'nguyenthaolinh9a', email: 'thaolinh.toan@gmail.com', className: '9A1', school: 'THCS Giảng Võ', avgScore: 9.5, rankTT22: 'Tốt', progress: '98%', weakTopics: 'Không có (Nắm vững toàn bộ)' },
      { stt: 4, fullName: 'Vũ Đức Anh', username: 'vuducanh.toan9', email: 'ducanh9a1@gmail.com', className: '9A1', school: 'THCS Cầu Giấy', avgScore: 5.2, rankTT22: 'Đạt', progress: '58%', weakTopics: 'Hệ thức Viète' },
      { stt: 5, fullName: 'Phạm Quỳnh Chi', username: 'phamquynhchi9', email: 'quynhchi9@gmail.com', className: '9A2', school: 'THCS Trưng Vương', avgScore: 9.0, rankTT22: 'Tốt', progress: '92%', weakTopics: 'Đường tròn ngoại tiếp tam giác' },
      { stt: 6, fullName: 'Nguyễn Văn Hùng', username: 'nguyenvanhung9b', email: 'vanhung9b@gmail.com', className: '9A2', school: 'THCS Nguyễn Tri Phương', avgScore: 4.8, rankTT22: 'Chưa đạt', progress: '42%', weakTopics: 'Tứ giác nội tiếp' },
      { stt: 7, fullName: 'Trần Thị Mai', username: 'tranthimai9a2', email: 'thimai9a2@gmail.com', className: '9A2', school: 'THCS Nghĩa Tân', avgScore: 5.5, rankTT22: 'Đạt', progress: '55%', weakTopics: 'Rút gọn căn thức' }
    ];

    studentUsers.forEach((u) => {
      if (!defaultData.some(d => d.username.toLowerCase() === u.username.toLowerCase() || d.email.toLowerCase() === u.email.toLowerCase())) {
        defaultData.push({
          stt: defaultData.length + 1,
          fullName: u.name,
          username: u.username,
          email: u.email,
          className: u.className || 'Lớp 9',
          school: u.school || 'THCS',
          avgScore: 8.5,
          rankTT22: 'Tốt',
          progress: '70%',
          weakTopics: 'Cần củng cố hình học không gian'
        });
      }
    });

    const fileName = `Danh-sach-hoc-sinh-tham-gia-Toan-9-${new Date().toISOString().slice(0, 10)}.xlsx`;
    exportStudentsToXLSX(defaultData, fileName);
  };

  const handleExportBackup = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-toan9-chinhphuctrithuc-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setBackupStatus('Đã xuất tệp sao lưu dữ liệu JSON thành công!');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importBackupData(content);
      if (success) {
        setBackupStatus('Khôi phục dữ liệu từ tệp sao lưu thành công!');
      } else {
        setBackupStatus('Tệp sao lưu không hợp lệ. Vui lòng kiểm tra lại cấu trúc JSON.');
      }
    };
    reader.readAsText(file);
  };

  if (role !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Quyền truy cập bị giới hạn
        </h2>
        <p className="text-xs text-slate-500">
          Trang quản trị chỉ dành cho Quản trị viên hệ thống (Teacher Lê Thanh Tùng). Bạn có thể dùng menu chuyển vai trò ở góc trên để trải nghiệm.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 mb-2">
            <Lock className="w-3.5 h-3.5" /> Bảng Điều Khiển Quản Trị Viên (ADMIN)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Quản Trị Toàn Hệ Thống Toán 9
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Quản lý tài khoản, nội dung bài học, ngân hàng câu hỏi, đề thi và sao lưu khôi phục dữ liệu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowChangePassModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-semibold border border-purple-200 dark:border-purple-800 transition cursor-pointer"
            title="Đổi mật khẩu tài khoản quản trị viên admin (mặc định toan@13579)"
          >
            <KeyRound className="w-4 h-4 text-purple-600" /> Đổi mật khẩu admin
          </button>

          <button
            onClick={() => setShowBulkImportModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
          >
            <FileUp className="w-4 h-4 text-purple-600" /> Nhập câu hỏi hàng loạt
          </button>

          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Thêm câu hỏi
          </button>

          <button
            onClick={() => setShowAddExamModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" /> Tạo đề thi thử
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'OVERVIEW'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Tổng quan hệ thống
        </button>

        <button
          onClick={() => setActiveTab('USERS')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'USERS'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" /> Quản lý tài khoản ({allUsers.length})
        </button>

        <button
          onClick={() => setActiveTab('QUESTIONS')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'QUESTIONS'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileQuestion className="w-4 h-4" /> Ngân hàng câu hỏi ({questions.length})
        </button>

        <button
          onClick={() => setActiveTab('REPORTS')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'REPORTS'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Báo cáo & Thống kê TT22
        </button>

        <button
          onClick={() => setActiveTab('BACKUP')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'BACKUP'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Download className="w-4 h-4" /> Sao lưu & Phục hồi dữ liệu
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">Tổng tài khoản</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{allUsers.length}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">Học sinh</span>
              <div className="text-2xl font-extrabold text-blue-600">{totalStudents}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">Giáo viên</span>
              <div className="text-2xl font-extrabold text-emerald-600">{totalTeachers}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">Số chương học</span>
              <div className="text-2xl font-extrabold text-purple-600">{chapters.length}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">Số bài học SGK</span>
              <div className="text-2xl font-extrabold text-indigo-600">{totalLessons}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500">Đề kiểm tra</span>
              <div className="text-2xl font-extrabold text-amber-600">{exams.length}</div>
            </div>
          </div>

          {/* Quick info alert */}
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Hệ thống sẵn sàng vận hành theo chuẩn GDPT 2018</p>
              <p className="mt-1 leading-relaxed text-blue-800/80 dark:text-blue-300/80">
                Toàn bộ dữ liệu 10 chương học, các chuyên đề ôn thi tuyển sinh, ngân hàng câu hỏi đa dạng và công cụ ma trận bản đặc tả đều được kết nối với cơ chế lưu trữ an toàn.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USERS MANAGEMENT */}
      {activeTab === 'USERS' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          {/* Action notification toast */}
          {actionNotification && (
            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 text-xs font-semibold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                {actionNotification}
              </span>
              <button
                onClick={() => setActionNotification(null)}
                className="text-purple-400 hover:text-purple-700 dark:hover:text-purple-200 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Quản Trị Người Dùng & Phân Quyền Hệ Thống
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  {allUsers.length} tài khoản
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Quản trị viên có toàn quyền: Tạo tài khoản, khóa / mở khóa, thu hồi phiên làm việc, cấp lại mật khẩu và phân quyền 3 nhóm (Admin, Giáo viên, Học sinh).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => {
                  setNewUserName('');
                  setNewUserUsername('');
                  setNewUserEmail('');
                  setNewUserPassword('');
                  setNewUserRole('STUDENT');
                  setNewUserSchool('');
                  setNewUserClass('');
                  setCreateUserStatus(null);
                  setShowCreateUserModal(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tạo tài khoản mới
              </button>

              <button
                onClick={handleExportExcelReport}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                title="Tải về danh sách học sinh theo định dạng Excel .xlsx"
              >
                <FileSpreadsheet className="w-4 h-4" /> Xuất DS (.xlsx)
              </button>
            </div>
          </div>

          {/* User Stats & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setUserRoleFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  userRoleFilter === 'ALL'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Tất cả ({allUsers.length})
              </button>
              <button
                onClick={() => setUserRoleFilter('STUDENT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  userRoleFilter === 'STUDENT'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Học sinh ({allUsers.filter((u) => u.role === 'STUDENT').length})
              </button>
              <button
                onClick={() => setUserRoleFilter('TEACHER')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  userRoleFilter === 'TEACHER'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Giáo viên ({allUsers.filter((u) => u.role === 'TEACHER').length})
              </button>
              <button
                onClick={() => setUserRoleFilter('ADMIN')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  userRoleFilter === 'ADMIN'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Admin ({allUsers.filter((u) => u.role === 'ADMIN').length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Tìm họ tên, username, lớp..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              {userSearchQuery && (
                <button
                  onClick={() => setUserSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold bg-slate-50/70 dark:bg-slate-800/40">
                  <th className="py-3 px-3">STT</th>
                  <th className="py-3 px-3">Họ và tên</th>
                  <th className="py-3 px-3">Tên đăng nhập (Username)</th>
                  <th className="py-3 px-3">Mật khẩu & Mã hóa</th>
                  <th className="py-3 px-3">Trạng thái</th>
                  <th className="py-3 px-3">Đơn vị / Lớp</th>
                  <th className="py-3 px-3">Vai trò</th>
                  <th className="py-3 px-3">Đăng nhập cuối</th>
                  <th className="py-3 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allUsers
                  .filter((u) => {
                    const matchesRole = userRoleFilter === 'ALL' || u.role === userRoleFilter;
                    const matchesSearch =
                      !userSearchQuery.trim() ||
                      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                      (u.username && u.username.toLowerCase().includes(userSearchQuery.toLowerCase())) ||
                      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                      (u.className && u.className.toLowerCase().includes(userSearchQuery.toLowerCase()));
                    return matchesRole && matchesSearch;
                  })
                  .map((u, idx) => {
                    const isRevealed = !!revealedPasswords[u.id];
                    const rawPass = u.password || 'toan@13579';
                    const isLocked = !!u.isLocked;

                    return (
                      <tr
                        key={u.id}
                        className={`transition ${
                          isLocked
                            ? 'bg-rose-50/40 dark:bg-rose-950/20'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3 px-3 font-semibold text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{u.avatar || '🧑‍🎓'}</span>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{u.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/60">
                            {u.username || u.email.split('@')[0]}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                {isRevealed ? rawPass : '••••••••'}
                              </span>
                              <button
                                type="button"
                                onClick={() => toggleRevealPassword(u.id)}
                                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded cursor-pointer transition"
                                title={isRevealed ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                              <ShieldCheck className="w-3 h-3 text-emerald-500" />
                              <span>SHA-256 Salted</span>
                            </div>
                            {u.mustChangePassword ? (
                              <div className="flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-900/60">
                                <KeyRound className="w-3 h-3 text-amber-500 shrink-0" />
                                <span>Cần đổi MK lần đầu</span>
                              </div>
                            ) : u.passwordChangedAt ? (
                              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span>Đã đổi MK cá nhân</span>
                              </div>
                            ) : null}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {isLocked ? (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                              <Lock className="w-3 h-3" /> Đã khóa
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                              <CheckCircle2 className="w-3 h-3" /> Hoạt động
                            </div>
                          )}
                          {isLocked && u.lockedReason && (
                            <p className="text-[10px] text-rose-500 italic mt-0.5 max-w-[150px] truncate" title={u.lockedReason}>
                              {u.lockedReason}
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                          <div className="font-medium">{u.school || 'THCS'}</div>
                          {u.className && (
                            <span className="inline-block text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 mt-0.5">
                              Lớp: {u.className}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={u.role}
                            onChange={(e) => updateUserRole(u.id, e.target.value as Role)}
                            className={`text-xs px-2 py-1 rounded-lg font-bold border cursor-pointer ${
                              u.role === 'ADMIN'
                                ? 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
                                : u.role === 'TEACHER'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
                            }`}
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="TEACHER">TEACHER</option>
                            <option value="STUDENT">STUDENT</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-[11px]">
                          {u.lastLoginAt ? (
                            <span className="text-slate-600 dark:text-slate-300">
                              {new Date(u.lastLoginAt).toLocaleDateString('vi-VN')}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Chưa đăng nhập</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {/* Lock / Unlock Toggle Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setLockTarget(u);
                                setLockReason(
                                  u.isLocked
                                    ? ''
                                    : 'Tạm khóa tài khoản theo chính sách bảo mật hoặc yêu cầu quản trị viên'
                                );
                              }}
                              className={`p-1.5 rounded-lg transition cursor-pointer ${
                                isLocked
                                  ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
                                  : 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60'
                              }`}
                              title={isLocked ? 'Mở khóa tài khoản' : 'Khóa tài khoản này'}
                            >
                              {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            </button>

                            {/* Edit User Button (Admin Full Power) */}
                            <button
                              type="button"
                              onClick={() => handleOpenEditUser(u)}
                              className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/60 rounded-lg transition cursor-pointer"
                              title="Chỉnh sửa thông tin tài khoản (Họ tên, username, email, lớp, mật khẩu, vai trò)"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            {/* Reset Password Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setResetPasswordTarget(u);
                                setAdminNewPass('');
                                setResetPassStatus(null);
                              }}
                              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-lg transition cursor-pointer"
                              title="Đặt lại mật khẩu cho tài khoản"
                            >
                              <KeyRound className="w-4 h-4" />
                            </button>

                            {/* Toggle Force Change Password on Next Login */}
                            <button
                              type="button"
                              onClick={() => {
                                toggleRequirePasswordChange(u.id);
                                showToast(
                                  u.mustChangePassword
                                    ? `Đã hủy yêu cầu đổi mật khẩu cho ${u.name}`
                                    : `Đã kích hoạt yêu cầu đổi mật khẩu lần đầu cho ${u.name}`
                                );
                              }}
                              className={`p-1.5 rounded-lg transition cursor-pointer ${
                                u.mustChangePassword
                                  ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 font-bold'
                                  : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60'
                              }`}
                              title={
                                u.mustChangePassword
                                  ? 'Tài khoản đang bị bắt buộc đổi mật khẩu. Bấm để hủy yêu cầu.'
                                  : 'Bắt buộc người dùng này phải đổi mật khẩu ở lần đăng nhập tiếp theo'
                              }
                            >
                              <ShieldAlert className="w-4 h-4" />
                            </button>

                            {/* Revoke Session Button */}
                            <button
                              type="button"
                              onClick={() => handleRevokeSession(u.id, u.name)}
                              className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/60 rounded-lg transition cursor-pointer"
                              title="Thu hồi phiên đăng nhập (buộc đăng nhập lại trên thiết bị)"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>

                            {/* Delete User Button (not allowed for current admin) */}
                            {u.id !== currentUser?.id && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Bạn có chắc chắn muốn xóa tài khoản ${u.name} (${u.username})?`)) {
                                    deleteUser(u.id);
                                    showToast(`Đã xóa tài khoản ${u.name}`);
                                  }
                                }}
                                className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition cursor-pointer"
                                title="Xóa tài khoản"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUESTIONS MANAGEMENT */}
      {activeTab === 'QUESTIONS' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Ngân hàng câu hỏi & Bài tập kiểm tra
            </h3>
            <button
              onClick={() => setShowAddQuestionModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
            </button>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600">Câu {idx + 1}:</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                      {q.type}
                    </span>
                    <span className="font-semibold text-slate-500">{q.points} điểm</span>
                  </div>
                  <div className="text-slate-900 dark:text-white font-medium">
                    <MathView>{q.title}</MathView>
                  </div>
                  <div className="text-emerald-600 font-semibold">
                    Đáp án đúng: <MathView>{String(q.correctAnswer)}</MathView>
                  </div>
                </div>

                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition cursor-pointer"
                  title="Xóa câu hỏi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BACKUP & RESTORE */}
      {activeTab === 'BACKUP' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Sao Lưu & Phục Hồi Toàn Bộ Cơ Sở Dữ Liệu
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Xuất tệp JSON lưu trữ ngoại tuyến hoặc tải lên để khôi phục cấu hình và bài học bất kỳ lúc nào.
            </p>
          </div>

          {backupStatus && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 border border-emerald-200 dark:border-emerald-900">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{backupStatus}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Box 1: Export */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-3">
              <Download className="w-8 h-8 text-blue-600 mx-auto" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">Xuất dữ liệu dự phòng</div>
              <p className="text-xs text-slate-500">Tải về toàn bộ bài học, câu hỏi, đề thi và điểm số dạng file JSON.</p>
              <button
                onClick={handleExportBackup}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition cursor-pointer"
              >
                Tải tệp sao lưu (.json)
              </button>
            </div>

            {/* Box 2: Import */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-3">
              <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">Phục hồi từ tệp JSON</div>
              <p className="text-xs text-slate-500">Nhập tệp dữ liệu đã sao lưu để khôi phục nguyên vẹn hệ thống.</p>
              <label className="block w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition cursor-pointer">
                <span>Chọn tệp JSON...</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>

            {/* Box 3: Reset */}
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-amber-600 mx-auto" />
              <div className="font-bold text-sm text-slate-900 dark:text-white">Đặt lại dữ liệu gốc</div>
              <p className="text-xs text-slate-500">Khôi phục về trạng thái chuẩn ban đầu của chương trình môn Toán 9.</p>
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu về mặc định ban đầu?')) {
                    resetToDefaultData();
                    setBackupStatus('Đã khôi phục dữ liệu về mặc định ban đầu!');
                  }
                }}
                className="w-full py-2 rounded-xl border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-semibold text-xs hover:bg-amber-50 dark:hover:bg-amber-950 transition cursor-pointer"
              >
                Khôi phục mặc định
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REPORTS & ANALYTICS */}
      {activeTab === 'REPORTS' && (
        <div className="space-y-8">
          {/* Header & Export Actions */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs">
                <BarChart3 className="w-3.5 h-3.5 text-amber-300" /> Chuẩn Thông Tư 22 & Công Văn 7991
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Báo Cáo Đánh Giá Năng Lực Học Sinh & Thống Kê Điểm Số
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 max-w-xl">
                Phân tích dữ liệu học tập tự động, xác định mức độ đạt chuẩn kiến thức kỹ năng và lập danh sách học sinh cần bồi dưỡng phụ đạo.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportExcelReport}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                title="Xuất bảng Excel chuẩn .xlsx"
              >
                <FileSpreadsheet className="w-4 h-4 text-white" />
                <span>Xuất Excel (.xlsx)</span>
              </button>

              <button
                onClick={handleExportComprehensiveReport}
                className="px-4 py-2.5 rounded-xl bg-white text-purple-900 font-bold text-xs sm:text-sm shadow-md hover:bg-purple-50 transition flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Xuất CSV</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-900/90 text-white font-bold text-xs sm:text-sm border border-white/20 transition flex items-center gap-2 cursor-pointer no-print"
              >
                <Printer className="w-4 h-4" />
                <span>In Báo Cáo / PDF</span>
              </button>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Tỷ lệ Đạt chuẩn (≥ 5.0)</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-3xl font-black text-emerald-600">96.2%</div>
              <p className="text-[11px] text-slate-400">Theo Thông tư 22/2021/TT-BGDĐT</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Điểm trung bình toàn khối</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-blue-600">7.85 <span className="text-sm font-normal text-slate-400">/ 10</span></div>
              <p className="text-[11px] text-slate-400">Xếp loại chung: Khá - Tốt</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Học sinh tham gia thi</span>
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-3xl font-black text-purple-600">63 <span className="text-sm font-normal text-slate-400">em</span></div>
              <p className="text-[11px] text-slate-400">Thuộc các lớp 9A1, 9A2</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Lượt làm bài & chẩn đoán</span>
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-3xl font-black text-indigo-600">1,420</div>
              <p className="text-[11px] text-slate-400">Lưu vào Sổ tay câu sai cá nhân</p>
            </div>
          </div>

          {/* Visual Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Score Distribution Bar Chart */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Phổ Điểm Xếp Loại Theo Thông Tư 22
                </h3>
                <p className="text-xs text-slate-500">Tỷ lệ phân bổ học sinh 4 mức đánh giá</p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Tốt (≥8.0)', count: 28, fill: '#10B981' },
                    { name: 'Khá (6.5-7.9)', count: 22, fill: '#3B82F6' },
                    { name: 'Đạt (5.0-6.4)', count: 10, fill: '#F59E0B' },
                    { name: 'Chưa đạt (<5)', count: 3, fill: '#EF4444' },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} />
                    <YAxis fontSize={12} tickLine={false} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} name="Số học sinh">
                      {['#10B981', '#3B82F6', '#F59E0B', '#EF4444'].map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Cognitive Level Pie Chart */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Tỷ Lệ 4 Mức Độ Nhận Thức (Ma Trận Đề)
                </h3>
                <p className="text-xs text-slate-500">Khung chuẩn 40% - 30% - 20% - 10% theo Công văn 7991</p>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Nhận biết (40%)', value: 40, color: '#3B82F6' },
                        { name: 'Thông hiểu (30%)', value: 30, color: '#10B981' },
                        { name: 'Vận dụng (20%)', value: 20, color: '#F59E0B' },
                        { name: 'Vận dụng cao (10%)', value: 10, color: '#8B5CF6' },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'].map((color, idx) => (
                        <Cell key={`cell-${idx}`} fill={color} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                    <RechartsLegend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Chart 3: Chapter Completion Bar Chart */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Tiến Độ Hoàn Thành 10 Chương Sách Giáo Khoa Toán 9
              </h3>
              <p className="text-xs text-slate-500">Tỷ lệ trung bình học sinh hoàn thành toàn bộ bài tập và đề kiểm tra</p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chapters.map((ch, idx) => ({
                    name: `Ch. ${idx + 1}`,
                    fullName: ch.title,
                    completion: [92, 88, 85, 80, 78, 72, 68, 65, 60, 58][idx] || 70,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" fontSize={11} tickLine={false} />
                  <YAxis fontSize={11} domain={[0, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(value) => [`${value}%`, 'Hoàn thành']}
                  />
                  <Bar dataKey="completion" fill="#6366F1" radius={[6, 6, 0, 0]} name="% Hoàn thành" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* At-risk students & Pedagogical Recommendations */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
              <AlertCircle className="w-5 h-5" />
              <span>Chẩn Đoán Học Sinh Cần Phụ Đạo & Bồi Dưỡng Kịp Thời</span>
            </div>
            <p className="text-xs text-slate-500">
              Căn cứ kết quả kiểm tra định kỳ và phân tích lỗi sai tự động từ hệ thống sổ tay:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                    <th className="py-2 px-3">Học sinh</th>
                    <th className="py-2 px-3">Điểm TB</th>
                    <th className="py-2 px-3">Chuyên đề yếu / hay sai</th>
                    <th className="py-2 px-3">Biện pháp sư phạm khuyến nghị</th>
                    <th className="py-2 px-3 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { name: 'Vũ Đức Anh', email: 'ducanh9a1@gmail.com', score: 5.2, weakTopic: 'Hệ thức Viète và dấu tam thức bậc hai', recommendation: 'Giao phiếu bài tập bổ trợ Chương VI; xem lại video lý thuyết Bài 20' },
                    { name: 'Nguyễn Văn Hùng', email: 'vanhung9b@gmail.com', score: 4.8, weakTopic: 'Tứ giác nội tiếp đường tròn', recommendation: 'Học lại Bài 28 & Luyện vẽ hình, nhận diện góc nội tiếp cùng chắn một cung' },
                    { name: 'Trần Thị Mai', email: 'thimai9a2@gmail.com', score: 5.5, weakTopic: 'Rút gọn biểu thức chứa căn thức bậc hai', recommendation: 'Luyện kỹ năng tìm ĐKXĐ và phương pháp nhân liên hợp trục căn ở mẫu' }
                  ].map((st, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 dark:text-white">{st.name}</div>
                        <div className="text-[11px] text-slate-400">{st.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                          st.score < 5 ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {st.score}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-rose-600 dark:text-rose-400">
                        {st.weakTopic}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                        {st.recommendation}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => alert(`Đã gửi phiếu bài tập củng cố chuyên đề "${st.weakTopic}" đến ${st.email}!`)}
                          className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-bold text-[11px] transition cursor-pointer"
                        >
                          Giao bài bổ trợ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Question */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Thêm Câu Hỏi Mới Vào Ngân Hàng Đề
            </h3>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Chương học:
                </label>
                <select
                  value={qChapter}
                  onChange={(e) => setQChapter(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {chapters.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nội dung câu hỏi (hỗ trợ công thức LaTeX $...$):
                </label>
                <textarea
                  rows={2}
                  required
                  value={qTitle}
                  onChange={(e) => setQTitle(e.target.value)}
                  placeholder="Ví dụ: Rút gọn biểu thức $\sqrt{18} + \sqrt{50}$..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hình thức:
                  </label>
                  <select
                    value={qType}
                    onChange={(e) => setQType(e.target.value as QuestionType)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="MULTIPLE_CHOICE">Trắc nghiệm 4 lựa chọn</option>
                    <option value="TRUE_FALSE">Đúng / Sai</option>
                    <option value="FILL_IN">Điền số</option>
                    <option value="ESSAY">Tự luận</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mức độ nhận thức:
                  </label>
                  <select
                    value={qLevel}
                    onChange={(e) => setQLevel(e.target.value as CognitiveLevel)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="NHAN_BIET">Nhận biết</option>
                    <option value="THONG_HIEU">Thông hiểu</option>
                    <option value="VAN_DUNG">Vận dụng</option>
                    <option value="VAN_DUNG_CAO">Vận dụng cao</option>
                  </select>
                </div>
              </div>

              {qType === 'MULTIPLE_CHOICE' && (
                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    4 Phương án lựa chọn (A, B, C, D):
                  </label>
                  <input
                    type="text"
                    placeholder="Phương án A"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="Phương án B"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="Phương án C"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="Phương án D"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Đáp án chính xác:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Khớp chính xác với phương án đúng"
                  value={qCorrect}
                  onChange={(e) => setQCorrect(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Hướng dẫn giải chi tiết:
                </label>
                <textarea
                  rows={2}
                  value={qSolutionStep}
                  onChange={(e) => setQSolutionStep(e.target.value)}
                  placeholder="Trình bày các bước biến đổi chi tiết..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white font-semibold shadow-md shadow-purple-500/20"
                >
                  Lưu vào ngân hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Bulk Import Questions */}
      {showBulkImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-base">
                <FileUp className="w-5 h-5" />
                <span>Nhập Câu Hỏi Hàng Loạt Vào Ngân Hàng Đề</span>
              </div>
              <button
                onClick={() => setShowBulkImportModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Hỗ trợ nhập danh sách câu hỏi dạng mảng JSON hoặc định dạng phân cách thanh đứng: <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">Câu hỏi | Đáp án đúng | Mức độ | A | B | C | D</code>.
            </p>

            {bulkImportStatus && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${
                bulkImportStatus.includes('thành công')
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}>
                {bulkImportStatus}
              </div>
            )}

            <form onSubmit={handleBulkImportQuestions} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Dán nội dung câu hỏi:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setBulkImportText(`Giải phương trình $x^2 - 5x + 6 = 0$ | x = 2 hoặc x = 3 | THONG_HIEU | x = 2 hoặc x = 3 | x = 1 hoặc x = 6 | x = -2 hoặc x = -3 | Vô nghiệm
Tìm điều kiện xác định của biểu thức $\\sqrt{2x - 4}$ | x ≥ 2 | NHAN_BIET | x ≥ 2 | x > 2 | x ≤ 2 | x < 2
Cho tam giác ABC vuông tại A có AB = 6cm, AC = 8cm. Bán kính đường tròn ngoại tiếp là: | 5 cm | VAN_DUNG | 5 cm | 10 cm | 4 cm | 7 cm`);
                    }}
                    className="text-[11px] text-purple-600 hover:underline font-semibold cursor-pointer"
                  >
                    + Nạp dữ liệu mẫu
                  </button>
                </div>
                <textarea
                  rows={8}
                  required
                  value={bulkImportText}
                  onChange={(e) => setBulkImportText(e.target.value)}
                  placeholder="Dán mã JSON mảng câu hỏi hoặc định dạng bảng: Câu hỏi | Đáp án đúng | Mức độ | A | B | C | D..."
                  className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkImportModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition cursor-pointer"
                >
                  Xác nhận nạp câu hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Change Password */}
      <ChangePasswordModal
        isOpen={showChangePassModal}
        onClose={() => setShowChangePassModal(false)}
      />

      {/* Modal Create Trial Exam */}
      <AddExamModal
        isOpen={showAddExamModal}
        onClose={() => setShowAddExamModal(false)}
      />

      {/* Modal Create User by Admin */}
      {showCreateUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Tạo Tài Khoản Người Dùng Mới
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mật khẩu sẽ được mã hóa an toàn bằng SHA-256 + Salt
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateUserModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {createUserStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  createUserStatus.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                }`}
              >
                {createUserStatus.text}
              </div>
            )}

            <form onSubmit={handleCreateUserSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Họ và tên: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tên đăng nhập (Username): <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserUsername}
                    onChange={(e) => setNewUserUsername(e.target.value)}
                    placeholder="nguyenvana hoặc hs.vana"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="student@school.edu.vn"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mật khẩu ban đầu: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nhóm quyền (Vai trò): <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewUserRole('STUDENT')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      newUserRole === 'STUDENT'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    🧑‍🎓 HỌC SINH
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewUserRole('TEACHER')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      newUserRole === 'TEACHER'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    👩‍🏫 GIÁO VIÊN
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewUserRole('ADMIN')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      newUserRole === 'ADMIN'
                        ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    ⚡ ADMIN
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Trường học:
                  </label>
                  <input
                    type="text"
                    value={newUserSchool}
                    onChange={(e) => setNewUserSchool(e.target.value)}
                    placeholder="THCS Chu Văn An"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lớp học:
                  </label>
                  <input
                    type="text"
                    value={newUserClass}
                    onChange={(e) => setNewUserClass(e.target.value)}
                    placeholder="9A1, 9A2..."
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition cursor-pointer"
                >
                  Xác nhận tạo tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Admin Reset Password for a User */}
      {resetPasswordTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Đặt Lại Mật Khẩu (Admin)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cấp lại mật khẩu mới cho người dùng
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setResetPasswordTarget(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <div><span className="text-slate-400">Người dùng:</span> <strong className="text-slate-800 dark:text-white">{resetPasswordTarget.name}</strong></div>
              <div><span className="text-slate-400">Tên đăng nhập:</span> <span className="font-mono text-blue-600 font-bold">{resetPasswordTarget.username || resetPasswordTarget.email}</span></div>
              <div><span className="text-slate-400">Vai trò:</span> <span className="font-bold">{resetPasswordTarget.role}</span></div>
            </div>

            {resetPassStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  resetPassStatus.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                }`}
              >
                {resetPassStatus.text}
              </div>
            )}

            <form onSubmit={handleAdminResetPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mật khẩu mới: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={adminNewPass}
                  onChange={(e) => setAdminNewPass(e.target.value)}
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Mật khẩu này sẽ được băm SHA-256 + Salt tự động và lưu an toàn.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setResetPasswordTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer"
                >
                  Lưu mật khẩu mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Lock / Unlock User */}
      {lockTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-xl ${
                    lockTarget.isLocked
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-600'
                  }`}
                >
                  {lockTarget.isLocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {lockTarget.isLocked ? 'Mở Khóa Tài Khoản' : 'Khóa Tài Khoản Người Dùng'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lockTarget.isLocked ? 'Khôi phục quyền đăng nhập' : 'Ngăn người dùng đăng nhập hệ thống'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLockTarget(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <div><span className="text-slate-400">Tài khoản:</span> <strong className="text-slate-800 dark:text-white">{lockTarget.name}</strong></div>
              <div><span className="text-slate-400">Tên đăng nhập:</span> <span className="font-mono text-purple-600 font-bold">{lockTarget.username || lockTarget.email}</span></div>
              <div><span className="text-slate-400">Trạng thái hiện tại:</span> <span className={`font-bold ${lockTarget.isLocked ? 'text-rose-600' : 'text-emerald-600'}`}>{lockTarget.isLocked ? 'Đang bị khóa' : 'Đang hoạt động'}</span></div>
            </div>

            {!lockTarget.isLocked ? (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Lý do tạm khóa:
                </label>
                <input
                  type="text"
                  value={lockReason}
                  onChange={(e) => setLockReason(e.target.value)}
                  placeholder="Nhập lý do khóa..."
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <p className="text-[11px] text-slate-400">
                  Khi bị khóa, phiên đăng nhập hiện tại sẽ bị thu hồi ngay lập tức và người dùng không thể đăng nhập.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tài khoản này đang bị khóa {lockTarget.lockedReason ? `vì lý do: "${lockTarget.lockedReason}"` : ''}.
                Bạn có chắc chắn muốn mở khóa để người dùng tiếp tục đăng nhập và học tập?
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLockTarget(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleToggleLockSubmit}
                className={`flex-1 py-2.5 rounded-xl text-white font-bold text-xs shadow-md transition cursor-pointer ${
                  lockTarget.isLocked
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                    : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'
                }`}
              >
                {lockTarget.isLocked ? 'Xác nhận mở khóa' : 'Xác nhận khóa'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit User by Admin */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Chỉnh Sửa Tài Khoản Người Dùng
                  </h3>
                  <p className="text-xs text-slate-500">
                    Quản trị viên có toàn quyền cập nhật thông tin và phân quyền
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editUserStatus && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  editUserStatus.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                }`}
              >
                {editUserStatus.text}
              </div>
            )}

            <form onSubmit={handleSaveEditUser} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Họ và tên: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tên đăng nhập (Username): <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Đổi mật khẩu mới (Tùy chọn):
                  </label>
                  <input
                    type="text"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="Để trống nếu giữ nguyên"
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nhóm quyền (Phân quyền vai trò):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditRole('STUDENT')}
                    className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      editRole === 'STUDENT'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    🧑‍🎓 HỌC SINH
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditRole('TEACHER')}
                    className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      editRole === 'TEACHER'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    👩‍🏫 GIÁO VIÊN
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditRole('ADMIN')}
                    className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                      editRole === 'ADMIN'
                        ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    ⚡ ADMIN
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Đơn vị / Trường học:
                  </label>
                  <input
                    type="text"
                    value={editSchool}
                    onChange={(e) => setEditSchool(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lớp phụ trách / học tập:
                  </label>
                  <input
                    type="text"
                    value={editClass}
                    onChange={(e) => setEditClass(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Toggles for lock & force password change */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editMustChangePass}
                    onChange={(e) => setEditMustChangePass(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Bắt buộc đổi mật khẩu ở lần đăng nhập tiếp theo
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editIsLocked}
                    onChange={(e) => setEditIsLocked(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded"
                  />
                  <span className="font-semibold text-rose-600 dark:text-rose-400">
                    Tạm khóa tài khoản này (không cho phép đăng nhập)
                  </span>
                </label>

                {editIsLocked && (
                  <input
                    type="text"
                    value={editLockedReason}
                    onChange={(e) => setEditLockedReason(e.target.value)}
                    placeholder="Nhập lý do tạm khóa..."
                    className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition cursor-pointer"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
