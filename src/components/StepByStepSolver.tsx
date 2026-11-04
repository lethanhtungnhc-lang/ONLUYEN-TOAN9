import React, { useState } from 'react';
import {
  Calculator,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { MathView } from './MathView';

export const StepByStepSolver: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'HE_PHUONG_TRINH' | 'PHUONG_TRINH_BAC_2' | 'HE_THUC_LUONG' | 'HINH_TRU_NON_CAU' | 'MAU_SGK'>('HE_PHUONG_TRINH');

  // State for Hệ PT: a1 x + b1 y = c1; a2 x + b2 y = c2
  const [a1, setA1] = useState<number>(2);
  const [b1, setB1] = useState<number>(1);
  const [c1, setC1] = useState<number>(5);
  const [a2, setA2] = useState<number>(3);
  const [b2, setB2] = useState<number>(-2);
  const [c2, setC2] = useState<number>(4);

  // State for PT bậc 2: ax^2 + bx + c = 0
  const [qA, setQA] = useState<number>(1);
  const [qB, setQB] = useState<number>(-5);
  const [qC, setQC] = useState<number>(6);

  // State for Tam giác vuông
  const [sideB, setSideB] = useState<number>(3); // AB
  const [sideC, setSideC] = useState<number>(4); // AC

  // State for Hình khối
  const [radiusR, setRadiusR] = useState<number>(3);
  const [heightH, setHeightH] = useState<number>(5);

  // --- SOLVER HỆ PHƯƠNG TRÌNH ---
  const solveHePhuongTrinh = () => {
    const D = a1 * b2 - a2 * b1;
    const Dx = c1 * b2 - c2 * b1;
    const Dy = a1 * c2 - a2 * c1;

    let status = 'UNIQUE';
    let xVal = 0;
    let yVal = 0;

    if (D !== 0) {
      xVal = Dx / D;
      yVal = Dy / D;
      status = 'UNIQUE';
    } else {
      if (Dx === 0 && Dy === 0) {
        status = 'INFINITE';
      } else {
        status = 'NO_SOLUTION';
      }
    }

    return { D, Dx, Dy, status, xVal, yVal };
  };

  // --- SOLVER PT BẬC 2 ---
  const solveBac2 = () => {
    const delta = qB * qB - 4 * qA * qC;
    let roots: { x1: number; x2: number } | null = null;
    let status = 'TWO_ROOTS';

    if (delta > 0) {
      const sqrtDelta = Math.sqrt(delta);
      roots = {
        x1: (-qB + sqrtDelta) / (2 * qA),
        x2: (-qB - sqrtDelta) / (2 * qA),
      };
      status = 'TWO_ROOTS';
    } else if (delta === 0) {
      roots = {
        x1: -qB / (2 * qA),
        x2: -qB / (2 * qA),
      };
      status = 'ONE_ROOT';
    } else {
      status = 'NO_ROOTS';
    }

    return { delta, roots, status };
  };

  const hePtResult = solveHePhuongTrinh();
  const bac2Result = solveBac2();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 mb-3">
          <Calculator className="w-4 h-4" /> Phương pháp sư phạm 6 bước chuẩn GDPT 2018
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Hệ Thống Trợ Giúp & Giải Toán Từng Bước
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Phân tích đề bài, xác định dữ kiện, chọn phương pháp và giải trình tự từng bước toán học chính xác.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('HE_PHUONG_TRINH')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'HE_PHUONG_TRINH'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          Hệ phương trình bậc nhất 2 ẩn
        </button>

        <button
          onClick={() => setActiveTab('PHUONG_TRINH_BAC_2')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'PHUONG_TRINH_BAC_2'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          Phương trình bậc hai & Viète
        </button>

        <button
          onClick={() => setActiveTab('HE_THUC_LUONG')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'HE_THUC_LUONG'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          Hệ thức lượng tam giác vuông
        </button>

        <button
          onClick={() => setActiveTab('HINH_TRU_NON_CAU')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'HINH_TRU_NON_CAU'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          Hình trụ - nón - cầu
        </button>

        <button
          onClick={() => setActiveTab('MAU_SGK')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
            activeTab === 'MAU_SGK'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          Bài mẫu rút gọn căn thức
        </button>
      </div>

      {/* TAB 1: HỆ PHƯƠNG TRÌNH */}
      {activeTab === 'HE_PHUONG_TRINH' && (
        <div className="space-y-6">
          {/* Input Coefficients */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Nhập hệ số của hệ phương trình dạng: </span>
              <MathView formula="\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Equation 1 */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">Phương trình (1):</div>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="number"
                    value={a1}
                    onChange={(e) => setA1(Number(e.target.value) || 0)}
                    className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                  />
                  <span>x +</span>
                  <input
                    type="number"
                    value={b1}
                    onChange={(e) => setB1(Number(e.target.value) || 0)}
                    className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                  />
                  <span>y =</span>
                  <input
                    type="number"
                    value={c1}
                    onChange={(e) => setC1(Number(e.target.value) || 0)}
                    className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                  />
                </div>
              </div>

              {/* Equation 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">Phương trình (2):</div>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="number"
                    value={a2}
                    onChange={(e) => setA2(Number(e.target.value) || 0)}
                    className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                  />
                  <span>x +</span>
                  <input
                    type="number"
                    value={b2}
                    onChange={(e) => setB2(Number(e.target.value) || 0)}
                    className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                  />
                  <span>y =</span>
                  <input
                    type="number"
                    value={c2}
                    onChange={(e) => setC2(Number(e.target.value) || 0)}
                    className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 6 Steps Solution Output */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Quy trình phân tích & Giải toán 6 bước:
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                Toán 9 KNTT
              </span>
            </div>

            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Phân tích đề bài</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Đề bài yêu cầu giải hệ hai phương trình bậc nhất hai ẩn $x$ và $y$:
                </p>
                <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 font-mono text-xs">
                  <MathView block formula={`\\begin{cases} ${a1}x + (${b1})y = ${c1} \\quad (1) \\\\ ${a2}x + (${b2})y = ${c2} \\quad (2) \\end{cases}`} />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Xác định dữ kiện & Hệ số</h4>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <p><MathView>{`• Phương trình (1) có các hệ số: $a_1 = ${a1}$, $b_1 = ${b1}$, $c_1 = ${c1}$.`}</MathView></p>
                  <p><MathView>{`• Phương trình (2) có các hệ số: $a_2 = ${a2}$, $b_2 = ${b2}$, $c_2 = ${c2}$.`}</MathView></p>
                  <p><MathView>{'• Ẩn số cần tìm: $x$ và $y$ thuộc tập số thực $\\mathbb{R}$.'}</MathView></p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Lựa chọn phương pháp giải tối ưu</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {Math.abs(b1) === 1 || Math.abs(a1) === 1
                    ? '• Nhận xét: Hệ có ẩn với hệ số bằng 1 hoặc -1. Sử dụng PHƯƠNG PHÁP THẾ là tối ưu và hạn chế phân số.'
                    : '• Nhận xét: Các hệ số đều khác 1. Sử dụng PHƯƠNG PHÁP CỘNG ĐẠI SỐ (hoặc Định thức Cramer) để khử một ẩn nhanh chóng.'}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                4
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Trình bày lời giải từng bước</h4>
                
                {/* Method computation */}
                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs space-y-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Tính định thức xác định số nghiệm:</strong></p>
                  <MathView block formula={`D = a_1 b_2 - a_2 b_1 = (${a1}) \\cdot (${b2}) - (${a2}) \\cdot (${b1}) = ${hePtResult.D}`} />
                  <MathView block formula={`D_x = c_1 b_2 - c_2 b_1 = (${c1}) \\cdot (${b2}) - (${c2}) \\cdot (${b1}) = ${hePtResult.Dx}`} />
                  <MathView block formula={`D_y = a_1 c_2 - a_2 c_1 = (${a1}) \\cdot (${c2}) - (${a2}) \\cdot (${c1}) = ${hePtResult.Dy}`} />

                  {hePtResult.status === 'UNIQUE' && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-blue-200 dark:border-blue-900">
                      <p>Vì $D = {hePtResult.D} \\neq 0$ nên hệ phương trình có <strong>nghiệm duy nhất</strong>:</p>
                      <MathView block formula={`x = \\frac{D_x}{D} = \\frac{${hePtResult.Dx}}{${hePtResult.D}} = ${Number(hePtResult.xVal.toFixed(3))}`} />
                      <MathView block formula={`y = \\frac{D_y}{D} = \\frac{${hePtResult.Dy}}{${hePtResult.D}} = ${Number(hePtResult.yVal.toFixed(3))}`} />
                    </div>
                  )}

                  {hePtResult.status === 'NO_SOLUTION' && (
                    <p className="text-rose-600 font-semibold">
                      Vì $D = 0$ và ít nhất một trong hai $D_x, D_y \\neq 0$, hệ phương trình <strong>VÔ NGHIỆM</strong>.
                    </p>
                  )}

                  {hePtResult.status === 'INFINITE' && (
                    <p className="text-indigo-600 font-semibold">
                      Vì $D = D_x = D_y = 0$, hai phương trình tương đương, hệ phương trình có <strong>VÔ SỐ NGHIỆM</strong>.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                5
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Kết luận</h4>
                <div className="mt-1 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-900">
                  {hePtResult.status === 'UNIQUE'
                    ? `Vậy hệ phương trình có nghiệm duy nhất là (x; y) = (${Number(hePtResult.xVal.toFixed(2))}; ${Number(hePtResult.yVal.toFixed(2))}).`
                    : hePtResult.status === 'NO_SOLUTION'
                    ? 'Vậy hệ phương trình đã cho vô nghiệm.'
                    : 'Vậy hệ phương trình đã cho có vô số nghiệm.'}
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">
                6
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Kiểm tra lại kết quả (Thử lại)</h4>
                {hePtResult.status === 'UNIQUE' && (
                  <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p>• Thử vào PT (1): ${a1}({Number(hePtResult.xVal.toFixed(2))}) + ({b1})({Number(hePtResult.yVal.toFixed(2))}) = {Number((a1 * hePtResult.xVal + b1 * hePtResult.yVal).toFixed(2))} = {c1}$ (Khớp vế phải).</p>
                    <p>• Thử vào PT (2): ${a2}({Number(hePtResult.xVal.toFixed(2))}) + ({b2})({Number(hePtResult.yVal.toFixed(2))}) = {Number((a2 * hePtResult.xVal + b2 * hePtResult.yVal).toFixed(2))} = {c2}$ (Khớp vế phải).</p>
                    <p className="text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Nghiệm đã được kiểm tra chính xác 100%!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PHƯƠNG TRÌNH BẬC HAI & VIÈTE */}
      {activeTab === 'PHUONG_TRINH_BAC_2' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Nhập phương trình bậc hai: $ax^2 + bx + c = 0$
            </h3>

            <div className="flex items-center gap-3 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={qA}
                  onChange={(e) => setQA(Number(e.target.value) || 1)}
                  className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                />
                <span>$x^2$ +</span>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={qB}
                  onChange={(e) => setQB(Number(e.target.value) || 0)}
                  className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                />
                <span>$x$ +</span>
              </div>

              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={qC}
                  onChange={(e) => setQC(Number(e.target.value) || 0)}
                  className="w-16 p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-center font-bold"
                />
                <span>= 0</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Phân tích biệt thức $\Delta$ và Định lí Viète
              </h3>
            </div>

            <div className="text-xs space-y-3 text-slate-700 dark:text-slate-300">
              <p><MathView>{`• Hệ số: $a = ${qA}$, $b = ${qB}$, $c = ${qC}$.`}</MathView></p>
              
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono">
                <MathView block formula={`\\Delta = b^2 - 4ac = (${qB})^2 - 4 \\cdot (${qA}) \\cdot (${qC}) = ${qB * qB} - ${4 * qA * qC} = ${bac2Result.delta}`} />
              </div>

              {bac2Result.status === 'TWO_ROOTS' && bac2Result.roots && (
                <div className="space-y-2">
                  <p className="text-emerald-600 font-semibold">
                    <MathView>{`Vì $\\Delta = ${bac2Result.delta} > 0$ nên phương trình có hai nghiệm phân biệt:`}</MathView>
                  </p>
                  <MathView block formula={`x_1 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{${-qB} + \\sqrt{${bac2Result.delta}}}{${2 * qA}} = ${Number(bac2Result.roots.x1.toFixed(3))}`} />
                  <MathView block formula={`x_2 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{${-qB} - \\sqrt{${bac2Result.delta}}}{${2 * qA}} = ${Number(bac2Result.roots.x2.toFixed(3))}`} />
                  
                  <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 mt-3">
                    <p className="font-bold text-indigo-800 dark:text-indigo-300 mb-1">Kiểm tra lại theo định lí Viète:</p>
                    <p><MathView>{`• Tổng hai nghiệm: $S = x_1 + x_2 = -\\frac{b}{a} = -\\frac{${qB}}{${qA}} = ${Number((-qB / qA).toFixed(3))}$.`}</MathView></p>
                    <p><MathView>{`• Tích hai nghiệm: $P = x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{${qC}}{${qA}} = ${Number((qC / qA).toFixed(3))}$.`}</MathView></p>
                  </div>
                </div>
              )}

              {bac2Result.status === 'ONE_ROOT' && bac2Result.roots && (
                <div className="space-y-2">
                  <p className="text-blue-600 font-semibold">
                    <MathView>{'Vì $\\Delta = 0$ nên phương trình có nghiệm kép:'}</MathView>
                  </p>
                  <MathView block formula={`x_1 = x_2 = -\\frac{b}{2a} = -\\frac{${qB}}{${2 * qA}} = ${Number(bac2Result.roots.x1.toFixed(3))}`} />
                </div>
              )}

              {bac2Result.status === 'NO_ROOTS' && (
                <p className="text-rose-600 font-semibold">
                  <MathView>{`Vì $\\Delta = ${bac2Result.delta} < 0$ nên phương trình vô nghiệm trên tập số thực $\\mathbb{R}$.`}</MathView>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HỆ THỨC LƯỢNG */}
      {activeTab === 'HE_THUC_LUONG' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Tam giác vuông ABC vuông tại A có hai cạnh góc vuông:
          </h3>

          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold">Cạnh AB (c):</label>
              <input
                type="number"
                value={sideB}
                onChange={(e) => setSideB(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold"
              />
              <span className="text-xs text-slate-500">cm</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold">Cạnh AC (b):</label>
              <input
                type="number"
                value={sideC}
                onChange={(e) => setSideC(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold"
              />
              <span className="text-xs text-slate-500">cm</span>
            </div>
          </div>

          {/* Computed results */}
          {(() => {
            const bc = Math.sqrt(sideB * sideB + sideC * sideC);
            const h = (sideB * sideC) / bc;
            const bPrime = (sideC * sideC) / bc; // HC
            const cPrime = (sideB * sideB) / bc; // HB
            const sinB = sideC / bc;
            const cosB = sideB / bc;
            const tanB = sideC / sideB;

            return (
              <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-500">Cạnh huyền BC:</span>
                    <div className="font-bold text-sm text-blue-600 mt-1">{bc.toFixed(2)} cm</div>
                    <span className="text-[10px] text-slate-400">Định lý Pythagore</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-500">Đường cao AH (h):</span>
                    <div className="font-bold text-sm text-emerald-600 mt-1">{h.toFixed(2)} cm</div>
                    <span className="text-[10px] text-slate-400">$ah = bc$</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-slate-500">Hình chiếu BH, CH:</span>
                    <div className="font-bold text-sm text-purple-600 mt-1">{cPrime.toFixed(2)} cm & {bPrime.toFixed(2)} cm</div>
                    <span className="text-[10px] text-slate-400">$c^2 = a c\'$</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">Tỉ số lượng giác góc B:</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">sin B</span>
                      <div className="font-bold">{sinB.toFixed(3)}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">cos B</span>
                      <div className="font-bold">{cosB.toFixed(3)}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-800">
                      <span className="text-[10px] text-slate-400">tan B</span>
                      <div className="font-bold">{tanB.toFixed(3)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 4: HÌNH KHỐI THỰC TIỄN */}
      {activeTab === 'HINH_TRU_NON_CAU' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Tính toán kích thước & Thể tích Hình Trụ - Hình Nón - Hình Cầu
          </h3>

          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold">Bán kính đáy r (cm):</label>
              <input
                type="number"
                value={radiusR}
                onChange={(e) => setRadiusR(Math.max(0.5, Number(e.target.value) || 1))}
                className="w-20 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold">Chiều cao h (cm):</label>
              <input
                type="number"
                value={heightH}
                onChange={(e) => setHeightH(Math.max(0.5, Number(e.target.value) || 1))}
                className="w-20 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            {/* Cylinder */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-xs space-y-2">
              <div className="font-bold text-blue-700 dark:text-blue-300 text-sm">Hình trụ tròn</div>
              <p><MathView>{`• $S_{xq} = 2\\pi r h = 2 \\cdot \\pi \\cdot ${radiusR} \\cdot ${heightH} = ${(2 * Math.PI * radiusR * heightH).toFixed(2)}$ cm²`}</MathView></p>
              <p><MathView>{`• $S_{tp} = 2\\pi rh + 2\\pi r^2 = ${(2 * Math.PI * radiusR * heightH + 2 * Math.PI * radiusR * radiusR).toFixed(2)}$ cm²`}</MathView></p>
              <p className="font-bold text-blue-600 dark:text-blue-400"><MathView>{`• $V = \\pi r^2 h = ${(Math.PI * radiusR * radiusR * heightH).toFixed(2)}$ cm³`}</MathView></p>
            </div>

            {/* Cone */}
            {(() => {
              const l = Math.sqrt(radiusR * radiusR + heightH * heightH);
              return (
                <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs space-y-2">
                  <div className="font-bold text-purple-700 dark:text-purple-300 text-sm">Hình nón</div>
                  <p><MathView>{`• Đường sinh $l = \\sqrt{r^2 + h^2} = ${l.toFixed(2)}$ cm`}</MathView></p>
                  <p><MathView>{`• $S_{xq} = \\pi r l = ${(Math.PI * radiusR * l).toFixed(2)}$ cm²`}</MathView></p>
                  <p className="font-bold text-purple-600 dark:text-purple-400"><MathView>{`• $V = \\frac{1}{3}\\pi r^2 h = ${((1 / 3) * Math.PI * radiusR * radiusR * heightH).toFixed(2)}$ cm³`}</MathView></p>
                </div>
              );
            })()}

            {/* Sphere */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs space-y-2">
              <div className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">Hình cầu (Bán kính R={radiusR})</div>
              <p><MathView>{`• $S = 4\\pi R^2 = ${(4 * Math.PI * radiusR * radiusR).toFixed(2)}$ cm²`}</MathView></p>
              <p className="font-bold text-emerald-600 dark:text-emerald-400"><MathView>{`• $V = \\frac{4}{3}\\pi R^3 = ${((4 / 3) * Math.PI * Math.pow(radiusR, 3)).toFixed(2)}$ cm³`}</MathView></p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BÀI MẪU RÚT GỌN CĂN THỨC */}
      {activeTab === 'MAU_SGK' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Bài toán mẫu: Rút gọn biểu thức chứa căn và câu hỏi phụ (Đề thi Tuyển sinh 10)
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
              Câu I (2.0 điểm)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-200 space-y-3">
            <p className="font-semibold text-sm">
              <MathView>{'Đề bài: Cho hai biểu thức: $A = \\frac{\\sqrt{x} + 2}{\\sqrt{x} - 2}$ và $B = \\frac{\\sqrt{x}}{\\sqrt{x} + 2} + \\frac{4\\sqrt{x}}{x - 4}$ với $x \\ge 0, x \\neq 4$.'}</MathView>
            </p>
            <p>1) Tính giá trị của biểu thức A khi $x = 9$.</p>
            <p>2) Rút gọn biểu thức B.</p>
            <p><MathView>{'3) Tìm các giá trị nguyên của x để $P = \\frac{B}{A}$ nhận giá trị là một số nguyên.'}</MathView></p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-blue-600">Lời giải chi tiết câu 1:</div>
              <p>Thay $x = 9$ (thỏa mãn ĐKXĐ) vào biểu thức A:</p>
              <MathView block formula={'A = \\frac{\\sqrt{9} + 2}{\\sqrt{9} - 2} = \\frac{3 + 2}{3 - 2} = \\frac{5}{1} = 5'} />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-emerald-600">Lời giải chi tiết câu 2 (Rút gọn B):</div>
              <p><MathView>{'Ta có $x - 4 = (\\sqrt{x} - 2)(\\sqrt{x} + 2)$. Mẫu thức chung là $(\\sqrt{x} - 2)(\\sqrt{x} + 2)$.'}</MathView></p>
              <MathView block formula={'B = \\frac{\\sqrt{x}(\\sqrt{x} - 2) + 4\\sqrt{x}}{(\\sqrt{x} - 2)(\\sqrt{x} + 2)} = \\frac{x - 2\\sqrt{x} + 4\\sqrt{x}}{(\\sqrt{x} - 2)(\\sqrt{x} + 2)} = \\frac{x + 2\\sqrt{x}}{(\\sqrt{x} - 2)(\\sqrt{x} + 2)}'} />
              <MathView block formula={'B = \\frac{\\sqrt{x}(\\sqrt{x} + 2)}{(\\sqrt{x} - 2)(\\sqrt{x} + 2)} = \\frac{\\sqrt{x}}{\\sqrt{x} - 2}'} />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-purple-600">Lời giải chi tiết câu 3 (Tìm x nguyên để P nguyên):</div>
              <MathView block formula={'P = \\frac{B}{A} = \\frac{\\sqrt{x}}{\\sqrt{x} - 2} : \\frac{\\sqrt{x} + 2}{\\sqrt{x} - 2} = \\frac{\\sqrt{x}}{\\sqrt{x} + 2} = \\frac{\\sqrt{x} + 2 - 2}{\\sqrt{x} + 2} = 1 - \\frac{2}{\\sqrt{x} + 2}'} />
              <p><MathView>{'Để P nhận giá trị nguyên thì $\\frac{2}{\\sqrt{x} + 2}$ phải là số nguyên, tức là $(\\sqrt{x} + 2)$ là ước của 2.'}</MathView></p>
              <p><MathView>{'Vì $x \\ge 0 \\implies \\sqrt{x} \\ge 0 \\implies \\sqrt{x} + 2 \\ge 2$. Do đó $\\sqrt{x} + 2 = 2 \\iff \\sqrt{x} = 0 \\iff x = 0$ (thỏa mãn ĐKXĐ).'}</MathView></p>
              <p className="font-semibold text-emerald-600">Kết luận: Vậy $x = 0$ thì P nhận giá trị nguyên $P = 0$.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
