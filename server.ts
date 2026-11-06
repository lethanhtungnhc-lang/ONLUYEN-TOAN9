import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// In-memory document storage with initial curriculum documents
interface ServerDocument {
  id: string;
  title: string;
  category: 'EXAM_PAPER' | 'MATRIX_SPEC' | 'REVIEW_TOPIC' | 'SYLLABUS' | 'LESSON_PLAN';
  fileName: string;
  fileSize: string;
  fileType: string;
  dataUrl?: string;
  contentPreview?: string;
  uploadedBy: string;
  uploadedAt: string;
  assignedClass?: string;
  note?: string;
}

let serverDocuments: ServerDocument[] = [
  {
    id: 'doc-1',
    title: 'Phụ lục 1 & 2 - Công văn 7991/BGDĐT-GDTrH Môn Toán 9',
    category: 'MATRIX_SPEC',
    fileName: '7991_BGDDT-GDTrH_Toan9_PhuLuc.pdf',
    fileSize: '1.2 MB',
    fileType: 'application/pdf',
    uploadedBy: 'Teacher Lê Thanh Tùng',
    uploadedAt: '2026-10-15',
    assignedClass: 'Toàn khối 9',
    note: 'Quy chuẩn khung ma trận, bản đặc tả và cấu trúc định dạng đề kiểm tra định kỳ năm học 2026-2027.',
  },
  {
    id: 'doc-2',
    title: 'Đề Cương Ôn Tập Giữa Học Kỳ I – Toán 9 GDPT 2018',
    category: 'REVIEW_TOPIC',
    fileName: 'DeCuong_OnTap_GiuaHK1_Toan9.docx',
    fileSize: '850 KB',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedBy: 'Teacher Lê Thanh Tùng',
    uploadedAt: '2026-10-25',
    assignedClass: 'Lớp 9A1, 9A2',
    note: 'Trọng tâm căn bậc hai, căn bậc ba và hệ hai phương trình bậc nhất hai ẩn.',
  },
  {
    id: 'doc-3',
    title: 'Đề Thi Thử Vào Lớp 10 – Trường TH, THCS Nguyễn Hữu Cảnh',
    category: 'EXAM_PAPER',
    fileName: 'DeThiThu_Vao10_NHC_2026_2027.docx',
    fileSize: '1.5 MB',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedBy: 'Tổ Tự Nhiên',
    uploadedAt: '2026-11-01',
    assignedClass: 'Toàn khối 9',
    note: 'Đề chuẩn 4 phần theo CV 7991 có bảng ma trận và biểu điểm hướng dẫn chấm chi tiết.',
  },
];

// Helper to generate curriculum-aligned CV 7991 exam
function generateCurriculumExamFallback(topic: string, semester: string, durationMinutes: number) {
  const code = Math.floor(100 + Math.random() * 900).toString();
  return {
    id: `exam-ai-${Date.now()}`,
    code: `ĐỀ-${code}`,
    title: `ĐỀ KIỂM TRA ĐỊNH KỲ TOÁN 9 – ${semester.toUpperCase()}`,
    subTitle: `Chương trình GDPT 2018 • Chuẩn Công văn 7991/BGDĐT-GDTrH`,
    school: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
    dept: 'TỔ TỰ NHIÊN',
    teacher: 'Teacher Lê Thanh Tùng',
    durationMinutes: Number(durationMinutes) || 90,
    topic: topic || 'Căn thức bậc hai, Hệ phương trình, Đường tròn và Bất đẳng thức',
    createdAt: new Date().toISOString().split('T')[0],
    part1: [
      { id: 'p1-1', title: 'Điều kiện xác định của biểu thức √(3x - 12) là:', options: ['x ≥ 4', 'x > 4', 'x ≤ 4', 'x < 4'], correctAnswer: 'x ≥ 4', points: 0.25, competency: 'NL1: Tư duy & nhận biết căn thức' },
      { id: 'p1-2', title: 'Giá trị của biểu thức √((2 - √5)²) + √5 là:', options: ['2', '2√5 - 2', '-2', '2 - 2√5'], correctAnswer: '2', points: 0.25, competency: 'NL1: Hằng đẳng thức căn bậc hai' },
      { id: 'p1-3', title: 'Cặp số (x; y) = (3; 1) là nghiệm của hệ phương trình nào dưới đây?', options: ['{ 2x - y = 5; x + y = 4 }', '{ x - y = 1; 2x + y = 6 }', '{ 3x + y = 8; x - 2y = 3 }', '{ x + 2y = 4; 2x - y = 4 }'], correctAnswer: '{ 2x - y = 5; x + y = 4 }', points: 0.25, competency: 'NL1: Nghiệm của hệ phương trình' },
      { id: 'p1-4', title: 'Phương trình x² - 6x + 8 = 0 có tích hai nghiệm x₁ · x₂ bằng:', options: ['8', '-8', '6', '-6'], correctAnswer: '8', points: 0.25, competency: 'NL1: Định lí Viète' },
      { id: 'p1-5', title: 'Cho tam giác ABC vuông tại A có AB = 5 cm, AC = 12 cm. Độ dài cạnh huyền BC là:', options: ['13 cm', '17 cm', '15 cm', '10 cm'], correctAnswer: '13 cm', points: 0.25, competency: 'NL1: Định lí Pythagore' },
      { id: 'p1-6', title: 'Giá trị của biểu thức cos² 20° + cos² 70° bằng:', options: ['1', '0', '2', '0,5'], correctAnswer: '1', points: 0.25, competency: 'NL1: Tỉ số lượng giác phụ nhau' },
      { id: 'p1-7', title: 'Cho đường tròn (O; 6 cm) và điểm M sao cho OM = 8 cm. Vị trí tương đối của M với đường tròn là:', options: ['M nằm ngoài (O)', 'M nằm trên (O)', 'M nằm trong (O)', 'Không xác định'], correctAnswer: 'M nằm ngoài (O)', points: 0.25, competency: 'NL1: Vị trí tương đối của điểm' },
      { id: 'p1-8', title: 'Góc nội tiếp chắn nửa đường tròn luôn có số đo bằng:', options: ['90°', '180°', '60°', '45°'], correctAnswer: '90°', points: 0.25, competency: 'NL1: Tính chất góc nội tiếp' },
      { id: 'p1-9', title: 'Thể tích khối trụ có bán kính đáy r = 4 cm và chiều cao h = 7 cm là:', options: ['112π cm³', '28π cm³', '56π cm³', '84π cm³'], correctAnswer: '112π cm³', points: 0.25, competency: 'NL1: Thể tích hình khối thực tế' },
      { id: 'p1-10', title: 'Biệt thức Δ của phương trình bậc hai 2x² - 3x - 5 = 0 có giá trị là:', options: ['49', '-31', '31', '41'], correctAnswer: '49', points: 0.25, competency: 'NL1: Biệt thức phương trình bậc hai' },
      { id: 'p1-11', title: 'Tứ giác MNPQ nội tiếp được đường tròn khi và chỉ khi:', options: ['∠M + ∠P = 180°', '∠M + ∠N = 180°', '∠M = ∠P', '∠N = ∠Q'], correctAnswer: '∠M + ∠P = 180°', points: 0.25, competency: 'NL1: Dấu hiệu tứ giác nội tiếp' },
      { id: 'p1-12', title: 'Rút gọn biểu thức A = √(20) - √(45) + 2√(5) ta được kết quả là:', options: ['√5', '2√5', '3√5', '0'], correctAnswer: '√5', points: 0.25, competency: 'NL1: Rút gọn căn bậc hai' },
    ],
    part2: [
      {
        id: 'p2-1',
        title: 'Cho biểu thức A = [ √x/(√x + 2) + 4/(x - 4) ] : [ (√x - 2)/(√x + 2) ] với x ≥ 0, x ≠ 4.',
        competency: 'NL3: Giải quyết vấn đề biến đổi đại số',
        subQuestions: [
          { label: 'a', text: 'Điều kiện xác định của biểu thức A là x ≥ 0 và x ≠ 4.', correct: true },
          { label: 'b', text: 'Quy đồng mẫu thức trong ngoặc thứ nhất ta được (x - 2√x + 4)/(x - 4).', correct: false },
          { label: 'c', text: 'Kết quả rút gọn của biểu thức A là A = (√x + 2)/(√x - 2).', correct: true },
          { label: 'd', text: 'Giá trị của x để A = 3 là x = 16.', correct: true },
        ],
      },
      {
        id: 'p2-2',
        title: 'Cho hệ phương trình bậc nhất hai ẩn { 3x - y = 7; 2x + 3y = 1 }.',
        competency: 'NL3: Giải quyết vấn đề hệ phương trình',
        subQuestions: [
          { label: 'a', text: 'Hệ phương trình có nghiệm duy nhất vì 3/2 ≠ (-1)/3.', correct: true },
          { label: 'b', text: 'Nhân hai vế của phương trình thứ nhất với 3 ta được 9x - 3y = 21.', correct: true },
          { label: 'c', text: 'Nghiệm duy nhất của hệ phương trình là (x; y) = (2; -1).', correct: true },
          { label: 'd', text: 'Giá trị của biểu thức S = 2x² + y² tại nghiệm của hệ bằng 7.', correct: false },
        ],
      },
    ],
    part3: [
      { id: 'p3-1', title: 'Tính giá trị biểu thức P = √(75) - 3√(12) + √(27) dưới dạng k√3. Tìm giá trị của số nguyên k.', correctAnswer: '2', points: 0.5, competency: 'NL1: Tư duy số học' },
      { id: 'p3-2', title: 'Tìm giá trị của tham số m để phương trình x² - 6x + m = 0 có nghiệm kép.', correctAnswer: '9', points: 0.5, competency: 'NL1: Biệt thức & nghiệm kép' },
      { id: 'p3-3', title: 'Một khinh khí cầu đang bay ở độ cao 150 m nhìn thấy một điểm quan sát trên mặt đất với góc hạ 32°. Khoảng cách từ vị trí quan sát trên mặt đất đến điểm thẳng đứng dưới khinh khí cầu bằng bao nhiêu mét? (Làm tròn đến hàng đơn vị).', correctAnswer: '240', points: 0.5, competency: 'NL2: Mô hình hóa góc lượng giác thực tế' },
      { id: 'p3-4', title: 'Cho tam giác ABC vuông tại A có đường cao AH. Biết HB = 2 cm, HC = 8 cm. Độ dài đường cao AH bằng bao nhiêu cm?', correctAnswer: '4', points: 0.5, competency: 'NL1: Hệ thức lượng trong tam giác vuông' },
    ],
    part4: [
      {
        id: 'p4-1',
        title: 'Bài 1 (1,0 điểm): Giải bài toán bằng cách lập hệ phương trình',
        description: 'Hai tổ công nhân cùng may một loại áo đồng phục học sinh. Nếu hai tổ cùng làm chung thì sau 15 ngày hoàn thành công việc. Nếu tổ thứ nhất làm riêng trong 3 ngày rồi tổ thứ hai làm tiếp trong 5 ngày thì hai tổ may được 1/4 số áo. Hỏi nếu may một mình thì mỗi tổ hoàn thành công việc sau bao nhiêu ngày?',
        competency: 'NL2: Mô hình hóa toán học thực tế',
        points: 1.0,
      },
      {
        id: 'p4-2',
        title: 'Bài 2 (1,5 điểm): Hình học phẳng & Tứ giác nội tiếp',
        description: 'Cho đường tròn (O; R) và điểm A nằm ngoài đường tròn. Kẻ hai tiếp tuyến AB, AC với đường tròn (B, C là hai tiếp điểm). Kẻ cát tuyến ADE không đi qua O (D nằm giữa A và E).\na) Chứng minh tứ giác ABOC nội tiếp đường tròn.\nb) Chứng minh AB² = AD · AE.\nc) Gọi H là giao điểm của AO và BC. Chứng minh tứ giác DHOE nội tiếp.',
        competency: 'NL1, NL5: Lập luận hình học & vẽ hình',
        points: 1.5,
      },
      {
        id: 'p4-3',
        title: 'Bài 3 (0,5 điểm): Bất đẳng thức & Cực trị',
        description: 'Cho hai số thực dương x, y thỏa mãn điều kiện x + y = 2. Tìm giá trị nhỏ nhất của biểu thức P = 1/(x² + y²) + 2/(xy).',
        competency: 'NL3: Giải quyết vấn đề nâng cao & BĐT Cauchy',
        points: 0.5,
      },
    ],
    rubricTable: [
      { question: 'Phần I (Câu 1 - 12)', detail: 'Mỗi câu trắc nghiệm đúng được 0,25 điểm. Đáp án: 1.A, 2.A, 3.A, 4.A, 5.A, 6.A, 7.A, 8.A, 9.A, 10.A, 11.A, 12.A.', points: '3,0 điểm' },
      { question: 'Phần II (Câu 1 & 2)', detail: 'Trắc nghiệm Đúng - Sai. Barem CV 7991: Đúng 1 ý: 0,1đ; Đúng 2 ý: 0,25đ; Đúng 3 ý: 0,5đ; Đúng cả 4 ý: 1,0đ.', points: '2,0 điểm' },
      { question: 'Phần III (Câu 1 - 4)', detail: 'Trả lời ngắn. Câu 1: k = 2; Câu 2: m = 9; Câu 3: 240 m; Câu 4: AH = 4 cm. Mỗi câu đúng được 0,5 điểm.', points: '2,0 điểm' },
      { question: 'Bài 1 (Tự luận)', detail: 'Gọi thời gian tổ 1 làm một mình là x (ngày), tổ 2 là y (ngày). Lập hệ phương trình { 1/x + 1/y = 1/15; 3/x + 5/y = 1/4 }. Giải ra nghiệm (x; y) = (24; 40). Kết luận: Tổ 1: 24 ngày, Tổ 2: 40 ngày.', points: '1,0 điểm' },
      { question: 'Bài 2 (Tự luận)', detail: 'a) ∠ABO = ∠ACO = 90° ⇒ Tứ giác ABOC nội tiếp (0,5đ).\nb) Tam giác ABD đồng dạng tam giác AEB (g-g) ⇒ AB² = AD · AE (0,5đ).\nc) AH · AO = AB² = AD · AE ⇒ ΔAHD đồng dạng ΔAEO ⇒ ∠AHD = ∠AEO ⇒ Tứ giác DHOE nội tiếp (0,5đ).', points: '1,5 điểm' },
      { question: 'Bài 3 (Tự luận)', detail: 'Biến đổi P = [ 1/(x² + y²) + 1/(2xy) ] + 3/(2xy). Áp dụng BĐT Cauchy-Schwarz: 1/(x² + y²) + 1/(2xy) ≥ 4/(x + y)² = 4/4 = 1. Lại có xy ≤ (x + y)²/4 = 1 ⇒ 3/(2xy) ≥ 3/2. Do đó P ≥ 1 + 3/2 = 5/2. Đẳng thức xảy ra khi x = y = 1. Vậy Min P = 5/2.', points: '0,5 điểm' },
    ],
  };
}

// -----------------------------------------------------------------------------
// API ROUTES
// -----------------------------------------------------------------------------

// POST /api/generate-exam-ai (Admin & Teacher Quick AI Exam Generation)
app.post('/api/generate-exam-ai', async (req, res) => {
  const {
    topic = 'Căn thức bậc hai, Hệ phương trình, Đường tròn và Bất đẳng thức',
    semester = 'HỌC KỲ I',
    durationMinutes = 90,
    customRequirements = '',
  } = req.body || {};

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Bạn là chuyên gia khảo thí môn Toán 9 Chương trình GDPT 2018 của Bộ Giáo dục và Đào tạo Việt Nam.
Hãy biên soạn một đề kiểm tra định kỳ hoàn chỉnh CHUẨN 100% THEO CÔNG VĂN SỐ 7991/BGDĐT-GDTrH.
Đơn vị: TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH - TỔ TỰ NHIÊN
Tác giả: Teacher Lê Thanh Tùng
Thời gian làm bài: ${durationMinutes} phút.
Kỳ thi: ${semester}.
Chủ đề trọng tâm: ${topic}.
Yêu cầu riêng từ giáo viên: ${customRequirements || 'Bám sát SGK Toán 9 GDPT 2018'}.

Cấu trúc bắt buộc gồm đúng 4 phần theo CV 7991:
1. PHẦN I. TRẮC NGHIỆM NHIỀU LỰA CHỌN (3,0 điểm): Gồm đúng 12 câu (mỗi câu 4 phương án A, B, C, D, chỉ 1 phương án đúng, 0,25đ/câu).
2. PHẦN II. TRẮC NGHIỆM ĐÚNG - SAI (2,0 điểm): Gồm đúng 2 câu (mỗi câu 4 ý a, b, c, d).
3. PHẦN III. TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 điểm): Gồm đúng 4 câu (kết quả số hoặc biểu thức ngắn, 0,5đ/câu).
4. PHẦN IV. TỰ LUẬN (3,0 điểm):
   - Bài 1 (1,0đ): Giải bài toán bằng cách lập hệ phương trình (toán thực tế, năng suất, chuyển động).
   - Bài 2 (1,5đ): Hình học đường tròn, tiếp tuyến, tứ giác nội tiếp (3 ý a, b, c).
   - Bài 3 (0,5đ): Bất đẳng thức Cauchy hoặc cực trị đại số.

Kèm bảng hướng dẫn chấm chi tiết 3 cột: Câu | Hướng dẫn chi tiết | Điểm.
Trả về định dạng JSON hợp lệ.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const raw = response.text || '';
      try {
        const parsed = JSON.parse(raw);
        if (parsed.part1 && parsed.part1.length >= 8) {
          return res.json({ success: true, exam: parsed, source: 'gemini-3.8-flash' });
        }
      } catch (e) {
        console.warn('JSON parse warning, using fallback template:', e);
      }
    }

    // Fallback if no API key or non-compliant output
    const fallback = generateCurriculumExamFallback(topic, semester, durationMinutes);
    return res.json({ success: true, exam: fallback, source: 'fallback-cv7991' });
  } catch (error: any) {
    console.error('Error generating AI exam:', error);
    const fallback = generateCurriculumExamFallback(topic, semester, durationMinutes);
    return res.json({ success: true, exam: fallback, source: 'fallback-cv7991', warning: error.message });
  }
});

// GET /api/documents
app.get('/api/documents', (req, res) => {
  res.json({ success: true, documents: serverDocuments });
});

// POST /api/upload-document
app.post('/api/upload-document', (req, res) => {
  const { title, category, fileName, fileSize, fileType, dataUrl, uploadedBy, assignedClass, note } = req.body;
  if (!title || !fileName) {
    return res.status(400).json({ success: false, message: 'Thiếu tên tài liệu hoặc tên file' });
  }

  const newDoc: ServerDocument = {
    id: `doc-${Date.now()}`,
    title: title.trim(),
    category: category || 'EXAM_PAPER',
    fileName: fileName.trim(),
    fileSize: fileSize || '1.0 MB',
    fileType: fileType || 'application/octet-stream',
    dataUrl: dataUrl || '',
    uploadedBy: uploadedBy || 'Giáo viên',
    uploadedAt: new Date().toISOString().split('T')[0],
    assignedClass: assignedClass || 'Toàn khối 9',
    note: note || '',
  };

  serverDocuments.unshift(newDoc);
  res.json({ success: true, document: newDoc, message: 'Tải lên tài liệu thành công' });
});

// DELETE /api/documents/:id
app.delete('/api/documents/:id', (req, res) => {
  const { id } = req.params;
  serverDocuments = serverDocuments.filter((d) => d.id !== id);
  res.json({ success: true, message: 'Xóa tài liệu thành công' });
});

// GET /api/version (Update App checker)
app.get('/api/version', (req, res) => {
  res.json({
    version: '2.5.0',
    buildDate: '2026-11-04',
    standard: 'Công văn 7991/BGDĐT-GDTrH',
    author: 'Teacher Lê Thanh Tùng',
    unit: 'Trường TH, THCS Nguyễn Hữu Cảnh',
  });
});

// Start Express server and mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
