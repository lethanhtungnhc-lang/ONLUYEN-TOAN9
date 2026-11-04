import { Chapter, SpecialTopic } from '../types';

export const CHAPTERS_DATA: Chapter[] = [
  // ====================== HỌC KỲ I ======================
  {
    id: 'chuong-1',
    semester: 1,
    chapterNumber: 1,
    title: 'Chương I: Phương trình và hệ hai phương trình bậc nhất hai ẩn',
    summary: 'Nghiên cứu khái niệm phương trình bậc nhất hai ẩn, dạng tổng quát của hệ hai phương trình bậc nhất hai ẩn, các phương pháp giải hệ phương trình (phương pháp thế, phương pháp cộng đại số) và ứng dụng giải bài toán bằng cách lập hệ phương trình.',
    objectives: [
      'Nhận biết được phương trình và hệ hai phương trình bậc nhất hai ẩn.',
      'Hiểu khái niệm nghiệm và tập nghiệm của hệ phương trình bậc nhất hai ẩn.',
      'Giải thành thạo hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế và phương pháp cộng đại số.',
      'Biết cách giải bài toán bằng cách lập hệ hai phương trình bậc nhất hai ẩn (dạng chuyển động, năng suất, quan hệ số, hình học).'
    ],
    coreKnowledge: [
      'Phương trình bậc nhất hai ẩn x, y có dạng ax + by = c (a² + b² ≠ 0).',
      'Hệ hai phương trình bậc nhất hai ẩn có dạng { a₁x + b₁y = c₁ ; a₂x + b₂y = c₂ }.',
      'Phương pháp thế: Rút một ẩn từ một phương trình rồi thế vào phương trình còn lại.',
      'Phương pháp cộng đại số: Nhân hai vế với số thích hợp để hệ số của một ẩn bằng nhau hoặc đối nhau, sau đó cộng/trừ từng vế để triệt tiêu ẩn đó.',
      'Các bước giải bài toán bằng cách lập hệ phương trình: Chọn ẩn và đặt điều kiện; Lập hệ phương trình; Giải hệ; Đối chiếu điều kiện và kết luận.'
    ],
    keyFormulas: [
      {
        name: 'Dạng tổng quát hệ phương trình bậc nhất hai ẩn',
        latex: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}',
        note: 'Trong đó a₁, b₁, c₁, a₂, b₂, c₂ là các số đã biết; x và y là ẩn.'
      },
      {
        name: 'Điều kiện nghiệm duy nhất (khi a₂, b₂ ≠ 0)',
        latex: '\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}',
        note: 'Hệ có nghiệm duy nhất khi hai đường thẳng cắt nhau.'
      },
      {
        name: 'Điều kiện vô nghiệm',
        latex: '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}',
        note: 'Hai đường thẳng song song.'
      },
      {
        name: 'Điều kiện vô số nghiệm',
        latex: '\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}',
        note: 'Hai đường thẳng trùng nhau.'
      }
    ],
    mindmapPoints: [
      'Khái niệm PT & Hệ PT bậc nhất 2 ẩn ➔ Dạng ax + by = c & Cặp nghiệm (x₀; y₀)',
      'Phương pháp giải ➔ PP Thế (rút ẩn đơn giản) | PP Cộng đại số (cân bằng hệ số)',
      'Biện luận số nghiệm ➔ Nghiệm duy nhất | Vô nghiệm | Vô số nghiệm',
      'Giải bài toán thực tế ➔ Chuyển động (s = v.t) | Năng suất (A = N.t) | Phần trăm & Số học'
    ],
    lessons: [
      {
        id: 'bai-1',
        chapterId: 'chuong-1',
        lessonNumber: 1,
        title: 'Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn',
        objectives: [
          'Nhận biết phương trình bậc nhất hai ẩn và nghiệm của nó.',
          'Biểu diễn tập nghiệm của phương trình bậc nhất hai ẩn trên mặt phẳng tọa độ.',
          'Nhận biết hệ hai phương trình bậc nhất hai ẩn và nghiệm chung.'
        ],
        rememberPoints: [
          'Mỗi cặp số (x₀; y₀) thỏa mãn ax₀ + by₀ = c được gọi là một nghiệm của phương trình.',
          'Phương trình bậc nhất hai ẩn luôn có vô số nghiệm. Tập nghiệm được biểu diễn bởi đường thẳng ax + by = c.',
          'Nghiệm của hệ hai phương trình bậc nhất hai ẩn là cặp số (x; y) đồng thời thỏa mãn cả hai phương trình.'
        ],
        theoryContent: 'Phương trình bậc nhất hai ẩn x và y là hệ thức có dạng $ax + by = c$, trong đó a, b, c là các số đã biết ($a \\neq 0$ hoặc $b \\neq 0$). Hệ hai phương trình bậc nhất hai ẩn có dạng $\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}$.',
        importantFormulas: [
          { name: 'Phương trình bậc nhất hai ẩn', latex: 'ax + by = c \\quad (a^2 + b^2 \\neq 0)' },
          { name: 'Nghiệm tổng quát khi b ≠ 0', latex: '(x; \\; y = -\\frac{a}{b}x + \\frac{c}{b}) \\quad (x \\in \\mathbb{R})' }
        ],
        stepExamples: [
          {
            id: 'ex-1',
            problem: 'Kiểm tra cặp số (2; 1) có phải là nghiệm của phương trình $3x - 2y = 4$ hay không?',
            solutionSteps: [
              'Bước 1: Thay x = 2 và y = 1 vào vế trái của phương trình: $VT = 3(2) - 2(1)$.',
              'Bước 2: Tính giá trị vế trái: $VT = 6 - 2 = 4$.',
              'Bước 3: So sánh với vế phải: $VP = 4 \\implies VT = VP$.'
            ],
            result: 'Vậy cặp số (2; 1) là một nghiệm của phương trình $3x - 2y = 4$.',
            notes: 'Nếu VT ≠ VP thì cặp số không phải là nghiệm.'
          }
        ],
        exercises: [
          {
            id: 'exe-1-1',
            type: 'BASIC',
            questionText: 'Cho phương trình $2x + y = 5$. Tìm y khi $x = 1, x = 0, x = -2$.',
            solution: 'Khi x = 1: y = 5 - 2(1) = 3. Khi x = 0: y = 5 - 2(0) = 5. Khi x = -2: y = 5 - 2(-2) = 9.'
          },
          {
            id: 'exe-1-2',
            type: 'APPLIED',
            questionText: 'Viết công thức nghiệm tổng quát và vẽ đường thẳng biểu diễn tập nghiệm của phương trình $x - 2y = 2$.',
            solution: 'Nghiệm tổng quát: $x \\in \\mathbb{R}, y = \\frac{1}{2}x - 1$. Đường thẳng đi qua hai điểm A(0; -1) và B(2; 0).'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-1-1',
            chapterId: 'chuong-1',
            lessonId: 'bai-1',
            title: 'Cặp số nào sau đây là nghiệm của phương trình $2x - 3y = 7$?',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['(2; -1)', '(5; 1)', '(1; -2)', '(0; -2)'],
            correctAnswer: '(5; 1)',
            stepByStepSolution: [
              { title: 'Thử từng đáp án', content: 'Thay x = 5, y = 1 vào VT: $2(5) - 3(1) = 10 - 3 = 7 = VP$. Thỏa mãn!' }
            ],
            formulasUsed: ['$2x - 3y = 7$'],
            commonMistakes: 'Hay nhầm lẫn dấu âm khi thay số vào biến y.',
            quickTips: 'Thay nhẩm nhanh cặp số nguyên dương trước.'
          }
        ]
      },
      {
        id: 'bai-2',
        chapterId: 'chuong-1',
        lessonNumber: 2,
        title: 'Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn',
        objectives: [
          'Giải thành thạo hệ phương trình bằng phương pháp thế.',
          'Giải thành thạo hệ phương trình bằng phương pháp cộng đại số.',
          'Biết lựa chọn phương pháp giải tối ưu cho từng dạng bài.'
        ],
        rememberPoints: [
          'Phương pháp thế tối ưu khi có ít nhất một ẩn có hệ số bằng 1 hoặc -1.',
          'Phương pháp cộng đại số tối ưu khi các hệ số của cùng một ẩn đối nhau hoặc dễ quy đồng bội chung nhỏ nhất.'
        ],
        theoryContent: 'Để giải hệ hai phương trình bậc nhất hai ẩn, ta thường dùng quy tắc thế hoặc quy tắc cộng đại số để biến đổi hệ phương trình đã cho thành hệ phương trình tương đương có một phương trình bậc nhất một ẩn.',
        importantFormulas: [
          { name: 'Hệ phương trình bậc nhất hai ẩn', latex: '\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}' }
        ],
        stepExamples: [
          {
            id: 'ex-2',
            problem: 'Giải hệ phương trình: $\\begin{cases} 2x + y = 5 \\\\ 3x - 2y = 4 \\end{cases}$',
            solutionSteps: [
              'Bước 1 (Dùng PP thế): Từ phương trình (1), rút $y = 5 - 2x$.',
              'Bước 2: Thế y vào phương trình (2): $3x - 2(5 - 2x) = 4$.',
              'Bước 3: Khai triển và giải phương trình ẩn x: $3x - 10 + 4x = 4 \\iff 7x = 14 \\iff x = 2$.',
              'Bước 4: Thay x = 2 vào biểu thức rút y: $y = 5 - 2(2) = 1$.'
            ],
            result: 'Hệ phương trình có nghiệm duy nhất là (x; y) = (2; 1).',
            notes: 'Có thể thử lại vào phương trình (2) để kiểm tra: 3(2) - 2(1) = 4 (Đúng).'
          }
        ],
        exercises: [
          {
            id: 'exe-2-1',
            type: 'BASIC',
            questionText: 'Giải hệ bằng phương pháp cộng đại số: $\\begin{cases} 4x + 3y = 6 \\\\ 2x + y = 4 \\end{cases}$',
            solution: 'Nhân PT (2) với 2: $\\begin{cases} 4x + 3y = 6 \\\\ 4x + 2y = 8 \\end{cases}$. Trừ từng vế: $y = -2$. Thay vào (2): $2x + (-2) = 4 \\implies x = 3$. Nghiệm (3; -2).'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-2-1',
            chapterId: 'chuong-1',
            lessonId: 'bai-2',
            title: 'Nghiệm của hệ phương trình $\\begin{cases} x + y = 7 \\\\ x - y = 3 \\end{cases}$ là:',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['(5; 2)', '(2; 5)', '(4; 3)', '(6; 1)'],
            correctAnswer: '(5; 2)',
            stepByStepSolution: [
              { title: 'Cộng từng vế', content: 'Cộng 2 phương trình: $(x + y) + (x - y) = 7 + 3 \\iff 2x = 10 \\iff x = 5$.' },
              { title: 'Tìm y', content: 'Thay x = 5 vào PT đầu: $5 + y = 7 \\iff y = 2$.' }
            ],
            formulasUsed: ['Cộng đại số triệt tiêu ẩn y'],
            commonMistakes: 'Nhầm lẫn thứ tự viết nghiệm (x; y) thành (y; x).'
          }
        ]
      },
      {
        id: 'bai-3',
        chapterId: 'chuong-1',
        lessonNumber: 3,
        title: 'Bài 3: Giải bài toán bằng cách lập hệ phương trình',
        objectives: [
          'Nắm vững 3 bước giải bài toán bằng cách lập hệ phương trình.',
          'Phân tích được mối quan hệ giữa các đại lượng trong các bài toán thực tế.',
          'Trình bày lời giải bài toán chặt chẽ, đầy đủ điều kiện và đối chiếu nghiệm.'
        ],
        rememberPoints: [
          'Bước 1: Lập hệ phương trình (chọn 2 ẩn, đặt đơn vị và điều kiện thích hợp; biểu diễn các đại lượng chưa biết qua ẩn và các đại lượng đã biết; lập 2 phương trình biểu thị mối quan hệ).',
          'Bước 2: Giải hệ phương trình.',
          'Bước 3: Kiểm tra các nghiệm tìm được có thỏa mãn điều kiện hay không và trả lời.'
        ],
        theoryContent: 'Giải bài toán bằng cách lập hệ phương trình là công cụ toán học mạnh mẽ để giải quyết các bài toán thực tiễn về chuyển động, năng suất, quan hệ số, phần trăm và hình học.',
        importantFormulas: [
          { name: 'Toán chuyển động', latex: 'S = v \\cdot t \\quad (v = \\frac{S}{t}, \\; t = \\frac{S}{v})' },
          { name: 'Toán năng suất', latex: 'A = N \\cdot t \\quad (Khối \\, lượng \\, CV = Năng \\, suất \\times Thời \\, gian)' }
        ],
        stepExamples: [
          {
            id: 'ex-3',
            problem: 'Hai bạn An và Bình có tổng cộng 50 viên bi. Nếu An cho Bình 5 viên bi thì số bi của hai bạn bằng nhau. Hỏi ban đầu mỗi bạn có bao nhiêu viên bi?',
            solutionSteps: [
              'Bước 1: Gọi số bi ban đầu của An là x (viên), số bi của Bình là y (viên). Điều kiện: $x, y \\in \\mathbb{N}^*, x > 5$.',
              'Bước 2: Tổng số bi là 50 viên nên ta có phương trình: $x + y = 50$ (1).',
              'Bước 3: An cho Bình 5 viên thì An còn $x - 5$, Bình có $y + 5$. Số bi hai bạn bằng nhau nên ta có: $x - 5 = y + 5 \\iff x - y = 10$ (2).',
              'Bước 4: Từ (1) và (2) ta có hệ phương trình: $\\begin{cases} x + y = 50 \\\\ x - y = 10 \\end{cases}$.',
              'Bước 5: Giải hệ: Cộng hai phương trình được $2x = 60 \\iff x = 30$. Thay vào được $y = 20$.'
            ],
            result: 'Thỏa mãn điều kiện. Vậy An có 30 viên bi, Bình có 20 viên bi.',
            notes: 'Luôn phải có câu đối chiếu điều kiện trước khi kết luận.'
          }
        ],
        exercises: [
          {
            id: 'exe-3-1',
            type: 'APPLIED',
            questionText: 'Một thửa ruộng hình chữ nhật có chu vi 100m. Nếu tăng chiều rộng thêm 5m và giảm chiều dài 5m thì diện tích không đổi. Tính chiều dài và chiều rộng thửa ruộng.',
            solution: 'Gọi chiều dài là x(m), chiều rộng là y(m) ($x > y > 0$). Chu vi: $2(x+y)=100 \\iff x+y=50$. Diện tích: $(x-5)(y+5)=xy \\iff 5x-5y-25=0 \\iff x-y=5$. Giải hệ ra $x = 27.5m, y = 22.5m$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-3-1',
            chapterId: 'chuong-1',
            lessonId: 'bai-3',
            title: 'Một lớp học có 40 học sinh gồm nam và nữ. Số học sinh nam nhiều hơn số học sinh nữ là 4 bạn. Số học sinh nam của lớp là:',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['22 bạn', '18 bạn', '24 bạn', '20 bạn'],
            correctAnswer: '22 bạn',
            stepByStepSolution: [
              { title: 'Lập hệ', content: 'Gọi số nam là x, số nữ là y: $\\begin{cases} x + y = 40 \\\\ x - y = 4 \\end{cases}$.' },
              { title: 'Giải', content: '$2x = 44 \\implies x = 22$. Số nam là 22 bạn, số nữ là 18 bạn.' }
            ],
            formulasUsed: ['$x + y = 40, x - y = 4$']
          }
        ]
      }
    ]
  },

  // ====================== CHƯƠNG II ======================
  {
    id: 'chuong-2',
    semester: 1,
    chapterNumber: 2,
    title: 'Chương II: Phương trình và bất phương trình bậc nhất một ẩn',
    summary: 'Phương trình quy về bậc nhất một ẩn (phương trình tích, phương trình chứa ẩn ở mẫu), bất đẳng thức, liên hệ giữa thứ tự và phép tính, bất phương trình bậc nhất một ẩn.',
    objectives: [
      'Giải thành thạo phương trình tích $A(x) \\cdot B(x) = 0$.',
      'Giải phương trình chứa ẩn ở mẫu (tìm ĐKXĐ, quy đồng, khử mẫu, kiểm tra nghiệm).',
      'Nắm vững tính chất bất đẳng thức (cộng, nhân với số dương, nhân với số âm đảo chiều).',
      'Giải và biểu diễn tập nghiệm của bất phương trình bậc nhất một ẩn trên trục số.'
    ],
    coreKnowledge: [
      'Phương trình tích: $A(x) \\cdot B(x) = 0 \\iff A(x) = 0$ hoặc $B(x) = 0$.',
      'Phương trình chứa ẩn ở mẫu: Bắt buộc tìm ĐKXĐ (cho mẫu khác 0); khi khử mẫu dùng dấu suy ra (=>), giải xong phải đối chiếu ĐKXĐ.',
      'Tính chất BĐT: Nếu $a < b$ và $c < 0$ thì $ac > bc$ (đổi chiều khi nhân/chia số âm).',
      'Bất phương trình bậc nhất một ẩn có dạng $ax + b < 0$ (hoặc >, <=, >=) với $a \\neq 0$.'
    ],
    keyFormulas: [
      {
        name: 'Quy tắc phương trình tích',
        latex: 'A(x) \\cdot B(x) = 0 \\iff \\left[ \\begin{array}{l} A(x) = 0 \\\\ B(x) = 0 \\end{array} \\right.',
        note: 'Tích bằng 0 khi ít nhất một thừa số bằng 0.'
      },
      {
        name: 'Nhân với số âm đảo chiều BĐT',
        latex: 'a < b \\;\\text{và}\\; c < 0 \\implies ac > bc',
        note: 'Lưu ý cực kỳ quan trọng, học sinh rất hay quên đổi chiều.'
      }
    ],
    mindmapPoints: [
      'Phương trình tích ➔ Đưa về $A(x) \\cdot B(x) = 0$ bằng phân tích đa thức thành nhân tử',
      'Phương trình chứa ẩn ở mẫu ➔ ĐKXĐ ➔ Quy đồng mẫu ➔ Khử mẫu ➔ Đối chiếu ĐKXĐ',
      'Bất đẳng thức ➔ Cộng cùng số giữ chiều | Nhân số dương giữ chiều | Nhân số âm ĐẢO CHIỀU',
      'Bất phương trình bậc nhất ➔ Chuyển vế đổi dấu | Chia hệ số a (chú ý dấu của a)'
    ],
    lessons: [
      {
        id: 'bai-4',
        chapterId: 'chuong-2',
        lessonNumber: 4,
        title: 'Bài 4: Phương trình quy về phương trình bậc nhất một ẩn',
        objectives: [
          'Giải thành thạo phương trình tích.',
          'Nắm vững các bước giải phương trình chứa ẩn ở mẫu.'
        ],
        rememberPoints: [
          'Không được bỏ qua bước đặt Điều kiện xác định (ĐKXĐ).',
          'Khử mẫu dùng dấu suy ra $\\implies$, sau khi tìm được giá trị của ẩn phải đối chiếu với ĐKXĐ.'
        ],
        theoryContent: 'Phương trình quy về phương trình bậc nhất một ẩn gồm hai dạng chính: Phương trình tích dạng $(ax + b)(cx + d) = 0$ và phương trình chứa ẩn ở mẫu thức.',
        importantFormulas: [
          { name: 'Phương trình chứa ẩn ở mẫu', latex: '\\frac{P(x)}{Q(x)} = 0 \\iff \\begin{cases} P(x) = 0 \\\\ Q(x) \\neq 0 \\end{cases}' }
        ],
        stepExamples: [
          {
            id: 'ex-4',
            problem: 'Giải phương trình: $\\frac{x + 2}{x - 2} - \\frac{x - 2}{x + 2} = \\frac{16}{x^2 - 4}$',
            solutionSteps: [
              'Bước 1: Tìm ĐKXĐ: $x - 2 \\neq 0$ và $x + 2 \\neq 0 \\iff x \\neq \\pm 2$.',
              'Bước 2: Mẫu thức chung là $(x - 2)(x + 2) = x^2 - 4$.',
              'Bước 3: Quy đồng và khử mẫu: $(x + 2)^2 - (x - 2)^2 = 16$.',
              'Bước 4: Khai triển vế trái: $(x^2 + 4x + 4) - (x^2 - 4x + 4) = 16 \\iff 8x = 16 \\iff x = 2$.',
              'Bước 5: Đối chiếu ĐKXĐ: $x = 2$ không thỏa mãn ĐKXĐ ($x \\neq 2$).'
            ],
            result: 'Vậy phương trình đã cho vô nghiệm ($S = \\emptyset$).',
            notes: 'Học sinh hay quên đối chiếu ĐKXĐ và kết luận x = 2 là sai.'
          }
        ],
        exercises: [
          {
            id: 'exe-4-1',
            type: 'BASIC',
            questionText: 'Giải phương trình: $(2x - 3)(x + 1) = 0$.',
            solution: '$2x - 3 = 0 \\implies x = 1.5$ hoặc $x + 1 = 0 \\implies x = -1$. Tập nghiệm $S = \\{-1; 1.5\\}$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-4-1',
            chapterId: 'chuong-2',
            lessonId: 'bai-4',
            title: 'Điều kiện xác định của phương trình $\\frac{1}{x - 3} = \\frac{2x}{x + 1}$ là:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['$x \\neq 3$ và $x \\neq -1$', '$x \\neq 3$', '$x \\neq -1$', '$x \\neq 0$'],
            correctAnswer: '$x \\neq 3$ và $x \\neq -1$',
            stepByStepSolution: [
              { title: 'Tìm điều kiện cho các mẫu khác 0', content: 'Mẫu thức gồm $x - 3$ và $x + 1$. ĐKXĐ: $x - 3 \\neq 0 \\iff x \\neq 3$ và $x + 1 \\neq 0 \\iff x \\neq -1$.' }
            ],
            formulasUsed: ['ĐKXĐ: Mẫu khác 0']
          }
        ]
      },
      {
        id: 'bai-5',
        chapterId: 'chuong-2',
        lessonNumber: 5,
        title: 'Bài 5: Bất đẳng thức và tính chất',
        objectives: [
          'Nhận biết bất đẳng thức và các vế của bất đẳng thức.',
          'Hiểu và vận dụng tính chất liên hệ giữa thứ tự và phép cộng, phép nhân.'
        ],
        rememberPoints: [
          'Cộng cùng một số vào hai vế của BĐT thì BĐT không đổi chiều.',
          'Nhân hai vế của BĐT với cùng một số dương thì BĐT không đổi chiều.',
          'Nhân hai vế của BĐT với cùng một số ÂM thì BĐT ĐỔI CHIỀU.'
        ],
        theoryContent: 'Hệ thức có dạng $a < b$ (hay $a > b, a \\le b, a \\ge b$) được gọi là bất đẳng thức. a là vế trái, b là vế phải.',
        importantFormulas: [
          { name: 'Tính chất bắc cầu', latex: 'a < b \\;\\text{và}\\; b < c \\implies a < c' },
          { name: 'Liên hệ thứ tự và phép nhân', latex: 'a < b \\implies ac > bc \\quad (khi \\; c < 0)' }
        ],
        stepExamples: [
          {
            id: 'ex-5',
            problem: 'Cho $a < b$, hãy so sánh $-3a + 5$ và $-3b + 5$.',
            solutionSteps: [
              'Bước 1: Xuất phát từ $a < b$.',
              'Bước 2: Nhân cả hai vế với số âm $-3$, BĐT đổi chiều: $-3a > -3b$.',
              'Bước 3: Cộng 5 vào cả hai vế: $-3a + 5 > -3b + 5$.'
            ],
            result: 'Vậy $-3a + 5 > -3b + 5$.'
          }
        ],
        exercises: [
          {
            id: 'exe-5-1',
            type: 'BASIC',
            questionText: 'Nếu $m > n$, chứng minh $2m - 1 > 2n - 1$.',
            solution: 'Vì $m > n \\implies 2m > 2n$ (nhân số dương 2). Cộng -1 vào 2 vế: $2m - 1 > 2n - 1$ (đpcm).'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-5-1',
            chapterId: 'chuong-2',
            lessonId: 'bai-5',
            title: 'Biết $a < b$, khẳng định nào sau đây là SAI?',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['$-2a < -2b$', '$a + 3 < b + 3$', '$3a < 3b$', '$-a > -b$'],
            correctAnswer: '$-2a < -2b$',
            stepByStepSolution: [
              { title: 'Kiểm tra quy tắc nhân số âm', content: 'Khi nhân cả hai vế của $a < b$ với $-2 < 0$, BĐT phải đổi chiều thành $-2a > -2b$. Do đó khẳng định $-2a < -2b$ là SAI.' }
            ],
            formulasUsed: ['$a < b \\implies -2a > -2b$']
          }
        ]
      },
      {
        id: 'bai-6',
        chapterId: 'chuong-2',
        lessonNumber: 6,
        title: 'Bài 6: Bất phương trình bậc nhất một ẩn',
        objectives: [
          'Giải thành thạo bất phương trình bậc nhất một ẩn.',
          'Biểu diễn tập nghiệm của bất phương trình trên trục số.'
        ],
        rememberPoints: [
          'Bất phương trình bậc nhất một ẩn có dạng $ax + b < 0$ (hoặc >, <=, >=) với $a \\neq 0$.',
          'Khi chia hai vế cho hệ số $a$: Nếu $a > 0$ giữ nguyên chiều, nếu $a < 0$ đảo ngược chiều.'
        ],
        theoryContent: 'Để giải bất phương trình bậc nhất một ẩn, ta dùng quy tắc chuyển vế và quy tắc nhân với một số để đưa về dạng $x < m, x > m, x \\le m, x \\ge m$.',
        importantFormulas: [
          { name: 'Bất phương trình bậc nhất', latex: 'ax + b > 0 \\iff ax > -b \\iff \\begin{cases} x > -\\frac{b}{a} \\quad (a > 0) \\\\ x < -\\frac{b}{a} \\quad (a < 0) \\end{cases}' }
        ],
        stepExamples: [
          {
            id: 'ex-6',
            problem: 'Giải bất phương trình: $2 - 3x \\ge 11$',
            solutionSteps: [
              'Bước 1: Chuyển 2 sang vế phải: $-3x \\ge 11 - 2 \\iff -3x \\ge 9$.',
              'Bước 2: Chia cả hai vế cho $-3 < 0$ và đổi chiều BĐT: $x \\le \\frac{9}{-3} \\iff x \\le -3$.'
            ],
            result: 'Vậy tập nghiệm của bất phương trình là $S = \\{x \\in \\mathbb{R} \\mid x \\le -3\\}$.',
            notes: 'Học sinh rất hay quên đổi chiều $\\ge$ thành $\\le$ khi chia cho $-3$.'
          }
        ],
        exercises: [
          {
            id: 'exe-6-1',
            type: 'BASIC',
            questionText: 'Giải bất phương trình: $5x - 10 > 0$.',
            solution: '$5x > 10 \\iff x > 2$. Tập nghiệm $x > 2$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-6-1',
            chapterId: 'chuong-2',
            lessonId: 'bai-6',
            title: 'Nghiệm của bất phương trình $-4x > 12$ là:',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['$x < -3$', '$x > -3$', '$x < 3$', '$x > 3$'],
            correctAnswer: '$x < -3$',
            stepByStepSolution: [
              { title: 'Chia hai vế cho -4', content: 'Vì $-4 < 0$ nên đổi chiều dấu $>$ thành $<$: $x < \\frac{12}{-4} \\iff x < -3$.' }
            ],
            formulasUsed: ['Chia số âm đảo chiều']
          }
        ]
      }
    ]
  },

  // ====================== CHƯƠNG III ======================
  {
    id: 'chuong-3',
    semester: 1,
    chapterNumber: 3,
    title: 'Chương III: Căn bậc hai và căn bậc ba',
    summary: 'Căn bậc hai số học, căn thức bậc hai và điều kiện xác định, các phép biến đổi căn thức (khai phương một tích, một thương, đưa thừa số ra ngoài/vào trong dấu căn, trục căn thức ở mẫu), rút gọn biểu thức chứa căn thức bậc hai, căn bậc ba.',
    objectives: [
      'Hiểu khái niệm căn bậc hai, căn bậc hai số học, căn thức bậc hai và tìm ĐKXĐ của $\\sqrt{A}$.',
      'Vận dụng thành thạo hằng đẳng thức $\\sqrt{A^2} = |A|$.',
      'Thực hiện thành thạo các phép toán khai phương tích, thương, đưa thừa số ra ngoài/vào trong dấu căn, trục căn thức ở mẫu.',
      'Giải quyết tốt bài toán rút gọn biểu thức chứa căn bậc hai và các bài toán phụ trong đề thi vào 10.',
      'Nhận biết và tính toán căn bậc ba của một số.'
    ],
    coreKnowledge: [
      'Với số $a \\ge 0$, căn bậc hai số học của a là $\\sqrt{a}$ (số không âm có bình phương bằng a).',
      '$\\sqrt{A}$ có nghĩa (xác định) khi và chỉ khi $A \\ge 0$.',
      'Hằng đẳng thức: $\\sqrt{A^2} = |A| = A$ (nếu $A \\ge 0$) hoặc $-A$ (nếu $A < 0$).',
      'Với $A \\ge 0, B \\ge 0$: $\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$ và $\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}}$ (với $B > 0$).',
      'Trục căn thức ở mẫu: Nhân cả tử và mẫu với biểu thức liên hợp.'
    ],
    keyFormulas: [
      {
        name: 'Hằng đẳng thức căn bậc hai',
        latex: '\\sqrt{A^2} = |A|',
        note: 'Bắt buộc dùng dấu giá trị tuyệt đối trước khi phá dấu.'
      },
      {
        name: 'Đưa thừa số ra ngoài dấu căn',
        latex: '\\sqrt{A^2 B} = |A|\\sqrt{B} = \\begin{cases} A\\sqrt{B} \\quad (A \\ge 0, B \\ge 0) \\\\ -A\\sqrt{B} \\quad (A < 0, B \\ge 0) \\end{cases}'
      },
      {
        name: 'Khử mẫu của biểu thức lấy căn',
        latex: '\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{AB}}{|B|} \\quad (AB \\ge 0, B \\neq 0)'
      },
      {
        name: 'Trục căn thức dạng lượng liên hợp',
        latex: '\\frac{C}{\\sqrt{A} \\pm \\sqrt{B}} = \\frac{C(\\sqrt{A} \\mp \\sqrt{B})}{A - B} \\quad (A \\ge 0, B \\ge 0, A \\neq B)'
      }
    ],
    mindmapPoints: [
      'Định nghĩa ➔ Căn bậc 2 số học ($a \\ge 0$) | ĐKXĐ của $\\sqrt{A}$: $A \\ge 0$',
      'Hằng đẳng thức ➔ $\\sqrt{A^2} = |A|$ (cần xét dấu của A)',
      'Phép biến đổi ➔ Nhân/chia căn ➔ Đưa thừa số ra ngoài/vào trong ➔ Trục căn thức ở mẫu',
      'Căn bậc ba ➔ $\\sqrt[3]{a}$ xác định với mọi $a \\in \\mathbb{R}$, $(\\sqrt[3]{a})^3 = a$',
      'Bài toán rút gọn ➔ Quy đồng mẫu ➔ Thu gọn tử ➔ Rút gọn nhân tử chung ➔ Câu hỏi phụ'
    ],
    lessons: [
      {
        id: 'bai-7',
        chapterId: 'chuong-3',
        lessonNumber: 7,
        title: 'Bài 7: Căn bậc hai và căn thức bậc hai',
        objectives: [
          'Tìm căn bậc hai số học của một số không âm.',
          'Tìm điều kiện xác định của biểu thức $\\sqrt{A}$.',
          'Vận dụng hằng đẳng thức $\\sqrt{A^2} = |A|$.'
        ],
        rememberPoints: [
          'Số âm không có căn bậc hai.',
          '$\\sqrt{A}$ có nghĩa $\\iff A \\ge 0$.',
          '$\\sqrt{A^2} = |A|$, tuyệt đối không được viết ngay $\\sqrt{A^2} = A$ khi chưa biết dấu của A.'
        ],
        theoryContent: 'Căn bậc hai số học của số thực $a \\ge 0$ là số không âm $x$ sao cho $x^2 = a$. Căn thức bậc hai là biểu thức có dạng $\\sqrt{A}$, trong đó A là một biểu thức đại số.',
        importantFormulas: [
          { name: 'Căn bậc hai số học', latex: 'x = \\sqrt{a} \\iff \\begin{cases} x \\ge 0 \\\\ x^2 = a \\end{cases}' },
          { name: 'Hằng đẳng thức', latex: '\\sqrt{A^2} = |A|' }
        ],
        stepExamples: [
          {
            id: 'ex-7',
            problem: 'Rút gọn biểu thức: $M = \\sqrt{(2 - \\sqrt{5})^2} + \\sqrt{5}$',
            solutionSteps: [
              'Bước 1: Áp dụng hằng đẳng thức $\\sqrt{A^2} = |A|$: $M = |2 - \\sqrt{5}| + \\sqrt{5}$.',
              'Bước 2: So sánh 2 và $\\sqrt{5}$: Vì $2 = \\sqrt{4} < \\sqrt{5}$ nên $2 - \\sqrt{5} < 0$.',
              'Bước 3: Phá dấu giá trị tuyệt đối: $|2 - \\sqrt{5}| = -(2 - \\sqrt{5}) = \\sqrt{5} - 2$.',
              'Bước 4: Thay vào biểu thức: $M = (\\sqrt{5} - 2) + \\sqrt{5} = 2\\sqrt{5} - 2$.'
            ],
            result: '$M = 2\\sqrt{5} - 2$.',
            notes: 'Lỗi sai phổ biến: học sinh viết $|2 - \\sqrt{5}| = 2 - \\sqrt{5}$ dẫn đến kết quả sai.'
          }
        ],
        exercises: [
          {
            id: 'exe-7-1',
            type: 'BASIC',
            questionText: 'Tìm điều kiện xác định của $\\sqrt{2x - 6}$.',
            solution: 'Điều kiện xác định: $2x - 6 \\ge 0 \\iff 2x \\ge 6 \\iff x \\ge 3$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-7-1',
            chapterId: 'chuong-3',
            lessonId: 'bai-7',
            title: 'Biểu thức $\\sqrt{3x - 12}$ có nghĩa khi:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['$x \\ge 4$', '$x > 4$', '$x \\le 4$', '$x \\ge -4$'],
            correctAnswer: '$x \\ge 4$',
            stepByStepSolution: [
              { title: 'Điều kiện dưới dấu căn', content: '$3x - 12 \\ge 0 \\iff 3x \\ge 12 \\iff x \\ge 4$.' }
            ],
            formulasUsed: ['$\\sqrt{A}$ có nghĩa $\\iff A \\ge 0$']
          }
        ]
      },
      {
        id: 'bai-8',
        chapterId: 'chuong-3',
        lessonNumber: 8,
        title: 'Bài 8: Khai căn bậc hai với phép nhân và phép chia',
        objectives: [
          'Nắm vững quy tắc khai phương một tích và quy tắc nhân các căn thức bậc hai.',
          'Nắm vững quy tắc khai phương một thương và quy tắc chia các căn thức bậc hai.'
        ],
        rememberPoints: [
          '$\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B}$ chỉ áp dụng khi cả $A \\ge 0$ và $B \\ge 0$.',
          '$\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}}$ áp dụng khi $A \\ge 0$ và $B > 0$.'
        ],
        theoryContent: 'Với các số $a \\ge 0$ và $b \\ge 0$, ta có $\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$. Với $a \\ge 0$ và $b > 0$, ta có $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$.',
        importantFormulas: [
          { name: 'Khai phương tích', latex: '\\sqrt{A \\cdot B} = \\sqrt{A} \\cdot \\sqrt{B} \\quad (A \\ge 0, B \\ge 0)' },
          { name: 'Khai phương thương', latex: '\\sqrt{\\frac{A}{B}} = \\frac{\\sqrt{A}}{\\sqrt{B}} \\quad (A \\ge 0, B > 0)' }
        ],
        stepExamples: [
          {
            id: 'ex-8',
            problem: 'Tính giá trị của biểu thức: $P = \\sqrt{12} \\cdot \\sqrt{3} - \\sqrt{\\frac{50}{2}}$',
            solutionSteps: [
              'Bước 1: Tính $\\sqrt{12} \\cdot \\sqrt{3} = \\sqrt{12 \\cdot 3} = \\sqrt{36} = 6$.',
              'Bước 2: Tính $\\sqrt{\\frac{50}{2}} = \\sqrt{25} = 5$.',
              'Bước 3: Thực hiện phép trừ: $P = 6 - 5 = 1$.'
            ],
            result: '$P = 1$.'
          }
        ],
        exercises: [
          {
            id: 'exe-8-1',
            type: 'BASIC',
            questionText: 'Tính: $\\sqrt{20} \\cdot \\sqrt{5}$.',
            solution: '$\\sqrt{20 \\cdot 5} = \\sqrt{100} = 10$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-8-1',
            chapterId: 'chuong-3',
            lessonId: 'bai-8',
            title: 'Giá trị của $\\sqrt{2,5} \\cdot \\sqrt{10}$ bằng:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['5', '25', '2,5', '50'],
            correctAnswer: '5',
            stepByStepSolution: [
              { title: 'Nhân hai căn', content: '$\\sqrt{2,5 \\cdot 10} = \\sqrt{25} = 5$.' }
            ],
            formulasUsed: ['$\\sqrt{A} \\cdot \\sqrt{B} = \\sqrt{A \\cdot B}$']
          }
        ]
      },
      {
        id: 'bai-9',
        chapterId: 'chuong-3',
        lessonNumber: 9,
        title: 'Bài 9: Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai',
        objectives: [
          'Thực hiện thành thạo đưa thừa số ra ngoài/vào trong dấu căn.',
          'Khử mẫu của biểu thức lấy căn và trục căn thức ở mẫu.',
          'Rút gọn thành thạo các biểu thức đại số chứa căn thức bậc hai.'
        ],
        rememberPoints: [
          'Khi đưa thừa số A vào trong dấu căn: Nếu $A \\ge 0$ thì $A\\sqrt{B} = \\sqrt{A^2 B}$; Nếu $A < 0$ thì $A\\sqrt{B} = -\\sqrt{A^2 B}$.',
          'Biểu thức liên hợp: $(\\sqrt{A} - \\sqrt{B})$ có liên hợp là $(\\sqrt{A} + \\sqrt{B})$.'
        ],
        theoryContent: 'Các phép biến đổi đơn giản biểu thức chứa căn thức bậc hai là kỹ năng trọng tâm của học kỳ I và chiếm 1.5 đến 2.0 điểm trong đề thi vào 10.',
        importantFormulas: [
          { name: 'Trục căn thức ở mẫu', latex: '\\frac{A}{\\sqrt{B}} = \\frac{A\\sqrt{B}}{B} \\quad (B > 0)' },
          { name: 'Liên hợp căn thức', latex: '\\frac{C}{\\sqrt{A} - \\sqrt{B}} = \\frac{C(\\sqrt{A} + \\sqrt{B})}{A - B} \\quad (A \\ge 0, B \\ge 0, A \\neq B)' }
        ],
        stepExamples: [
          {
            id: 'ex-9',
            problem: 'Rút gọn biểu thức: $A = \\left(\\frac{1}{\\sqrt{x} - 1} - \\frac{1}{\\sqrt{x} + 1}\\right) \\cdot \\frac{x - 1}{2}$ với $x \\ge 0, x \\neq 1$.',
            solutionSteps: [
              'Bước 1: Quy đồng mẫu thức trong ngoặc với MTC là $(\\sqrt{x}-1)(\\sqrt{x}+1) = x - 1$.',
              'Bước 2: $\\frac{(\\sqrt{x} + 1) - (\\sqrt{x} - 1)}{x - 1} = \\frac{\\sqrt{x} + 1 - \\sqrt{x} + 1}{x - 1} = \\frac{2}{x - 1}$.',
              'Bước 3: Nhân với biểu thức bên ngoài: $A = \\frac{2}{x - 1} \\cdot \\frac{x - 1}{2} = 1$.'
            ],
            result: 'Vậy $A = 1$ với mọi $x \\ge 0, x \\neq 1$.'
          }
        ],
        exercises: [
          {
            id: 'exe-9-1',
            type: 'APPLIED',
            questionText: 'Trục căn thức ở mẫu của $\\frac{6}{\\sqrt{5} - \\sqrt{2}}$.',
            solution: 'Nhân tử và mẫu với $(\\sqrt{5} + \\sqrt{2})$: $\\frac{6(\\sqrt{5}+\\sqrt{2})}{(\\sqrt{5}-\\sqrt{2})(\\sqrt{5}+\\sqrt{2})} = \\frac{6(\\sqrt{5}+\\sqrt{2})}{5 - 2} = 2(\\sqrt{5} + \\sqrt{2})$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-9-1',
            chapterId: 'chuong-3',
            lessonId: 'bai-9',
            title: 'Đưa thừa số ra ngoài dấu căn của biểu thức $\\sqrt{18a^2}$ với $a < 0$ ta được:',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['$-3a\\sqrt{2}$', '$3a\\sqrt{2}$', '$9a\\sqrt{2}$', '$-9a\\sqrt{2}$'],
            correctAnswer: '$-3a\\sqrt{2}$',
            stepByStepSolution: [
              { title: 'Tách thừa số', content: '$\\sqrt{18a^2} = \\sqrt{9a^2 \\cdot 2} = \\sqrt{(3a)^2} \\cdot \\sqrt{2} = |3a|\\sqrt{2}$.' },
              { title: 'Xét dấu với a < 0', content: 'Vì $a < 0$ nên $|3a| = -3a$. Do đó kết quả là $-3a\\sqrt{2}$.' }
            ],
            formulasUsed: ['$\\sqrt{A^2} = |A|$']
          }
        ]
      },
      {
        id: 'bai-10',
        chapterId: 'chuong-3',
        lessonNumber: 10,
        title: 'Bài 10: Căn bậc ba và căn thức bậc ba',
        objectives: [
          'Hiểu định nghĩa căn bậc ba của một số thực.',
          'Tính được căn bậc ba của các số cho trước và vận dụng các tính chất.'
        ],
        rememberPoints: [
          'Mỗi số thực a đều có duy nhất một căn bậc ba, ký hiệu là $\\sqrt[3]{a}$.',
          'Căn bậc ba của số dương là số dương, của số âm là số âm, của 0 là 0.',
          'Biểu thức lấy căn bậc ba không cần điều kiện không âm!'
        ],
        theoryContent: 'Căn bậc ba của số a là số x sao cho $x^3 = a$. Phép tính tìm căn bậc ba của một số gọi là phép khai căn bậc ba.',
        importantFormulas: [
          { name: 'Căn bậc ba', latex: '(\\sqrt[3]{a})^3 = \\sqrt[3]{a^3} = a' },
          { name: 'Tính chất nhân chia căn bậc ba', latex: '\\sqrt[3]{a \\cdot b} = \\sqrt[3]{a} \\cdot \\sqrt[3]{b}; \\quad \\sqrt[3]{\\frac{a}{b}} = \\frac{\\sqrt[3]{a}}{\\sqrt[3]{b}} \\quad (b \\neq 0)' }
        ],
        stepExamples: [
          {
            id: 'ex-10',
            problem: 'Tính: $B = \\sqrt[3]{64} + \\sqrt[3]{-27} - \\sqrt[3]{125}$',
            solutionSteps: [
              'Bước 1: $\\sqrt[3]{64} = \\sqrt[3]{4^3} = 4$.',
              'Bước 2: $\\sqrt[3]{-27} = \\sqrt[3]{(-3)^3} = -3$.',
              'Bước 3: $\\sqrt[3]{125} = \\sqrt[3]{5^3} = 5$.',
              'Bước 4: $B = 4 + (-3) - 5 = 1 - 5 = -4$.'
            ],
            result: '$B = -4$.'
          }
        ],
        exercises: [
          {
            id: 'exe-10-1',
            type: 'BASIC',
            questionText: 'Tính: $\\sqrt[3]{-0.008}$.',
            solution: '$\\sqrt[3]{(-0.2)^3} = -0.2$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-10-1',
            chapterId: 'chuong-3',
            lessonId: 'bai-10',
            title: 'Giá trị của $\\sqrt[3]{-125}$ là:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['-5', '5', 'Không tồn tại', '-25'],
            correctAnswer: '-5',
            stepByStepSolution: [
              { title: 'Khai căn bậc ba', content: 'Vì $(-5)^3 = -125$ nên $\\sqrt[3]{-125} = -5$. Căn bậc ba của số âm luôn tồn tại.' }
            ],
            formulasUsed: ['$\\sqrt[3]{a^3} = a$']
          }
        ]
      }
    ]
  },

  // ====================== CHƯƠNG IV ======================
  {
    id: 'chuong-4',
    semester: 1,
    chapterNumber: 4,
    title: 'Chương IV: Hệ thức lượng trong tam giác vuông',
    summary: 'Tỉ số lượng giác của góc nhọn (sin, cos, tan, cot), hệ thức giữa các tỉ số lượng giác, hệ thức về cạnh và đường cao trong tam giác vuông, ứng dụng thực tế giải tam giác vuông.',
    objectives: [
      'Nắm vững định nghĩa các tỉ số lượng giác sin, cos, tan, cot của góc nhọn.',
      'Sử dụng bảng lượng giác và máy tính cầm tay để tính tỉ số lượng giác và góc tương ứng.',
      'Thuộc và vận dụng thành thạo các hệ thức giữa cạnh và đường cao trong tam giác vuông.',
      'Giải tam giác vuông và ứng dụng đo chiều cao ngọn tháp, bề rộng dòng sông.'
    ],
    coreKnowledge: [
      'Cho tam giác ABC vuông tại A có góc B = α: $\\sin \\alpha = \\frac{\\text{đối}}{\\text{huyền}}$, $\\cos \\alpha = \\frac{\\text{kề}}{\\text{huyền}}$, $\\tan \\alpha = \\frac{\\text{đối}}{\\text{kề}}$, $\\cot \\alpha = \\frac{\\text{kề}}{\\text{đối}}$.',
      'Hai góc phụ nhau ($\alpha + \beta = 90^\\circ$): $\\sin \\alpha = \\cos \\beta$, $\\cos \\alpha = \\sin \\beta$, $\\tan \\alpha = \\cot \\beta$, $\\cot \\alpha = \\tan \\beta$.',
      'Hệ thức cơ bản: $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$; $\\tan \\alpha \\cdot \\cot \\alpha = 1$.',
      'Trong tam giác vuông: $b^2 = a \\cdot b\', c^2 = a \\cdot c\', h^2 = b\' \\cdot c\', b \\cdot c = a \\cdot h, \\frac{1}{h^2} = \\frac{1}{b^2} + \\frac{1}{c^2}$.'
    ],
    keyFormulas: [
      {
        name: 'Định nghĩa tỉ số lượng giác góc nhọn',
        latex: '\\sin = \\frac{\\text{đối}}{\\text{huyền}}, \\quad \\cos = \\frac{\\text{kề}}{\\text{huyền}}, \\quad \\tan = \\frac{\\text{đối}}{\\text{kề}}, \\quad \\cot = \\frac{\\text{kề}}{\\text{đối}}'
      },
      {
        name: 'Hệ thức Pythagore và đường cao tam giác vuông',
        latex: 'b^2 + c^2 = a^2; \\quad h^2 = b\' \\cdot c\'; \\quad a \\cdot h = b \\cdot c; \\quad \\frac{1}{h^2} = \\frac{1}{b^2} + \\frac{1}{c^2}'
      },
      {
        name: 'Cạnh góc vuông theo cạnh huyền và góc',
        latex: 'b = a \\cdot \\sin B = a \\cdot \\cos C; \\quad c = a \\cdot \\sin C = a \\cdot \\cos B'
      }
    ],
    mindmapPoints: [
      'Tỉ số lượng giác ➔ Sin (đối/huyền) | Cos (kề/huyền) | Tan (đối/kề) | Cot (kề/đối)',
      'Góc phụ nhau ($\alpha + \beta = 90^\\circ$) ➔ Sin góc này = Cos góc kia | Tan góc này = Cot góc kia',
      'Hệ thức cạnh - đường cao ➔ $h^2 = b\'c\'$ | $b^2 = ab\'$ | $ah = bc$ | $\\frac{1}{h^2} = \\frac{1}{b^2} + \\frac{1}{c^2}$',
      'Ứng dụng thực tiễn ➔ Đo khoảng cách không tới được | Đo chiều cao cây, tòa nhà'
    ],
    lessons: [
      {
        id: 'bai-11',
        chapterId: 'chuong-4',
        lessonNumber: 11,
        title: 'Bài 11: Tỉ số lượng giác của góc nhọn',
        objectives: [
          'Định nghĩa các tỉ số lượng giác sin, cos, tan, cot của một góc nhọn.',
          'Tính được tỉ số lượng giác của các góc đặc biệt ($30^\\circ, 45^\\circ, 60^\\circ$).'
        ],
        rememberPoints: [
          'Mẹo nhớ: "Sao đi học (Sin=đối/huyền), Cứ khóc hoài (Cos=kề/huyền), Thôi đừng khóc (Tan=đối/kề), Có kẹo đây (Cot=kề/đối)".',
          'Với mọi góc nhọn α: $0 < \\sin \\alpha < 1$ và $0 < \\cos \\alpha < 1$.'
        ],
        theoryContent: 'Cho góc nhọn $\\alpha$. Dựng tam giác vuông có một góc nhọn bằng $\\alpha$. Khi đó tỉ số giữa cạnh đối và cạnh huyền gọi là sin của $\\alpha$, tỉ số giữa cạnh kề và cạnh huyền gọi là cos của $\\alpha$.',
        importantFormulas: [
          { name: 'Hệ thức cơ bản', latex: '\\sin^2 \\alpha + \\cos^2 \\alpha = 1; \\quad \\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}' }
        ],
        stepExamples: [
          {
            id: 'ex-11',
            problem: 'Cho tam giác ABC vuông tại A có AB = 3cm, AC = 4cm. Tính sin B, cos B, tan B.',
            solutionSteps: [
              'Bước 1: Tính cạnh huyền BC theo định lý Pythagore: $BC = \\sqrt{AB^2 + AC^2} = \\sqrt{3^2 + 4^2} = 5$ cm.',
              'Bước 2: Với góc B: cạnh đối là AC = 4cm, cạnh kề là AB = 3cm, cạnh huyền BC = 5cm.',
              'Bước 3: $\\sin B = \\frac{AC}{BC} = \\frac{4}{5} = 0,8$.',
              'Bước 4: $\\cos B = \\frac{AB}{BC} = \\frac{3}{5} = 0,6$.',
              'Bước 5: $\\tan B = \\frac{AC}{AB} = \\frac{4}{3}$.'
            ],
            result: '$\\sin B = 0,8; \\cos B = 0,6; \\tan B = \\frac{4}{3}$.'
          }
        ],
        exercises: [
          {
            id: 'exe-11-1',
            type: 'BASIC',
            questionText: 'Tính giá trị của biểu thức: $A = \\sin^2 35^\\circ + \\sin^2 55^\\circ$.',
            solution: 'Vì $35^\\circ + 55^\\circ = 90^\\circ$ nên $\\sin 55^\\circ = \\cos 35^\\circ$. Do đó $A = \\sin^2 35^\\circ + \\cos^2 35^\\circ = 1$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-11-1',
            chapterId: 'chuong-4',
            lessonId: 'bai-11',
            title: 'Cho góc nhọn $\\alpha$, khẳng định nào sau đây luôn ĐÚNG?',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$', '$\\sin \\alpha + \\cos \\alpha = 1$', '$\\tan \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}$', '$\\sin \\alpha > 1$'],
            correctAnswer: '$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$',
            stepByStepSolution: [
              { title: 'Công thức cơ bản', content: 'Từ định lý Pythagore, $\\sin^2 \\alpha + \\cos^2 \\alpha = \\frac{\\text{đối}^2}{\\text{huyền}^2} + \\frac{\\text{kề}^2}{\\text{huyền}^2} = \\frac{\\text{huyền}^2}{\\text{huyền}^2} = 1$.' }
            ],
            formulasUsed: ['$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$']
          }
        ]
      },
      {
        id: 'bai-12',
        chapterId: 'chuong-4',
        lessonNumber: 12,
        title: 'Bài 12: Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng',
        objectives: [
          'Vận dụng các hệ thức về cạnh và góc để giải tam giác vuông.',
          'Vận dụng vào bài toán thực tiễn: tính chiều cao vật thể, khoảng cách qua sông.'
        ],
        rememberPoints: [
          'Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh huyền nhân với sin góc đối hoặc nhân với cosin góc kề.',
          'Mỗi cạnh góc vuông bằng cạnh góc vuông kia nhân với tang góc đối hoặc cotang góc kề.'
        ],
        theoryContent: 'Giải tam giác vuông là tìm tất cả các cạnh và góc chưa biết của tam giác khi đã biết hai yếu tố (trong đó có ít nhất một cạnh).',
        importantFormulas: [
          { name: 'Cạnh góc vuông', latex: 'b = a \\sin B = a \\cos C = c \\tan B = c \\cot C' }
        ],
        stepExamples: [
          {
            id: 'ex-12',
            problem: 'Một cột đèn cao có bóng chiếu xuống mặt đất dài 4m. Tia nắng mặt trời tạo với mặt đất một góc $60^\\circ$. Tính chiều cao cột đèn (làm tròn đến mét).',
            solutionSteps: [
              'Bước 1: Gọi chiều cao cột đèn là h (cạnh đối của góc $60^\\circ$).',
              'Bước 2: Chiều dài bóng cột đèn trên mặt đất là $d = 4$m (cạnh kề).',
              'Bước 3: Ta có: $\\tan 60^\\circ = \\frac{h}{d} \\implies h = d \\cdot \\tan 60^\\circ = 4 \\cdot \\sqrt{3} \\approx 4 \\cdot 1,732 = 6,928$ m.',
              'Bước 4: Làm tròn kết quả: $h \\approx 7$ m.'
            ],
            result: 'Cột đèn cao khoảng 7 mét.'
          }
        ],
        exercises: [
          {
            id: 'exe-12-1',
            type: 'APPLIED',
            questionText: 'Cho tam giác ABC vuông tại A có $BC = 10$cm và $\\widehat{B} = 30^\\circ$. Tính độ dài AC và AB.',
            solution: '$AC = BC \\cdot \\sin B = 10 \\cdot \\sin 30^\\circ = 10 \\cdot 0,5 = 5$ cm. $AB = BC \\cdot \\cos B = 10 \\cdot \\cos 30^\\circ = 10 \\cdot \\frac{\\sqrt{3}}{2} = 5\\sqrt{3}$ cm.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-12-1',
            chapterId: 'chuong-4',
            lessonId: 'bai-12',
            title: 'Trong tam giác vuông ABC vuông tại A, cạnh góc vuông b được tính theo công thức nào sau đây?',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['$b = a \\cdot \\sin B$', '$b = a \\cdot \\cos B$', '$b = c \\cdot \\sin B$', '$b = a \\cdot \\tan B$'],
            correctAnswer: '$b = a \\cdot \\sin B$',
            stepByStepSolution: [
              { title: 'Công thức cạnh góc vuông', content: 'Cạnh góc vuông = Cạnh huyền × Sin góc đối: $b = a \\cdot \\sin B$.' }
            ],
            formulasUsed: ['$b = a \\cdot \\sin B$']
          }
        ]
      }
    ]
  },

  // ====================== CHƯƠNG V ======================
  {
    id: 'chuong-5',
    semester: 1,
    chapterNumber: 5,
    title: 'Chương V: Đường tròn',
    summary: 'Mở đầu về đường tròn, tính chất đối xứng, đường kính và dây cung, cung và dây của một đường tròn, độ dài cung tròn, diện tích hình quạt tròn và vành khuyên, vị trí tương đối của đường thẳng và đường tròn, vị trí tương đối của hai đường tròn.',
    objectives: [
      'Hiểu khái niệm đường tròn, sự xác định đường tròn qua 3 điểm không thẳng hàng.',
      'Nắm vững quan hệ vuông góc giữa đường kính và dây cung.',
      'Tính được độ dài cung tròn, diện tích hình quạt tròn và hình vành khuyên.',
      'Xác định được vị trí tương đối giữa đường thẳng và đường tròn (cắt nhau, tiếp xúc, không giao nhau) và tính chất hai tiếp tuyến cắt nhau.',
      'Xác định được vị trí tương đối của hai đường tròn dựa trên hệ thức giữa đoạn nối tâm d và hai bán kính R, r.'
    ],
    coreKnowledge: [
      'Đường tròn tâm O bán kính R ký hiệu là (O; R). Qua 3 điểm không thẳng hàng chỉ vẽ được đúng 1 đường tròn.',
      'Đường kính là dây cung lớn nhất của đường tròn.',
      'Đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy.',
      'Chu vi đường tròn: $C = 2\\pi R$; Diện tích: $S = \\pi R^2$.',
      'Độ dài cung $n^\\circ$: $l = \\frac{\\pi R n}{180}$; Diện tích hình quạt tròn $n^\\circ$: $S_q = \\frac{\\pi R^2 n}{360} = \\frac{l \\cdot R}{2}$.',
      'Tính chất 2 tiếp tuyến cắt nhau tại M tới (O): $MA = MB$, tia MO là tia phân giác góc AMB, tia OM là tia phân giác góc AOB.'
    ],
    keyFormulas: [
      {
        name: 'Độ dài cung tròn n độ',
        latex: 'l = \\frac{\\pi R n}{180}',
        note: 'R là bán kính, n là số đo độ của cung tròn.'
      },
      {
        name: 'Diện tích hình quạt tròn',
        latex: 'S_q = \\frac{\\pi R^2 n}{360} = \\frac{l \\cdot R}{2}',
        note: 'Tương đương một nửa tích độ dài cung với bán kính.'
      },
      {
        name: 'Diện tích hình vành khuyên',
        latex: 'S_{vk} = \\pi (R^2 - r^2)',
        note: 'R là bán kính vòng ngoài, r là bán kính vòng trong.'
      },
      {
        name: 'Tính chất hai tiếp tuyến cắt nhau',
        latex: 'MA = MB; \\quad \\widehat{AMO} = \\widehat{BMO}; \\quad \\widehat{AOM} = \\widehat{BOM}'
      }
    ],
    mindmapPoints: [
      'Đường tròn ➔ Định nghĩa | Tâm đối xứng (tâm O) | Trục đối xứng (mọi đường kính)',
      'Đường kính & Dây cung ➔ Đường kính $\\perp$ dây cung $\\implies$ đi qua trung điểm dây',
      'Tiếp tuyến ➔ Tiếp tuyến $\\perp$ bán kính tại tiếp điểm | Tính chất 2 tiếp tuyến cắt nhau',
      'Công thức đo lường ➔ Chu vi $C = 2\\pi R$ | Diện tích $S = \\pi R^2$ | Quạt tròn $S_q = \\frac{\\pi R^2 n}{360}$ | Vành khuyên $S = \\pi(R^2-r^2)$'
    ],
    lessons: [
      {
        id: 'bai-13',
        chapterId: 'chuong-5',
        lessonNumber: 13,
        title: 'Bài 13: Mở đầu về đường tròn',
        objectives: [
          'Nhận biết định nghĩa và các vị trí tương đối của điểm với đường tròn.',
          'Hiểu cách xác định đường tròn qua 3 điểm không thẳng hàng.'
        ],
        rememberPoints: [
          'Điểm M nằm trong (O; R) khi $OM < R$.',
          'Điểm M nằm trên (O; R) khi $OM = R$.',
          'Điểm M nằm ngoài (O; R) khi $OM > R$.',
          'Không vẽ được đường tròn nào đi qua 3 điểm thẳng hàng.'
        ],
        theoryContent: 'Đường tròn tâm O bán kính R là hình gồm các điểm cách điểm O một khoảng bằng R.',
        importantFormulas: [
          { name: 'Vị trí điểm M và (O; R)', latex: 'OM < R \\;\\text{(trong)}, \\quad OM = R \\;\\text{(trên)}, \\quad OM > R \\;\\text{(ngoài)}' }
        ],
        stepExamples: [
          {
            id: 'ex-13',
            problem: 'Cho tam giác ABC vuông tại A có BC = 10cm. Chứng minh rằng A, B, C cùng thuộc một đường tròn và tìm bán kính của đường tròn đó.',
            solutionSteps: [
              'Bước 1: Gọi M là trung điểm của cạnh huyền BC.',
              'Bước 2: Trong tam giác vuông ABC vuông tại A, AM là đường trung tuyến ứng với cạnh huyền.',
              'Bước 3: Do đó $AM = \\frac{1}{2} BC = BM = MC = \\frac{10}{2} = 5$ cm.',
              'Bước 4: Vì M cách đều cả ba điểm A, B, C một khoảng 5cm nên ba điểm A, B, C cùng thuộc đường tròn tâm M bán kính R = 5cm.'
            ],
            result: 'Đường tròn tâm là trung điểm BC, bán kính R = 5cm.'
          }
        ],
        exercises: [
          {
            id: 'exe-13-1',
            type: 'BASIC',
            questionText: 'Cho (O; 5cm) và điểm A sao cho OA = 4cm. Điểm A nằm ở đâu so với đường tròn?',
            solution: 'Vì OA = 4cm < R = 5cm nên điểm A nằm bên trong đường tròn (O; 5cm).'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-13-1',
            chapterId: 'chuong-5',
            lessonId: 'bai-13',
            title: 'Tâm đường tròn ngoại tiếp tam giác vuông nằm ở:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['Trung điểm cạnh huyền', 'Đỉnh góc vuông', 'Điểm trong tam giác', 'Trọng tâm tam giác'],
            correctAnswer: 'Trung điểm cạnh huyền',
            stepByStepSolution: [
              { title: 'Tính chất trung tuyến', content: 'Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền, do đó trung điểm cạnh huyền cách đều 3 đỉnh.' }
            ],
            formulasUsed: ['Trung điểm cạnh huyền là tâm đường tròn ngoại tiếp']
          }
        ]
      },
      {
        id: 'bai-14',
        chapterId: 'chuong-5',
        lessonNumber: 14,
        title: 'Bài 14: Cung và dây của một đường tròn',
        objectives: [
          'Vận dụng định lý đường kính vuông góc với dây cung.',
          'So sánh độ dài hai dây cung dựa vào khoảng cách từ tâm đến dây.'
        ],
        rememberPoints: [
          'Đường kính vuông góc với một dây thì đi qua trung điểm của dây đó.',
          'Đường kính đi qua trung điểm của một dây không đi qua tâm thì vuông góc với dây đó.'
        ],
        theoryContent: 'Mối quan hệ giữa đường kính và dây cung là nền tảng để tính toán khoảng cách và chứng minh vuông góc trong hình học đường tròn.',
        importantFormulas: [
          { name: 'Liên hệ bán kính, dây và khoảng cách tới tâm', latex: 'R^2 = d^2 + \\left(\\frac{AB}{2}\\right)^2' }
        ],
        stepExamples: [
          {
            id: 'ex-14',
            problem: 'Cho đường tròn (O; 10cm). Một dây AB có độ dài 16cm. Tính khoảng cách từ tâm O đến dây AB.',
            solutionSteps: [
              'Bước 1: Kẻ $OH \\perp AB$ tại H. Theo định lý đường kính vuông góc dây cung, H là trung điểm của AB.',
              'Bước 2: Tính $AH = \\frac{AB}{2} = \\frac{16}{2} = 8$ cm.',
              'Bước 3: Xét tam giác OAH vuông tại H: $OH^2 + AH^2 = OA^2 \\implies OH^2 + 8^2 = 10^2$.',
              'Bước 4: $OH^2 = 100 - 64 = 36 \\implies OH = 6$ cm.'
            ],
            result: 'Khoảng cách từ tâm O đến dây AB là 6cm.'
          }
        ],
        exercises: [
          {
            id: 'exe-14-1',
            type: 'BASIC',
            questionText: 'Cho (O; 13cm), dây CD cách tâm 5cm. Tính độ dài dây CD.',
            solution: '$CH = \\sqrt{R^2 - d^2} = \\sqrt{13^2 - 5^2} = 12$ cm. Vậy dây $CD = 2 \\cdot 12 = 24$ cm.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-14-1',
            chapterId: 'chuong-5',
            lessonId: 'bai-14',
            title: 'Trong một đường tròn, đường kính đi qua trung điểm của một dây không đi qua tâm thì:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['Vuông góc với dây ấy', 'Song song với dây ấy', 'Bằng dây ấy', 'Trùng với dây ấy'],
            correctAnswer: 'Vuông góc với dây ấy',
            stepByStepSolution: [
              { title: 'Định lý SGK', content: 'Định lý: Đường kính đi qua trung điểm của một dây không đi qua tâm thì vuông góc với dây ấy.' }
            ],
            formulasUsed: ['Đường kính vuông góc với dây']
          }
        ]
      },
      {
        id: 'bai-15',
        chapterId: 'chuong-5',
        lessonNumber: 15,
        title: 'Bài 15: Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên',
        objectives: [
          'Tính độ dài cung tròn theo công thức $l = \\frac{\\pi R n}{180}$.',
          'Tính diện tích hình quạt tròn và hình vành khuyên trong các tình huống thực tiễn.'
        ],
        rememberPoints: [
          'Chu vi đường tròn $C = 2\\pi R = \\pi d$.',
          'Diện tích hình tròn $S = \\pi R^2$.',
          'Hình vành khuyên là phần nằm giữa hai đường tròn đồng tâm: $S = \\pi(R^2 - r^2)$.'
        ],
        theoryContent: 'Cung tròn n độ có độ dài bằng $\\frac{n}{360}$ chu vi đường tròn. Hình quạt tròn n độ có diện tích bằng $\\frac{n}{360}$ diện tích hình tròn.',
        importantFormulas: [
          { name: 'Độ dài cung tròn', latex: 'l = \\frac{\\pi R n}{180}' },
          { name: 'Diện tích quạt tròn', latex: 'S_q = \\frac{\\pi R^2 n}{360} = \\frac{l R}{2}' },
          { name: 'Diện tích vành khuyên', latex: 'S = \\pi (R^2 - r^2)' }
        ],
        stepExamples: [
          {
            id: 'ex-15',
            problem: 'Tính diện tích hình quạt tròn có bán kính R = 6cm và số đo cung là $60^\\circ$ (lấy $\\pi \\approx 3,14$).',
            solutionSteps: [
              'Bước 1: Áp dụng công thức $S_q = \\frac{\\pi R^2 n}{360}$.',
              'Bước 2: Thay số: $S_q = \\frac{3,14 \\cdot 6^2 \\cdot 60}{360} = \\frac{3,14 \\cdot 36 \\cdot 60}{360} = 3,14 \\cdot 6 = 18,84$ cm².'
            ],
            result: 'Diện tích hình quạt tròn là $18,84$ cm².'
          }
        ],
        exercises: [
          {
            id: 'exe-15-1',
            type: 'BASIC',
            questionText: 'Một hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính R = 10cm và r = 6cm. Tính diện tích hình vành khuyên theo π.',
            solution: '$S = \\pi (R^2 - r^2) = \\pi (10^2 - 6^2) = \\pi (100 - 36) = 64\\pi$ cm².'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-15-1',
            chapterId: 'chuong-5',
            lessonId: 'bai-15',
            title: 'Độ dài cung $90^\\circ$ của đường tròn bán kính R = 4cm là:',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['$2\\pi$ cm', '$4\\pi$ cm', '$\\pi$ cm', '$8\\pi$ cm'],
            correctAnswer: '$2\\pi$ cm',
            stepByStepSolution: [
              { title: 'Áp dụng công thức', content: '$l = \\frac{\\pi \\cdot 4 \\cdot 90}{180} = 2\\pi$ cm.' }
            ],
            formulasUsed: ['$l = \\frac{\\pi R n}{180}$']
          }
        ]
      },
      {
        id: 'bai-16',
        chapterId: 'chuong-5',
        lessonNumber: 16,
        title: 'Bài 16: Vị trí tương đối của đường thẳng và đường tròn',
        objectives: [
          'Nắm vững 3 vị trí tương đối: cắt nhau (d < R), tiếp xúc (d = R), không giao nhau (d > R).',
          'Vận dụng định lý về tiếp tuyến và tính chất hai tiếp tuyến cắt nhau.'
        ],
        rememberPoints: [
          'Dấu hiệu nhận biết tiếp tuyến: Nếu một đường thẳng đi qua một điểm của đường tròn và vuông góc với bán kính đi qua điểm đó thì đường thẳng đó là tiếp tuyến của đường tròn.',
          'Tính chất hai tiếp tuyến cắt nhau tạo ra các tam giác cân và góc phân giác đối xứng.'
        ],
        theoryContent: 'Vị trí tương đối giữa đường thẳng và đường tròn được xác định qua khoảng cách d từ tâm đường tròn đến đường thẳng so với bán kính R.',
        importantFormulas: [
          { name: 'Vị trí tương đối', latex: 'd < R \\iff 2 \\,\\text{điểm chung}; \\quad d = R \\iff 1 \\,\\text{điểm chung (tiếp xúc)}; \\quad d > R \\iff 0 \\,\\text{điểm chung}' }
        ],
        stepExamples: [
          {
            id: 'ex-16',
            problem: 'Từ điểm M nằm ngoài (O; R) kẻ hai tiếp tuyến MA, MB với đường tròn (A, B là các tiếp điểm). Biết $\\widehat{AMB} = 60^\\circ$ và $R = 6$cm. Tính độ dài đoạn MA.',
            solutionSteps: [
              'Bước 1: Theo tính chất hai tiếp tuyến cắt nhau, MO là tia phân giác của góc AMB: $\\widehat{AMO} = \\frac{60^\\circ}{2} = 30^\\circ$.',
              'Bước 2: Vì MA là tiếp tuyến nên $OA \\perp MA$ tại A, tam giác OAM vuông tại A.',
              'Bước 3: Trong tam giác vuông OAM: $\\tan \\widehat{AMO} = \\frac{OA}{MA} \\implies \\tan 30^\\circ = \\frac{R}{MA}$.',
              'Bước 4: $MA = \\frac{R}{\\tan 30^\\circ} = \\frac{6}{\\frac{1}{\\sqrt{3}}} = 6\\sqrt{3}$ cm.'
            ],
            result: '$MA = 6\\sqrt{3}$ cm.'
          }
        ],
        exercises: [
          {
            id: 'exe-16-1',
            type: 'BASIC',
            questionText: 'Cho (O; 5cm) và đường thẳng d có khoảng cách tới tâm $OH = 5$cm. Hỏi d có vị trí thế nào với (O)?',
            solution: 'Vì $d = OH = R = 5$cm nên đường thẳng d tiếp xúc với đường tròn (O; 5cm).'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-16-1',
            chapterId: 'chuong-5',
            lessonId: 'bai-16',
            title: 'Nếu khoảng cách từ tâm O đến đường thẳng d lớn hơn bán kính R ($d > R$) thì:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['Đường thẳng và đường tròn không giao nhau', 'Đường thẳng cắt đường tròn', 'Đường thẳng tiếp xúc đường tròn', 'Đường thẳng đi qua tâm'],
            correctAnswer: 'Đường thẳng và đường tròn không giao nhau',
            stepByStepSolution: [
              { title: 'Vị trí tương đối', content: 'Khi $d > R$, đường thẳng nằm hoàn toàn bên ngoài đường tròn nên không có điểm chung.' }
            ],
            formulasUsed: ['$d > R \\implies$ không giao nhau']
          }
        ]
      }
    ]
  },

  // ====================== HỌC KỲ II ======================
  {
    id: 'chuong-6',
    semester: 2,
    chapterNumber: 6,
    title: 'Chương VI: Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn',
    summary: 'Nghiên cứu hàm số bậc hai y = ax², tính đồng biến, nghịch biến, đồ thị Parabol; công thức nghiệm và công thức nghiệm thu gọn của phương trình bậc hai một ẩn; định lí Viète và các ứng dụng quan trọng trong tuyển sinh vào lớp 10.',
    objectives: [
      'Nắm vững tính chất biến thiên và hình dạng Parabol của hàm số $y = ax^2$ ($a \\neq 0$).',
      'Vẽ chính xác đồ thị Parabol và tìm tọa độ giao điểm với đường thẳng.',
      'Giải thành thạo phương trình bậc hai một ẩn bằng cách tính biệt thức $\\Delta$ hoặc $\\Delta\'$.',
      'Vận dụng nhuần nhuyễn định lí Viète để tính tổng, tích nghiệm, lập phương trình khi biết hai nghiệm, xét dấu nghiệm và tìm tham số m để phương trình có nghiệm thỏa mãn hệ thức cho trước.'
    ],
    coreKnowledge: [
      'Hàm số $y = ax^2$ ($a \\neq 0$): Nếu $a > 0$, hàm số nghịch biến khi $x < 0$, đồng biến khi $x > 0$, đạt GTNN tại $O(0;0)$. Nếu $a < 0$, hàm số đồng biến khi $x < 0$, nghịch biến khi $x > 0$, đạt GTLN tại $O(0;0)$.',
      'Phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\neq 0$): $\\Delta = b^2 - 4ac$. Nếu $\\Delta > 0$: 2 nghiệm phân biệt $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$. Nếu $\\Delta = 0$: nghiệm kép $x_1 = x_2 = -\\frac{b}{2a}$. Nếu $\\Delta < 0$: vô nghiệm.',
      'Trường hợp đặc biệt: Nếu $a + b + c = 0$ thì $x_1 = 1, x_2 = \\frac{c}{a}$. Nếu $a - b + c = 0$ thì $x_1 = -1, x_2 = -\\frac{c}{a}$.',
      'Định lí Viète: Cho PT có nghiệm $x_1, x_2$, khi đó $S = x_1 + x_2 = -\\frac{b}{a}$, $P = x_1 x_2 = \\frac{c}{a}$.'
    ],
    keyFormulas: [
      {
        name: 'Biệt thức Delta',
        latex: '\\Delta = b^2 - 4ac',
        note: 'Công thức nghiệm thu gọn: \\Delta\' = (b\')^2 - ac với b = 2b\'.'
      },
      {
        name: 'Định lí Viète',
        latex: 'x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 \\cdot x_2 = \\frac{c}{a}',
        note: 'Áp dụng cho mọi bài toán liên quan đến hai nghiệm của phương trình bậc hai.'
      },
      {
        name: 'Các hệ thức Viète đối xứng quen thuộc',
        latex: 'x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = S^2 - 2P; \\quad (x_1 - x_2)^2 = S^2 - 4P'
      }
    ],
    mindmapPoints: [
      'Hàm số $y = ax^2$ ➔ Đỉnh O(0;0) | Nhận trục Oy làm trục đối xứng | Parabol ngửa ($a>0$) hoặc úp ($a<0$)',
      'Công thức nghiệm PT bậc 2 ➔ Tính $\\Delta = b^2 - 4ac$ ➔ $\\Delta > 0$ (2 nghiệm) | $\\Delta = 0$ (nghiệm kép) | $\\Delta < 0$ (vô nghiệm)',
      'Nhẩm nghiệm nhanh ➔ $a + b + c = 0 \\implies x_1 = 1, x_2 = \\frac{c}{a}$ | $a - b + c = 0 \\implies x_1 = -1, x_2 = -\\frac{c}{a}$',
      'Ứng dụng Viète ➔ Tính giá trị biểu thức đối xứng | Tìm hai số khi biết tổng và tích | Tìm m thỏa mãn điều kiện nghiệm'
    ],
    lessons: [
      {
        id: 'bai-18',
        chapterId: 'chuong-6',
        lessonNumber: 18,
        title: 'Bài 18: Hàm số y = ax² (a ≠ 0)',
        objectives: [
          'Nắm vững tính chất đồng biến, nghịch biến của hàm số $y = ax^2$.',
          'Vẽ đồ thị hàm số (Parabol) qua bảng giá trị 5 điểm đối xứng.'
        ],
        rememberPoints: [
          'Đồ thị là một đường cong Parabol đi qua gốc tọa độ O(0; 0) và nhận trục Oy làm trục đối xứng.',
          'Nếu $a > 0$: Parabol nằm phía trên trục hoành, điểm O là điểm thấp nhất.',
          'Nếu $a < 0$: Parabol nằm phía dưới trục hoành, điểm O là điểm cao nhất.'
        ],
        theoryContent: 'Hàm số bậc hai một ẩn có dạng đơn giản nhất là $y = ax^2$ ($a \\neq 0$). Đây là mô hình mô tả quỹ đạo rơi tự do, quỹ đạo ném bóng và kiến trúc cầu vòm.',
        importantFormulas: [
          { name: 'Tính chất biến thiên', latex: 'a > 0: \\text{Nghịch biến trên } (-\\infty; 0), \\text{ Đồng biến trên } (0; +\\infty)' }
        ],
        stepExamples: [
          {
            id: 'ex-18',
            problem: 'Vẽ đồ thị của hàm số $y = 2x^2$.',
            solutionSteps: [
              'Bước 1: Lập bảng giá trị với 5 điểm:',
              'x = -2 => y = 8; x = -1 => y = 2; x = 0 => y = 0; x = 1 => y = 2; x = 2 => y = 8.',
              'Bước 2: Xác định các điểm (-2; 8), (-1; 2), (0; 0), (1; 2), (2; 8) trên mặt phẳng Oxy.',
              'Bước 3: Nối các điểm bằng một đường cong parabol uốn mượt mà.'
            ],
            result: 'Parabol đỉnh O, bề lõm hướng lên trên vì a = 2 > 0.'
          }
        ],
        exercises: [
          {
            id: 'exe-18-1',
            type: 'BASIC',
            questionText: 'Điểm $A(2; -8)$ có thuộc đồ thị hàm số $y = -2x^2$ không?',
            solution: 'Thay $x = 2$ vào vế phải: $y = -2(2^2) = -2(4) = -8$. Giá trị này bằng tung độ điểm A. Vậy điểm A thuộc đồ thị.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-18-1',
            chapterId: 'chuong-6',
            lessonId: 'bai-18',
            title: 'Hàm số $y = -3x^2$ đồng biến trên khoảng nào sau đây?',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['$x < 0$', '$x > 0$', 'Với mọi $x \\in \\mathbb{R}$', 'Không bao giờ đồng biến'],
            correctAnswer: '$x < 0$',
            stepByStepSolution: [
              { title: 'Xét dấu hệ số a', content: 'Vì $a = -3 < 0$ nên hàm số đồng biến khi $x < 0$ và nghịch biến khi $x > 0$.' }
            ],
            formulasUsed: ['$a < 0 \\implies$ đồng biến khi $x < 0$']
          }
        ]
      },
      {
        id: 'bai-19',
        chapterId: 'chuong-6',
        lessonNumber: 19,
        title: 'Bài 19: Phương trình bậc hai một ẩn',
        objectives: [
          'Hiểu công thức nghiệm và công thức nghiệm thu gọn của phương trình bậc hai.',
          'Giải thành thạo mọi phương trình bậc hai một ẩn.'
        ],
        rememberPoints: [
          'Biệt thức $\\Delta = b^2 - 4ac$.',
          'Biệt thức thu gọn $\\Delta\' = b\'^2 - ac$ (dùng khi b là số chẵn, $b = 2b\'$).'
        ],
        theoryContent: 'Phương trình bậc hai một ẩn là phương trình có dạng $ax^2 + bx + c = 0$, trong đó x là ẩn; a, b, c là những số cho trước và $a \\neq 0$.',
        importantFormulas: [
          { name: 'Công thức nghiệm tổng quát', latex: 'x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} \\quad (\\Delta = b^2 - 4ac > 0)' },
          { name: 'Nghiệm kép', latex: 'x_1 = x_2 = -\\frac{b}{2a} \\quad (\\Delta = 0)' }
        ],
        stepExamples: [
          {
            id: 'ex-19',
            problem: 'Giải phương trình: $x^2 - 6x + 5 = 0$',
            solutionSteps: [
              'Bước 1: Xác định các hệ số: $a = 1, b = -6, c = 5$.',
              'Bước 2: Cách 1 dùng nhẩm nghiệm: Vì $a + b + c = 1 + (-6) + 5 = 0$.',
              'Bước 3: Do đó phương trình có 2 nghiệm: $x_1 = 1$ và $x_2 = \\frac{c}{a} = \\frac{5}{1} = 5$.'
            ],
            result: 'Tập nghiệm $S = \\{1; 5\\}$.',
            notes: 'Nếu giải bằng Delta: $\\Delta\' = (-3)^2 - 1(5) = 9 - 5 = 4 > 0 \\implies x = 3 \\pm 2$. Kết quả vẫn là 1 và 5.'
          }
        ],
        exercises: [
          {
            id: 'exe-19-1',
            type: 'BASIC',
            questionText: 'Giải phương trình: $2x^2 - 7x + 3 = 0$.',
            solution: '$\\Delta = (-7)^2 - 4(2)(3) = 49 - 24 = 25 > 0$. Nghiệm: $x_1 = \\frac{7+5}{4} = 3; x_2 = \\frac{7-5}{4} = 0.5$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-19-1',
            chapterId: 'chuong-6',
            lessonId: 'bai-19',
            title: 'Biệt thức $\\Delta$ của phương trình $2x^2 - 3x - 2 = 0$ bằng:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['25', '7', '-7', '17'],
            correctAnswer: '25',
            stepByStepSolution: [
              { title: 'Tính Delta', content: '$\\Delta = b^2 - 4ac = (-3)^2 - 4(2)(-2) = 9 + 16 = 25$.' }
            ],
            formulasUsed: ['$\\Delta = b^2 - 4ac$']
          }
        ]
      },
      {
        id: 'bai-20',
        chapterId: 'chuong-6',
        lessonNumber: 20,
        title: 'Bài 20: Định lí Viète và ứng dụng',
        objectives: [
          'Phát biểu và chứng minh định lí Viète.',
          'Vận dụng định lí Viète để nhẩm nghiệm, tìm hai số khi biết tổng và tích, tìm tham số m trong bài thi vào 10.'
        ],
        rememberPoints: [
          'Định lí Viète chỉ áp dụng được khi phương trình có nghiệm (nghĩa là $\\Delta \\ge 0$).',
          'Biểu thức $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.'
        ],
        theoryContent: 'Nếu phương trình bậc hai $ax^2 + bx + c = 0$ ($a \\neq 0$) có hai nghiệm $x_1, x_2$ thì tổng $x_1 + x_2 = -\\frac{b}{a}$ và tích $x_1 x_2 = \\frac{c}{a}$.',
        importantFormulas: [
          { name: 'Định lí Viète', latex: 'S = x_1 + x_2 = -\\frac{b}{a}; \\quad P = x_1 x_2 = \\frac{c}{a}' },
          { name: 'Tìm hai số khi biết tổng S và tích P', latex: 'X^2 - SX + P = 0 \\quad (ĐK: S^2 - 4P \\ge 0)' }
        ],
        stepExamples: [
          {
            id: 'ex-20',
            problem: 'Cho phương trình $x^2 - 5x + 3 = 0$. Không giải phương trình, hãy tính giá trị biểu thức $A = x_1^2 + x_2^2$.',
            solutionSteps: [
              'Bước 1: Tính $\\Delta = (-5)^2 - 4(1)(3) = 25 - 12 = 13 > 0$, do đó phương trình luôn có 2 nghiệm phân biệt $x_1, x_2$.',
              'Bước 2: Theo định lí Viète: $x_1 + x_2 = 5$ và $x_1 x_2 = 3$.',
              'Bước 3: Biến đổi biểu thức: $A = (x_1 + x_2)^2 - 2x_1 x_2$.',
              'Bước 4: Thay số: $A = 5^2 - 2(3) = 25 - 6 = 19$.'
            ],
            result: '$A = 19$.'
          }
        ],
        exercises: [
          {
            id: 'exe-20-1',
            type: 'APPLIED',
            questionText: 'Tìm hai số biết tổng của chúng bằng 12 và tích của chúng bằng 35.',
            solution: 'Hai số là nghiệm của phương trình $X^2 - 12X + 35 = 0$. $\\Delta\' = 36 - 35 = 1$. Hai số là $X_1 = 6 + 1 = 7, X_2 = 6 - 1 = 5$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-20-1',
            chapterId: 'chuong-6',
            lessonId: 'bai-20',
            title: 'Tổng và tích hai nghiệm của phương trình $2x^2 - 8x + 5 = 0$ lần lượt là:',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['$x_1 + x_2 = 4, \\; x_1 x_2 = 2.5$', '$x_1 + x_2 = -4, \\; x_1 x_2 = 2.5$', '$x_1 + x_2 = 8, \\; x_1 x_2 = 5$', '$x_1 + x_2 = -8, \\; x_1 x_2 = 5$'],
            correctAnswer: '$x_1 + x_2 = 4, \\; x_1 x_2 = 2.5$',
            stepByStepSolution: [
              { title: 'Áp dụng Viète', content: '$x_1 + x_2 = -\\frac{-8}{2} = 4$; $x_1 x_2 = \\frac{5}{2} = 2.5$.' }
            ],
            formulasUsed: ['$S = -b/a, P = c/a$']
          }
        ]
      }
    ]
  },

  // ====================== CHƯƠNG IX ======================
  {
    id: 'chuong-9',
    semester: 2,
    chapterNumber: 9,
    title: 'Chương IX: Đường tròn ngoại tiếp và đường tròn nội tiếp',
    summary: 'Góc nội tiếp và định lý liên hệ với cung bị chắn, đường tròn ngoại tiếp và nội tiếp tam giác, định nghĩa và dấu hiệu nhận biết tứ giác nội tiếp (trọng tâm hình học lớp 9), đa giác đều.',
    objectives: [
      'Hiểu và vận dụng thành thạo định lý về góc nội tiếp và số đo cung bị chắn.',
      'Hiểu và vẽ được đường tròn ngoại tiếp, đường tròn nội tiếp của tam giác và tứ giác.',
      'Nắm vững 4 dấu hiệu nhận biết tứ giác nội tiếp và thành thạo kỹ năng chứng minh tứ giác nội tiếp trong đề thi tuyển sinh lớp 10.'
    ],
    coreKnowledge: [
      'Góc nội tiếp có số đo bằng một nửa số đo của cung bị chắn: $\\widehat{BAC} = \\frac{1}{2} sđ \\overparen{BC}$.',
      'Các góc nội tiếp cùng chắn một cung hoặc chắn hai cung bằng nhau thì bằng nhau.',
      'Góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\\circ$).',
      'Tứ giác nội tiếp là tứ giác có bốn đỉnh nằm trên một đường tròn.',
      '4 dấu hiệu nhận biết tứ giác nội tiếp: (1) Tứ giác có tổng hai góc đối bằng 180°; (2) Tứ giác có góc ngoài tại một đỉnh bằng góc trong tại đỉnh đối; (3) Tứ giác có hai đỉnh kề nhau cùng nhìn cạnh chứa hai đỉnh còn lại dưới một góc bằng nhau; (4) Tứ giác có bốn đỉnh cùng cách đều một điểm.'
    ],
    keyFormulas: [
      {
        name: 'Định lý góc nội tiếp',
        latex: '\\widehat{BAC} = \\frac{1}{2} sđ\\overparen{BC}',
        note: 'Góc nội tiếp chắn nửa đường tròn bằng 90°.'
      },
      {
        name: 'Dấu hiệu tứ giác nội tiếp',
        latex: '\\widehat{A} + \\widehat{C} = 180^\\circ \\quad \\text{hoặc} \\quad \\widehat{B} + \\widehat{D} = 180^\\circ'
      }
    ],
    mindmapPoints: [
      'Góc nội tiếp ➔ Số đo = 1/2 số đo cung bị chắn | Góc chắn nửa đường tròn = 90°',
      'Đường tròn ngoại tiếp ➔ Giao 3 đường trung trực của tam giác',
      'Đường tròn nội tiếp ➔ Giao 3 đường phân giác trong của tam giác',
      'Tứ giác nội tiếp ➔ Tổng 2 góc đối = 180° | 2 đỉnh kề cùng nhìn 1 cạnh góc α | Góc ngoài = góc trong đối diện'
    ],
    lessons: [
      {
        id: 'bai-27',
        chapterId: 'chuong-9',
        lessonNumber: 27,
        title: 'Bài 27: Góc nội tiếp',
        objectives: [
          'Hiểu định nghĩa và tính chất của góc nội tiếp.',
          'Vận dụng hệ quả: góc nội tiếp chắn nửa đường tròn là góc vuông.'
        ],
        rememberPoints: [
          'Đỉnh của góc phải nằm TRÊN đường tròn và hai cạnh chứa hai dây cung của đường tròn.',
          'Trong một đường tròn, số đo góc nội tiếp bằng nửa số đo góc ở tâm cùng chắn một cung.'
        ],
        theoryContent: 'Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh chứa hai dây cung của đường tròn đó. Cung nằm bên trong góc được gọi là cung bị chắn.',
        importantFormulas: [
          { name: 'Số đo góc nội tiếp', latex: '\\widehat{BAC} = \\frac{1}{2} \\widehat{BOC} = \\frac{1}{2} sđ\\overparen{BC}' }
        ],
        stepExamples: [
          {
            id: 'ex-27',
            problem: 'Cho tam giác ABC nội tiếp đường tròn (O) đường kính BC. Biết $\\widehat{ABC} = 60^\\circ$. Tính số đo $\\widehat{BAC}$ và $\\widehat{ACB}$.',
            solutionSteps: [
              'Bước 1: Góc BAC là góc nội tiếp chắn nửa đường tròn đường kính BC, do đó $\\widehat{BAC} = 90^\\circ$.',
              'Bước 2: Trong tam giác vuông ABC vuông tại A: $\\widehat{ACB} = 90^\\circ - \\widehat{ABC} = 90^\\circ - 60^\\circ = 30^\\circ$.'
            ],
            result: '$\\widehat{BAC} = 90^\\circ; \\widehat{ACB} = 30^\\circ$.'
          }
        ],
        exercises: [
          {
            id: 'exe-27-1',
            type: 'BASIC',
            questionText: 'Cho góc ở tâm $\\widehat{AOB} = 100^\\circ$. Tính góc nội tiếp $\\widehat{ACB}$ cùng chắn cung AB.',
            solution: '$\\widehat{ACB} = \\frac{1}{2} \\widehat{AOB} = \\frac{1}{2} (100^\\circ) = 50^\\circ$.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-27-1',
            chapterId: 'chuong-9',
            lessonId: 'bai-27',
            title: 'Góc nội tiếp chắn nửa đường tròn có số đo bằng:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['$90^\\circ$', '$60^\\circ$', '$180^\\circ$', '$45^\\circ$'],
            correctAnswer: '$90^\\circ$',
            stepByStepSolution: [
              { title: 'Hệ quả góc nội tiếp', content: 'Góc nội tiếp chắn nửa đường tròn (cung 180°) có số đo bằng $180^\\circ / 2 = 90^\\circ$.' }
            ],
            formulasUsed: ['Góc nội tiếp chắn nửa đường tròn = 90°']
          }
        ]
      },
      {
        id: 'bai-29',
        chapterId: 'chuong-9',
        lessonNumber: 29,
        title: 'Bài 29: Tứ giác nội tiếp',
        objectives: [
          'Hiểu định nghĩa và tính chất của tứ giác nội tiếp.',
          'Nắm chắc 4 phương pháp chứng minh tứ giác nội tiếp để giải câu c hình học tuyển sinh vào 10.'
        ],
        rememberPoints: [
          'Một tứ giác nội tiếp được khi và chỉ khi tổng hai góc đối diện bằng $180^\\circ$.',
          'Tứ giác có hai đỉnh cùng nhìn đoạn thẳng nối hai đỉnh còn lại dưới góc bằng nhau thì nội tiếp.'
        ],
        theoryContent: 'Tứ giác nội tiếp là chủ đề trọng tâm chiếm từ 1.0 đến 1.5 điểm trong tất cả các đề thi tuyển sinh vào lớp 10 trên toàn quốc.',
        importantFormulas: [
          { name: 'Tổng góc đối', latex: '\\widehat{A} + \\widehat{C} = 180^\\circ \\iff \\text{ABCD nội tiếp}' }
        ],
        stepExamples: [
          {
            id: 'ex-29',
            problem: 'Cho tam giác ABC nhọn có hai đường cao BD và CE cắt nhau tại H. Chứng minh rằng tứ giác ADHE nội tiếp đường tròn.',
            solutionSteps: [
              'Bước 1: Vì BD là đường cao của tam giác ABC nên $BD \\perp AC \\implies \\widehat{ADH} = 90^\\circ$.',
              'Bước 2: Vì CE là đường cao của tam giác ABC nên $CE \\perp AB \\implies \\widehat{AEH} = 90^\\circ$.',
              'Bước 3: Xét tứ giác ADHE có: $\\widehat{ADH} + \\widehat{AEH} = 90^\\circ + 90^\\circ = 180^\\circ$.',
              'Bước 4: Hai góc này ở vị trí đối nhau.'
            ],
            result: 'Vậy tứ giác ADHE nội tiếp đường tròn (đường kính AH).'
          }
        ],
        exercises: [
          {
            id: 'exe-29-1',
            type: 'APPLIED',
            questionText: 'Chứng minh tứ giác BEDC nội tiếp với BD, CE là hai đường cao của tam giác ABC.',
            solution: 'Ta có $\\widehat{BEC} = \\widehat{BDC} = 90^\\circ$. Hai đỉnh E và D kề nhau cùng nhìn cạnh BC dưới góc vuông $90^\\circ$. Vậy tứ giác BEDC nội tiếp đường tròn đường kính BC.'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-29-1',
            chapterId: 'chuong-9',
            lessonId: 'bai-29',
            title: 'Tứ giác ABCD nội tiếp đường tròn khi có điều kiện nào sau đây?',
            type: 'MULTIPLE_CHOICE',
            level: 'THONG_HIEU',
            points: 1,
            options: ['$\\widehat{A} + \\widehat{C} = 180^\\circ$', '$\\widehat{A} + \\widehat{B} = 180^\\circ$', '$\\widehat{A} = \\widehat{C}$', '$AB = CD$'],
            correctAnswer: '$\\widehat{A} + \\widehat{C} = 180^\\circ$',
            stepByStepSolution: [
              { title: 'Dấu hiệu nhận biết', content: 'Tứ giác có tổng hai góc đối bằng $180^\\circ$ là tứ giác nội tiếp.' }
            ],
            formulasUsed: ['$\\widehat{A} + \\widehat{C} = 180^\\circ$']
          }
        ]
      }
    ]
  },

  // ====================== CHƯƠNG X ======================
  {
    id: 'chuong-10',
    semester: 2,
    chapterNumber: 10,
    title: 'Chương X: Một số hình khối trong thực tiễn',
    summary: 'Hình trụ, diện tích xung quanh và thể tích hình trụ; Hình nón, diện tích xung quanh và thể tích hình nón; Hình cầu, diện tích mặt cầu và thể tích hình cầu.',
    objectives: [
      'Nhận biết các yếu tố đáy, chiều cao, đường sinh của hình trụ, hình nón, hình cầu.',
      'Thuộc và vận dụng chính xác các công thức tính diện tích xung quanh, diện tích toàn phần và thể tích của 3 khối hình.',
      'Giải quyết tốt các bài toán thực tiễn: tính thể tích bể nước, lượng sơn phủ, khối lượng kim loại.'
    ],
    coreKnowledge: [
      'Hình trụ (bán kính đáy r, chiều cao h): $S_{xq} = 2\\pi r h$, $S_{tp} = 2\\pi r h + 2\\pi r^2$, $V = \\pi r^2 h$.',
      'Hình nón (bán kính đáy r, chiều cao h, đường sinh l): $l = \\sqrt{r^2 + h^2}$, $S_{xq} = \\pi r l$, $S_{tp} = \\pi r l + \\pi r^2$, $V = \\frac{1}{3}\\pi r^2 h$.',
      'Hình cầu (bán kính R): $S = 4\\pi R^2$, $V = \\frac{4}{3}\\pi R^3$.'
    ],
    keyFormulas: [
      {
        name: 'Thể tích hình trụ',
        latex: 'V_{trụ} = \\pi r^2 h',
        note: 'Bằng diện tích đáy nhân chiều cao.'
      },
      {
        name: 'Thể tích hình nón',
        latex: 'V_{nón} = \\frac{1}{3}\\pi r^2 h',
        note: 'Bằng 1/3 thể tích hình trụ cùng đáy và chiều cao.'
      },
      {
        name: 'Thể tích và diện tích mặt cầu',
        latex: 'S_{cầu} = 4\\pi R^2; \\quad V_{cầu} = \\frac{4}{3}\\pi R^3'
      }
    ],
    mindmapPoints: [
      'Hình trụ ➔ $S_{xq} = 2\\pi rh$ | $V = \\pi r^2 h$',
      'Hình nón ➔ Đường sinh $l = \\sqrt{r^2+h^2}$ | $S_{xq} = \\pi rl$ | $V = \\frac{1}{3}\\pi r^2 h$',
      'Hình cầu ➔ Diện tích mặt cầu $S = 4\\pi R^2$ | Thể tích $V = \\frac{4}{3}\\pi R^3$'
    ],
    lessons: [
      {
        id: 'bai-31',
        chapterId: 'chuong-10',
        lessonNumber: 31,
        title: 'Bài 31: Hình trụ và diện tích xung quanh, thể tích hình trụ',
        objectives: [
          'Tính diện tích xung quanh và thể tích hình trụ.',
          'Ứng dụng tính thể tích lon sữa, thùng chứa hình trụ.'
        ],
        rememberPoints: [
          'Đáy của hình trụ là hai hình tròn bằng nhau nằm trên hai mặt phẳng song song.',
          '$S_{tp} = S_{xq} + 2 S_{\\text{đáy}} = 2\\pi rh + 2\\pi r^2$.'
        ],
        theoryContent: 'Khi quay hình chữ nhật một vòng quanh một cạnh cố định, ta được một hình trụ.',
        importantFormulas: [
          { name: 'Công thức hình trụ', latex: 'S_{xq} = 2\\pi r h; \\quad V = \\pi r^2 h' }
        ],
        stepExamples: [
          {
            id: 'ex-31',
            problem: 'Một lon nước ngọt hình trụ có đường kính đáy d = 6cm và chiều cao h = 12cm. Tính thể tích lon nước ngọt đó theo π.',
            solutionSteps: [
              'Bước 1: Bán kính đáy $r = \\frac{d}{2} = \\frac{6}{2} = 3$ cm.',
              'Bước 2: Chiều cao $h = 12$ cm.',
              'Bước 3: Thể tích lon nước ngọt: $V = \\pi r^2 h = \\pi (3^2) \\cdot 12 = 9 \\cdot 12 \\cdot \\pi = 108\\pi$ cm³.'
            ],
            result: '$V = 108\\pi$ cm³ (khoảng 339,29 ml).'
          }
        ],
        exercises: [
          {
            id: 'exe-31-1',
            type: 'BASIC',
            questionText: 'Tính diện tích xung quanh hình trụ có bán kính đáy r = 5cm và chiều cao h = 10cm theo π.',
            solution: '$S_{xq} = 2\\pi r h = 2\\pi \\cdot 5 \\cdot 10 = 100\\pi$ cm².'
          }
        ],
        interactiveQuestions: [
          {
            id: 'q-31-1',
            chapterId: 'chuong-10',
            lessonId: 'bai-31',
            title: 'Công thức tính thể tích hình trụ có bán kính đáy r và chiều cao h là:',
            type: 'MULTIPLE_CHOICE',
            level: 'NHAN_BIET',
            points: 1,
            options: ['$V = \\pi r^2 h$', '$V = 2\\pi r h$', '$V = \\frac{1}{3}\\pi r^2 h$', '$V = \\frac{4}{3}\\pi r^3$'],
            correctAnswer: '$V = \\pi r^2 h$',
            stepByStepSolution: [
              { title: 'Công thức', content: '$V = S_{\\text{đáy}} \\cdot h = \\pi r^2 h$.' }
            ],
            formulasUsed: ['$V = \\pi r^2 h$']
          }
        ]
      }
    ]
  }
];

export const SPECIAL_TOPICS: SpecialTopic[] = [
  {
    id: 'chuyen-de-1',
    title: 'Chuyên đề 1: Rút gọn biểu thức chứa căn và bài toán phụ',
    description: 'Chiếm 1.5 - 2.0 điểm (Bài I) trong đề thi tuyển sinh vào 10. Gồm các dạng: rút gọn, tính giá trị khi biết x, tìm x để P nhận giá trị nguyên, so sánh P với số k, tìm min/max của P.',
    targetExam: 'Đề thi Tuyển sinh vào Lớp 10 & Kiểm tra Cuối HK I',
    keyMethods: [
      'Xác định đúng ĐKXĐ trước tiên.',
      'Phân tích mẫu thành nhân tử để tìm Mẫu Thức Chung nhỏ nhất.',
      'Quy đồng cẩn thận từng phân thức, cẩn thận dấu trừ trước phân số.',
      'Rút gọn triệt để tử số rồi phân tích tử thành nhân tử để triệt tiêu mẫu.',
      'Dạng $P \\in \\mathbb{Z}$: Thực hiện phép chia đa thức để tách phần nguyên.'
    ],
    sampleProblems: [
      {
        problem: 'Cho $P = \\left(\\frac{\\sqrt{x}}{\\sqrt{x}-2} - \\frac{4}{x - 2\\sqrt{x}}\\right) : \\frac{\\sqrt{x}+2}{\\sqrt{x}}$ với $x > 0, x \\neq 4$. Rút gọn P và tìm x để $P = \\frac{1}{2}$.',
        solution: 'Ta có $x - 2\\sqrt{x} = \\sqrt{x}(\\sqrt{x}-2)$. Quy đồng: $\\frac{x - 4}{\\sqrt{x}(\\sqrt{x}-2)} = \\frac{(\\sqrt{x}-2)(\\sqrt{x}+2)}{\\sqrt{x}(\\sqrt{x}-2)} = \\frac{\\sqrt{x}+2}{\\sqrt{x}}$. Khi đó $P = \\frac{\\sqrt{x}+2}{\\sqrt{x}} : \\frac{\\sqrt{x}+2}{\\sqrt{x}} = 1$. Vì P = 1 với mọi x hợp lệ nên không có giá trị x nào để $P = 1/2$.',
        tips: 'Luôn đối chiếu ĐKXĐ trước khi kết luận.'
      }
    ]
  },
  {
    id: 'chuyen-de-2',
    title: 'Chuyên đề 2: Phương trình bậc hai, Hệ thức Viète và tham số m',
    description: 'Dạng bài then chốt trong mọi kỳ thi vào lớp 10 (1.5 - 2.0 điểm). Yêu cầu tìm m để PT có 2 nghiệm phân biệt thỏa mãn hệ thức đối xứng hoặc không đối xứng.',
    targetExam: 'Đề thi Tuyển sinh vào Lớp 10',
    keyMethods: [
      'Bước 1: Tìm điều kiện để PT có nghiệm: $\\Delta \\ge 0$ (hoặc $\\Delta > 0$ nếu đề yêu cầu 2 nghiệm phân biệt).',
      'Bước 2: Viết hệ thức Viète: $S = x_1 + x_2 = -b/a, P = x_1 x_2 = c/a$.',
      'Bước 3: Biến đổi biểu thức đề bài về S và P hoặc kết hợp với hệ thức Viète tạo hệ phương trình.',
      'Bước 4: Giải tìm tham số m và ĐỐI CHIẾU VỚI ĐIỀU KIỆN DELTA.'
    ],
    sampleProblems: [
      {
        problem: 'Cho phương trình $x^2 - 2(m-1)x + m^2 - 3 = 0$. Tìm m để phương trình có 2 nghiệm phân biệt $x_1, x_2$ thỏa mãn $x_1^2 + x_2^2 = 14$.',
        solution: '$\\Delta\' = (m-1)^2 - (m^2 - 3) = m^2 - 2m + 1 - m^2 + 3 = -2m + 4 > 0 \\iff m < 2$. Theo Viète: $x_1 + x_2 = 2(m-1), x_1 x_2 = m^2 - 3$. Khi đó $x_1^2 + x_2^2 = S^2 - 2P = 4(m-1)^2 - 2(m^2 - 3) = 2m^2 - 8m + 10 = 14 \\iff 2m^2 - 8m - 4 = 0 \\iff m^2 - 4m - 2 = 0 \\implies m = 2 \\pm \\sqrt{6}$. Đối chiếu $m < 2$ ta được $m = 2 - \\sqrt{6}$.',
        tips: 'Phải đối chiếu với điều kiện Delta ở Bước 1!'
      }
    ]
  },
  {
    id: 'chuyen-de-3',
    title: 'Chuyên đề 3: Giải bài toán bằng cách lập hệ phương trình / phương trình',
    description: 'Dạng toán thực tế (2.0 điểm trong đề tuyển sinh): Toán chuyển động đều, năng suất làm chung làm riêng, hình học, phần trăm nồng độ.',
    targetExam: 'Đề thi Tuyển sinh vào Lớp 10',
    keyMethods: [
      'Toán chuyển động: Lập bảng Quãng đường - Vận tốc - Thời gian.',
      'Toán làm chung - làm riêng: Quy ước toàn bộ công việc là 1 đơn vị. 1 ngày làm được $1/x$ công việc.',
      'Toán năng suất: Năng suất thực tế = Năng suất dự định + Phần vượt mức.'
    ],
    sampleProblems: [
      {
        problem: 'Một xe máy đi từ A đến B cách nhau 90km. Sau đó 30 phút, một ô tô đi từ A đuổi theo xe máy với vận tốc lớn hơn xe máy 10km/h và đến B trước xe máy 15 phút. Tính vận tốc mỗi xe.',
        solution: 'Đổi 30 phút = 1/2 h, 15 phút = 1/4 h. Gọi vận tốc xe máy là x (km/h, x > 0). Vận tốc ô tô là x + 10 (km/h). Thời gian xe máy đi: 90/x. Thời gian ô tô đi: 90/(x+10). Ô tô xuất phát sau 1/2h và đến trước 1/4h nên thời gian ô tô ít hơn xe máy là 1/2 + 1/4 = 3/4h. PT: $\\frac{90}{x} - \\frac{90}{x+10} = \\frac{3}{4}$. Giải PT ra $x = 30$. Vận tốc xe máy 30 km/h, ô tô 40 km/h.',
        tips: 'Cẩn thận quy đổi thời gian sang giờ trước khi lập phương trình.'
      }
    ]
  },
  {
    id: 'chuyen-de-4',
    title: 'Chuyên đề 4: Hình học tổng hợp đường tròn và Tứ giác nội tiếp',
    description: 'Chiếm 3.0 - 3.5 điểm trong đề tuyển sinh vào 10. Gồm chứng minh tứ giác nội tiếp, hệ thức đồng dạng, tiếp tuyến và cực trị hình học.',
    targetExam: 'Đề thi Tuyển sinh vào Lớp 10',
    keyMethods: [
      'Câu a: Thường là chứng minh 4 điểm cùng thuộc một đường tròn bằng tổng 2 góc đối = 180° hoặc 2 góc cùng nhìn một cạnh.',
      'Câu b: Chứng minh hệ thức đồng dạng (ví dụ $MA^2 = MB \\cdot MC$) bằng tam giác đồng dạng hoặc phương tích.',
      'Câu c: Chứng minh thẳng hàng, đồng quy, tiếp tuyến hoặc tiếp điểm cố định.'
    ],
    sampleProblems: [
      {
        problem: 'Từ điểm M ngoài (O; R) kẻ 2 tiếp tuyến MA, MB và cát tuyến MCD (C nằm giữa M và D). Chứng minh $MA^2 = MC \\cdot MD$.',
        solution: 'Xét tam giác MAC và tam giác MDA có: góc M chung; $\\widehat{MAC} = \\widehat{MDA}$ (góc tạo bởi tiếp tuyến và dây cung bằng góc nội tiếp cùng chắn cung AC). Do đó $\\triangle MAC \\sim \\triangle MDA$ (g-g) $\\implies \\frac{MA}{MD} = \\frac{MC}{MA} \\implies MA^2 = MC \\cdot MD$ (đpcm).',
        tips: 'Ghi nhớ định lý góc tạo bởi tiếp tuyến và dây cung.'
      }
    ]
  },
  {
    id: 'chuyen-de-5',
    title: 'Chuyên đề 5: Bất đẳng thức Cauchy và tìm Cực trị (GTLN, GTNN)',
    description: 'Câu phân loại điểm 10 (0.5 - 1.0 điểm cuối đề thi vào 10).',
    targetExam: 'Đề thi Tuyển sinh vào Lớp 10 (Câu phân loại điểm 10)',
    keyMethods: [
      'Bất đẳng thức AM-GM (Cauchy): $a + b \\ge 2\\sqrt{ab}$ với $a, b > 0$. Dấu "=" khi $a = b$.',
      'Kỹ thuật chọn điểm rơi: Dự đoán dấu bằng xảy ra tại đâu để tách ghép hệ số cho phù hợp.',
      'Bất đẳng thức Schwarz (Cauchy-Schwarz dạng phân thức): $\\frac{x_1^2}{a_1} + \\frac{x_2^2}{a_2} \\ge \\frac{(x_1 + x_2)^2}{a_1 + a_2}$.'
    ],
    sampleProblems: [
      {
        problem: 'Cho $x > 0$. Tìm giá trị nhỏ nhất của $P = x + \\frac{9}{x}$.',
        solution: 'Vì $x > 0$ nên $\\frac{9}{x} > 0$. Áp dụng BĐT Cauchy cho 2 số dương $x$ và $\\frac{9}{x}$: $P = x + \\frac{9}{x} \\ge 2\\sqrt{x \\cdot \\frac{9}{x}} = 2\\sqrt{9} = 6$. Dấu "=" xảy ra khi $x = \\frac{9}{x} \\iff x^2 = 9 \\implies x = 3$ (thỏa mãn $x > 0$). Vậy GTNN của P là 6 khi x = 3.',
        tips: 'Luôn chỉ ra điều kiện để dấu "=" xảy ra.'
      }
    ]
  }
];
