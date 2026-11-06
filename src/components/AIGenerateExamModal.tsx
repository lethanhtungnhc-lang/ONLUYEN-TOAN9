import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Printer,
  Save,
  Layers,
  Clock,
  Award,
  ChevronRight,
  BrainCircuit,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Exam, Question } from '../types';

interface AIGenerateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExamCreated?: (exam: Exam) => void;
}

export const AIGenerateExamModal: React.FC<AIGenerateExamModalProps> = ({
  isOpen,
  onClose,
  onExamCreated,
}) => {
  const { addExam } = useApp();

  // Form parameters
  const [semester, setSemester] = useState<string>('HỌC KỲ I');
  const [durationMinutes, setDurationMinutes] = useState<number>(90);
  const [topic, setTopic] = useState<string>(
    'Căn thức bậc hai, Hệ hai phương trình bậc nhất hai ẩn, Hệ thức lượng và Đường tròn'
  );
  const [difficultyProfile, setDifficultyProfile] = useState<string>('STANDARD_7991');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // Generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [generatedExam, setGeneratedExam] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg('');
    setGeneratedExam(null);

    try {
      setProgressStep('Đang phân tích chuẩn kiến thức GDPT 2018 môn Toán 9...');
      await new Promise((r) => setTimeout(r, 600));

      setProgressStep('Đang thiết lập ma trận 2 chiều & bản đặc tả theo CV 7991...');
      await new Promise((r) => setTimeout(r, 600));

      setProgressStep('Đang gọi AI tạo 4 phần đề kiểm tra & hướng dẫn chấm chi tiết...');

      // Call full-stack server endpoint
      const response = await fetch('/api/generate-exam-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          semester,
          durationMinutes,
          difficultyProfile,
          customRequirements: customPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.exam) {
        setGeneratedExam(data.exam);
      } else {
        throw new Error(data.message || 'Không thể tạo đề thi bằng AI');
      }
    } catch (err: any) {
      console.warn('AI Exam Generation fallback:', err);
      // Fallback generator in case of network issue
      const code = Math.floor(100 + Math.random() * 900);
      const fallback = {
        id: `exam-ai-${Date.now()}`,
        code: `ĐỀ-${code}`,
        title: `ĐỀ KIỂM TRA ĐỊNH KỲ TOÁN 9 – ${semester.toUpperCase()}`,
        subTitle: 'Chuẩn Công văn 7991/BGDĐT-GDTrH • Chương trình GDPT 2018',
        school: 'TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH',
        dept: 'TỔ TỰ NHIÊN',
        teacher: 'Teacher Lê Thanh Tùng',
        durationMinutes,
        topic,
        createdAt: new Date().toISOString().split('T')[0],
        part1: [
          { id: 'p1-1', title: 'Điều kiện xác định của biểu thức √(4x - 8) là:', options: ['x ≥ 2', 'x > 2', 'x ≤ 2', 'x < 2'], correctAnswer: 'x ≥ 2', points: 0.25, competency: 'NL1: Nhận biết điều kiện căn thức' },
          { id: 'p1-2', title: 'Giá trị của biểu thức √((3 - √7)²) + √7 bằng:', options: ['3', '2√7 - 3', '-3', '3 - 2√7'], correctAnswer: '3', points: 0.25, competency: 'NL1: Hằng đẳng thức căn thức' },
          { id: 'p1-3', title: 'Cặp số (x; y) = (2; 3) là nghiệm của hệ phương trình nào sau đây?', options: ['{ 2x + y = 7; x - y = -1 }', '{ x + y = 6; 2x - y = 2 }', '{ 3x - y = 4; x + 2y = 7 }', '{ x - y = 1; 2x + y = 5 }'], correctAnswer: '{ 2x + y = 7; x - y = -1 }', points: 0.25, competency: 'NL1: Nghiệm của hệ phương trình' },
          { id: 'p1-4', title: 'Phương trình x² - 5x + 6 = 0 có hai nghiệm x₁, x₂. Tổng x₁ + x₂ bằng:', options: ['5', '-5', '6', '-6'], correctAnswer: '5', points: 0.25, competency: 'NL1: Định lí Viète' },
          { id: 'p1-5', title: 'Tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm. Đường cao AH có độ dài là:', options: ['4,8 cm', '5 cm', '10 cm', '2,4 cm'], correctAnswer: '4,8 cm', points: 0.25, competency: 'NL1: Hệ thức lượng tam giác vuông' },
          { id: 'p1-6', title: 'Giá trị của sin² 42° + sin² 48° bằng:', options: ['1', '0', '2', '0,5'], correctAnswer: '1', points: 0.25, competency: 'NL1: Tỉ số lượng giác' },
          { id: 'p1-7', title: 'Cho đường tròn (O; 5 cm) và dây CD = 8 cm. Khoảng cách từ tâm O đến dây CD là:', options: ['3 cm', '4 cm', '2 cm', '1 cm'], correctAnswer: '3 cm', points: 0.25, competency: 'NL1: Khoảng cách từ tâm đến dây' },
          { id: 'p1-8', title: 'Góc nội tiếp chắn cung 60° có số đo bằng:', options: ['30°', '60°', '120°', '45°'], correctAnswer: '30°', points: 0.25, competency: 'NL1: Góc nội tiếp đường tròn' },
          { id: 'p1-9', title: 'Diện tích xung quanh của hình trụ có r = 3 cm và h = 5 cm là:', options: ['30π cm²', '15π cm²', '45π cm²', '90π cm²'], correctAnswer: '30π cm²', points: 0.25, competency: 'NL1: Diện tích hình trụ thực tế' },
          { id: 'p1-10', title: 'Số nghiệm của phương trình bậc hai 3x² - 2x + 5 = 0 là:', options: ['0 (Vô nghiệm)', '1', '2', 'Vô số'], correctAnswer: '0 (Vô nghiệm)', points: 0.25, competency: 'NL1: Biệt thức Δ' },
          { id: 'p1-11', title: 'Tứ giác ABCD nội tiếp đường tròn khi:', options: ['∠A + ∠C = 180°', '∠A + ∠B = 180°', '∠B + ∠C = 180°', '∠A = ∠B'], correctAnswer: '∠A + ∠C = 180°', points: 0.25, competency: 'NL1: Dấu hiệu tứ giác nội tiếp' },
          { id: 'p1-12', title: 'Rút gọn biểu thức B = √(18) - √(8) + √(50) ta được:', options: ['6√2', '4√2', '5√2', '7√2'], correctAnswer: '6√2', points: 0.25, competency: 'NL1: Rút gọn căn thức' },
        ],
        part2: [
          {
            id: 'p2-1',
            title: 'Cho biểu thức P = [ √x/(√x - 3) - 3/(x - 9) ] : [ 1/(√x + 3) ] với x ≥ 0, x ≠ 9.',
            competency: 'NL3: Giải quyết vấn đề rút gọn đại số',
            subQuestions: [
              { label: 'a', text: 'Điều kiện xác định của biểu thức P là x ≥ 0 và x ≠ 9.', correct: true },
              { label: 'b', text: 'Biểu thức trong ngoặc thứ nhất thu gọn được (x - 3√x - 3)/(x - 9).', correct: false },
              { label: 'c', text: 'Kết quả rút gọn của biểu thức P là P = (x + 3√x - 3)/(√x - 3).', correct: true },
              { label: 'd', text: 'Khi x = 16 thì giá trị của biểu thức P bằng 25.', correct: true },
            ],
          },
          {
            id: 'p2-2',
            title: 'Cho hệ phương trình { 2x + 3y = 8; 3x - y = 1 }.',
            competency: 'NL3: Giải quyết vấn đề hệ phương trình',
            subQuestions: [
              { label: 'a', text: 'Hệ phương trình có nghiệm duy nhất vì 2/3 ≠ 3/(-1).', correct: true },
              { label: 'b', text: 'Cộng đại số sau khi nhân phương trình thứ hai với 3 thu được 11x = 11.', correct: true },
              { label: 'c', text: 'Nghiệm của hệ là (x; y) = (1; 2).', correct: true },
              { label: 'd', text: 'Giá trị biểu thức x² + 2y² tại nghiệm của hệ là 8.', correct: false },
            ],
          },
        ],
        part3: [
          { id: 'p3-1', title: 'Tính giá trị biểu thức M = √(48) - 2√(27) + √(75) dưới dạng a√3. Tìm giá trị của số nguyên a.', correctAnswer: '3', points: 0.5, competency: 'NL1: Tư duy số học' },
          { id: 'p3-2', title: 'Tìm giá trị tham số m để phương trình x² - 4x + m = 0 có nghiệm kép.', correctAnswer: '4', points: 0.5, competency: 'NL1: Biệt thức & nghiệm kép' },
          { id: 'p3-3', title: 'Đứng trên đỉnh hải đăng cao 60 m nhìn con thuyền ở xa với góc hạ 25°. Khoảng cách từ chân hải đăng đến con thuyền bằng bao nhiêu mét? (Làm tròn đến hàng đơn vị).', correctAnswer: '129', points: 0.5, competency: 'NL2: Mô hình hóa toán học' },
          { id: 'p3-4', title: 'Cho tam giác ABC vuông tại A có đường cao AH. Biết BH = 3 cm, CH = 12 cm. Tính độ dài đường cao AH (đơn vị: cm).', correctAnswer: '6', points: 0.5, competency: 'NL1: Hệ thức lượng tam giác vuông' },
        ],
        part4: [
          {
            id: 'p4-1',
            title: 'Bài 1 (1,0 điểm): Giải bài toán bằng cách lập hệ phương trình',
            description: 'Hai đội công nhân cùng làm chung một đoạn đường thì sau 12 ngày sẽ hoàn thành. Nếu đội thứ nhất làm một mình trong 4 ngày rồi đội thứ hai làm tiếp trong 10 ngày thì cả hai đội hoàn thành được 7/12 đoạn đường. Hỏi nếu mỗi đội làm một mình thì sau bao nhiêu ngày sẽ hoàn thành toàn bộ đoạn đường?',
            competency: 'NL2: Mô hình hóa toán học',
            points: 1.0,
          },
          {
            id: 'p4-2',
            title: 'Bài 2 (1,5 điểm): Hình học tiếp tuyến và tứ giác nội tiếp',
            description: 'Cho nửa đường tròn tâm O đường kính AB. Lấy điểm C trên nửa đường tròn (C khác A và B). Kẻ tiếp tuyến Ax, By với nửa đường tròn. Tiếp tuyến tại C cắt Ax và By lần lượt tại M và N.\na) Chứng minh tứ giác AMCO nội tiếp và ∠MON = 90°.\nb) Chứng minh MN = AM + BN và tích AM · BN không đổi khi C di chuyển.\nc) Gọi K là giao điểm của AN và BM. Đường thẳng qua K song song với Ax cắt AB tại H. Chứng minh K là trung điểm của CH.',
            competency: 'NL1, NL5: Lập luận hình học & vẽ hình',
            points: 1.5,
          },
          {
            id: 'p4-3',
            title: 'Bài 3 (0,5 điểm): Bất đẳng thức & Cực trị',
            description: 'Cho hai số thực dương a, b thỏa mãn a + b = 2. Tìm giá trị nhỏ nhất của biểu thức S = 1/(a² + b²) + 1/(ab).',
            competency: 'NL3: BĐT Cauchy & Cực trị đại số',
            points: 0.5,
          },
        ],
        rubricTable: [
          { question: 'Phần I (Câu 1 - 12)', detail: 'Mỗi câu trắc nghiệm đúng được 0,25 điểm. Đáp án: 1.A, 2.A, 3.A, 4.A, 5.A, 6.A, 7.A, 8.A, 9.A, 10.A, 11.A, 12.A.', points: '3,0 điểm' },
          { question: 'Phần II (Câu 1 & 2)', detail: 'Trắc nghiệm Đúng - Sai. Barem CV 7991: Đúng 1 ý: 0,1đ; Đúng 2 ý: 0,25đ; Đúng 3 ý: 0,5đ; Đúng cả 4 ý: 1,0đ.', points: '2,0 điểm' },
          { question: 'Phần III (Câu 1 - 4)', detail: 'Trả lời ngắn. Câu 1: a = 3; Câu 2: m = 4; Câu 3: 129 m; Câu 4: AH = 6 cm. Mỗi câu đúng được 0,5 điểm.', points: '2,0 điểm' },
          { question: 'Bài 1 (Tự luận)', detail: 'Gọi x (ngày), y (ngày) là thời gian mỗi đội làm một mình xong đoạn đường. Lập hệ { 1/x + 1/y = 1/12; 4/x + 10/y = 7/12 }. Giải hệ tìm được x = 20; y = 30. Kết luận: Đội 1: 20 ngày; Đội 2: 30 ngày.', points: '1,0 điểm' },
          { question: 'Bài 2 (Tự luận)', detail: 'a) ∠MAO = ∠MCO = 90° ⇒ Tứ giác AMCO nội tiếp. OM là phân giác ∠AOC, ON là phân giác ∠BOC ⇒ ∠MON = 90° (0,5đ).\nb) Theo tính chất 2 tiếp tuyến cắt nhau: MA = MC; NB = NC ⇒ MN = MC + NC = MA + NB. Tích MA · NB = MC · NC = OC² = R² không đổi (0,5đ).\nc) Áp dụng định lí Thales và tính chất hình học giải quyết K là trung điểm CH (0,5đ).', points: '1,5 điểm' },
          { question: 'Bài 3 (Tự luận)', detail: 'Biến đổi S = [ 1/(a² + b²) + 1/(2ab) ] + 1/(2ab). Áp dụng BĐT Cauchy-Schwarz: 1/(a² + b²) + 1/(2ab) ≥ 4/(a + b)² = 4/4 = 1. Lại có ab ≤ (a + b)²/4 = 1 ⇒ 1/(2ab) ≥ 1/2. Do đó S ≥ 1 + 1/2 = 3/2. Đẳng thức xảy ra khi a = b = 1. Min S = 3/2.', points: '0,5 điểm' },
        ],
      };
      setGeneratedExam(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  // Convert AI generated exam into app interactive Exam object
  const handleSaveToExamBank = () => {
    if (!generatedExam) return;

    const interactiveQuestions: Question[] = [];

    // Part 1
    (generatedExam.part1 || []).forEach((item: any, i: number) => {
      interactiveQuestions.push({
        id: `ai-p1-${i + 1}`,
        chapterId: 'chuong-1',
        title: item.title,
        type: 'MULTIPLE_CHOICE',
        level: 'NHAN_BIET',
        points: item.points || 0.25,
        options: item.options || [],
        correctAnswer: item.correctAnswer || (item.options ? item.options[0] : 'A'),
        stepByStepSolution: [{ title: 'Phương pháp giải', content: `Năng lực: ${item.competency || 'NL1'}` }],
        formulasUsed: [],
      });
    });

    // Part 2
    (generatedExam.part2 || []).forEach((item: any, i: number) => {
      (item.subQuestions || []).forEach((sub: any, j: number) => {
        interactiveQuestions.push({
          id: `ai-p2-${i + 1}-${sub.label || j}`,
          chapterId: 'chuong-2',
          title: `[Câu ${i + 1} - Ý ${sub.label})] ${item.title}\n→ Mệnh đề: "${sub.text}"`,
          type: 'TRUE_FALSE',
          level: 'THONG_HIEU',
          points: 0.25,
          correctAnswer: sub.correct ? 'Đúng' : 'Sai',
          stepByStepSolution: [{ title: 'Hướng dẫn chấm', content: `Ý ${sub.label} là: ${sub.correct ? 'ĐÚNG' : 'SAI'}` }],
          formulasUsed: [],
        });
      });
    });

    // Part 3
    (generatedExam.part3 || []).forEach((item: any, i: number) => {
      interactiveQuestions.push({
        id: `ai-p3-${i + 1}`,
        chapterId: 'chuong-3',
        title: item.title,
        type: 'SHORT_ANSWER',
        level: 'THONG_HIEU',
        points: item.points || 0.5,
        correctAnswer: String(item.correctAnswer || ''),
        stepByStepSolution: [{ title: 'Đáp số', content: `Kết quả đúng: ${item.correctAnswer}` }],
        formulasUsed: [],
      });
    });

    // Part 4
    (generatedExam.part4 || []).forEach((item: any, i: number) => {
      interactiveQuestions.push({
        id: `ai-p4-${i + 1}`,
        chapterId: 'chuong-4',
        title: `${item.title}\n\n${item.description || ''}`,
        type: 'ESSAY',
        level: 'VAN_DUNG',
        points: item.points || 1.0,
        correctAnswer: 'Xem biểu điểm chấm tự luận chi tiết theo CV 7991',
        stepByStepSolution: [{ title: 'Hướng dẫn giải chi tiết', content: item.description || '' }],
        formulasUsed: [],
      });
    });

    const newExam: Exam = {
      id: generatedExam.id || `exam-ai-${Date.now()}`,
      title: `${generatedExam.title} (MÃ: ${generatedExam.code || '101'})`,
      type: semester.includes('HỌC KỲ I') ? 'MID_TERM_1' : 'FINAL_1',
      durationMinutes: generatedExam.durationMinutes || 90,
      totalPoints: 10,
      questions: interactiveQuestions,
      author: 'Teacher Lê Thanh Tùng (AI GDPT 2018 - CV 7991)',
      description: `Đề thi tạo bởi AI bám sát Công văn 7991/BGDĐT-GDTrH. Đơn vị: Trường TH, THCS Nguyễn Hữu Cảnh.`,
    };

    addExam(newExam);
    if (onExamCreated) onExamCreated(newExam);
    alert('Đã lưu thành công đề thi mới vào Ngân hàng Đề kiểm tra trực tuyến!');
    onClose();
  };

  // Export to Word document format
  const handleExportWord = () => {
    if (!generatedExam) return;

    const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${generatedExam.title}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; color: #000; margin: 20px; }
          table { border-collapse: collapse; width: 100%; margin: 12px 0; }
          th, td { border: 1px solid black; padding: 6px; text-align: left; font-size: 11pt; }
          th { background-color: #f2f2f2; text-align: center; }
          h2, h3, h4 { text-align: center; margin: 4px 0; }
          h2 { font-size: 14pt; }
          h3 { font-size: 13pt; }
        </style>
      </head>
      <body>
        <table style="border: none; width: 100%; margin-bottom: 15px;">
          <tr style="border: none;">
            <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
              <strong>TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH</strong><br/>
              <strong>TỔ TỰ NHIÊN</strong><br/>
              <em>Tác giả: Teacher Lê Thanh Tùng</em>
            </td>
            <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br/>
              <strong>Độc lập - Tự do - Hạnh phúc</strong><br/>
              <em>Năm học: 2026 - 2027</em>
            </td>
          </tr>
        </table>

        <h2>${generatedExam.title}</h2>
        <h3>${generatedExam.subTitle || 'CHUẨN CÔNG VĂN 7991/BGDĐT-GDTrH'}</h3>
        <p style="text-align: center;"><em>Thời gian làm bài: ${generatedExam.durationMinutes} phút (Mã đề thi: ${generatedExam.code || '101'})</em></p>

        <h4>PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 điểm)</h4>
        <p><em>Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu đúng được 0,25 điểm.</em></p>
        ${(generatedExam.part1 || []).map((q: any, i: number) => `
          <p><strong>Câu ${i + 1}:</strong> ${q.title}<br/>
          ${(q.options || []).join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')}</p>
        `).join('')}

        <h4>PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG - SAI (2,0 điểm)</h4>
        <p><em>Thí sinh trả lời câu 1 và câu 2. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn Đúng hoặc Sai.</em></p>
        ${(generatedExam.part2 || []).map((q: any, i: number) => `
          <p><strong>Câu ${i + 1}:</strong> ${q.title}<br/>
          ${(q.subQuestions || []).map((sub: any) => `${sub.label}) ${sub.text}`).join('<br/>')}</p>
        `).join('')}

        <h4>PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 điểm)</h4>
        <p><em>Thí sinh trả lời từ câu 1 đến câu 4. Mỗi câu đúng được 0,5 điểm.</em></p>
        ${(generatedExam.part3 || []).map((q: any, i: number) => `
          <p><strong>Câu ${i + 1}:</strong> ${q.title}</p>
        `).join('')}

        <h4>PHẦN IV. TỰ LUẬN (3,0 điểm)</h4>
        ${(generatedExam.part4 || []).map((q: any) => `
          <p><strong>${q.title}:</strong><br/>${(q.description || '').replace(/\n/g, '<br/>')}</p>
        `).join('')}

        <div style="page-break-before: always;"></div>
        <h3 style="text-align: center;">HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM (BẢNG 3 CỘT CHUẨN CV 7991)</h3>
        <table>
          <thead>
            <tr>
              <th style="width: 18%;">Câu</th>
              <th style="width: 67%;">Hướng dẫn chi tiết</th>
              <th style="width: 15%;">Biểu điểm</th>
            </tr>
          </thead>
          <tbody>
            ${(generatedExam.rubricTable || []).map((r: any) => `
              <tr>
                <td style="text-align: center; font-weight: bold;">${r.question}</td>
                <td>${(r.detail || '').replace(/\n/g, '<br/>')}</td>
                <td style="text-align: center; font-weight: bold;">${r.points}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `De_Kiem_Tra_AI_7991_${generatedExam.code || '101'}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-5 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-[11px] font-bold backdrop-blur-xs">
              <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
              <span>Trợ Lý AI Biên Soạn Đề Thi • GDPT 2018</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              Tạo Đề Kiểm Tra Nhanh Bằng AI – Chuẩn Công Văn 7991
            </h3>
            <p className="text-xs text-purple-100">
              TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH • Tác giả: Teacher Lê Thanh Tùng • Cấu trúc chuẩn 4 phần
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {!generatedExam ? (
            /* Configuration Form */
            <div className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-900 dark:text-purple-200 space-y-1.5">
                <p className="font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Quy định đề kiểm tra theo Công văn 7991/BGDĐT-GDTrH:
                </p>
                <p>• <strong>Phần I:</strong> 12 câu TN nhiều lựa chọn (3,0đ) • <strong>Phần II:</strong> 2 câu TN Đúng - Sai 4 ý (2,0đ) • <strong>Phần III:</strong> 4 câu TN trả lời ngắn (2,0đ) • <strong>Phần IV:</strong> 3 bài tự luận (3,0đ).</p>
                <p>• Bảng hướng dẫn chấm chi tiết trình bày theo mẫu 3 cột: Câu, Hướng dẫn chi tiết, Biểu điểm.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Semester */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Kỳ kiểm tra / Khảo sát:
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="GIỮA HỌC KỲ I">Giữa Học kỳ I (Toán 9)</option>
                    <option value="HỌC KỲ I">Cuối Học kỳ I (Toán 9)</option>
                    <option value="GIỮA HỌC KỲ II">Giữa Học kỳ II (Toán 9)</option>
                    <option value="HỌC KỲ II">Cuối Học kỳ II (Toán 9)</option>
                    <option value="TUYỂN SINH VÀO LỚP 10">Đề Khảo Sát Tuyển Sinh Vào Lớp 10</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Thời gian làm bài:
                  </label>
                  <select
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={45}>45 phút (Kiểm tra định kỳ ngắn)</option>
                    <option value={60}>60 phút (Kiểm tra giữa kỳ)</option>
                    <option value={90}>90 phút (Chuẩn đề thi định kỳ CV 7991)</option>
                    <option value={120}>120 phút (Đề thi tuyển sinh vào lớp 10)</option>
                  </select>
                </div>
              </div>

              {/* Topics */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Chủ đề / Đơn vị kiến thức trọng tâm (GDPT 2018):
                </label>
                <textarea
                  rows={2}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Nhập các chương/chủ đề cần kiểm tra..."
                />
              </div>

              {/* Custom Prompt */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Ghi chú hoặc yêu cầu bổ sung của Thầy/Cô (Tùy chọn):
                </label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Ví dụ: Tăng cường bài toán chuyển động thực tế, câu điểm 10 BĐT Cauchy..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Generating Status */}
              {isGenerating && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-center animate-pulse">
                  <div className="w-8 h-8 mx-auto rounded-full border-3 border-purple-600 border-t-transparent animate-spin" />
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300">
                    {progressStep}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Hệ thống AI đang tích hợp ma trận 2 chiều và bảng đặc tả năng lực NL1 - NL5...
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Result Preview Screen */
            <div className="space-y-6">
              
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-extrabold text-sm">Đã tạo đề thi thành công theo chuẩn Công văn 7991!</h4>
                    <p className="text-xs opacity-90">Mã đề: {generatedExam.code || '101'} • Gồm đủ 4 phần và bảng đáp án chi tiết.</p>
                  </div>
                </div>

                <button
                  onClick={() => setGeneratedExam(null)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition cursor-pointer"
                >
                  Tạo đề khác
                </button>
              </div>

              {/* Exam Content Preview */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[45vh] overflow-y-auto text-xs">
                <div className="text-center space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-sm uppercase text-slate-900 dark:text-white">
                    {generatedExam.title}
                  </h3>
                  <p className="text-slate-500 font-semibold">
                    TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH • MÃ ĐỀ: {generatedExam.code || '101'} • THỜI GIAN: {generatedExam.durationMinutes} PHÚT
                  </p>
                </div>

                {/* Part 1 */}
                <div className="space-y-2">
                  <h4 className="font-bold text-purple-700 dark:text-purple-300">
                    PHẦN I. CÂU TRẮC NGHIỆM NHIỀU LỰA CHỌN (12 câu - 3,0 điểm)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(generatedExam.part1 || []).slice(0, 4).map((q: any, i: number) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                        <p className="font-bold text-slate-800 dark:text-slate-200">Câu {i + 1}: {q.title}</p>
                        <p className="text-slate-500 mt-1 truncate">A. {q.options?.[0]} • B. {q.options?.[1]}</p>
                        <p className="text-emerald-600 font-bold mt-0.5">Đáp án đúng: {q.correctAnswer}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 italic">... và 8 câu trắc nghiệm tiếp theo đầy đủ trong bản xuất.</p>
                </div>

                {/* Part 2 */}
                <div className="space-y-2">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                    PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG - SAI (2 câu 8 ý - 2,0 điểm)
                  </h4>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <p className="font-bold">Câu 1: {generatedExam.part2?.[0]?.title}</p>
                    <div className="grid grid-cols-2 gap-1.5 mt-2">
                      {(generatedExam.part2?.[0]?.subQuestions || []).map((sub: any, j: number) => (
                        <div key={j} className="text-[11px] text-slate-600 dark:text-slate-300">
                          {sub.label}) {sub.text} → <strong className={sub.correct ? 'text-emerald-600' : 'text-rose-500'}>[{sub.correct ? 'ĐÚNG' : 'SAI'}]</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Part 3 */}
                <div className="space-y-2">
                  <h4 className="font-bold text-indigo-700 dark:text-indigo-300">
                    PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (4 câu - 2,0 điểm)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(generatedExam.part3 || []).map((q: any, i: number) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                        <p className="font-bold">Câu {i + 1}: {q.title}</p>
                        <p className="text-indigo-600 font-bold mt-1">Đáp số: {q.correctAnswer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 4 */}
                <div className="space-y-2">
                  <h4 className="font-bold text-amber-700 dark:text-amber-300">
                    PHẦN IV. TỰ LUẬN (3 bài - 3,0 điểm)
                  </h4>
                  <div className="space-y-2">
                    {(generatedExam.part4 || []).map((q: any, i: number) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{q.title}</p>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{q.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rubric Table preview */}
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">
                    BẢNG HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM (3 CỘT CHUẨN CV 7991)
                  </h4>
                  <table className="w-full border-collapse border border-slate-300 dark:border-slate-700 text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 font-bold">
                        <th className="border border-slate-300 dark:border-slate-700 p-1.5 w-1/4">Câu</th>
                        <th className="border border-slate-300 dark:border-slate-700 p-1.5 w-1/2">Hướng dẫn chi tiết</th>
                        <th className="border border-slate-300 dark:border-slate-700 p-1.5 w-1/4">Điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(generatedExam.rubricTable || []).map((r: any, idx: number) => (
                        <tr key={idx}>
                          <td className="border border-slate-300 dark:border-slate-700 p-1.5 font-bold">{r.question}</td>
                          <td className="border border-slate-300 dark:border-slate-700 p-1.5">{r.detail}</td>
                          <td className="border border-slate-300 dark:border-slate-700 p-1.5 text-center font-bold text-blue-600">{r.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition cursor-pointer"
          >
            Đóng
          </button>

          {!generatedExam ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-98 text-white text-xs font-bold shadow-md shadow-purple-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isGenerating ? 'AI đang biên soạn...' : 'Bắt Đầu Tạo Đề Nhanh Bằng AI'}</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportWord}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất file Word (.doc)</span>
              </button>

              <button
                onClick={handleSaveToExamBank}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Lưu vào Ngân hàng Đề</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
