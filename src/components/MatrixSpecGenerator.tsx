import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  Layers,
  CheckCircle2,
  ListOrdered,
  FileText,
  RotateCcw,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MathView } from './MathView';
import { Question } from '../types';

interface MatrixRow {
  topic: string;
  subtopic: string;
  nb_tn: number; // Nhận biết Trắc nghiệm
  nb_tl: number; // Nhận biết Tự luận
  th_tn: number; // Thông hiểu Trắc nghiệm
  th_tl: number; // Thông hiểu Tự luận
  vd_tn: number; // Vận dụng Trắc nghiệm
  vd_tl: number; // Vận dụng Tự luận
  vdc_tn: number; // Vận dụng cao TN
  vdc_tl: number; // Vận dụng cao TL
}

const DEFAULT_MATRIX: MatrixRow[] = [
  {
    topic: '1. Căn bậc hai & căn bậc ba',
    subtopic: 'Căn thức bậc hai, hằng đẳng thức, rút gọn biểu thức chứa căn',
    nb_tn: 2, nb_tl: 0,
    th_tn: 2, th_tl: 0,
    vd_tn: 0, vd_tl: 1,
    vdc_tn: 0, vdc_tl: 0,
  },
  {
    topic: '2. Hệ phương trình bậc nhất 2 ẩn',
    subtopic: 'Khái niệm, giải hệ bằng PP thế & cộng, bài toán thực tế',
    nb_tn: 2, nb_tl: 0,
    th_tn: 1, th_tl: 0,
    vd_tn: 0, vd_tl: 1,
    vdc_tn: 0, vdc_tl: 0,
  },
  {
    topic: '3. Phương trình bậc 2 & Viète',
    subtopic: 'Công thức nghiệm, định lí Viète và hệ thức đối xứng',
    nb_tn: 1, nb_tl: 0,
    th_tn: 1, th_tl: 0,
    vd_tn: 0, vd_tl: 1,
    vdc_tn: 0, vdc_tl: 0,
  },
  {
    topic: '4. Hệ thức lượng & Đường tròn',
    subtopic: 'Tỉ số lượng giác, tiếp tuyến, góc nội tiếp, tứ giác nội tiếp',
    nb_tn: 2, nb_tl: 0,
    th_tn: 1, th_tl: 0,
    vd_tn: 0, vd_tl: 1,
    vdc_tn: 0, vdc_tl: 0,
  },
  {
    topic: '5. Toán thực tế & Cực trị',
    subtopic: 'Hình khối thực tiễn, BĐT Cauchy tìm Min/Max',
    nb_tn: 1, nb_tl: 0,
    th_tn: 0, th_tl: 0,
    vd_tn: 0, vd_tl: 0,
    vdc_tn: 0, vdc_tl: 1,
  },
];

export const MatrixSpecGenerator: React.FC = () => {
  const { questions } = useApp();
  const [activeTab, setActiveTab] = useState<'MATRIX' | 'SPEC' | 'EXAM_PREVIEW' | 'RUBRIC'>('MATRIX');
  const [examName, setExamName] = useState('ĐỀ KIỂM TRA ĐỊNH KỲ MÔN TOÁN LỚP 9 – CHUẨN GDPT 2018');
  const [duration, setDuration] = useState(90);
  const [matrixData, setMatrixData] = useState<MatrixRow[]>(DEFAULT_MATRIX);
  const [currentCode, setCurrentCode] = useState('101');

  // Compute points
  const pointsTN = 0.25; // 0.25đ / câu trắc nghiệm
  const pointsTL_VD = 1.0;
  const pointsTL_VDC = 0.5;

  let totalTNCount = 0;
  let totalTLCount = 0;
  let totalNB_TN = 0, totalNB_TL = 0;
  let totalTH_TN = 0, totalTH_TL = 0;
  let totalVD_TN = 0, totalVD_TL = 0;
  let totalVDC_TN = 0, totalVDC_TL = 0;

  matrixData.forEach((row) => {
    totalNB_TN += row.nb_tn; totalNB_TL += row.nb_tl;
    totalTH_TN += row.th_tn; totalTH_TL += row.th_tl;
    totalVD_TN += row.vd_tn; totalVD_TL += row.vd_tl;
    totalVDC_TN += row.vdc_tn; totalVDC_TL += row.vdc_tl;
    totalTNCount += (row.nb_tn + row.th_tn + row.vd_tn + row.vdc_tn);
    totalTLCount += (row.nb_tl + row.th_tl + row.vd_tl + row.vdc_tl);
  });

  const totalScore = (
    totalTNCount * pointsTN +
    (totalNB_TL + totalTH_TL + totalVD_TL) * pointsTL_VD +
    totalVDC_TL * pointsTL_VDC
  );

  // Generate test questions based on question bank and permutation
  const generatedQuestions: Question[] = React.useMemo(() => {
    const list = [...questions];
    if (currentCode === '102') {
      return list.reverse();
    } else if (currentCode === '103') {
      return [...list].sort((a, b) => b.level.localeCompare(a.level));
    } else if (currentCode === '104') {
      return [...list].sort((a, b) => a.title.length - b.title.length);
    }
    return list;
  }, [questions, currentCode]);

  // Export to Word document format (.doc html MIME)
  const handleExportWord = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${examName}</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; }
          table { border-collapse: collapse; width: 100%; margin-top: 10px; }
          th, td { border: 1px solid black; padding: 6px; text-align: center; }
          .left { text-align: left; }
          .header-box { display: flex; justify-content: space-between; margin-bottom: 20px; }
          h2, h3 { text-align: center; margin: 5px; }
        </style>
      </head>
      <body>
        <table style="border: none; width: 100%;">
          <tr>
            <td style="border: none; text-align: center; width: 45%;">
              <strong>SỞ GD&ĐT ...</strong><br/>
              <strong>TRƯỜNG THCS ...</strong>
            </td>
            <td style="border: none; text-align: center; width: 55%;">
              <strong>${examName.toUpperCase()}</strong><br/>
              NĂM HỌC 2025 - 2026<br/>
              <em>Thời gian làm bài: ${duration} phút (không kể thời gian giao đề)</em>
            </td>
          </tr>
        </table>
        <p style="text-align: right; font-weight: bold;">Mã đề thi: ${currentCode}</p>
        <hr/>
        <h3>PHẦN I: MA TRẬN ĐỀ KIỂM TRA MÔN TOÁN 9</h3>
        <p>Tỉ lệ: Nhận biết 40% - Thông hiểu 30% - Vận dụng 20% - Vận dụng cao 10%</p>
        <table>
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th rowspan="2">TT</th>
              <th rowspan="2">Chủ đề</th>
              <th colspan="2">Nhận biết</th>
              <th colspan="2">Thông hiểu</th>
              <th colspan="2">Vận dụng</th>
              <th colspan="2">Vận dụng cao</th>
              <th rowspan="2">Tổng số câu</th>
              <th rowspan="2">Tổng điểm</th>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <th>TN</th><th>TL</th>
              <th>TN</th><th>TL</th>
              <th>TN</th><th>TL</th>
              <th>TN</th><th>TL</th>
            </tr>
          </thead>
          <tbody>
            ${matrixData.map((row, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td class="left"><strong>${row.topic}</strong><br/><small>${row.subtopic}</small></td>
                <td>${row.nb_tn}</td><td>${row.nb_tl}</td>
                <td>${row.th_tn}</td><td>${row.th_tl}</td>
                <td>${row.vd_tn}</td><td>${row.vd_tl}</td>
                <td>${row.vdc_tn}</td><td>${row.vdc_tl}</td>
                <td>${row.nb_tn + row.nb_tl + row.th_tn + row.th_tl + row.vd_tn + row.vd_tl + row.vdc_tn + row.vdc_tl}</td>
                <td>${(row.nb_tn * pointsTN + row.th_tn * pointsTN + row.vd_tl * pointsTL_VD + row.vdc_tl * pointsTL_VDC).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="page-break-before: always;"></div>
        <h3>PHẦN II: NỘI DUNG ĐỀ THI (MÃ ĐỀ ${currentCode})</h3>
        <p><strong>A. TRẮC NGHIỆM KHÁCH QUAN:</strong></p>
        ${generatedQuestions.filter(q => q.type !== 'ESSAY').map((q, idx) => `
          <p><strong>Câu ${idx + 1}:</strong> ${q.title}</p>
          ${q.options ? q.options.map((opt, i) => `&nbsp;&nbsp;&nbsp;&nbsp;${String.fromCharCode(65 + i)}. ${opt}`).join('<br/>') : ''}
        `).join('<br/>')}

        <p><strong>B. PHẦN TỰ LUẬN:</strong></p>
        ${generatedQuestions.filter(q => q.type === 'ESSAY').map((q, idx) => `
          <p><strong>Bài ${idx + 1} (${q.points} điểm):</strong> ${q.title}</p>
        `).join('<br/>')}

        <div style="page-break-before: always;"></div>
        <h3>PHẦN III: HƯỚNG DẪN CHẤM VÀ BIỂU ĐIỂM CHI TIẾT</h3>
        <p><em>(Biểu điểm chấm từng bước 0.25đ - 0.5đ và đáp án chấp nhận cách giải đúng khác)</em></p>
        ${generatedQuestions.map((q, idx) => `
          <div style="margin-bottom: 15px; border-bottom: 1px dashed #ccc; padding-bottom: 8px;">
            <p><strong>Câu/Bài ${idx + 1}:</strong> Đáp án đúng: <strong>${q.correctAnswer}</strong></p>
            ${q.stepByStepSolution.map(s => `<p style="margin-left: 20px;">+ ${s.title}: ${s.content} (0.25đ)</p>`).join('')}
          </div>
        `).join('')}
        <p style="text-align: right; margin-top: 30px;">
          <em>Tác giả biên soạn: Teacher Lê Thanh Tùng</em>
        </p>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ma-tran-de-thi-Toan-9-Ma-${currentCode}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Công Cụ Dành Cho Giáo Viên & Quản Trị Viên
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Ma Trận, Bản Đặc Tả & Tạo Đề Kiểm Tra Tự Động
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Biên soạn đề thi chuẩn quy định Bộ Giáo dục & Đào tạo (GDPT 2018), sinh nhiều mã đề hoán vị và xuất Word/PDF.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportWord}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Download className="w-4 h-4" /> Xuất Word (.doc)
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" /> In / Lưu PDF
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('MATRIX')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'MATRIX'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" /> 1. Ma trận đề kiểm tra
          </button>

          <button
            onClick={() => setActiveTab('SPEC')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'SPEC'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" /> 2. Bản đặc tả đề thi
          </button>

          <button
            onClick={() => setActiveTab('EXAM_PREVIEW')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'EXAM_PREVIEW'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" /> 3. Xem trước đề thi
          </button>

          <button
            onClick={() => setActiveTab('RUBRIC')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'RUBRIC'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> 4. Hướng dẫn chấm
          </button>
        </div>

        {/* Code Permutation */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mã đề:</span>
          {['101', '102', '103', '104'].map((code) => (
            <button
              key={code}
              onClick={() => setCurrentCode(code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                currentCode === code
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Mã {code}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: MA TRẬN ĐỀ KIỂM TRA */}
      {activeTab === 'MATRIX' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  KHUNG MA TRẬN ĐỀ KIỂM TRA MÔN TOÁN LỚP 9 (ĐỊNH DẠNG 2 CHIỀU)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tỉ lệ điểm: Nhận biết 40% (4.0đ) • Thông hiểu 30% (3.0đ) • Vận dụng 20% (2.0đ) • Vận dụng cao 10% (1.0đ)
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Tổng điểm: {totalScore.toFixed(1)} / 10.0 điểm
                </span>
              </div>
            </div>

            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700">
                  <th className="p-2 border border-slate-300 dark:border-slate-700" rowSpan={2}>TT</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700 text-left min-w-[200px]" rowSpan={2}>Chủ đề / Đơn vị kiến thức</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>Nhận biết</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>Thông hiểu</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>Vận dụng</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>Vận dụng cao</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700" rowSpan={2}>Tổng số câu</th>
                  <th className="p-2 border border-slate-300 dark:border-slate-700" rowSpan={2}>Điểm</th>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-700">
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TN</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TL</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TN</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TL</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TN</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TL</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TN</th>
                  <th className="p-1 border border-slate-300 dark:border-slate-700">TL</th>
                </tr>
              </thead>
              <tbody>
                {matrixData.map((row, idx) => {
                  const rowTN = row.nb_tn + row.th_tn + row.vd_tn + row.vdc_tn;
                  const rowTL = row.nb_tl + row.th_tl + row.vd_tl + row.vdc_tl;
                  const rowPoints = (rowTN * pointsTN) + (row.nb_tl + row.th_tl + row.vd_tl) * pointsTL_VD + row.vdc_tl * pointsTL_VDC;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-2 border border-slate-300 dark:border-slate-700 font-semibold">{idx + 1}</td>
                      <td className="p-2 border border-slate-300 dark:border-slate-700 text-left">
                        <div className="font-bold text-slate-900 dark:text-white">{row.topic}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{row.subtopic}</div>
                      </td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.nb_tn || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.nb_tl || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.th_tn || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.th_tl || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.vd_tn || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.vd_tl || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.vdc_tn || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700">{row.vdc_tl || '-'}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700 font-bold">{rowTN + rowTL}</td>
                      <td className="p-1 border border-slate-300 dark:border-slate-700 font-bold text-blue-600">{rowPoints.toFixed(2)}</td>
                    </tr>
                  );
                })}

                {/* Total row */}
                <tr className="bg-purple-50/60 dark:bg-purple-950/40 font-bold text-slate-900 dark:text-white border-t-2 border-purple-300 dark:border-purple-800">
                  <td className="p-2 border border-slate-300 dark:border-slate-700" colSpan={2}>TỔNG SỐ CÂU</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalNB_TN}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalNB_TL}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalTH_TN}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalTH_TL}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalVD_TN}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalVD_TL}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalVDC_TN}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700">{totalVDC_TL}</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700 text-purple-700 dark:text-purple-300 font-extrabold">{totalTNCount + totalTLCount} câu</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700 text-purple-700 dark:text-purple-300 font-extrabold">{totalScore.toFixed(1)}đ</td>
                </tr>

                {/* Percentage row */}
                <tr className="bg-slate-100 dark:bg-slate-800/80 font-semibold text-slate-700 dark:text-slate-300">
                  <td className="p-2 border border-slate-300 dark:border-slate-700" colSpan={2}>TỈ LỆ % ĐIỂM SỐ</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>40%</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>30%</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>20%</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>10%</td>
                  <td className="p-1 border border-slate-300 dark:border-slate-700" colSpan={2}>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: BẢN ĐẶC TẢ ĐỀ KIỂM TRA */}
      {activeTab === 'SPEC' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              BẢN ĐẶC TẢ KỸ THUẬT ĐỀ KIỂM TRA MÔN TOÁN 9
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Mô tả chi tiết yêu cầu cần đạt theo chuẩn chương trình GDPT 2018 đối với từng đơn vị kiến thức.
            </p>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 font-bold border border-slate-300 dark:border-slate-700">
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700">Chủ đề</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700">Đơn vị kiến thức</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700">Yêu cầu cần đạt</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Mức độ</th>
                  <th className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Hình thức</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 font-semibold" rowSpan={3}>
                    Căn bậc hai và căn bậc ba
                  </td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Căn bậc hai số học</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Nhận biết căn bậc hai số học của một số thực không âm.</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-blue-600">Nhận biết</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Trắc nghiệm (1 câu)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Điều kiện xác định căn thức</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Tìm điều kiện để căn thức bậc hai có nghĩa ($A \ge 0$).</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-emerald-600">Thông hiểu</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Trắc nghiệm (1 câu)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Rút gọn biểu thức chứa căn</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Vận dụng các phép biến đổi đơn giản quy đồng và rút gọn biểu thức phân thức chứa căn.</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-amber-600">Vận dụng</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Tự luận (1 bài - 1.0đ)</td>
                </tr>

                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 font-semibold" rowSpan={2}>
                    Hệ phương trình bậc nhất 2 ẩn
                  </td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Giải hệ phương trình</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Giải hệ phương trình bậc nhất hai ẩn bằng phương pháp thế hoặc phương pháp cộng đại số.</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-emerald-600">Thông hiểu</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Trắc nghiệm (1 câu)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Giải bài toán thực tế</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Giải bài toán thực tế về chuyển động, năng suất bằng cách lập hệ phương trình.</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-amber-600">Vận dụng</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Tự luận (1 bài - 1.5đ)</td>
                </tr>

                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 font-semibold" rowSpan={2}>
                    Đường tròn & Tứ giác nội tiếp
                  </td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Góc nội tiếp</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Nhận biết tính chất góc nội tiếp và góc chắn nửa đường tròn.</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-blue-600">Nhận biết</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Trắc nghiệm (1 câu)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Chứng minh tứ giác nội tiếp</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Vận dụng dấu hiệu tổng hai góc đối bằng 180° để chứng minh tứ giác nội tiếp.</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-amber-600">Vận dụng</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Tự luận (1 câu - 1.0đ)</td>
                </tr>

                <tr>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 font-semibold">
                    Cực trị & Bất đẳng thức
                  </td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">BĐT Cauchy / Min Max</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700">Tìm giá trị nhỏ nhất hoặc giá trị lớn nhất của biểu thức chứa biến.</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center font-bold text-rose-600">Vận dụng cao</td>
                  <td className="p-2.5 border border-slate-300 dark:border-slate-700 text-center">Tự luận (1 câu - 0.5đ)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: XEM TRƯỚC ĐỀ THI (THEO MÃ ĐỀ) */}
      {activeTab === 'EXAM_PREVIEW' && (
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase">
              {examName}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Thời gian làm bài: {duration} phút • Mã đề: <span className="font-bold text-blue-600 text-sm">{currentCode}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wider">
                Phần I: Trắc nghiệm khách quan ({generatedQuestions.filter(q => q.type !== 'ESSAY').length * pointsTN} điểm)
              </h4>
              <div className="space-y-4">
                {generatedQuestions.filter(q => q.type !== 'ESSAY').map((q, idx) => (
                  <div key={q.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">
                      <strong>Câu {idx + 1}:</strong> <MathView>{q.title}</MathView>
                    </p>
                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pl-4">
                        {q.options.map((opt, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                            <span className="font-bold text-blue-600">{String.fromCharCode(65 + i)}.</span>
                            <MathView>{opt}</MathView>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300 mb-3 uppercase tracking-wider">
                Phần II: Tự luận ({generatedQuestions.filter(q => q.type === 'ESSAY').length * 1.5} điểm)
              </h4>
              <div className="space-y-4">
                {generatedQuestions.filter(q => q.type === 'ESSAY').map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <p className="font-semibold text-slate-900 dark:text-white mb-2">
                      <strong>Bài {idx + 1} ({q.points} điểm):</strong> <MathView>{q.title}</MathView>
                    </p>
                    <div className="h-16 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                      (Khu vực trình bày bài làm của học sinh)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: HƯỚNG DẪN CHẤM & BIỂU ĐIỂM (RUBRIC) */}
      {activeTab === 'RUBRIC' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              HƯỚNG DẪN CHẤM VÀ THANG ĐIỂM CHI TIẾT (MÃ ĐỀ {currentCode})
            </h3>
            <span className="text-xs text-slate-500">Biên soạn: Teacher Lê Thanh Tùng</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 italic">
            * Lưu ý khi chấm thi: Học sinh làm cách khác đúng theo chương trình Toán 9 vẫn cho điểm tối đa theo từng bước tương đương.
          </p>

          <div className="space-y-4">
            {generatedQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Câu/Bài {idx + 1} ({q.points}đ):
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    Đáp án: {String(q.correctAnswer)}
                  </span>
                </div>

                <div className="pt-2 pl-3 border-l-2 border-blue-500 space-y-1.5 text-slate-700 dark:text-slate-300">
                  {q.stepByStepSolution.map((s, i) => (
                    <div key={i} className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">• {s.title}:</span>{' '}
                        <MathView>{s.content}</MathView>
                      </div>
                      <span className="font-bold text-slate-400 shrink-0">{(q.points / q.stepByStepSolution.length).toFixed(2)}đ</span>
                    </div>
                  ))}
                </div>

                {q.commonMistakes && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2 rounded-lg mt-1">
                    <strong>Lỗi trừ điểm:</strong> {q.commonMistakes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
