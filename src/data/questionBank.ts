import { Question } from '../types';

export const QUESTION_BANK: Question[] = [
  // --- CHƯƠNG I: HỆ PHƯƠNG TRÌNH ---
  {
    id: 'qb-c1-01',
    chapterId: 'chuong-1',
    lessonId: 'bai-1',
    title: 'Cặp số nào dưới đây là nghiệm của hệ phương trình $\\begin{cases} 2x - y = 3 \\\\ x + 2y = 4 \\end{cases}$?',
    type: 'MULTIPLE_CHOICE',
    level: 'NHAN_BIET',
    points: 0.25,
    options: ['(2; 1)', '(1; 2)', '(3; 3)', '(0; -3)'],
    correctAnswer: '(2; 1)',
    stepByStepSolution: [
      { title: 'Bước 1: Thay x = 2, y = 1 vào phương trình 1', content: '$2(2) - 1 = 4 - 1 = 3 = VP$ (Thỏa mãn).' },
      { title: 'Bước 2: Thay x = 2, y = 1 vào phương trình 2', content: '$2 + 2(1) = 2 + 2 = 4 = VP$ (Thỏa mãn).' },
      { title: 'Kết luận', content: 'Cặp số (2; 1) thỏa mãn đồng thời cả hai phương trình nên là nghiệm của hệ.' }
    ],
    formulasUsed: ['Thay cặp số (x; y) vào hai vế của hệ phương trình'],
    commonMistakes: 'Chỉ thử vào phương trình đầu tiên mà quên thử phương trình thứ hai.',
    quickTips: 'Thay nhẩm nhanh cặp số nguyên nhỏ nhất vào hệ.'
  },
  {
    id: 'qb-c1-02',
    chapterId: 'chuong-1',
    lessonId: 'bai-2',
    title: 'Hệ phương trình $\\begin{cases} x + 2y = 5 \\\\ 3x - y = 1 \\end{cases}$ có nghiệm duy nhất $(x; y)$. Giá trị của biểu thức $x + y$ là:',
    type: 'MULTIPLE_CHOICE',
    level: 'THONG_HIEU',
    points: 0.5,
    options: ['3', '1', '2', '4'],
    correctAnswer: '3',
    stepByStepSolution: [
      { title: 'Bước 1: Rút ẩn bằng phương pháp thế', content: 'Từ phương trình 1 ta có: $x = 5 - 2y$.' },
      { title: 'Bước 2: Thế vào phương trình 2', content: '$3(5 - 2y) - y = 1 \\iff 15 - 6y - y = 1 \\iff -7y = -14 \\iff y = 2$.' },
      { title: 'Bước 3: Tìm ẩn x', content: '$x = 5 - 2(2) = 1$. Vậy nghiệm của hệ là $(1; 2)$.' },
      { title: 'Bước 4: Tính tổng x + y', content: '$x + y = 1 + 2 = 3$.' }
    ],
    formulasUsed: ['Phương pháp thế giải hệ hai phương trình bậc nhất hai ẩn'],
    commonMistakes: 'Tìm ra x = 1, y = 2 nhưng quên đọc kỹ câu hỏi là tính x + y.',
    quickTips: 'Có thể cộng hai phương trình: $4x + y = 6$, tuy nhiên giải trực tiếp ra nghiệm (1; 2) vẫn rất nhanh.'
  },
  {
    id: 'qb-c1-03',
    chapterId: 'chuong-1',
    lessonId: 'bai-2',
    title: 'Cho hệ phương trình $\\begin{cases} mx + y = 3 \\\\ 4x + my = 6 \\end{cases}$. Hệ phương trình vô nghiệm khi m nhận giá trị là:',
    type: 'MULTIPLE_CHOICE',
    level: 'VAN_DUNG',
    points: 0.75,
    options: ['$m = -2$', '$m = 2$', '$m = \\pm 2$', '$m = 0$'],
    correctAnswer: '$m = -2$',
    stepByStepSolution: [
      { title: 'Bước 1: Điều kiện vô nghiệm', content: 'Hệ phương trình $\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}$ vô nghiệm khi $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$.' },
      { title: 'Bước 2: Áp dụng với hệ bài cho', content: 'Ta có tỉ lệ: $\\frac{m}{4} = \\frac{1}{m} \\neq \\frac{3}{6} = \\frac{1}{2}$.' },
      { title: 'Bước 3: Giải điều kiện m', content: 'Từ $\\frac{m}{4} = \\frac{1}{m} \\implies m^2 = 4 \\implies m = 2$ hoặc $m = -2$.' },
      { title: 'Bước 4: Đối chiếu với điều kiện khác 1/2', content: 'Nếu $m = 2$ thì $\\frac{2}{4} = \\frac{1}{2} = \\frac{3}{6}$ (hệ có vô số nghiệm). Nếu $m = -2$ thì $\\frac{-2}{4} = -\\frac{1}{2} \\neq \\frac{1}{2}$ (thỏa mãn hệ vô nghiệm).' }
    ],
    formulasUsed: ['$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$'],
    commonMistakes: 'Nhiều học sinh chọn $m = \\pm 2$ do quên kiểm tra điều kiện $\\neq \\frac{c_1}{c_2}$.'
  },
  {
    id: 'qb-c1-04',
    chapterId: 'chuong-1',
    lessonId: 'bai-1',
    title: 'Khẳng định sau đây Đúng hay Sai: "Phương trình bậc nhất hai ẩn $ax + by = c$ ($a^2 + b^2 \\neq 0$) luôn có duy nhất một nghiệm."',
    type: 'TRUE_FALSE',
    level: 'NHAN_BIET',
    points: 0.25,
    correctAnswer: 'Sai',
    stepByStepSolution: [
      { title: 'Giải thích lý thuyết', content: 'Phương trình bậc nhất hai ẩn $ax + by = c$ luôn có VÔ SỐ NGHIỆM. Tập nghiệm của nó được biểu diễn bởi đường thẳng $ax + by = c$ trên mặt phẳng tọa độ.' }
    ],
    formulasUsed: ['Tập nghiệm của phương trình ax + by = c'],
    commonMistakes: 'Nhầm lẫn giữa phương trình bậc nhất một ẩn (duy nhất 1 nghiệm khi a ≠ 0) và bậc nhất hai ẩn.'
  },
  {
    id: 'qb-c1-05',
    chapterId: 'chuong-1',
    lessonId: 'bai-3',
    title: 'Điền số thích hợp: Một cano xuôi dòng một khúc sông dài 60km hết 2 giờ và ngược dòng hết 3 giờ. Vận tốc của dòng nước là ... km/h.',
    type: 'FILL_IN',
    level: 'VAN_DUNG',
    points: 0.5,
    correctAnswer: '5',
    stepByStepSolution: [
      { title: 'Bước 1: Tính vận tốc xuôi và ngược dòng', content: 'Vận tốc xuôi dòng: $v_{xuôi} = 60 : 2 = 30$ km/h. Vận tốc ngược dòng: $v_{ngược} = 60 : 3 = 20$ km/h.' },
      { title: 'Bước 2: Lập hệ hoặc áp dụng công thức', content: 'Ta có: $v_{xuôi} - v_{ngược} = 2 \\cdot v_{nước} \\implies 30 - 20 = 2 \\cdot v_{nước} \\implies 2 v_{nước} = 10 \\implies v_{nước} = 5$ km/h.' }
    ],
    formulasUsed: ['$v_{xuôi} = v_{cano} + v_{nước}$; $v_{ngược} = v_{cano} - v_{nước}$'],
    quickTips: 'Công thức giải nhanh: $v_{nước} = \\frac{v_{xuôi} - v_{ngược}}{2}$.'
  },

  // --- CHƯƠNG III: CĂN BẬC HAI VÀ CĂN BẬC BA ---
  {
    id: 'qb-c3-01',
    chapterId: 'chuong-3',
    lessonId: 'bai-7',
    title: 'Căn bậc hai số học của 81 là:',
    type: 'MULTIPLE_CHOICE',
    level: 'NHAN_BIET',
    points: 0.25,
    options: ['9', '-9', '$\\pm 9$', '81'],
    correctAnswer: '9',
    stepByStepSolution: [
      { title: 'Định nghĩa căn bậc hai số học', content: 'Với số thực dương a, căn bậc hai số học là số dương $\\sqrt{a}$ có bình phương bằng a. Do $9 > 0$ và $9^2 = 81$ nên căn bậc hai số học của 81 là 9.' }
    ],
    formulasUsed: ['$\\sqrt{a^2} = a$ với $a > 0$'],
    commonMistakes: 'Chọn $\\pm 9$. Chú ý: Căn bậc hai của 81 là $\\pm 9$, nhưng căn bậc hai SỐ HỌC chỉ lấy giá trị không âm 9.'
  },
  {
    id: 'qb-c3-02',
    chapterId: 'chuong-3',
    lessonId: 'bai-7',
    title: 'Biểu thức $\\sqrt{\\frac{-5}{2x - 4}}$ xác định khi và chỉ khi:',
    type: 'MULTIPLE_CHOICE',
    level: 'THONG_HIEU',
    points: 0.5,
    options: ['$x < 2$', '$x \\le 2$', '$x > 2$', '$x \\ge 2$'],
    correctAnswer: '$x < 2$',
    stepByStepSolution: [
      { title: 'Bước 1: Đặt điều kiện trong căn', content: 'Biểu thức có nghĩa khi $\\frac{-5}{2x - 4} \\ge 0$ và mẫu thức $2x - 4 \\neq 0$.' },
      { title: 'Bước 2: Xét dấu phân thức', content: 'Vì tử số $-5 < 0$ nên để phân thức dương thì mẫu thức phải cùng dấu âm với tử thức: $2x - 4 < 0$.' },
      { title: 'Bước 3: Giải bất phương trình', content: '$2x - 4 < 0 \\iff 2x < 4 \\iff x < 2$.' }
    ],
    formulasUsed: ['$\\frac{A}{B} \\ge 0$ với $A < 0 \\implies B < 0$'],
    commonMistakes: 'Lấy dấu $\\le 2$ dẫn đến mẫu bằng 0 là sai.'
  },
  {
    id: 'qb-c3-03',
    chapterId: 'chuong-3',
    lessonId: 'bai-9',
    title: 'Giá trị rút gọn của biểu thức $M = \\sqrt{7 - 4\\sqrt{3}} + \\sqrt{3}$ là:',
    type: 'MULTIPLE_CHOICE',
    level: 'THONG_HIEU',
    points: 0.5,
    options: ['2', '$2\\sqrt{3}$', '4', '$2 - 2\\sqrt{3}$'],
    correctAnswer: '2',
    stepByStepSolution: [
      { title: 'Bước 1: Đưa biểu thức trong căn về bình phương', content: 'Ta có $7 - 4\\sqrt{3} = 4 - 2 \\cdot 2 \\cdot \\sqrt{3} + 3 = 2^2 - 2(2)(\\sqrt{3}) + (\\sqrt{3})^2 = (2 - \\sqrt{3})^2$.' },
      { title: 'Bước 2: Áp dụng hằng đẳng thức', content: '$\\sqrt{(2 - \\sqrt{3})^2} = |2 - \\sqrt{3}|$. Vì $2 = \\sqrt{4} > \\sqrt{3}$ nên $|2 - \\sqrt{3}| = 2 - \\sqrt{3}$.' },
      { title: 'Bước 3: Thu gọn', content: '$M = (2 - \\sqrt{3}) + \\sqrt{3} = 2$.' }
    ],
    formulasUsed: ['$\\sqrt{A^2} = |A|$; Hằng đẳng thức $(a-b)^2 = a^2 - 2ab + b^2$'],
    quickTips: 'Để ý $7 = 4 + 3$ và $4\\sqrt{3} = 2 \\cdot 2 \\cdot \\sqrt{3}$, tách ngay thành $(2 - \\sqrt{3})^2$.'
  },
  {
    id: 'qb-c3-04',
    chapterId: 'chuong-3',
    lessonId: 'bai-9',
    title: 'Rút gọn biểu thức $P = \\left(\\frac{1}{\\sqrt{x} - 2} - \\frac{1}{\\sqrt{x} + 2}\\right) \\cdot \\frac{x - 4}{4}$ với $x \\ge 0, x \\neq 4$.',
    type: 'ESSAY',
    level: 'VAN_DUNG',
    points: 1.0,
    correctAnswer: '1',
    stepByStepSolution: [
      { title: 'Bước 1: Quy đồng mẫu thức', content: 'Mẫu thức chung trong ngoặc là $(\\sqrt{x}-2)(\\sqrt{x}+2) = x - 4$. Ta có: $\\frac{1}{\\sqrt{x}-2} - \\frac{1}{\\sqrt{x}+2} = \\frac{(\\sqrt{x}+2) - (\\sqrt{x}-2)}{x - 4}$.' },
      { title: 'Bước 2: Rút gọn tử số', content: '$\\frac{\\sqrt{x} + 2 - \\sqrt{x} + 2}{x - 4} = \\frac{4}{x - 4}$.' },
      { title: 'Bước 3: Nhân hai phân thức', content: '$P = \\frac{4}{x - 4} \\cdot \\frac{x - 4}{4} = 1$.' },
      { title: 'Kết luận', content: 'Vậy $P = 1$ với mọi $x \\ge 0, x \\neq 4$.' }
    ],
    formulasUsed: ['Quy đồng mẫu thức chứa căn', 'Hiệu hai bình phương: $(\\sqrt{x}-2)(\\sqrt{x}+2) = x - 4$'],
    commonMistakes: 'Khi trừ tử thức quên đổi dấu: viết $\\sqrt{x}+2 - \\sqrt{x} - 2 = 0$ là sai lầm nghiêm trọng.'
  },

  // --- CHƯƠNG IV: HỆ THỨC LƯỢNG TAM GIÁC VUÔNG ---
  {
    id: 'qb-c4-01',
    chapterId: 'chuong-4',
    lessonId: 'bai-11',
    title: 'Cho tam giác ABC vuông tại A có AB = 6cm, BC = 10cm. Giá trị của $\\cos B$ bằng:',
    type: 'MULTIPLE_CHOICE',
    level: 'NHAN_BIET',
    points: 0.25,
    options: ['0,6', '0,8', '0,75', '1,33'],
    correctAnswer: '0,6',
    stepByStepSolution: [
      { title: 'Áp dụng định nghĩa tỉ số lượng giác', content: 'Trong tam giác vuông ABC vuông tại A, với góc B thì cạnh kề là AB, cạnh huyền là BC.' },
      { title: 'Tính cos B', content: '$\\cos B = \\frac{\\text{kề}}{\\text{huyền}} = \\frac{AB}{BC} = \\frac{6}{10} = 0,6$.' }
    ],
    formulasUsed: ['$\\cos = \\frac{\\text{kề}}{\\text{huyền}}$']
  },
  {
    id: 'qb-c4-02',
    chapterId: 'chuong-4',
    lessonId: 'bai-12',
    title: 'Cho tam giác ABC vuông tại A có đường cao AH. Biết $BH = 4$cm, $CH = 9$cm. Độ dài đường cao AH là:',
    type: 'MULTIPLE_CHOICE',
    level: 'THONG_HIEU',
    points: 0.5,
    options: ['6 cm', '13 cm', '6,5 cm', '36 cm'],
    correctAnswer: '6 cm',
    stepByStepSolution: [
      { title: 'Hệ thức đường cao và hình chiếu', content: 'Trong tam giác vuông, bình phương đường cao ứng với cạnh huyền bằng tích hai hình chiếu của hai cạnh góc vuông trên cạnh huyền: $AH^2 = BH \\cdot CH$.' },
      { title: 'Thay số và tính toán', content: '$AH^2 = 4 \\cdot 9 = 36 \\implies AH = \\sqrt{36} = 6$ cm.' }
    ],
    formulasUsed: ['$h^2 = b\' \\cdot c\'$']
  },

  // --- CHƯƠNG VI: PHƯƠNG TRÌNH BẬC HAI & VIÈTE ---
  {
    id: 'qb-c6-01',
    chapterId: 'chuong-6',
    lessonId: 'bai-19',
    title: 'Phương trình $x^2 - 7x + 12 = 0$ có tập nghiệm là:',
    type: 'MULTIPLE_CHOICE',
    level: 'NHAN_BIET',
    points: 0.25,
    options: ['{3; 4}', '{-3; -4}', '{2; 6}', '{-2; -6}'],
    correctAnswer: '{3; 4}',
    stepByStepSolution: [
      { title: 'Tính biệt thức Delta', content: '$\\Delta = (-7)^2 - 4(1)(12) = 49 - 48 = 1 > 0$.' },
      { title: 'Tính 2 nghiệm', content: '$x_1 = \\frac{7 + 1}{2} = 4; \\quad x_2 = \\frac{7 - 1}{2} = 3$.' }
    ],
    formulasUsed: ['$x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$'],
    quickTips: 'Tách $-7x = -3x - 4x$: $(x-3)(x-4) = 0 \\implies x \\in \\{3; 4\\}$.'
  },
  {
    id: 'qb-c6-02',
    chapterId: 'chuong-6',
    lessonId: 'bai-20',
    title: 'Gọi $x_1, x_2$ là hai nghiệm của phương trình $x^2 - 4x - 1 = 0$. Giá trị của $x_1^2 + x_2^2$ bằng:',
    type: 'MULTIPLE_CHOICE',
    level: 'THONG_HIEU',
    points: 0.5,
    options: ['18', '14', '16', '15'],
    correctAnswer: '18',
    stepByStepSolution: [
      { title: 'Bước 1: Viết hệ thức Viète', content: '$S = x_1 + x_2 = -\\frac{-4}{1} = 4; \\quad P = x_1 x_2 = -1$.' },
      { title: 'Bước 2: Biến đổi hệ thức đối xứng', content: '$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.' },
      { title: 'Bước 3: Thay số', content: '$x_1^2 + x_2^2 = 4^2 - 2(-1) = 16 + 2 = 18$.' }
    ],
    formulasUsed: ['Định lí Viète: $S = -b/a, P = c/a$', '$x_1^2 + x_2^2 = S^2 - 2P$'],
    commonMistakes: 'Viết $4^2 - 2(1) = 14$ do quên dấu âm của $P = -1$.'
  },
  {
    id: 'qb-c6-03',
    chapterId: 'chuong-6',
    lessonId: 'bai-20',
    title: 'Tìm tất cả các giá trị của tham số m để phương trình $x^2 - 2(m + 1)x + m^2 + 2 = 0$ có hai nghiệm phân biệt $x_1, x_2$.',
    type: 'MULTIPLE_CHOICE',
    level: 'VAN_DUNG',
    points: 0.75,
    options: ['$m > 0,5$', '$m \\ge 0,5$', '$m < 0,5$', '$m \\neq 0,5$'],
    correctAnswer: '$m > 0,5$',
    stepByStepSolution: [
      { title: 'Bước 1: Tính biệt thức thu gọn Delta phẩy', content: 'Phương trình có $a = 1 \\neq 0, b\' = -(m + 1), c = m^2 + 2$. Ta có: $\\Delta\' = (b\')^2 - ac = [-(m + 1)]^2 - 1(m^2 + 2)$.' },
      { title: 'Bước 2: Khai triển và thu gọn Delta phẩy', content: '$\\Delta\' = m^2 + 2m + 1 - m^2 - 2 = 2m - 1$.' },
      { title: 'Bước 3: Điều kiện 2 nghiệm phân biệt', content: 'Phương trình có 2 nghiệm phân biệt $\\iff \\Delta\' > 0 \\iff 2m - 1 > 0 \\iff 2m > 1 \\iff m > \\frac{1}{2} = 0,5$.' }
    ],
    formulasUsed: ['$\\Delta\' = (b\')^2 - ac > 0$']
  },

  // --- CHƯƠNG IX: HÌNH HỌC ĐƯỜNG TRÒN & TỨ GIÁC NỘI TIẾP ---
  {
    id: 'qb-c9-01',
    chapterId: 'chuong-9',
    lessonId: 'bai-27',
    title: 'Cho đường tròn (O) và góc ở tâm $\\widehat{AOB} = 80^\\circ$. Góc nội tiếp $\\widehat{AMB}$ cùng chắn cung AB có số đo bằng:',
    type: 'MULTIPLE_CHOICE',
    level: 'NHAN_BIET',
    points: 0.25,
    options: ['$40^\\circ$', '$80^\\circ$', '$160^\\circ$', '$20^\\circ$'],
    correctAnswer: '$40^\\circ$',
    stepByStepSolution: [
      { title: 'Định lý góc nội tiếp', content: 'Trong một đường tròn, số đo góc nội tiếp bằng nửa số đo của góc ở tâm cùng chắn một cung: $\\widehat{AMB} = \\frac{1}{2} \\widehat{AOB} = \\frac{80^\\circ}{2} = 40^\\circ$.' }
    ],
    formulasUsed: ['$\\widehat{AMB} = \\frac{1}{2} \\widehat{AOB}$']
  },
  {
    id: 'qb-c9-02',
    chapterId: 'chuong-9',
    lessonId: 'bai-29',
    title: 'Khẳng định nào sau đây KHÔNG PHẢI là dấu hiệu nhận biết tứ giác nội tiếp?',
    type: 'MULTIPLE_CHOICE',
    level: 'THONG_HIEU',
    points: 0.5,
    options: [
      'Tứ giác có hai đường chéo bằng nhau',
      'Tứ giác có tổng hai góc đối diện bằng $180^\\circ$',
      'Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối',
      'Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc bằng nhau'
    ],
    correctAnswer: 'Tứ giác có hai đường chéo bằng nhau',
    stepByStepSolution: [
      { title: 'Kiểm tra lý thuyết', content: 'Hình chữ nhật hoặc hình thang cân có 2 đường chéo bằng nhau thì nội tiếp, nhưng tứ giác tổng quát có 2 đường chéo bằng nhau chưa chắc nội tiếp (ví dụ tứ giác bất kỳ). Ba phương án còn lại là 3 định lý dấu hiệu chuẩn trong SGK Toán 9.' }
    ],
    formulasUsed: ['Dấu hiệu nhận biết tứ giác nội tiếp']
  },

  // --- CHƯƠNG X: HÌNH KHỐI THỰC TIỄN ---
  {
    id: 'qb-c10-01',
    chapterId: 'chuong-10',
    lessonId: 'bai-31',
    title: 'Một hình nón có bán kính đáy $r = 3$cm, chiều cao $h = 4$cm. Diện tích xung quanh của hình nón đó bằng:',
    type: 'MULTIPLE_CHOICE',
    level: 'THONG_HIEU',
    points: 0.5,
    options: ['$15\\pi$ cm²', '$12\\pi$ cm²', '$20\\pi$ cm²', '$24\\pi$ cm²'],
    correctAnswer: '$15\\pi$ cm²',
    stepByStepSolution: [
      { title: 'Bước 1: Tính độ dài đường sinh l', content: 'Trong hình nón, $l = \\sqrt{r^2 + h^2} = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ cm.' },
      { title: 'Bước 2: Tính diện tích xung quanh', content: '$S_{xq} = \\pi r l = \\pi \\cdot 3 \\cdot 5 = 15\\pi$ cm².' }
    ],
    formulasUsed: ['$l = \\sqrt{r^2 + h^2}$; $S_{xq} = \\pi r l$'],
    commonMistakes: 'Nhầm lẫn lấy $S_{xq} = \\pi r h = 12\\pi$ là sai vì phải dùng đường sinh l chứ không phải chiều cao h.'
  }
];
