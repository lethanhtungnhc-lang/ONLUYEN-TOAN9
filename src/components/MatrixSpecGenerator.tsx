import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  Layers,
  CheckCircle2,
  FileText,
  RotateCcw,
  BookOpen,
  Info,
  Award,
  HelpCircle
} from 'lucide-react';
import { MathView } from './MathView';

// ==========================================
// ĐỊNH NGHĨA DỮ LIỆU THEO CÔNG VĂN 7991/BGDĐT-GDTrH
// ==========================================

interface MatrixRow7991 {
  id: number;
  topic: string;
  subtopic: string;
  // TNKQ Nhiều lựa chọn (Phần I - 3,0đ / 30%)
  mc_biet: number;
  mc_hieu: number;
  mc_vandung: number;
  // TNKQ Đúng - Sai (Phần II - 2,0đ / 20%)
  tf_biet: number;
  tf_hieu: number;
  tf_vandung: number;
  // TNKQ Trả lời ngắn (Phần III - 2,0đ / 20%)
  sa_biet: number;
  sa_hieu: number;
  sa_vandung: number;
  // Tự luận (Phần IV - 3,0đ / 30%)
  tl_biet: number;
  tl_hieu: number;
  tl_vandung: number;
}

const DEFAULT_MATRIX_7991: MatrixRow7991[] = [
  {
    id: 1,
    topic: '1. Căn bậc hai và căn bậc ba',
    subtopic: 'Căn thức bậc hai, hằng đẳng thức căn, trục căn thức ở mẫu, biến đổi rút gọn biểu thức',
    mc_biet: 2, mc_hieu: 1, mc_vandung: 0,
    tf_biet: 1, tf_hieu: 0, tf_vandung: 0,
    sa_biet: 1, sa_hieu: 0, sa_vandung: 0,
    tl_biet: 0, tl_hieu: 0, tl_vandung: 0,
  },
  {
    id: 2,
    topic: '2. Phương trình & Hệ 2 phương trình bậc nhất 2 ẩn',
    subtopic: 'Khái niệm, giải hệ phương trình bằng PP thế và PP cộng đại số, giải bài toán bằng cách lập hệ phương trình',
    mc_biet: 2, mc_hieu: 0, mc_vandung: 0,
    tf_biet: 0, tf_hieu: 1, tf_vandung: 0,
    sa_biet: 0, sa_hieu: 0, sa_vandung: 0,
    tl_biet: 0, tl_hieu: 1, tl_vandung: 0,
  },
  {
    id: 3,
    topic: '3. Phương trình bậc hai một ẩn & Định lí Viète',
    subtopic: 'Công thức nghiệm, định lí Viète và ứng dụng nhẩm nghiệm, hệ thức đối xứng và bài toán tham số m',
    mc_biet: 1, mc_hieu: 1, mc_vandung: 0,
    tf_biet: 0, tf_hieu: 0, tf_vandung: 0,
    sa_biet: 0, sa_hieu: 0, sa_vandung: 1,
    tl_biet: 0, tl_hieu: 0, tl_vandung: 0,
  },
  {
    id: 4,
    topic: '4. Hệ thức lượng & Đường tròn',
    subtopic: 'Tỉ số lượng giác góc nhọn, vị trí tương đối của đường thẳng và đường tròn, tiếp tuyến, góc nội tiếp, tứ giác nội tiếp',
    mc_biet: 2, mc_hieu: 1, mc_vandung: 0,
    tf_biet: 0, tf_hieu: 0, tf_vandung: 0,
    sa_biet: 1, sa_hieu: 0, sa_vandung: 0,
    tl_biet: 0, tl_hieu: 0, tl_vandung: 1,
  },
  {
    id: 5,
    topic: '5. Hình khối thực tiễn, Bất đẳng thức & Cực trị',
    subtopic: 'Hình trụ, hình nón, hình cầu trong đời sống; Bất đẳng thức Cauchy và tìm GTLN, GTNN',
    mc_biet: 1, mc_hieu: 1, mc_vandung: 0,
    tf_biet: 0, tf_hieu: 0, tf_vandung: 0,
    sa_biet: 0, sa_hieu: 0, sa_vandung: 1,
    tl_biet: 0, tl_hieu: 0, tl_vandung: 1,
  },
];

interface SpecItem7991 {
  id: number;
  topic: string;
  subtopic: string;
  competencies: string; // Mã năng lực theo CV 7991
  reqBiet: string;
  reqHieu: string;
  reqVanDung: string;
  // Số câu ở các phần
  mcBiet: number; mcHieu: number; mcVanDung: number;
  tfBiet: number; tfHieu: number; tfVanDung: number;
  saBiet: number; saHieu: number; saVanDung: number;
  tlBiet: number; tlHieu: number; tlVanDung: number;
  // Năng lực và nhãn chi tiết tương ứng từng ô câu hỏi theo Công văn 7991
  mcBietComp?: string;
  mcHieuComp?: string;
  mcVanDungComp?: string;
  tfBietComp?: string;
  tfHieuComp?: string;
  tfVanDungComp?: string;
  saBietComp?: string;
  saHieuComp?: string;
  saVanDungComp?: string;
  tlBietComp?: string;
  tlHieuComp?: string;
  tlVanDungComp?: string;
  tlHieuLabel?: string;
  tlVanDungLabel?: string;
}

const DEFAULT_SPEC_7991: SpecItem7991[] = [
  {
    id: 1,
    topic: 'Căn bậc hai và căn bậc ba',
    subtopic: 'Căn thức bậc hai, tính chất và rút gọn biểu thức chứa căn',
    competencies: 'NL1 (Tư duy & lập luận), NL4 (Giao tiếp toán học)',
    reqBiet: 'Nhận biết điều kiện xác định của biểu thức √(A). Nhận biết hằng đẳng thức √(A²) = |A|. Tính giá trị căn bậc hai số học của một số dương.',
    reqHieu: 'Thực hiện được các phép biến đổi đơn giản: đưa thừa số ra ngoài/vào trong dấu căn, trục căn thức ở mẫu. Rút gọn biểu thức chứa căn bậc hai số học.',
    reqVanDung: 'Vận dụng rút gọn biểu thức đại số chứa căn phức hợp, tìm giá trị của biến để biểu thức nguyên hoặc đạt giá trị thỏa mãn điều kiện cho trước.',
    mcBiet: 2, mcBietComp: 'NL1: Tư duy & lập luận',
    mcHieu: 1, mcHieuComp: 'NL1: Tính toán căn thức',
    mcVanDung: 0,
    tfBiet: 1, tfBietComp: 'NL1, NL4: Giao tiếp toán học',
    tfHieu: 0, tfVanDung: 0,
    saBiet: 1, saBietComp: 'NL1: Rút gọn số học',
    saHieu: 0, saVanDung: 0,
    tlBiet: 0, tlHieu: 0, tlVanDung: 0,
  },
  {
    id: 2,
    topic: 'Hệ hai phương trình bậc nhất hai ẩn',
    subtopic: 'Giải hệ phương trình và ứng dụng bài toán thực tiễn',
    competencies: 'NL2 (Mô hình hóa toán học), NL3 (Giải quyết vấn đề)',
    reqBiet: 'Nhận biết nghiệm của phương trình bậc nhất hai ẩn và hệ hai phương trình bậc nhất hai ẩn dạng tổng quát.',
    reqHieu: 'Giải được hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế hoặc phương pháp cộng đại số.',
    reqVanDung: 'Giải quyết được một số vấn đề thực tiễn gắn với hệ phương trình (bài toán chuyển động, bài toán năng suất, kinh tế, tỉ số phần trăm).',
    mcBiet: 2, mcBietComp: 'NL1: Nhận biết nghiệm hệ',
    mcHieu: 0, mcVanDung: 0,
    tfBiet: 0,
    tfHieu: 1, tfHieuComp: 'NL3: Giải quyết vấn đề',
    tfVanDung: 0,
    saBiet: 0, saHieu: 0, saVanDung: 0,
    tlBiet: 0,
    tlHieu: 1, tlHieuLabel: '1 bài (1,0đ)', tlHieuComp: 'NL2: Mô hình hóa toán học',
    tlVanDung: 0,
  },
  {
    id: 3,
    topic: 'Phương trình bậc hai một ẩn và định lí Viète',
    subtopic: 'Công thức nghiệm, định lí Viète và hệ thức nghiệm',
    competencies: 'NL1 (Tư duy toán học), NL3 (Giải quyết vấn đề)',
    reqBiet: 'Nhận biết dạng tổng quát ax² + bx + c = 0 (a ≠ 0). Nhận biết biệt thức Δ = b² - 4ac và điều kiện có nghiệm.',
    reqHieu: 'Vận dụng công thức nghiệm hoặc định lí Viète để tính tổng S = -b/a và tích P = c/a của hai nghiệm mà không cần giải phương trình.',
    reqVanDung: 'Tìm giá trị của tham số m để phương trình có hai nghiệm thỏa mãn biểu thức đối xứng hoặc điều kiện về dấu của nghiệm.',
    mcBiet: 1, mcBietComp: 'NL1: Nhận biết hệ số & nghiệm',
    mcHieu: 1, mcHieuComp: 'NL1: Ứng dụng hệ thức Viète',
    mcVanDung: 0,
    tfBiet: 0, tfHieu: 0, tfVanDung: 0,
    saBiet: 0, saHieu: 0,
    saVanDung: 1, saVanDungComp: 'NL3: Giải quyết vấn đề tham số',
    tlBiet: 0, tlHieu: 0, tlVanDung: 0,
  },
  {
    id: 4,
    topic: 'Hệ thức lượng & Đường tròn',
    subtopic: 'Tỉ số lượng giác, tiếp tuyến, góc nội tiếp và tứ giác nội tiếp',
    competencies: 'NL1 (Lập luận hình học), NL5 (Sử dụng công cụ vẽ hình)',
    reqBiet: 'Nhận biết định nghĩa tỉ số lượng giác sin, cos, tan, cot. Nhận biết tính chất của tiếp tuyến và góc nội tiếp chắn nửa đường tròn.',
    reqHieu: 'Tính được độ dài đoạn thẳng, tỉ số lượng giác trong tam giác vuông. Chứng minh được tứ giác nội tiếp bằng dấu hiệu tổng hai góc đối diện bằng 180°.',
    reqVanDung: 'Vận dụng tính chất tiếp tuyến, đường kính và dây cung để giải quyết bài toán đồng quy, thẳng hàng và tỉ số diện tích.',
    mcBiet: 2, mcBietComp: 'NL1: Lượng giác & góc đường tròn',
    mcHieu: 1, mcHieuComp: 'NL1: Tứ giác nội tiếp',
    mcVanDung: 0,
    tfBiet: 0, tfHieu: 0, tfVanDung: 0,
    saBiet: 1, saBietComp: 'NL1: Hệ thức lượng tam giác vuông',
    saHieu: 0, saVanDung: 0,
    tlBiet: 0, tlHieu: 0,
    tlVanDung: 1, tlVanDungLabel: '1 bài (1,5đ)', tlVanDungComp: 'NL1, NL5: Lập luận & vẽ hình',
  },
  {
    id: 5,
    topic: 'Hình khối thực tiễn, BĐT và Cực trị',
    subtopic: 'Diện tích xung quanh, thể tích hình khối và BĐT Cauchy',
    competencies: 'NL2 (Mô hình hóa thực tế), NL3 (Giải quyết vấn đề nâng cao)',
    reqBiet: 'Nhận biết công thức tính diện tích xung quanh, thể tích hình trụ, hình nón, hình cầu.',
    reqHieu: 'Tính toán diện tích, thể tích các vật thể hình học trong đời sống thực tế.',
    reqVanDung: 'Vận dụng bất đẳng thức Cauchy hoặc phương pháp biến đổi đại số để tìm giá trị lớn nhất, giá trị nhỏ nhất của biểu thức.',
    mcBiet: 1, mcBietComp: 'NL1: Thể tích khối trụ',
    mcHieu: 1, mcHieuComp: 'NL1: Góc nội tiếp & tính chất',
    mcVanDung: 0,
    tfBiet: 0, tfHieu: 0, tfVanDung: 0,
    saBiet: 0, saHieu: 0,
    saVanDung: 1, saVanDungComp: 'NL2, NL3: Mô hình hóa thực tiễn',
    tlBiet: 0, tlHieu: 0,
    tlVanDung: 1, tlVanDungLabel: '1 bài (0,5đ)', tlVanDungComp: 'NL3: BĐT Cauchy & Cực trị',
  },
];

export const MatrixSpecGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MATRIX' | 'SPEC' | 'EXAM_PREVIEW' | 'RUBRIC'>('MATRIX');
  const [examName, setExamName] = useState('ĐỀ KIỂM TRA ĐỊNH KỲ HỌC KÌ MÔN TOÁN LỚP 9');
  const [duration, setDuration] = useState(90);
  const [examCode, setExamCode] = useState('101');
  const [schoolName, setSchoolName] = useState('TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH');
  const [deptName, setDeptName] = useState('TỔ TỰ NHIÊN');
  const [schoolYear, setSchoolYear] = useState('2026 - 2027');

  // Matrix calculations
  const totalMC_Biet = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.mc_biet, 0);
  const totalMC_Hieu = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.mc_hieu, 0);
  const totalMC_VD = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.mc_vandung, 0);
  const totalMCCount = totalMC_Biet + totalMC_Hieu + totalMC_VD; // 12 câu
  const scoreMC = totalMCCount * 0.25; // 3.0 điểm (30%)

  const totalTF_Biet = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.tf_biet, 0);
  const totalTF_Hieu = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.tf_hieu, 0);
  const totalTF_VD = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.tf_vandung, 0);
  const totalTFCount = totalTF_Biet + totalTF_Hieu + totalTF_VD; // 2 câu (mỗi câu 4 ý = 8 ý)
  const scoreTF = totalTFCount * 1.0; // 2.0 điểm (20%)

  const totalSA_Biet = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.sa_biet, 0);
  const totalSA_Hieu = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.sa_hieu, 0);
  const totalSA_VD = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.sa_vandung, 0);
  const totalSACount = totalSA_Biet + totalSA_Hieu + totalSA_VD; // 4 câu
  const scoreSA = totalSACount * 0.5; // 2.0 điểm (20%)

  const totalTL_Biet = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.tl_biet, 0);
  const totalTL_Hieu = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.tl_hieu, 0);
  const totalTL_VD = DEFAULT_MATRIX_7991.reduce((sum, r) => sum + r.tl_vandung, 0);
  const totalTLCount = totalTL_Biet + totalTL_Hieu + totalTL_VD; // 3 câu
  const scoreTL = 3.0; // 3.0 điểm (30%)

  const totalExamScore = scoreMC + scoreTF + scoreSA + scoreTL; // 10.0 điểm

  // Mức độ đánh giá
  const scoreBiet = 4.0; // 40%
  const scoreHieu = 3.0; // 30%
  const scoreVanDung = 3.0; // 30%

  // Export to Word document format with full 4 parts of CV 7991 official template
  const handleExportWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${examName} - THEO CV 7991/BGDDT-GDTrH</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; color: #000; margin: 20px; }
          table { border-collapse: collapse; width: 100%; margin: 12px 0; }
          th, td { border: 1px solid black; padding: 5px; text-align: center; font-size: 10.5pt; }
          .left { text-align: left; }
          .bold { font-weight: bold; }
          h2, h3, h4 { text-align: center; margin: 4px 0; }
          h2 { font-size: 14pt; }
          h3 { font-size: 13pt; margin-top: 15px; }
          h4 { font-size: 12pt; text-align: left; margin-top: 10px; }
          .footnote { font-size: 9.5pt; font-style: italic; margin-top: 6px; }
        </style>
      </head>
      <body>
        <table style="border: none; width: 100%; margin-bottom: 15px;">
          <tr style="border: none;">
            <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
              <strong>TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH</strong><br/>
              <strong>TỔ TỰ NHIÊN</strong><br/>
              <em>Tác giả & Giáo viên: Teacher Lê Thanh Tùng</em>
            </td>
            <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br/>
              <strong>Độc lập - Tự do - Hạnh phúc</strong><br/>
              <em>Năm học: 2026 - 2027</em>
            </td>
          </tr>
        </table>

        <h2>${examName.toUpperCase()}</h2>
        <h3>MÔN: TOÁN LỚP 9 – CHƯƠNG TRÌNH GDPT 2018</h3>
        <p style="text-align: center;"><em>(Thực hiện đầy đủ 4 phần theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo)</em></p>
        <p style="text-align: center;"><strong>Thời gian làm bài: ${duration} phút</strong> (Không kể thời gian phát đề) - <strong>Mã đề: ${examCode}</strong></p>
        <hr style="border: 0.5px solid #000; margin: 15px 0;"/>

        <!-- ==================== PHẦN 1: MA TRẬN ==================== -->
        <h3 style="text-align: left;">PHẦN 1: KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ (PHỤ LỤC 1 - THEO CÔNG VĂN 7991/BGDĐT-GDTrH)</h3>
        <table>
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th rowspan="3">TT</th>
              <th rowspan="3">Chủ đề / Chương</th>
              <th rowspan="3">Nội dung / đơn vị kiến thức</th>
              <th colspan="12">Mức độ đánh giá</th>
              <th rowspan="2" colspan="3">Tổng</th>
              <th rowspan="3">Tỉ lệ % điểm</th>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <th colspan="3">Nhiều lựa chọn (3,0đ) [5]</th>
              <th colspan="3">Đúng - Sai (2,0đ) [2]</th>
              <th colspan="3">Trả lời ngắn (2,0đ) [3]</th>
              <th colspan="3">Tự luận (3,0đ)</th>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <th>Biết</th><th>Hiểu</th><th>VD</th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
            </tr>
          </thead>
          <tbody>
            ${DEFAULT_MATRIX_7991.map((r, i) => `
              <tr>
                <td>${i + 1}</td>
                <td class="left bold">${r.topic}</td>
                <td class="left">${r.subtopic}</td>
                <td>${r.mc_biet || '-'}</td><td>${r.mc_hieu || '-'}</td><td>${r.mc_vandung || '-'}</td>
                <td>${r.tf_biet ? '(1c) 4 ý' : '-'}</td><td>${r.tf_hieu ? '(1c) 4 ý' : '-'}</td><td>${r.tf_vandung || '-'}</td>
                <td>${r.sa_biet || '-'}</td><td>${r.sa_hieu || '-'}</td><td>${r.sa_vandung || '-'}</td>
                <td>${r.tl_biet || '-'}</td><td>${r.tl_hieu ? '1 bài (1,0đ)' : '-'}</td><td>${r.tl_vandung ? (r.id === 4 ? '1 bài (1,5đ)' : '1 bài (0,5đ)') : '-'}</td>
                <td class="bold">${r.mc_biet + r.tf_biet + r.sa_biet + r.tl_biet}</td>
                <td class="bold">${r.mc_hieu + r.tf_hieu + r.sa_hieu + r.tl_hieu}</td>
                <td class="bold">${r.mc_vandung + r.tf_vandung + r.sa_vandung + r.tl_vandung}</td>
                <td>20%</td>
              </tr>
            `).join('')}
            <tr class="bold" style="background-color: #e6f2ff;">
              <td colspan="3">Tổng số câu</td>
              <td colspan="3">12 câu</td>
              <td colspan="3">2 câu (8 ý a,b,c,d)</td>
              <td colspan="3">4 câu</td>
              <td colspan="3">3 bài tự luận</td>
              <td>11</td><td>6</td><td>4</td>
              <td>100%</td>
            </tr>
            <tr class="bold" style="background-color: #e6f2ff;">
              <td colspan="3">Tổng số điểm</td>
              <td colspan="3">3,0 điểm</td>
              <td colspan="3">2,0 điểm</td>
              <td colspan="3">2,0 điểm</td>
              <td colspan="3">3,0 điểm</td>
              <td>4,0đ</td><td>3,0đ</td><td>3,0đ</td>
              <td>10,0 điểm</td>
            </tr>
            <tr class="bold" style="background-color: #e6f2ff;">
              <td colspan="3">Tỉ lệ %</td>
              <td colspan="3">30%</td>
              <td colspan="3">20%</td>
              <td colspan="3">20%</td>
              <td colspan="3">30%</td>
              <td>40%</td><td>30%</td><td>30%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
        <p class="footnote"><em>Ghi chú: [2] Mỗi câu hỏi Đúng - Sai gồm 4 ý nhỏ a, b, c, d (Barem: đúng 1 ý = 0,1đ; đúng 2 ý = 0,25đ; đúng 3 ý = 0,5đ; đúng 4 ý = 1,0đ); [3] Câu hỏi ngắn điền đáp số; [5] Tỉ lệ điểm TNKQ 70% (7,0 điểm) và Tự luận 30% (3,0 điểm). Mức độ: Biết 40% (4,0đ) - Hiểu 30% (3,0đ) - Vận dụng 30% (3,0đ).</em></p>

        <!-- ==================== PHẦN 2: BẢN ĐẶC TẢ ==================== -->
        <div style="page-break-before: always;"></div>
        <h3 style="text-align: left;">PHẦN 2: BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ (PHỤ LỤC 2 - THEO CÔNG VĂN 7991/BGDĐT-GDTrH)</h3>
        <table>
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th rowspan="2">TT</th>
              <th rowspan="2">Chủ đề / Chương</th>
              <th rowspan="2">Nội dung / đơn vị kiến thức</th>
              <th rowspan="2" style="width: 32%;">Yêu cầu cần đạt & Năng lực toán học [6]</th>
              <th colspan="9">Số câu hỏi ở các mức độ đánh giá (TNKQ)</th>
              <th colspan="3">Tự luận</th>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <th colspan="3">Nhiều lựa chọn (3,0đ)</th>
              <th colspan="3">"Đúng - Sai" (2,0đ)</th>
              <th colspan="3">Trả lời ngắn (2,0đ)</th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
            </tr>
            <tr style="background-color: #e6f2ff; font-size: 9.5pt;">
              <th></th><th></th><th></th><th></th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
              <th>Biết</th><th>Hiểu</th><th>VD</th>
              <th></th><th></th><th></th>
            </tr>
          </thead>
          <tbody>
            ${DEFAULT_SPEC_7991.map((item) => {
              const fmtCell = (count?: number, label?: string, comp?: string) => {
                if (!count) return '-';
                const text = label || (count + ' câu');
                const compHtml = comp ? `<br/><span style="color: #6b21a8; font-size: 8pt; font-weight: bold; display: inline-block; margin-top: 2px;">(${comp})</span>` : '';
                return `<strong>${text}</strong>${compHtml}`;
              };
              return `
              <tr>
                <td>${item.id}</td>
                <td class="left bold">${item.topic}</td>
                <td class="left">${item.subtopic}</td>
                <td class="left" style="font-size: 10pt;">
                  <div style="color: #6b21a8; font-weight: bold; margin-bottom: 2px;">${item.competencies}</div>
                  <div><strong>Nhận biết:</strong> ${item.reqBiet}</div>
                  <div><strong>Thông hiểu:</strong> ${item.reqHieu}</div>
                  <div><strong>Vận dụng:</strong> ${item.reqVanDung}</div>
                </td>
                <td>${fmtCell(item.mcBiet, item.mcBiet ? `${item.mcBiet} câu` : '', item.mcBietComp)}</td>
                <td>${fmtCell(item.mcHieu, item.mcHieu ? `${item.mcHieu} câu` : '', item.mcHieuComp)}</td>
                <td>${fmtCell(item.mcVanDung, item.mcVanDung ? `${item.mcVanDung} câu` : '', item.mcVanDungComp)}</td>

                <td>${fmtCell(item.tfBiet, '(1c) 4 ý', item.tfBietComp)}</td>
                <td>${fmtCell(item.tfHieu, '(1c) 4 ý', item.tfHieuComp)}</td>
                <td>${fmtCell(item.tfVanDung, '(1c) 4 ý', item.tfVanDungComp)}</td>

                <td>${fmtCell(item.saBiet, item.saBiet ? `${item.saBiet} câu` : '', item.saBietComp)}</td>
                <td>${fmtCell(item.saHieu, item.saHieu ? `${item.saHieu} câu` : '', item.saHieuComp)}</td>
                <td>${fmtCell(item.saVanDung, item.saVanDung ? `${item.saVanDung} câu` : '', item.saVanDungComp)}</td>

                <td>${fmtCell(item.tlBiet, '1 bài', item.tlBietComp)}</td>
                <td>${fmtCell(item.tlHieu, item.tlHieuLabel || '1 bài (1,0đ)', item.tlHieuComp)}</td>
                <td>${fmtCell(item.tlVanDung, item.tlVanDungLabel || '1 bài', item.tlVanDungComp)}</td>
              </tr>
              `;
            }).join('')}
          </tbody>
        </table>
        <p class="footnote"><em>Ghi chú: [6] Yêu cầu cần đạt gắn liền với 5 năng lực toán học: NL1 (Tư duy và lập luận), NL2 (Mô hình hóa), NL3 (Giải quyết vấn đề), NL4 (Giao tiếp toán học), NL5 (Sử dụng công cụ, phương tiện học toán).</em></p>

        <!-- ==================== PHẦN 3: ĐỀ KIỂM TRA ĐỊNH KÌ ==================== -->
        <div style="page-break-before: always;"></div>
        <h3 style="text-align: left;">PHẦN 3: ĐỀ KIỂM TRA ĐỊNH KÌ MINH HỌA (CẤU TRÚC 4 PHẦN CHUẨN CÔNG VĂN 7991/BGDĐT-GDTrH)</h3>
        <p><strong>Trường:</strong> TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Mã đề thi: ${examCode}</strong></p>
        <p><strong>Thời gian làm bài:</strong> ${duration} phút (không kể thời gian giao đề)</p>

        <h4>PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 điểm)</h4>
        <p><em>Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu hỏi thí sinh chỉ chọn một phương án đúng nhất. (Mỗi câu trả lời đúng được 0,25 điểm).</em></p>
        <p><strong>Câu 1:</strong> Điều kiện xác định của biểu thức √(2x - 6) là:<br/>A. x ≥ 3 &nbsp;&nbsp;&nbsp;&nbsp; B. x &gt; 3 &nbsp;&nbsp;&nbsp;&nbsp; C. x ≤ 3 &nbsp;&nbsp;&nbsp;&nbsp; D. x &lt; 3</p>
        <p><strong>Câu 2:</strong> Giá trị của biểu thức √((√3 - 2)²) + √3 bằng:<br/>A. 2√3 - 2 &nbsp;&nbsp;&nbsp;&nbsp; B. 2 &nbsp;&nbsp;&nbsp;&nbsp; C. -2 &nbsp;&nbsp;&nbsp;&nbsp; D. 2 - 2√3</p>
        <p><strong>Câu 3:</strong> Cặp số (x; y) = (2; 1) là nghiệm của hệ phương trình nào sau đây?<br/>A. { x + y = 3; 2x - y = 3 } &nbsp;&nbsp;&nbsp;&nbsp; B. { x - y = 1; x + 2y = 5 } &nbsp;&nbsp;&nbsp;&nbsp; C. { 2x + y = 4; x - y = 2 } &nbsp;&nbsp;&nbsp;&nbsp; D. { 3x - y = 2; x + y = 4 }</p>
        <p><strong>Câu 4:</strong> Cho phương trình bậc hai x² - 7x + 10 = 0. Tích hai nghiệm x₁ · x₂ là:<br/>A. 7 &nbsp;&nbsp;&nbsp;&nbsp; B. -7 &nbsp;&nbsp;&nbsp;&nbsp; C. 10 &nbsp;&nbsp;&nbsp;&nbsp; D. -10</p>
        <p><strong>Câu 5:</strong> Cho tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm. Bán kính đường tròn ngoại tiếp tam giác ABC là:<br/>A. 5 cm &nbsp;&nbsp;&nbsp;&nbsp; B. 10 cm &nbsp;&nbsp;&nbsp;&nbsp; C. 4 cm &nbsp;&nbsp;&nbsp;&nbsp; D. 7 cm</p>
        <p><strong>Câu 6:</strong> Biểu thức sin² 35° + sin² 55° có giá trị bằng:<br/>A. 0 &nbsp;&nbsp;&nbsp;&nbsp; B. 1 &nbsp;&nbsp;&nbsp;&nbsp; C. 2 &nbsp;&nbsp;&nbsp;&nbsp; D. 0,5</p>
        <p><strong>Câu 7:</strong> Một cột cờ có bóng trên mặt đất dài 12 m, tia nắng mặt trời tạo với mặt đất góc 35°. Chiều cao cột cờ xấp xỉ bằng:<br/>A. 8,4 m &nbsp;&nbsp;&nbsp;&nbsp; B. 17,1 m &nbsp;&nbsp;&nbsp;&nbsp; C. 9,8 m &nbsp;&nbsp;&nbsp;&nbsp; D. 7,2 m</p>
        <p><strong>Câu 8:</strong> Cho đường tròn (O; 5 cm) và dây AB = 8 cm. Khoảng cách từ tâm O đến dây AB là:<br/>A. 3 cm &nbsp;&nbsp;&nbsp;&nbsp; B. 4 cm &nbsp;&nbsp;&nbsp;&nbsp; C. 2 cm &nbsp;&nbsp;&nbsp;&nbsp; D. 1 cm</p>
        <p><strong>Câu 9:</strong> Thể tích hình trụ có bán kính đáy r = 3 cm và chiều cao h = 5 cm là:<br/>A. 15π cm³ &nbsp;&nbsp;&nbsp;&nbsp; B. 45π cm³ &nbsp;&nbsp;&nbsp;&nbsp; C. 30π cm³ &nbsp;&nbsp;&nbsp;&nbsp; D. 90π cm³</p>
        <p><strong>Câu 10:</strong> Góc nội tiếp chắn nửa đường tròn có số đo là:<br/>A. 60° &nbsp;&nbsp;&nbsp;&nbsp; B. 90° &nbsp;&nbsp;&nbsp;&nbsp; C. 180° &nbsp;&nbsp;&nbsp;&nbsp; D. 45°</p>
        <p><strong>Câu 11:</strong> Số nghiệm của phương trình 2x² + 5x + 7 = 0 là:<br/>A. 0 (Vô nghiệm) &nbsp;&nbsp;&nbsp;&nbsp; B. 1 &nbsp;&nbsp;&nbsp;&nbsp; C. 2 &nbsp;&nbsp;&nbsp;&nbsp; D. Vô số</p>
        <p><strong>Câu 12:</strong> Điều kiện để tứ giác ABCD nội tiếp được đường tròn là:<br/>A. ∠A + ∠C = 180° &nbsp;&nbsp;&nbsp;&nbsp; B. ∠A + ∠B = 180° &nbsp;&nbsp;&nbsp;&nbsp; C. ∠B + ∠C = 180° &nbsp;&nbsp;&nbsp;&nbsp; D. ∠A = ∠C</p>

        <h4>PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG - SAI (2,0 điểm)</h4>
        <p><em>Thí sinh trả lời câu 1 và câu 2. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn Đúng hoặc Sai.</em><br/>
        <em>Barem điểm theo CV 7991: Đúng 1 ý: 0,10 điểm; Đúng 2 ý: 0,25 điểm; Đúng 3 ý: 0,50 điểm; Đúng cả 4 ý: 1,00 điểm.</em></p>
        <p><strong>Câu 1:</strong> Cho biểu thức P = [ √x / (√x - 1) - 1 / (x - √x) ] : [ 1 / (√x + 1) + 2 / (x - 1) ] với x &gt; 0, x ≠ 1.<br/>
        a) Điều kiện xác định của biểu thức P là x &gt; 0 và x ≠ 1.<br/>
        b) Biểu thức √x / (√x - 1) - 1 / (x - √x) = (√x + 1) / √x.<br/>
        c) Kết quả rút gọn của P là P = √x - 1.<br/>
        d) Giá trị của x để P = 2 là x = 9.</p>

        <p><strong>Câu 2:</strong> Cho hệ phương trình { 2x + y = 5; x - 3y = -1 }<br/>
        a) Hệ phương trình có nghiệm duy nhất vì 2/1 ≠ 1/(-3).<br/>
        b) Khi cộng đại số ta được phương trình bậc nhất 7x = 14.<br/>
        c) Nghiệm duy nhất của hệ phương trình là (x; y) = (2; 1).<br/>
        d) Giá trị biểu thức T = x² + y² tại nghiệm của hệ là T = 5.</p>

        <h4>PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 điểm)</h4>
        <p><em>Thí sinh trả lời từ câu 1 đến câu 4. Mỗi câu trả lời đúng được 0,5 điểm.</em></p>
        <p><strong>Câu 1:</strong> Tính giá trị biểu thức M = √48 - 2√27 + √75 dưới dạng a√3. Tìm giá trị của số nguyên a.</p>
        <p><strong>Câu 2:</strong> Tìm giá trị tham số m để phương trình x² - 4x + m = 0 có nghiệm kép.</p>
        <p><strong>Câu 3:</strong> Một người quan sát đứng trên đỉnh hải đăng cao 50 m nhìn thấy một con thuyền ở xa với góc hạ 22°. Khoảng cách từ chân hải đăng đến con thuyền bằng bao nhiêu mét? (Làm tròn kết quả đến hàng đơn vị).</p>
        <p><strong>Câu 4:</strong> Cho tam giác ABC vuông tại A có đường cao AH. Biết BH = 4 cm, CH = 9 cm. Tính độ dài đường cao AH (đơn vị: cm).</p>

        <h4>PHẦN IV. TỰ LUẬN (3,0 điểm)</h4>
        <p><strong>Bài 1 (1,0 điểm):</strong> Giải bài toán bằng cách lập hệ phương trình:<br/>
        Hai đội công nhân cùng làm chung một đoạn đường thì sau 12 ngày sẽ hoàn thành. Nếu đội thứ nhất làm một mình trong 4 ngày rồi đội thứ hai làm tiếp trong 10 ngày thì cả hai đội hoàn thành được 7/12 đoạn đường. Hỏi nếu mỗi đội làm một mình thì sau bao nhiêu ngày sẽ hoàn thành toàn bộ đoạn đường?</p>

        <p><strong>Bài 2 (1,5 điểm):</strong> Cho nửa đường tròn tâm O đường kính AB. Lấy điểm C trên nửa đường tròn (C khác A và B). Kẻ tiếp tuyến Ax, By với nửa đường tròn. Tiếp tuyến tại C cắt Ax và By lần lượt tại M và N.<br/>
        a) Chứng minh tứ giác AMCO nội tiếp và ∠MON = 90°.<br/>
        b) Chứng minh MN = AM + BN và tích AM · BN không phụ thuộc vào vị trí điểm C.<br/>
        c) Gọi K là giao điểm của AN và BM. Đường thẳng qua K song song với Ax cắt AB tại H. Chứng minh K là trung điểm của CH.</p>

        <p><strong>Bài 3 (0,5 điểm):</strong> Cho x, y &gt; 0 thỏa mãn x + y = 2. Tìm giá trị nhỏ nhất của biểu thức Q = 1/x + 1/y + 4xy.</p>

        <!-- ==================== PHẦN 4: HƯỚNG DẪN CHẤM & BIỂU ĐIỂM ==================== -->
        <div style="page-break-before: always;"></div>
        <h3 style="text-align: left;">PHẦN 4: HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM CHI TIẾT (THEO CÔNG VĂN 7991/BGDĐT-GDTrH)</h3>
        
        <p><strong>PHẦN I (12 câu x 0,25đ = 3,0 điểm):</strong></p>
        <table style="width: 100%;">
          <tr style="background-color: #f2f2f2;"><th>Câu 1</th><th>Câu 2</th><th>Câu 3</th><th>Câu 4</th><th>Câu 5</th><th>Câu 6</th><th>Câu 7</th><th>Câu 8</th><th>Câu 9</th><th>Câu 10</th><th>Câu 11</th><th>Câu 12</th></tr>
          <tr class="bold" style="color: blue;"><td>A</td><td>B</td><td>A</td><td>C</td><td>A</td><td>B</td><td>A</td><td>A</td><td>B</td><td>B</td><td>A</td><td>A</td></tr>
        </table>

        <p><strong>PHẦN II (2 câu lớn = 2,0 điểm - Barem chuẩn CV 7991):</strong></p>
        <table>
          <tr style="background-color: #f2f2f2;"><th>Câu</th><th>Ý a</th><th>Ý b</th><th>Ý c</th><th>Ý d</th><th>Thang điểm tính theo số ý đúng</th></tr>
          <tr><td>Câu 1</td><td>Đúng</td><td>Đúng</td><td>Đúng</td><td>Đúng</td><td rowspan="2" class="left">
            - Đúng 1 ý: <strong>0,10 điểm</strong><br/>
            - Đúng 2 ý: <strong>0,25 điểm</strong><br/>
            - Đúng 3 ý: <strong>0,50 điểm</strong><br/>
            - Đúng cả 4 ý: <strong>1,00 điểm</strong>
          </td></tr>
          <tr><td>Câu 2</td><td>Đúng</td><td>Sai</td><td>Đúng</td><td>Đúng</td></tr>
        </table>

        <p><strong>PHẦN III (4 câu x 0,5đ = 2,0 điểm):</strong></p>
        <table>
          <tr style="background-color: #f2f2f2;"><th>Câu 1</th><th>Câu 2</th><th>Câu 3</th><th>Câu 4</th></tr>
          <tr class="bold" style="color: blue;"><td>a = 3</td><td>m = 4</td><td>124 (mét)</td><td>AH = 6 (cm)</td></tr>
        </table>

        <p><strong>PHẦN IV. TỰ LUẬN (3,0 điểm):</strong></p>
        <table style="width: 100%;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="width: 14%;">Câu</th>
              <th style="width: 72%; text-align: left;">Hướng dẫn chi tiết</th>
              <th style="width: 14%;">Biểu điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="4" class="bold">Bài 1<br/>(1,0 điểm)</td>
              <td class="left">Gọi thời gian đội 1 và đội 2 làm một mình xong việc lần lượt là x và y (ngày, điều kiện: x, y &gt; 12).</td>
              <td class="bold">0,25đ</td>
            </tr>
            <tr>
              <td class="left">Trong 1 ngày: Đội 1 làm 1/x (đoạn đường), đội 2 làm 1/y (đoạn đường). Do hai đội làm chung 12 ngày xong nên ta có phương trình: 1/x + 1/y = 1/12 (1)</td>
              <td class="bold">0,25đ</td>
            </tr>
            <tr>
              <td class="left">Đội 1 làm 4 ngày được 4/x, đội 2 làm 10 ngày được 10/y, cả hai hoàn thành 7/12: 4/x + 10/y = 7/12 (2)</td>
              <td class="bold">0,25đ</td>
            </tr>
            <tr>
              <td class="left">Từ (1) và (2), giải hệ phương trình đặt ẩn phụ 1/x = u, 1/y = v tìm được x = 28 (thỏa mãn) và y = 21 (thỏa mãn). Kết luận: Đội 1 làm một mình hết 28 ngày, Đội 2 làm một mình hết 21 ngày.</td>
              <td class="bold">0,25đ</td>
            </tr>

            <tr>
              <td rowspan="3" class="bold">Bài 2<br/>(1,5 điểm)</td>
              <td class="left"><strong>a) (0,50 điểm):</strong><br/>
              - Tứ giác AMCO có ∠MAO = ∠MCO = 90° =&gt; AMCO nội tiếp đường tròn.<br/>
              - Theo tính chất tiếp tuyến cắt nhau, OM là phân giác ∠AOC, ON là phân giác ∠BOC =&gt; ∠MON = 90°.</td>
              <td class="bold">0,50đ</td>
            </tr>
            <tr>
              <td class="left"><strong>b) (0,50 điểm):</strong><br/>
              - Theo tính chất tiếp tuyến cắt nhau: MA = MC và NB = NC =&gt; MN = MC + NC = MA + NB.<br/>
              - Tam giác MON vuông tại O có đường cao OC =&gt; AM · BN = MC · NC = OC² = R² không đổi khi C di chuyển.</td>
              <td class="bold">0,50đ</td>
            </tr>
            <tr>
              <td class="left"><strong>c) (0,50 điểm):</strong><br/>
              - Áp dụng định lí Ta-lét trong tam giác ANB và AMB có KH // Ax // By, chứng minh KH / Ax = NB / AB và KC / Ax = ... =&gt; KH = KC.<br/>
              - Mà K, C, H thẳng hàng nên K là trung điểm CH.</td>
              <td class="bold">0,50đ</td>
            </tr>

            <tr>
              <td rowspan="2" class="bold">Bài 3<br/>(0,5 điểm)</td>
              <td class="left">Biến đổi Q = (1/x + 1/y) + 4xy = (x + y)/(xy) + 4xy = 2/(xy) + 4xy. Với x + y = 2 =&gt; xy ≤ ((x+y)/2)² = 1.</td>
              <td class="bold">0,25đ</td>
            </tr>
            <tr>
              <td class="left">Tách: Q = (4xy + 1/(4xy)) + 7/(4xy) ≥ 2√(4xy · 1/(4xy)) + 7 / [4 · ((x + y)/2)²] = 2 + 7 = 9. Dấu đẳng thức xảy ra khi x = y = 1. Kết luận: Giá trị nhỏ nhất của Q là 9 khi x = y = 1.</td>
              <td class="bold">0,25đ</td>
            </tr>
          </tbody>
        </table>

        <br/>
        <table style="border: none; width: 100%; margin-top: 30px;">
          <tr style="border: none;">
            <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
              <strong>TỔ TRƯỞNG CHUYÊN MÔN</strong><br/>
              <em>(Ký và ghi rõ họ tên)</em><br/><br/><br/><br/>
            </td>
            <td style="border: none; width: 50%; text-align: center; vertical-align: top;">
              <strong>GIÁO VIÊN BIÊN SOẠN</strong><br/>
              <em>(Ký và ghi rõ họ tên)</em><br/><br/><br/>
              <strong>Teacher Lê Thanh Tùng</strong>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bo-de-CV7991-Toan-9-Ma-${examCode}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Official Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 backdrop-blur-md text-amber-300">
            <Award className="w-3.5 h-3.5" /> BÁM SÁT CÔNG VĂN SỐ 7991/BGDĐT-GDTrH NGÀY 17/12/2024 CỦA BỘ GDĐT
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ma Trận, Bản Đặc Tả, Đề Kiểm Tra & Hướng Dẫn Chấm Định Kỳ
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 max-w-3xl leading-relaxed">
            Hệ thống biên soạn đề thi chuẩn quy định mới nhất của Bộ Giáo dục và Đào tạo (áp dụng từ Học kì 2 năm học 2024 - 2025). 
            Cấu trúc 4 phần chuẩn: Trắc nghiệm nhiều lựa chọn (3,0đ), Đúng - Sai (2,0đ), Trả lời ngắn (2,0đ) và Tự luận (3,0đ).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-blue-200">
            <span>Đơn vị: <strong>TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH</strong> (Tổ Tự nhiên)</span>
            <span>•</span>
            <span>Tác giả & Bản quyền: <strong>Teacher Lê Thanh Tùng</strong></span>
            <span>•</span>
            <span>Định dạng điểm: <strong>70% TNKQ / 30% Tự luận</strong></span>
            <span>•</span>
            <span>Tỉ lệ mức độ: <strong>40% Biết / 30% Hiểu / 30% Vận dụng</strong></span>
          </div>
        </div>
      </div>

      {/* School Unit & Period Configuration Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              ĐƠN VỊ: <span className="text-purple-600 dark:text-purple-400">{schoolName}</span> – {deptName}
            </span>
            <span className="text-xs text-slate-400 font-medium">({schoolYear})</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Mã đề:</span>
            <input
              type="text"
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
              className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-center"
            />
            <span className="text-slate-500 font-medium ml-2">Thời gian:</span>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold text-center"
            />
            <span className="text-slate-500">phút</span>
          </div>
        </div>

        {/* Quick Period Buttons according to Plan of Trường TH, THCS Nguyễn Hữu Cảnh */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Kỳ kiểm tra:</span>
          {[
            { id: 'GK1', name: 'Giữa Học kỳ 1 (Tuần 9)', title: 'ĐỀ KIỂM TRA ĐỊNH KỲ GIỮA HỌC KỲ I MÔN TOÁN 9' },
            { id: 'CK1', name: 'Cuối Học kỳ 1 (Tuần 18)', title: 'ĐỀ KIỂM TRA ĐỊNH KỲ CUỐI HỌC KỲ I MÔN TOÁN 9' },
            { id: 'GK2', name: 'Giữa Học kỳ 2 (Tuần 26)', title: 'ĐỀ KIỂM TRA ĐỊNH KỲ GIỮA HỌC KỲ II MÔN TOÁN 9' },
            { id: 'CK2', name: 'Cuối Học kỳ 2 (Tuần 35)', title: 'ĐỀ KIỂM TRA ĐỊNH KỲ CUỐI HỌC KỲ II MÔN TOÁN 9' },
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setExamName(period.title)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer shrink-0 ${
                examName === period.title
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls & Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm no-print">
        {/* Main Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setActiveTab('MATRIX')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'MATRIX'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" /> 1. Khung Ma trận (Phụ lục 1)
          </button>

          <button
            onClick={() => setActiveTab('SPEC')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'SPEC'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" /> 2. Bản đặc tả (Phụ lục 2)
          </button>

          <button
            onClick={() => setActiveTab('EXAM_PREVIEW')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'EXAM_PREVIEW'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" /> 3. Đề kiểm tra chuẩn CV 7991
          </button>

          <button
            onClick={() => setActiveTab('RUBRIC')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'RUBRIC'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> 4. Hướng dẫn chấm & Biểu điểm
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportWord}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
            title="Xuất văn bản Word đầy đủ Ma trận, Bản đặc tả, Đề thi và Hướng dẫn chấm"
          >
            <Download className="w-4 h-4" /> Xuất Word (.doc)
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" /> In / PDF
          </button>
        </div>
      </div>

      {/* TAB 1: MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ (PHỤ LỤC 1 THEO CV 7991) */}
      {activeTab === 'MATRIX' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH • TỔ TỰ NHIÊN • NĂM HỌC 2026 - 2027
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                1. KHUNG MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ THEO CÔNG VĂN 7991/BGDĐT-GDTrH
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Phụ lục 1 kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Tổng: 10,0 điểm (100%)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded-2xl">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-300 dark:border-slate-700">
                  <th className="p-2.5 border-r border-slate-300 dark:border-slate-700" rowSpan={3}>TT</th>
                  <th className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left min-w-[180px]" rowSpan={3}>Chủ đề / Chương</th>
                  <th className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left min-w-[220px]" rowSpan={3}>Nội dung / đơn vị kiến thức</th>
                  <th className="p-2 border-b border-r border-slate-300 dark:border-slate-700" colSpan={12}>Mức độ đánh giá</th>
                  <th className="p-2 border-b border-r border-slate-300 dark:border-slate-700" rowSpan={2} colSpan={3}>Tổng</th>
                  <th className="p-2.5" rowSpan={3}>Tỉ lệ % điểm</th>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-300 dark:border-slate-700">
                  <th className="p-1.5 border-r border-slate-300 dark:border-slate-700" colSpan={3}>TNKQ Nhiều lựa chọn (3,0đ) [5]</th>
                  <th className="p-1.5 border-r border-slate-300 dark:border-slate-700" colSpan={3}>TNKQ "Đúng - Sai" (2,0đ) [2]</th>
                  <th className="p-1.5 border-r border-slate-300 dark:border-slate-700" colSpan={3}>TNKQ Trả lời ngắn (2,0đ) [3]</th>
                  <th className="p-1.5 border-r border-slate-300 dark:border-slate-700" colSpan={3}>Tự luận (3,0đ)</th>
                </tr>
                <tr className="bg-slate-100/60 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-300 dark:border-slate-700">
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Biết</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Hiểu</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">VD</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Biết</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Hiểu</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">VD</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Biết</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Hiểu</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">VD</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Biết</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Hiểu</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">VD</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Biết</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Hiểu</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">VD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {DEFAULT_MATRIX_7991.map((row) => {
                  const sumBiet = row.mc_biet + row.tf_biet + row.sa_biet + row.tl_biet;
                  const sumHieu = row.mc_hieu + row.tf_hieu + row.sa_hieu + row.tl_hieu;
                  const sumVD = row.mc_vandung + row.tf_vandung + row.sa_vandung + row.tl_vandung;

                  return (
                    <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      <td className="p-2.5 font-semibold text-slate-500 border-r border-slate-200 dark:border-slate-800">{row.id}</td>
                      <td className="p-2.5 text-left font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800">{row.topic}</td>
                      <td className="p-2.5 text-left text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">{row.subtopic}</td>
                      
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.mc_biet || '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.mc_hieu || '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.mc_vandung || '-'}</td>

                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.tf_biet ? '(1c) 4 ý' : '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.tf_hieu ? '(1c) 4 ý' : '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.tf_vandung || '-'}</td>

                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.sa_biet || '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.sa_hieu || '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.sa_vandung || '-'}</td>

                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.tl_biet || '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.tl_hieu ? '1 bài (1,0đ)' : '-'}</td>
                      <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.tl_vandung ? (row.id === 4 ? '1 bài (1,5đ)' : '1 bài (0,5đ)') : '-'}</td>

                      <td className="p-1.5 font-bold border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">{sumBiet}</td>
                      <td className="p-1.5 font-bold border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">{sumHieu}</td>
                      <td className="p-1.5 font-bold border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">{sumVD}</td>

                      <td className="p-2 font-bold text-purple-600 dark:text-purple-400">20%</td>
                    </tr>
                  );
                })}

                {/* Tổng số câu */}
                <tr className="bg-purple-50/50 dark:bg-purple-950/30 font-bold border-t-2 border-purple-200 dark:border-purple-800">
                  <td colSpan={3} className="p-2.5 text-left border-r border-slate-300 dark:border-slate-700">Tổng số câu</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-blue-600">12 câu (Nhiều lựa chọn)</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-emerald-600">2 câu (8 ý a,b,c,d)</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-indigo-600">4 câu (Trả lời ngắn)</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-purple-600">3 bài tự luận</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700">11</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700">6</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700">4</td>
                  <td className="p-2">100%</td>
                </tr>

                {/* Tổng số điểm */}
                <tr className="bg-purple-100/60 dark:bg-purple-950/60 font-black border-t border-purple-200 dark:border-purple-800">
                  <td colSpan={3} className="p-2.5 text-left border-r border-slate-300 dark:border-slate-700">Tổng số điểm</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-blue-700 dark:text-blue-300">3,0 điểm [5]</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-emerald-700 dark:text-emerald-300">2,0 điểm</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-indigo-700 dark:text-indigo-300">2,0 điểm</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700 text-purple-700 dark:text-purple-300">3,0 điểm</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700 text-amber-700 dark:text-amber-300">4,0đ</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700 text-amber-700 dark:text-amber-300">3,0đ</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700 text-amber-700 dark:text-amber-300">3,0đ</td>
                  <td className="p-2 text-rose-600 dark:text-rose-400">10,0 điểm</td>
                </tr>

                {/* Tỉ lệ % */}
                <tr className="bg-purple-200/50 dark:bg-purple-900/40 font-black">
                  <td colSpan={3} className="p-2.5 text-left border-r border-slate-300 dark:border-slate-700">Tỉ lệ %</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700">30%</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700">20%</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700">20%</td>
                  <td colSpan={3} className="p-2 border-r border-slate-300 dark:border-slate-700">30%</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700">40%</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700">30%</td>
                  <td className="p-2 border-r border-slate-300 dark:border-slate-700">30%</td>
                  <td className="p-2 text-rose-600 dark:text-rose-400">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footnotes from CV 7991 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" /> Chú thích chuẩn quy định theo Công văn 7991/BGDĐT-GDTrH:
            </div>
            <p><strong>[2]</strong> Mỗi câu hỏi bao gồm 4 ý nhỏ (a, b, c, d), mỗi ý học sinh phải chọn đúng hoặc sai. Barem tính điểm chuẩn: đúng 1 ý được 0,1đ; đúng 2 ý được 0,25đ; đúng 3 ý được 0,5đ; đúng cả 4 ý được 1,0đ.</p>
            <p><strong>[3]</strong> Đối với môn học không sử dụng dạng câu hỏi trả lời ngắn thì chuyển toàn bộ số điểm cho dạng "Đúng - Sai".</p>
            <p><strong>[5]</strong> Lựa chọn sao cho được khoảng 3,0 điểm, tương ứng với tỉ lệ khoảng 30%; tương tự đối với các dạng khác.</p>
          </div>
        </div>
      )}

      {/* TAB 2: BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ (PHỤ LỤC 2 THEO CV 7991) */}
      {activeTab === 'SPEC' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH • TỔ TỰ NHIÊN • NĂM HỌC 2026 - 2027
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                <Layers className="w-5 h-5 text-purple-600" />
                2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ THEO CÔNG VĂN 7991/BGDĐT-GDTrH
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Phụ lục 2 kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo
              </p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded-2xl">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-300 dark:border-slate-700 text-center">
                  <th className="p-2.5 border-r border-slate-300 dark:border-slate-700" rowSpan={2}>TT</th>
                  <th className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left min-w-[160px]" rowSpan={2}>Chủ đề / Chương</th>
                  <th className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left min-w-[180px]" rowSpan={2}>Nội dung / đơn vị kiến thức</th>
                  <th className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left min-w-[280px]" rowSpan={2}>Yêu cầu cần đạt & Năng lực [6]</th>
                  <th className="p-2 border-b border-r border-slate-300 dark:border-slate-700" colSpan={9}>Số câu hỏi ở các mức độ đánh giá (TNKQ)</th>
                  <th className="p-2 border-b border-slate-300 dark:border-slate-700" colSpan={3}>Tự luận</th>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-300 dark:border-slate-700 text-center">
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700" colSpan={3}>Nhiều lựa chọn</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700" colSpan={3}>"Đúng - Sai"</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700" colSpan={3}>Trả lời ngắn</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Biết</th>
                  <th className="p-1 border-r border-slate-300 dark:border-slate-700">Hiểu</th>
                  <th className="p-1 border-slate-300 dark:border-slate-700">VD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {DEFAULT_SPEC_7991.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-2.5 font-semibold text-slate-500 text-center border-r border-slate-200 dark:border-slate-800">{item.id}</td>
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800">{item.topic}</td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">{item.subtopic}</td>
                    
                    <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 space-y-1.5 leading-relaxed">
                      <div className="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900/60 inline-block">
                        {item.competencies}
                      </div>
                      <div><strong className="text-blue-600">Nhận biết:</strong> {item.reqBiet}</div>
                      <div><strong className="text-emerald-600">Thông hiểu:</strong> {item.reqHieu}</div>
                      <div><strong className="text-amber-600">Vận dụng:</strong> {item.reqVanDung}</div>
                    </td>

                    {/* MC Nhiều lựa chọn */}
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.mcBiet ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">{item.mcBiet} câu</span>
                          {item.mcBietComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.mcBietComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.mcHieu ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">{item.mcHieu} câu</span>
                          {item.mcHieuComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.mcHieuComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.mcVanDung ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">{item.mcVanDung} câu</span>
                          {item.mcVanDungComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.mcVanDungComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>

                    {/* TF Đúng - Sai */}
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.tfBiet ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">(1c) 4 ý</span>
                          {item.tfBietComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.tfBietComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.tfHieu ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">(1c) 4 ý</span>
                          {item.tfHieuComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.tfHieuComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.tfVanDung ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">(1c) 4 ý</span>
                          {item.tfVanDungComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.tfVanDungComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>

                    {/* SA Trả lời ngắn */}
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.saBiet ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">{item.saBiet} câu</span>
                          {item.saBietComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.saBietComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.saHieu ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">{item.saHieu} câu</span>
                          {item.saHieuComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.saHieuComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.saVanDung ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">{item.saVanDung} câu</span>
                          {item.saVanDungComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.saVanDungComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>

                    {/* TL Tự luận */}
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.tlBiet ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-slate-800 dark:text-slate-100">1 bài</span>
                          {item.tlBietComp && <span className="text-[9.5px] leading-tight font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 rounded px-1 py-0.5 mt-0.5 border border-purple-200 dark:border-purple-900/60">({item.tlBietComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-r border-slate-200 dark:border-slate-800">
                      {item.tlHieu ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-purple-700 dark:text-purple-300">{item.tlHieuLabel || '1 bài (1,0đ)'}</span>
                          {item.tlHieuComp && <span className="text-[9.5px] leading-tight font-semibold text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-950 rounded px-1 py-0.5 mt-0.5 border border-purple-300 dark:border-purple-800">({item.tlHieuComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                    <td className="p-1.5 text-center border-slate-200 dark:border-slate-800">
                      {item.tlVanDung ? (
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-purple-700 dark:text-purple-300">{item.tlVanDungLabel || '1 bài'}</span>
                          {item.tlVanDungComp && <span className="text-[9.5px] leading-tight font-semibold text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-950 rounded px-1 py-0.5 mt-0.5 border border-purple-300 dark:border-purple-800">({item.tlVanDungComp})</span>}
                        </div>
                      ) : <span className="text-slate-400">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-blue-200 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-600" /> Mã năng lực toán học [6] theo Chương trình GDPT 2018:
            </p>
            <p>• <strong>NL1:</strong> Năng lực tư duy và lập luận toán học • <strong>NL2:</strong> Năng lực mô hình hóa toán học • <strong>NL3:</strong> Năng lực giải quyết vấn đề toán học • <strong>NL4:</strong> Năng lực giao tiếp toán học • <strong>NL5:</strong> Năng lực sử dụng công cụ, phương tiện học toán.</p>
          </div>
        </div>
      )}

      {/* TAB 3: ĐỀ KIỂM TRA MẪU CHUẨN CV 7991 */}
      {activeTab === 'EXAM_PREVIEW' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          {/* Header of paper test */}
          <div className="border-b-2 border-slate-200 dark:border-slate-700 pb-6 text-center space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-bold uppercase">
              <span className="text-purple-700 dark:text-purple-300 font-extrabold">{schoolName} – {deptName}</span>
              <span className="text-slate-600 dark:text-slate-400 font-bold">{examName}</span>
              <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">MÃ ĐỀ: {examCode}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-2">
              {examName.toUpperCase()} (NĂM HỌC {schoolYear})
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Thời gian làm bài: <strong>{duration} phút</strong> (Không kể thời gian phát đề) • Cấu trúc chuẩn theo <strong>Công văn số 7991/BGDĐT-GDTrH</strong>
            </p>
          </div>

          {/* Phần I */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
              <h3 className="font-extrabold text-sm text-blue-900 dark:text-blue-200">
                PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3,0 điểm)
              </h3>
              <p className="text-xs text-blue-800/80 dark:text-blue-300/80 mt-0.5">
                Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu hỏi chỉ chọn một phương án đúng duy nhất. Mỗi câu trả lời đúng được 0,25 điểm.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold">Câu 1: Điều kiện xác định của biểu thức √(2x - 6) là:</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-blue-600">A. x ≥ 3</span>
                  <span>B. x &gt; 3</span>
                  <span>C. x ≤ 3</span>
                  <span>D. x &lt; 3</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold">Câu 2: Giá trị của biểu thức √((√3 - 2)²) + √3 bằng:</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <span>A. 2√3 - 2</span>
                  <span className="font-bold text-blue-600">B. 2</span>
                  <span>C. -2</span>
                  <span>D. 2 - 2√3</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold">Câu 3: Cặp số (x; y) = (2; 1) là nghiệm của hệ phương trình nào sau đây?</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-blue-600">A. Hệ: x + y = 3 và 2x - y = 3</span>
                  <span>B. Hệ: x - y = 1 và x + 2y = 5</span>
                  <span>C. Hệ: 2x + y = 4 và x - y = 2</span>
                  <span>D. Hệ: 3x - y = 2 và x + y = 4</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold">Câu 4: Cho phương trình x² - 7x + 10 = 0. Tích hai nghiệm x₁ · x₂ là:</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <span>A. 7</span>
                  <span>B. -7</span>
                  <span className="font-bold text-blue-600">C. 10</span>
                  <span>D. -10</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold">Câu 5: Cho tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm. Bán kính đường tròn ngoại tiếp là:</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-blue-600">A. 5 cm</span>
                  <span>B. 10 cm</span>
                  <span>C. 4 cm</span>
                  <span>D. 7 cm</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold">Câu 6: Biểu thức sin²(35°) + sin²(55°) có giá trị bằng:</p>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <span>A. 0</span>
                  <span className="font-bold text-blue-600">B. 1</span>
                  <span>C. 2</span>
                  <span>D. 0,5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phần II */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900">
              <h3 className="font-extrabold text-sm text-emerald-900 dark:text-emerald-200">
                PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG - SAI (2,0 điểm)
              </h3>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-0.5">
                Thí sinh trả lời câu 1 và câu 2. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn Đúng hoặc Sai. 
                (Barem chuẩn: Đúng 1 ý: 0,1đ; Đúng 2 ý: 0,25đ; Đúng 3 ý: 0,5đ; Đúng cả 4 ý: 1,0đ).
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="font-bold">
                  Câu 1 (1,0 điểm): Cho biểu thức P = [ √x/(√x - 1) - 1/(x - √x) ] : [ 1/(√x + 1) + 2/(x - 1) ] với x &gt; 0, x ≠ 1.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">a) Điều kiện xác định của biểu thức P là x &gt; 0 và x ≠ 1. <strong className="text-emerald-600">[ĐÚNG]</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">b) Biến đổi ngoặc thứ nhất thu gọn được (√x + 1)/√x. <strong className="text-emerald-600">[ĐÚNG]</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">c) Kết quả rút gọn của P là P = √x - 1. <strong className="text-emerald-600">[ĐÚNG]</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">d) Giá trị của x để P = 2 là x = 9. <strong className="text-emerald-600">[ĐÚNG]</strong></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="font-bold">
                  Câu 2 (1,0 điểm): Cho hệ phương trình bậc nhất hai ẩn: 2x + y = 5 và x - 3y = -1.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">a) Hệ phương trình có nghiệm duy nhất vì 2/1 ≠ 1/(-3). <strong className="text-emerald-600">[ĐÚNG]</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">b) Khi cộng đại số triệt tiêu y ta thu được 5x = 10. <strong className="text-rose-500">[SAI]</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">c) Nghiệm duy nhất của hệ là (x; y) = (2; 1). <strong className="text-emerald-600">[ĐÚNG]</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">d) Giá trị x² + y² = 5. <strong className="text-emerald-600">[ĐÚNG]</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần III */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900">
              <h3 className="font-extrabold text-sm text-indigo-900 dark:text-indigo-200">
                PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (2,0 điểm)
              </h3>
              <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80 mt-0.5">
                Thí sinh trả lời từ câu 1 đến câu 4. Mỗi câu trả lời đúng được 0,5 điểm.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <p className="font-bold">Câu 1: Rút gọn M = √48 - 2√27 + √75 dưới dạng a√3. Tìm giá trị số nguyên a.</p>
                <div className="font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 p-2 rounded-lg">Đáp số: a = 3</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <p className="font-bold">Câu 2: Tìm giá trị tham số m để phương trình x² - 4x + m = 0 có nghiệm kép.</p>
                <div className="font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 p-2 rounded-lg">Đáp số: m = 4</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <p className="font-bold">Câu 3: Đứng trên đỉnh hải đăng cao 50 m nhìn con thuyền góc hạ 22°. Khoảng cách từ chân hải đăng đến thuyền là bao nhiêu mét? (Làm tròn hàng đơn vị).</p>
                <div className="font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 p-2 rounded-lg">Đáp số: 124 (m)</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <p className="font-bold">Câu 4: Cho tam giác ABC vuông tại A có đường cao AH. Biết BH = 4 cm, CH = 9 cm. Tính độ dài đường cao AH (đơn vị: cm).</p>
                <div className="font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 p-2 rounded-lg">Đáp số: 6 (cm)</div>
              </div>
            </div>
          </div>

          {/* Phần IV */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900">
              <h3 className="font-extrabold text-sm text-purple-900 dark:text-purple-200">
                PHẦN IV. TỰ LUẬN (3,0 điểm)
              </h3>
              <p className="text-xs text-purple-800/80 dark:text-purple-300/80 mt-0.5">
                Trình bày lời giải chi tiết, lập luận chặt chẽ và vẽ hình chính xác.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold text-purple-700 dark:text-purple-300">Bài 1 (1,0 điểm) - Giải bài toán bằng cách lập hệ phương trình:</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Hai đội công nhân cùng làm chung một đoạn đường thì sau 12 ngày sẽ hoàn thành. Nếu đội thứ nhất làm một mình trong 4 ngày rồi đội thứ hai làm tiếp trong 10 ngày thì cả hai đội hoàn thành được 7/12 đoạn đường. Hỏi nếu mỗi đội làm một mình thì sau bao nhiêu ngày sẽ hoàn thành toàn bộ đoạn đường?
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold text-purple-700 dark:text-purple-300">Bài 2 (1,5 điểm) - Hình học tổng hợp đường tròn:</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Cho nửa đường tròn tâm O đường kính AB. Lấy điểm C trên nửa đường tròn (C khác A và B). Kẻ tiếp tuyến Ax, By với nửa đường tròn. Tiếp tuyến tại C cắt Ax và By lần lượt tại M và N.<br/>
                  a) Chứng minh tứ giác AMCO nội tiếp và góc MON = 90°.<br/>
                  b) Chứng minh MN = AM + BN và tích AM · BN không phụ thuộc vào vị trí điểm C.<br/>
                  c) Gọi K là giao điểm của AN và BM. Đường thẳng qua K song song với Ax cắt AB tại H. Chứng minh K là trung điểm của CH.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="font-bold text-purple-700 dark:text-purple-300">Bài 3 (0,5 điểm) - Bất đẳng thức &amp; Cực trị:</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Cho x, y &gt; 0 thỏa mãn x + y = 2. Tìm giá trị nhỏ nhất của biểu thức Q = 1/x + 1/y + 4xy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM THEO CV 7991 */}
      {activeTab === 'RUBRIC' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                TRƯỜNG TH, THCS NGUYỄN HỮU CẢNH • TỔ TỰ NHIÊN • NĂM HỌC 2026 - 2027
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                4. HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM CHI TIẾT THEO CÔNG VĂN 7991/BGDĐT-GDTrH
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Quy định biểu điểm từng bước (0,25đ) và thang điểm chuẩn cho câu hỏi Đúng - Sai
              </p>
            </div>
          </div>

          {/* Phần I Đáp án */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase text-slate-500 tracking-wider">
              Đáp án Phần I. Trắc nghiệm nhiều lựa chọn (12 câu x 0,25đ = 3,0 điểm)
            </h3>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 text-center text-xs">
              {[
                { c: 1, a: 'A' }, { c: 2, a: 'B' }, { c: 3, a: 'A' }, { c: 4, a: 'C' },
                { c: 5, a: 'A' }, { c: 6, a: 'B' }, { c: 7, a: 'A' }, { c: 8, a: 'A' },
                { c: 9, a: 'B' }, { c: 10, a: 'B' }, { c: 11, a: 'A' }, { c: 12, a: 'A' }
              ].map(item => (
                <div key={item.c} className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
                  <div className="text-[10px] text-slate-400">Câu {item.c}</div>
                  <div className="font-black text-sm text-blue-600">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phần II Barem chuẩn */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase text-slate-500 tracking-wider">
              Đáp án & Thang điểm Phần II. Trắc nghiệm Đúng - Sai (2 câu = 2,0 điểm)
            </h3>
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">Câu 1:</span>
                  <div className="grid grid-cols-4 gap-2 text-center font-bold">
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">a: Đ</span>
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">b: Đ</span>
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">c: Đ</span>
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">d: Đ</span>
                  </div>
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-100 dark:border-emerald-900">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">Câu 2:</span>
                  <div className="grid grid-cols-4 gap-2 text-center font-bold">
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">a: Đ</span>
                    <span className="p-1 rounded bg-rose-100 text-rose-800">b: S</span>
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">c: Đ</span>
                    <span className="p-1 rounded bg-emerald-100 text-emerald-800">d: Đ</span>
                  </div>
                </div>
              </div>

              {/* Barem table */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Bảng quy định điểm số câu hỏi Đúng - Sai theo Công văn 7991:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900">Đúng 1 ý: <strong>0,10 điểm</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900">Đúng 2 ý: <strong>0,25 điểm</strong></div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900">Đúng 3 ý: <strong>0,50 điểm</strong></div>
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold">Đúng cả 4 ý: <strong>1,00 điểm</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần III Đáp án */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase text-slate-500 tracking-wider">
              Đáp án Phần III. Trắc nghiệm trả lời ngắn (4 câu x 0,5đ = 2,0 điểm)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-400 block text-[10px]">Câu 1 (0,5đ)</span>
                <span className="font-mono font-bold text-sm text-indigo-600">a = 3</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-400 block text-[10px]">Câu 2 (0,5đ)</span>
                <span className="font-mono font-bold text-sm text-indigo-600">m = 4</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-400 block text-[10px]">Câu 3 (0,5đ)</span>
                <span className="font-mono font-bold text-sm text-indigo-600">124 (m)</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-400 block text-[10px]">Câu 4 (0,5đ)</span>
                <span className="font-mono font-bold text-sm text-indigo-600">AH = 6 (cm)</span>
              </div>
            </div>
          </div>

          {/* Phần IV Barem Tự luận dạng bảng 3 cột chuẩn CV 7991 */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase text-slate-500 tracking-wider">
              Hướng dẫn chấm và biểu điểm chi tiết Phần IV. Tự luận (3,0 điểm)
            </h3>

            <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded-2xl shadow-xs">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-300 dark:border-slate-700">
                    <th className="p-3 border-r border-slate-300 dark:border-slate-700 text-center w-28 shrink-0">Câu</th>
                    <th className="p-3 border-r border-slate-300 dark:border-slate-700 text-left">Hướng dẫn chi tiết</th>
                    <th className="p-3 border-slate-300 dark:border-slate-700 text-center w-24 shrink-0">Biểu điểm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {/* Bài 1 */}
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td rowSpan={4} className="p-3 border-r border-slate-200 dark:border-slate-800 font-bold text-center text-purple-700 dark:text-purple-300 bg-purple-50/30 dark:bg-purple-950/20 align-top">
                      Bài 1<br/>
                      <span className="text-[11px] font-normal text-slate-500">(1,0 điểm)</span>
                    </td>
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      Gọi thời gian đội 1 và đội 2 làm một mình xong việc lần lượt là <span className="font-semibold text-purple-600">x</span> và <span className="font-semibold text-purple-600">y</span> (ngày, điều kiện: x, y &gt; 12).
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,25đ
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      Trong 1 ngày: Đội 1 làm 1/x (đoạn đường), đội 2 làm 1/y (đoạn đường). Do hai đội cùng làm 12 ngày hoàn thành đoạn đường nên ta có phương trình: <strong>1/x + 1/y = 1/12</strong> (1).
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,25đ
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      Đội 1 làm 4 ngày được 4/x, đội 2 làm 10 ngày được 10/y, cả hai hoàn thành 7/12 đoạn đường nên ta có phương trình: <strong>4/x + 10/y = 7/12</strong> (2).
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,25đ
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      Từ (1) và (2), giải hệ phương trình (đặt u = 1/x, v = 1/y) tìm được: <strong>x = 28</strong> (thỏa mãn) và <strong>y = 21</strong> (thỏa mãn).<br/>
                      <strong>Kết luận:</strong> Nếu làm một mình thì đội 1 hoàn thành trong 28 ngày, đội 2 hoàn thành trong 21 ngày.
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,25đ
                    </td>
                  </tr>

                  {/* Bài 2 */}
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 border-t-2 border-slate-300 dark:border-slate-700">
                    <td rowSpan={3} className="p-3 border-r border-slate-200 dark:border-slate-800 font-bold text-center text-purple-700 dark:text-purple-300 bg-purple-50/30 dark:bg-purple-950/20 align-top">
                      Bài 2<br/>
                      <span className="text-[11px] font-normal text-slate-500">(1,5 điểm)</span>
                    </td>
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong>a) (0,50 điểm):</strong><br/>
                      - Vẽ hình đúng theo giả thiết bài toán.<br/>
                      - Chỉ ra Ax, By là các tiếp tuyến của (O) tại A, B nên Ax ⊥ AB, By ⊥ AB ⇒ ∠MAO = 90°, ∠NBO = 90°.<br/>
                      - Tiếp tuyến tại C cắt Ax tại M nên MC là tiếp tuyến ⇒ ∠MCO = 90°.<br/>
                      - Tứ giác AMCO có ∠MAO + ∠MCO = 90° + 90° = 180° nên AMCO là tứ giác nội tiếp đường tròn đường kính MO.<br/>
                      - Theo tính chất tiếp tuyến cắt nhau: OM là phân giác ∠AOC, ON là phân giác ∠BOC. Vì ∠AOC và ∠BOC là hai góc kề bù nên OM ⊥ ON ⇒ ∠MON = 90°.
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,50đ
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong>b) (0,50 điểm):</strong><br/>
                      - Theo tính chất hai tiếp tuyến cắt nhau: MA = MC và NB = NC.<br/>
                      - Do C nằm trên đoạn MN nên: MN = MC + NC = MA + NB (điều phải chứng minh).<br/>
                      - Tam giác MON vuông tại O (theo câu a) có OC ⊥ MN tại tiếp điểm C (OC = R là đường cao).<br/>
                      - Áp dụng hệ thức lượng trong tam giác vuông MON: MC · NC = OC².<br/>
                      - Thay MC = MA, NC = NB và OC = R ta được: <strong>AM · BN = R²</strong> (không đổi khi C di chuyển).
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,50đ
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong>c) (0,50 điểm):</strong><br/>
                      - Vì Ax ⊥ AB và By ⊥ AB nên Ax // By. Do KH // Ax nên KH // AM // BN.<br/>
                      - Áp dụng định lí Ta-lét: Trong tam giác BMA có KH // AM ⇒ KH / AM = BK / BM.<br/>
                      - Trong tam giác BNA có KH // BN ⇒ KH / BN = AK / AN.<br/>
                      - Lại có AM // BN nên BK / BM = AK / AN ⇒ KH / AM = KC / AM ⇒ KH = KC.<br/>
                      - Mà K, C, H thẳng hàng nên K là trung điểm của đoạn thẳng CH.
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,50đ
                    </td>
                  </tr>

                  {/* Bài 3 */}
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 border-t-2 border-slate-300 dark:border-slate-700">
                    <td rowSpan={2} className="p-3 border-r border-slate-200 dark:border-slate-800 font-bold text-center text-purple-700 dark:text-purple-300 bg-purple-50/30 dark:bg-purple-950/20 align-top">
                      Bài 3<br/>
                      <span className="text-[11px] font-normal text-slate-500">(0,5 điểm)</span>
                    </td>
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      Biến đổi biểu thức Q với x, y &gt; 0 và x + y = 2:<br/>
                      Q = (1/x + 1/y) + 4xy = (x + y)/(xy) + 4xy = 2/(xy) + 4xy.<br/>
                      Áp dụng bất đẳng thức Cauchy: x + y ≥ 2√(xy) ⇒ 2 ≥ 2√(xy) ⇒ xy ≤ 1.
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,25đ
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-3 border-r border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                      Tách biểu thức Q theo kĩ thuật chọn điểm rơi Cauchy (tại x = y = 1, xy = 1):<br/>
                      Q = (4xy + 1/(4xy)) + 7/(4xy).<br/>
                      - Áp dụng BĐT Cauchy: 4xy + 1/(4xy) ≥ 2 · √(4xy · 1/(4xy)) = 2.<br/>
                      - Vì xy ≤ 1 nên 7/(4xy) ≥ 7/(4 · 1) = 7/4 (hoặc tách Q = (4xy + 4/xy) - 2/xy: 4xy + 4/xy ≥ 8 và 2/xy ≥ 2... ⇒ Q ≥ 9).<br/>
                      Dấu đẳng thức xảy ra khi và chỉ khi x = y = 1 (thỏa mãn x + y = 2).<br/>
                      <strong>Kết luận:</strong> Giá trị nhỏ nhất của biểu thức Q là 9 khi x = y = 1.
                    </td>
                    <td className="p-3 font-bold text-center border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                      0,25đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300">
            <strong>* Lưu ý sư phạm khi chấm bài tự luận:</strong> Học sinh giải theo cách khác đúng với chương trình THCS vẫn cho đủ điểm từng phần tương ứng theo thang điểm quy định.
          </div>
        </div>
      )}
    </div>
  );
};
