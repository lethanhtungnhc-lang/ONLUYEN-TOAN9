import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Zap,
  Flame,
  Award,
  ChevronRight,
  Shield,
  HelpCircle,
  ArrowLeft,
  Star
} from 'lucide-react';
import { MathView } from './MathView';
import {
  playCorrectSound,
  playWrongSound,
  playTickSound,
  playVictorySound,
  playWhooshSound,
  isMuted,
  setMuted
} from '../utils/audio';

export type GameId = 
  | 'OBSTACLE_RUNNER'
  | 'MATH_RESCUE'
  | 'LUCKY_WHEEL'
  | 'SPEED_RACING'
  | 'SIXTY_SECONDS'
  | 'CHAMPION_ARENA'
  | 'TREASURE_HUNT'
  | 'MATH_BATTLE';

interface GameDef {
  id: GameId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

const GAMES_LIST: GameDef[] = [
  {
    id: 'OBSTACLE_RUNNER',
    title: '1. Vượt chướng ngại vật Toán học',
    subtitle: '3D Math Gate Runner',
    description: 'Điều khiển nhân vật 3D chạy trên đường băng không gian, chọn đúng cổng đáp án toán học để vượt chướng ngại vật.',
    icon: '🏃',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'MATH_RESCUE',
    title: '2. Giải cứu nhân vật bằng kiến thức Toán',
    subtitle: '3D Rescue Quest',
    description: 'Giải các bài toán trọng tâm để vô hiệu hóa lồng năng lượng khối đa diện và giải cứu linh vật Toán 9.',
    icon: '🦸',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'LUCKY_WHEEL',
    title: '3. Vòng quay may mắn Toán học',
    subtitle: '3D Wheel of Fortune',
    description: 'Quay vòng quay 3D với quán tính chân thực, thử tài ở các ô chủ đề Căn thức, Viète, Tứ giác nội tiếp và nhân đôi điểm.',
    icon: '🎡',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'SPEED_RACING',
    title: '4. Đường đua trí tuệ 3D',
    subtitle: 'Math Speed Racer',
    description: 'Điều khiển xe đua thể thao 3D vượt cung đường cong. Giải toán tốc độ để kích hoạt Turbo Nitro cực đại!',
    icon: '🏎️',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'SIXTY_SECONDS',
    title: '5. Thử thách 60 giây Toán học',
    subtitle: '60-Second Blitz Arena',
    description: 'Đồng hồ đếm ngược 60 giây! Phản xạ giải toán siêu tốc để ghi chuỗi combo điểm số cao nhất.',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-600',
  },
  {
    id: 'CHAMPION_ARENA',
    title: '6. Ai là nhà vô địch Toán học?',
    subtitle: 'Championship Tournament',
    description: 'Thi đấu loại trực tiếp 3 vòng: Tứ kết, Bán kết và Chung kết tại đấu trường La Mã 3D để giành Cúp Vàng.',
    icon: '🏆',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'TREASURE_HUNT',
    title: '7. Khám phá kho báu kiến thức',
    subtitle: 'Geometric Treasure Vault',
    description: 'Mở 5 hòm kho báu hình khối (Lập phương, Bát diện, Tứ diện...) bằng các định lý toán học 9 để nhận báu vật tri thức.',
    icon: '💎',
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 'MATH_BATTLE',
    title: '8. Đấu trường Toán học 3D',
    subtitle: 'Boss Math Battle',
    description: 'Trận chiến 1v1 với Chúa tể Biệt thức Delta. Mỗi câu giải đúng sẽ tung chiêu thức năng lượng trừ máu Boss!',
    icon: '⚔️',
    color: 'from-indigo-600 to-purple-700',
  },
];

interface GameQuestion {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const MATH_GAME_QUESTIONS: GameQuestion[] = [
  {
    question: 'Biệt thức $\\Delta$ của phương trình $x^2 - 6x + 8 = 0$ bằng bao nhiêu?',
    options: ['4', '8', '-4', '36'],
    correct: '4',
    explanation: '$\\Delta = b^2 - 4ac = (-6)^2 - 4(1)(8) = 36 - 32 = 4 > 0$.',
  },
  {
    question: 'Hằng đẳng thức nào sau đây đúng với mọi biểu thức đại số A?',
    options: ['$\\sqrt{A^2} = |A|$', '$\\sqrt{A^2} = A$', '$\\sqrt{A^2} = -A$', '$\\sqrt{A^2} = A^2$'],
    correct: '$\\sqrt{A^2} = |A|$',
    explanation: 'Theo SGK Toán 9 KNTT, $\\sqrt{A^2} = |A|$ (bắt buộc dùng dấu giá trị tuyệt đối).',
  },
  {
    question: 'Theo định lí Viète, tổng hai nghiệm $x_1 + x_2$ của $2x^2 - 10x + 7 = 0$ bằng:',
    options: ['5', '-5', '3.5', '10'],
    correct: '5',
    explanation: '$x_1 + x_2 = -\\frac{b}{a} = -\\frac{-10}{2} = 5$.',
  },
  {
    question: 'Góc nội tiếp chắn nửa đường tròn có số đo bằng bao nhiêu độ?',
    options: ['$90^\\circ$', '$60^\\circ$', '$180^\\circ$', '$45^\\circ$'],
    correct: '$90^\\circ$',
    explanation: 'Định lý SGK: Góc nội tiếp chắn nửa đường tròn là góc vuông ($90^\\circ$).',
  },
  {
    question: 'Điều kiện để phương trình $x^2 - 2x + m = 0$ có nghiệm là:',
    options: ['$m \\le 1$', '$m < 1$', '$m \\ge 1$', '$m = 1$'],
    correct: '$m \\le 1$',
    explanation: '$\\Delta\' = (-1)^2 - 1(m) = 1 - m \\ge 0 \\iff m \\le 1$.',
  },
  {
    question: 'Trong tam giác vuông có hai cạnh góc vuông là 6cm và 8cm, độ dài đường cao ứng với cạnh huyền là:',
    options: ['4.8 cm', '5 cm', '10 cm', '2.4 cm'],
    correct: '4.8 cm',
    explanation: 'Cạnh huyền $a = \\sqrt{6^2+8^2} = 10$cm. Đường cao $h = \\frac{b \\cdot c}{a} = \\frac{6 \\cdot 8}{10} = 4.8$cm.',
  },
  {
    question: 'Thể tích hình trụ có bán kính đáy $r = 2$cm và chiều cao $h = 5$cm bằng:',
    options: ['$20\\pi$ cm³', '$10\\pi$ cm³', '$40\\pi$ cm³', '$50\\pi$ cm³'],
    correct: '$20\\pi$ cm³',
    explanation: '$V = \\pi r^2 h = \\pi (2^2) \\cdot 5 = 20\\pi$ cm³.',
  },
  {
    question: 'Tứ giác ABCD nội tiếp đường tròn khi thỏa mãn điều kiện nào?',
    options: ['$\\widehat{A} + \\widehat{C} = 180^\\circ$', '$\\widehat{A} + \\widehat{B} = 180^\\circ$', '$\\widehat{A} = \\widehat{C}$', '$AB = CD$'],
    correct: '$\\widehat{A} + \\widehat{C} = 180^\\circ$',
    explanation: 'Dấu hiệu nhận biết: Tứ giác có tổng hai góc đối bằng $180^\\circ$ là tứ giác nội tiếp.',
  },
];

export const MathGames3D: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [muted, setMutedState] = useState<boolean>(isMuted());
  const [difficulty, setDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('MEDIUM');
  
  // Game Play State
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [bossHp, setBossHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  // High scores in localStorage
  const [highScores, setHighScores] = useState<Record<string, number>>(() => {
    try {
      const s = localStorage.getItem('toan9_game_highscores');
      return s ? JSON.parse(s) : { OBSTACLE_RUNNER: 450, MATH_BATTLE: 800, SIXTY_SECONDS: 360 };
    } catch {
      return {};
    }
  });

  const toggleAudio = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
  };

  const startPlaying = (gameId: GameId) => {
    setActiveGame(gameId);
    setQIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(gameId === 'SIXTY_SECONDS' ? 60 : 90);
    setBossHp(100);
    setPlayerHp(100);
    setIsGameOver(false);
    setFeedback(null);
    playWhooshSound();
  };

  const handleAnswer = (chosen: string) => {
    if (feedback || isGameOver) return;
    const currentQ = MATH_GAME_QUESTIONS[qIndex % MATH_GAME_QUESTIONS.length];
    const isCorrect = chosen.trim() === currentQ.correct.trim();

    if (isCorrect) {
      playCorrectSound();
      const points = difficulty === 'HARD' ? 150 : difficulty === 'MEDIUM' ? 100 : 70;
      const bonus = streak * 20;
      const newScore = score + points + bonus;
      setScore(newScore);
      setStreak(s => s + 1);

      if (activeGame === 'MATH_BATTLE') {
        setBossHp(hp => Math.max(0, hp - 25));
      }

      setFeedback({
        isCorrect: true,
        explanation: currentQ.explanation,
      });

      // Update high scores
      if (activeGame) {
        setHighScores(prev => {
          const prevHigh = prev[activeGame] || 0;
          if (newScore > prevHigh) {
            const updated = { ...prev, [activeGame]: newScore };
            try { localStorage.setItem('toan9_game_highscores', JSON.stringify(updated)); } catch(e){}
            return updated;
          }
          return prev;
        });
      }
    } else {
      playWrongSound();
      setStreak(0);
      if (activeGame === 'MATH_BATTLE') {
        setPlayerHp(hp => Math.max(0, hp - 20));
      }
      setFeedback({
        isCorrect: false,
        explanation: currentQ.explanation,
      });
    }
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    if (activeGame === 'MATH_BATTLE' && bossHp <= 0) {
      setIsGameOver(true);
      playVictorySound();
      return;
    }
    if (qIndex >= 7) {
      setIsGameOver(true);
      playVictorySound();
      return;
    }
    setQIndex(idx => idx + 1);
  };

  // Timer loop for time-based games
  useEffect(() => {
    if (!activeGame || isGameOver || feedback) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          playVictorySound();
          return 0;
        }
        if (t <= 10) {
          playTickSound();
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeGame, isGameOver, feedback]);

  // Three.js 3D Canvas Mounting
  const canvasMountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeGame || !canvasMountRef.current) return;

    const container = canvasMountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.FogExp2(0x0f172a, 0.035);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 3, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    dirLight.position.set(5, 12, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 20);
    pointLight.position.set(-4, 4, 2);
    scene.add(pointLight);

    // 3D Scene Subject Based On Game
    const subjectGroup = new THREE.Group();
    scene.add(subjectGroup);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x3b82f6, 0x1e293b);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    if (activeGame === 'OBSTACLE_RUNNER' || activeGame === 'SPEED_RACING') {
      // 3D Vehicle / Runner Model
      const bodyGeo = new THREE.BoxGeometry(1.2, 0.5, 2.2);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.8, roughness: 0.2 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.25;
      subjectGroup.add(body);

      const cabinGeo = new THREE.BoxGeometry(0.8, 0.4, 1.0);
      const cabinMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 });
      const cabin = new THREE.Mesh(cabinGeo, cabinMat);
      cabin.position.set(0, 0.6, -0.2);
      subjectGroup.add(cabin);

      // 4 Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
      [[-0.65, 0.3, 0.7], [0.65, 0.3, 0.7], [-0.65, 0.3, -0.7], [0.65, 0.3, -0.7]].forEach(pos => {
        const w = new THREE.Mesh(wheelGeo, wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(pos[0], pos[1], pos[2]);
        subjectGroup.add(w);
      });
    } else if (activeGame === 'LUCKY_WHEEL') {
      // 3D Wheel
      const wheelGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.3, 32);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.3 });
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.y = 1.5;
      subjectGroup.add(wheel);

      // Central Hub
      const hubGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const hubMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.9, roughness: 0.1 });
      const hub = new THREE.Mesh(hubGeo, hubMat);
      hub.position.set(0, 1.5, 0.25);
      subjectGroup.add(hub);
    } else {
      // Sacred Math Polyhedra (Dodecahedron & Icosahedron with floating energy rings)
      const polyGeo = new THREE.DodecahedronGeometry(1.2, 0);
      const polyMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.7, roughness: 0.2 });
      const poly = new THREE.Mesh(polyGeo, polyMat);
      poly.position.y = 1.2;
      subjectGroup.add(poly);

      const ringGeo = new THREE.TorusGeometry(2.0, 0.08, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, metalness: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 1.2;
      ring.rotation.x = Math.PI / 3;
      subjectGroup.add(ring);
    }

    // Animation loop
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (subjectGroup) {
        if (activeGame === 'LUCKY_WHEEL') {
          subjectGroup.children[0]?.rotateZ(delta * 2.5);
        } else {
          subjectGroup.rotation.y += delta * 0.8;
          subjectGroup.position.y = Math.sin(elapsed * 2) * 0.15;
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeGame]);

  const currentQ = MATH_GAME_QUESTIONS[qIndex % MATH_GAME_QUESTIONS.length];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 mb-2">
            <Gamepad2 className="w-3.5 h-3.5" /> Khu Vực Ôn Tập & Đấu Trường Toán Học 3D
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Trò Chơi Trí Tuệ & Ôn Luyện Toán 9
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Trải nghiệm đồ họa 3D tương tác, âm thanh chân thực, thi đấu xếp hạng và củng cố kiến thức Chương trình GDPT 2018.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              !muted
                ? 'bg-blue-50 dark:bg-blue-950 border-blue-300 text-blue-600 dark:text-blue-400'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500'
            }`}
          >
            {!muted ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span>{!muted ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}</span>
          </button>

          {/* Difficulty selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['EASY', 'MEDIUM', 'HARD'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  difficulty === d
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {d === 'EASY' ? 'Dễ' : d === 'MEDIUM' ? 'Vừa' : 'Khó'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GAME RUNNER MODAL / IN-GAME VIEW */}
      {activeGame && (
        <div className="rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl overflow-hidden space-y-4 p-6 relative">
          
          {/* Header in-game */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <button
              onClick={() => setActiveGame(null)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách trò chơi
            </button>

            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1 text-amber-400">
                <Flame className="w-4 h-4" /> Combo: x{streak}
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <Clock className="w-4 h-4" /> {timeLeft}s
              </span>
              <span className="flex items-center gap-1 text-emerald-400 text-sm font-black">
                <Award className="w-4 h-4" /> {score} điểm
              </span>
            </div>
          </div>

          {/* 3D WebGL Canvas Container */}
          <div
            ref={canvasMountRef}
            className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden relative shadow-inner bg-slate-950"
          >
            {/* Health bars if Math Battle */}
            {activeGame === 'MATH_BATTLE' && (
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-xs z-10 font-bold">
                <div className="space-y-1">
                  <div className="text-emerald-400">Người chơi: {playerHp}%</div>
                  <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${playerHp}%` }} />
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-rose-400">Chúa tể Delta: {bossHp}%</div>
                  <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden ml-auto">
                    <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${bossHp}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Current Question & Choices */}
          {!isGameOver ? (
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-sky-400 uppercase tracking-wider">
                  Thử thách số {qIndex + 1}
                </span>
                <span>Cấp độ: {difficulty}</span>
              </div>

              <div className="text-base sm:text-lg font-bold text-white">
                <MathView>{currentQ.question}</MathView>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  return (
                    <button
                      key={i}
                      disabled={!!feedback}
                      onClick={() => handleAnswer(opt)}
                      className="p-3.5 rounded-xl border border-slate-700 hover:border-blue-400 bg-slate-900/60 text-left text-xs sm:text-sm font-semibold transition flex items-center gap-3 cursor-pointer hover:bg-blue-600/20 active:scale-98"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-sky-400 font-black text-xs flex items-center justify-center shrink-0">
                        {letter}
                      </span>
                      <span className="flex-1">
                        <MathView>{opt}</MathView>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Popup */}
              {feedback && (
                <div className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-150 ${
                  feedback.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500 text-rose-200'
                }`}>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                    <span>{feedback.isCorrect ? 'Tuyệt vời! Bạn đã chọn chính xác.' : 'Chưa đúng rồi! Hãy xem lời giải chi tiết dưới đây.'}</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <MathView>{feedback.explanation}</MathView>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    Tiếp tục thử thách →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-center space-y-4 border border-indigo-800">
              <Trophy className="w-14 h-14 text-amber-400 mx-auto animate-bounce" />
              <h2 className="text-2xl font-black">HOÀN THÀNH THỬ THÁCH 3D!</h2>
              <div className="text-4xl font-extrabold text-amber-300">
                {score} <span className="text-lg font-normal text-slate-400">điểm</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Bạn đã hoàn thành xuất sắc màn chơi. Kỷ lục của bạn đã được ghi nhận vào Bảng vinh danh Toán 9!
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => startPlaying(activeGame)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                >
                  Chơi lại màn này
                </button>
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  Chọn trò chơi khác
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 8 GAMES CATALOG */}
      {!activeGame && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GAMES_LIST.map((game) => {
            const best = highScores[game.id] || 0;
            return (
              <div
                key={game.id}
                className="flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all p-6 group"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Kỷ lục: {best}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400">
                    {game.subtitle}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug mt-0.5">
                    {game.title}
                  </h3>
                </div>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">
                  {game.description}
                </p>

                <button
                  onClick={() => startPlaying(game.id)}
                  className="mt-4 w-full py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 group-hover:scale-102"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Bắt đầu chơi 3D</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
