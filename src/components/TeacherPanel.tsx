import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Plus,
  Send,
  Download,
  BarChart2,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  KeyRound,
  GraduationCap
} from 'lucide-react';
import { ChangePasswordModal } from './ChangePasswordModal';
import { AddExamModal } from './AddExamModal';
import { exportStudentsToXLSX, StudentExportData } from '../utils/excelExport';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export const TeacherPanel: React.FC = () => {
  const { classrooms, exams, createClassroom, assignExamToClass } = useApp();
  const { allUsers } = useAuth();

  const [selectedClassId, setSelectedClassId] = useState<string>(classrooms[0]?.id || '');
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [dueDate, setDueDate] = useState<string>('2026-11-20');

  // New class modal
  const [showNewClassModal, setShowNewClassModal] = useState<boolean>(false);
  const [newClassName, setNewClassName] = useState<string>('');
  const [showChangePassModal, setShowChangePassModal] = useState<boolean>(false);
  const [showAddExamModal, setShowAddExamModal] = useState<boolean>(false);

  const currentClass = classrooms.find((c) => c.id === selectedClassId) || classrooms[0];

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId || !selectedExamId) return;
    assignExamToClass(selectedClassId, selectedExamId, dueDate);
    setShowAssignModal(false);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    createClassroom(newClassName.trim(), 9);
    setNewClassName('');
    setShowNewClassModal(false);
  };

  // Student roster for the active class (including registered students)
  const studentAccounts = allUsers.filter(u => u.role === 'STUDENT');
  
  const classStudents = [
    { id: 'st-1', name: 'Nguyễn Văn An', username: 'hocsinh.vanan', email: 'vanan.hocsinh9@gmail.com', school: 'Trường TH, THCS Nguyễn Hữu Cảnh', className: currentClass?.name || '9A1', progress: 85, avgScore: 8.75, status: 'Hoàn thành' },
    { id: 'st-2', name: 'Lê Hoàng Nam', username: 'lehoangnam9a1', email: 'hoangnam9a1@gmail.com', school: 'Trường TH, THCS Nguyễn Hữu Cảnh', className: currentClass?.name || '9A1', progress: 75, avgScore: 8.2, status: 'Hoàn thành' },
    { id: 'st-3', name: 'Nguyễn Thảo Linh', username: 'nguyenthaolinh9a', email: 'thaolinh.toan@gmail.com', school: 'Trường TH, THCS Nguyễn Hữu Cảnh', className: currentClass?.name || '9A1', progress: 95, avgScore: 9.5, status: 'Hoàn thành' },
    { id: 'st-4', name: 'Vũ Đức Anh', username: 'vuducanh.toan9', email: 'ducanh9a1@gmail.com', school: 'Trường TH, THCS Nguyễn Hữu Cảnh', className: currentClass?.name || '9A1', progress: 60, avgScore: 7.0, status: 'Đang làm' },
    { id: 'st-5', name: 'Phạm Quỳnh Chi', username: 'phamquynhchi9', email: 'quynhchi9@gmail.com', school: 'Trường TH, THCS Nguyễn Hữu Cảnh', className: currentClass?.name || '9A1', progress: 90, avgScore: 9.0, status: 'Hoàn thành' },
  ];

  // Include any extra registered students into teacher's view
  studentAccounts.forEach((st) => {
    if (!classStudents.some(cs => cs.username.toLowerCase() === st.username.toLowerCase() || cs.email.toLowerCase() === st.email.toLowerCase())) {
      classStudents.push({
        id: st.id,
        name: st.name,
        username: st.username,
        email: st.email,
        school: st.school || 'THCS',
        className: st.className || currentClass?.name || 'Lớp 9',
        progress: 70,
        avgScore: 8.5,
        status: 'Hoàn thành'
      });
    }
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "STT,Họ và Tên,Tên đăng nhập,Email,Lớp,Tiến độ học (%),Điểm trung bình,Trạng thái\n" +
      classStudents.map((s, i) => `${i + 1},"${s.name}","${s.username}","${s.email}","${s.className}",${s.progress}%,${s.avgScore},"${s.status}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Bang-diem-${currentClass?.name || 'Lop-9'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportExcel = () => {
    const rows: StudentExportData[] = classStudents.map((s, i) => ({
      stt: i + 1,
      fullName: s.name,
      username: s.username,
      email: s.email,
      className: s.className,
      school: s.school,
      avgScore: s.avgScore,
      rankTT22: s.avgScore >= 8.0 ? 'Tốt' : s.avgScore >= 6.5 ? 'Khá' : s.avgScore >= 5.0 ? 'Đạt' : 'Chưa đạt',
      progress: `${s.progress}%`,
      weakTopics: s.avgScore < 8.0 ? 'Cần tăng cường bài toán thực tế & hình học' : 'Nắm vững kiến thức trọng tâm'
    }));

    const fileName = `Danh-sach-hoc-sinh-${currentClass?.name ? currentClass.name.replace(/\s+/g, '-') : 'Lop-9'}-${new Date().toISOString().slice(0, 10)}.xlsx`;
    exportStudentsToXLSX(rows, fileName);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
            <Users className="w-3.5 h-3.5" /> Không Gian Làm Việc Của Giáo Viên
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Quản Lý Lớp Học & Giao Bài Kiểm Tra
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Theo dõi tiến độ, xem tài khoản học sinh quản lý, tạo đề thi thử và xuất báo cáo điểm số chi tiết dạng Excel (.xlsx).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddExamModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/20 transition cursor-pointer"
            title="Tạo đề thi thử cho học sinh lớp mình phụ trách"
          >
            <GraduationCap className="w-4 h-4" /> Tạo đề thi thử
          </button>
          <button
            onClick={() => setShowChangePassModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-emerald-600" /> Đổi mật khẩu
          </button>
          <button
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Send className="w-4 h-4" /> Giao đề kiểm tra
          </button>
          <button
            onClick={() => setShowNewClassModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Thêm lớp
          </button>
        </div>
      </div>

      {/* Classroom Switcher Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-3 pb-2 overflow-x-auto">
        {classrooms.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClassId(c.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
              selectedClassId === c.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{c.name}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {c.studentCount} HS
            </span>
          </button>
        ))}
      </div>

      {/* Assigned Exams for This Class */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Bài tập và đề kiểm tra đã giao cho {currentClass?.name}
          </h3>
          <span className="text-xs text-slate-500">
            {currentClass?.assignedExams.length} bài đang hoạt động
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentClass?.assignedExams.map((ae, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{ae.examTitle}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  {ae.status === 'ACTIVE' ? 'Đang mở' : 'Hết hạn'}
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Hạn chót nộp bài: <strong>{ae.dueDate}</strong></span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Roster Table & Competence Analysis */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Danh Sách Tài Khoản Học Sinh Quản Lý & Kết Quả Học Tập
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Xem Tên đăng nhập và tiến trình của học sinh do giáo viên phụ trách. (Mật khẩu được mã hóa an toàn, chỉ Admin có quyền xem).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
              title="Xuất bảng điểm và danh sách học sinh ra file Excel .xlsx"
            >
              <FileSpreadsheet className="w-4 h-4 text-white" />
              <span>Xuất DS học sinh (.xlsx)</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold bg-slate-50/70 dark:bg-slate-800/40">
                <th className="py-2.5 px-3">STT</th>
                <th className="py-2.5 px-3">Họ và tên học sinh</th>
                <th className="py-2.5 px-3">Tên đăng nhập (Username)</th>
                <th className="py-2.5 px-3">Lớp & Trường</th>
                <th className="py-2.5 px-3">Tiến độ bài học</th>
                <th className="py-2.5 px-3">Điểm TB</th>
                <th className="py-2.5 px-3">Đánh giá theo TT 22</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {classStudents.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-semibold text-slate-400">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{s.email}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50">
                      {s.username}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    <div className="font-medium">{s.className}</div>
                    <div className="text-[10px] text-slate-400">{s.school}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="font-bold">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                    {s.avgScore}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      s.avgScore >= 8.0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      s.avgScore >= 6.5 ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {s.avgScore >= 8.0 ? 'Mức Tốt' : s.avgScore >= 6.5 ? 'Mức Khá' : 'Mức Đạt'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Giao đề */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Giao Đề Kiểm Tra Cho {currentClass?.name}
            </h3>

            <form onSubmit={handleAssign} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Chọn đề kiểm tra trong ngân hàng:
                </label>
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {exams.map((ex) => (
                    <option key={ex.id} value={ex.id}>{ex.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Hạn chót nộp bài:
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20"
                >
                  Xác nhận giao
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Thêm Lớp Mới */}
      {showNewClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tạo Lớp Học Mới
            </h3>

            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tên lớp học:
                </label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Ví dụ: Lớp 9A3 – Bồi dưỡng học sinh giỏi"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewClassModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold"
                >
                  Tạo lớp ngay
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
    </div>
  );
};
