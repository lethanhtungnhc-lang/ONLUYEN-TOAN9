import * as XLSX from 'xlsx';

export interface StudentExportData {
  stt: number;
  fullName: string;
  username: string;
  email: string;
  className: string;
  school: string;
  avgScore: number | string;
  rankTT22: string;
  progress: string;
  weakTopics?: string;
}

export const exportStudentsToXLSX = (
  data: StudentExportData[],
  fileName: string = 'Danh-sach-hoc-sinh-Toan-9.xlsx'
) => {
  // Format for spreadsheet
  const rows = data.map((item) => ({
    'STT': item.stt,
    'Họ và tên': item.fullName,
    'Tên đăng nhập': item.username,
    'Lớp': item.className,
    'Trường học': item.school,
    'Email liên hệ': item.email,
    'Điểm trung bình': item.avgScore,
    'Xếp loại (Thông tư 22)': item.rankTT22,
    'Tiến độ hoàn thành': item.progress,
    'Nội dung cần củng cố': item.weakTopics || 'Đạt chuẩn'
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },  // STT
    { wch: 22 }, // Họ và tên
    { wch: 18 }, // Tên đăng nhập
    { wch: 10 }, // Lớp
    { wch: 22 }, // Trường
    { wch: 26 }, // Email
    { wch: 16 }, // Điểm TB
    { wch: 22 }, // Xếp loại TT22
    { wch: 18 }, // Tiến độ
    { wch: 28 }, // Nội dung cần củng cố
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DS_HocSinh');
  XLSX.writeFile(workbook, fileName);
};
