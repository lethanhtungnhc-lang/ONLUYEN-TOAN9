import { Exam } from '../types';
import { QUESTION_BANK } from './questionBank';

export const EXAM_BANK: Exam[] = [
  {
    id: 'exam-gk1',
    title: 'Đề kiểm tra Giữa Học kỳ I – Môn Toán 9 (Năm học 2025 - 2026)',
    type: 'MID_TERM_1',
    semester: 1,
    durationMinutes: 60,
    totalPoints: 10,
    author: 'Teacher Lê Thanh Tùng',
    description: 'Kiểm tra kiến thức Chương I (Hệ hai phương trình bậc nhất hai ẩn) và Chương III (Căn bậc hai, căn bậc ba), kết hợp hệ thức lượng tam giác vuông. Cấu trúc: 70% Trắc nghiệm khách quan + 30% Tự luận.',
    questions: [
      QUESTION_BANK[0], // qb-c1-01
      QUESTION_BANK[1], // qb-c1-02
      QUESTION_BANK[3], // qb-c1-04
      QUESTION_BANK[4], // qb-c1-05
      QUESTION_BANK[5], // qb-c3-01
      QUESTION_BANK[6], // qb-c3-02
      QUESTION_BANK[7], // qb-c3-03
      QUESTION_BANK[8], // qb-c3-04 (Tự luận)
      QUESTION_BANK[9], // qb-c4-01
      QUESTION_BANK[10], // qb-c4-02
    ]
  },
  {
    id: 'exam-ck1',
    title: 'Đề kiểm tra Cuối Học kỳ I – Môn Toán 9 (Chuẩn ma trận GDPT 2018)',
    type: 'FINAL_1',
    semester: 1,
    durationMinutes: 90,
    totalPoints: 10,
    author: 'Teacher Lê Thanh Tùng',
    description: 'Bao quát toàn bộ kiến thức Học kỳ I (Chương I, II, III, IV, V). Phân bổ 4 mức độ: Nhận biết 40%, Thông hiểu 30%, Vận dụng 20%, Vận dụng cao 10%.',
    questions: [
      QUESTION_BANK[0],
      QUESTION_BANK[1],
      QUESTION_BANK[2],
      QUESTION_BANK[5],
      QUESTION_BANK[6],
      QUESTION_BANK[7],
      QUESTION_BANK[8],
      QUESTION_BANK[9],
      QUESTION_BANK[10],
    ]
  },
  {
    id: 'exam-gk2',
    title: 'Đề kiểm tra Giữa Học kỳ II – Môn Toán 9',
    type: 'MID_TERM_2',
    semester: 2,
    durationMinutes: 60,
    totalPoints: 10,
    author: 'Teacher Lê Thanh Tùng',
    description: 'Nội dung kiểm tra: Hàm số y = ax², phương trình bậc hai một ẩn, định lí Viète, tần số xác suất.',
    questions: [
      QUESTION_BANK[11], // qb-c6-01
      QUESTION_BANK[12], // qb-c6-02
      QUESTION_BANK[13], // qb-c6-03
      QUESTION_BANK[14], // qb-c9-01
      QUESTION_BANK[15], // qb-c9-02
    ]
  },
  {
    id: 'exam-ck2',
    title: 'Đề kiểm tra Cuối Học kỳ II – Môn Toán 9',
    type: 'FINAL_2',
    semester: 2,
    durationMinutes: 90,
    totalPoints: 10,
    author: 'Teacher Lê Thanh Tùng',
    description: 'Nội dung tổng hợp toàn bộ chương trình Toán 9 Học kỳ II và các dạng bài trọng tâm lớp 9.',
    questions: [
      QUESTION_BANK[11],
      QUESTION_BANK[12],
      QUESTION_BANK[13],
      QUESTION_BANK[14],
      QUESTION_BANK[15],
      QUESTION_BANK[16], // qb-c10-01
    ]
  },
  {
    id: 'exam-tuyensinh10',
    title: 'Đề khảo sát & Luyện thi Tuyển sinh vào Lớp 10 (Chuẩn cấu trúc Đề thi Sở GD&ĐT)',
    type: 'ENTRANCE_10',
    durationMinutes: 120,
    totalPoints: 10,
    author: 'Teacher Lê Thanh Tùng',
    description: 'Đề thi bám sát cấu trúc thi vào 10 THPT công lập. Gồm 5 bài toán chuẩn mực: Rút gọn biểu thức và câu hỏi phụ, Giải hệ PT / Toán thực tế, Phương trình bậc 2 & Viète, Hình học tổng hợp đường tròn & Tứ giác nội tiếp, Bất đẳng thức cực trị điểm 10.',
    questions: [
      QUESTION_BANK[0],
      QUESTION_BANK[2],
      QUESTION_BANK[4],
      QUESTION_BANK[7],
      QUESTION_BANK[8],
      QUESTION_BANK[10],
      QUESTION_BANK[12],
      QUESTION_BANK[13],
      QUESTION_BANK[14],
      QUESTION_BANK[15],
      QUESTION_BANK[16],
    ]
  }
];
