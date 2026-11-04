import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  Sliders,
  FileText,
  Bot,
  Copy,
  Check,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Layers,
  HelpCircle,
  Clock,
  Printer,
  X,
  Info
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

interface Alloy3DVideoStudioProps {
  onClose?: () => void;
}

interface SceneInfo {
  id: number;
  title: string;
  timeRange: string;
  startSec: number;
  endSec: number;
  dialogue: string;
  cameraDesc: string;
  visualSummary: string;
}

const SCENES: SceneInfo[] = [
  {
    id: 1,
    title: 'Cảnh 1: Mở đầu bài toán',
    timeRange: '0 – 8 giây',
    startSec: 0,
    endSec: 8,
    dialogue: 'Thầy giáo: "Chào các em! Các em có biết làm thế nào để tìm khối lượng đồng và kẽm trong khối hợp kim này mà không cần nấu chảy nó không?"',
    cameraDesc: 'Máy quay điện ảnh lướt chậm (Dolly-in) tiến vào phòng học STEM hiện đại. Thầy giáo cầm khối hợp kim kim loại sáng bóng.',
    visualSummary: 'Khối hợp kim nguyên vẹn 15 cm³ trên bàn thí nghiệm STEM, ánh sáng xanh ngọc cyan phát sáng.',
  },
  {
    id: 2,
    title: 'Cảnh 2: Phân tích dữ liệu',
    timeRange: '8 – 20 giây',
    startSec: 8,
    endSec: 20,
    dialogue: 'Thầy giáo: "Hãy cùng quan sát bảng thông minh: Khối lượng tổng 124g, Thể tích 15cm³, Khối lượng riêng của đồng 8,9 g/cm³, của kẽm là 7 g/cm³."',
    cameraDesc: 'Góc máy xoay nhẹ sang bảng tương tác thông minh phát sáng neon cyan. Các thông số dữ liệu bài toán phóng to rõ nét.',
    visualSummary: 'Bảng tương tác hiển thị 4 dữ kiện: m = 124g, V = 15cm³, D₁ = 8.9 g/cm³, D₂ = 7 g/cm³.',
  },
  {
    id: 3,
    title: 'Cảnh 3: Lập mô hình & Đặt ẩn',
    timeRange: '20 – 35 giây',
    startSec: 20,
    endSec: 35,
    dialogue: 'Học sinh: "Thưa thầy, nếu ta gọi thể tích đồng là x (cm³), thì thể tích kẽm sẽ là 15 trừ x (cm³) đúng không ạ?" - Thầy giáo: "Chính xác, với điều kiện 0 < x < 15!"',
    cameraDesc: 'Cận cảnh khối hợp kim tách đôi bằng dải năng lượng xanh ngọc thành khối Đồng nâu đỏ và Kẽm bạc ánh kim.',
    visualSummary: 'Mô hình tách khối: Đồng (nâu đỏ, x cm³) và Kẽm (bạc ánh kim, 15 - x cm³).',
  },
  {
    id: 4,
    title: 'Cảnh 4: Thiết lập & Giải phương trình',
    timeRange: '35 – 50 giây',
    startSec: 35,
    endSec: 50,
    dialogue: 'Thầy giáo: "Tổng khối lượng bằng 124g, ta có phương trình: 8,9x + 7(15 - x) = 124. Biến đổi: 8,9x + 105 - 7x = 124 => 1,9x = 19 => x = 10!"',
    cameraDesc: 'Camera quay bao quát bàn cân và bảng thông minh. Từng dòng biến đổi phương trình sáng lên từng nhịp toán học.',
    visualSummary: 'Phương trình 8.9x + 7(15 - x) = 124 được giải tuần tự từng bước ra x = 10 cm³.',
  },
  {
    id: 5,
    title: 'Cảnh 5: Kết luận & Chúc mừng',
    timeRange: '50 – 60 giây',
    startSec: 50,
    endSec: 60,
    dialogue: 'Thầy & Trò: "Vậy thể tích đồng là 10 cm³, tương ứng 89g đồng! Thể tích kẽm là 5 cm³, tương ứng 35g kẽm! Toán học thật kỳ diệu và gắn liền với thực tiễn!"',
    cameraDesc: 'Góc máy rộng tràn ngập ánh sáng vàng - ngọc bích, pháo hoa rực rỡ, thầy giáo và học sinh cùng giơ ngón tay cái tán thưởng (thumbs-up).',
    visualSummary: 'Kết quả: 89g Đồng & 35g Kẽm (89 + 35 = 124g). Biểu tượng Thumbs-up và chúc mừng!',
  },
];

export const Alloy3DVideoStudio: React.FC<Alloy3DVideoStudioProps> = ({ onClose }) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'video' | 'sandbox' | 'storyboard' | 'prompts' | 'solutions'>('video');

  // Video playback states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0); // 0 to 60 seconds
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [muted, setLocalMuted] = useState<boolean>(isMuted());
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Sandbox interactive states
  const [sandboxVolumeX, setSandboxVolumeX] = useState<number>(10); // default to 10 cm3

  // Three.js containers
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const reqAnimRef = useRef<number | null>(null);

  // 3D Objects references
  const alloyGroupRef = useRef<THREE.Group | null>(null);
  const copperMeshRef = useRef<THREE.Mesh | null>(null);
  const zincMeshRef = useRef<THREE.Mesh | null>(null);
  const splitEffectRef = useRef<THREE.Group | null>(null);
  const teacherGroupRef = useRef<THREE.Group | null>(null);
  const teacherMouthRef = useRef<THREE.Mesh | null>(null);
  const studentGroupRef = useRef<THREE.Group | null>(null);
  const studentThumbsRef = useRef<THREE.Group | null>(null);
  const smartboardRef = useRef<THREE.Group | null>(null);
  const scaleDisplayRef = useRef<THREE.Mesh | null>(null);
  const cylinderWaterRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  // Determine current scene index based on currentTime
  const currentSceneIndex = useMemo(() => {
    if (currentTime < 8) return 0;
    if (currentTime < 20) return 1;
    if (currentTime < 35) return 2;
    if (currentTime < 50) return 3;
    return 4;
  }, [currentTime]);

  const currentScene = SCENES[currentSceneIndex];

  // Speech synthesis for Vietnamese voiceover
  const speakCurrentScene = (sceneIdx: number) => {
    if (muted || typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const scene = SCENES[sceneIdx];
    const utterance = new SpeechSynthesisUtterance(scene.dialogue.replace(/Thầy giáo:|Học sinh:|Thầy & Trò:/g, ''));
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.includes('vi') || v.lang.includes('VN'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synth error
    }
  };

  // Video loop timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.1 * playbackSpeed;
          if (next >= 60) {
            setIsPlaying(false);
            return 60;
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  // Track scene changes for sound and narration
  const lastSceneRef = useRef<number>(-1);
  useEffect(() => {
    if (isPlaying && currentSceneIndex !== lastSceneRef.current) {
      lastSceneRef.current = currentSceneIndex;
      playWhooshSound();
      speakCurrentScene(currentSceneIndex);

      if (currentSceneIndex === 4) {
        playVictorySound();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#14b8a6', '#f59e0b', '#ffffff'],
        });
      }
    }
  }, [currentSceneIndex, isPlaying]);

  // Init and render Three.js STEM Lab
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06111e); // Deep cinematic STEM navy
    scene.fog = new THREE.FogExp2(0x06111e, 0.05);

    // CAMERA
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7.5);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING: Cinematic Teal / Cyan / White Scheme
    const ambientLight = new THREE.AmbientLight(0x0e2a3a, 2.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(4, 7, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 4, 15);
    cyanPointLight.position.set(0, 3, 1.5);
    scene.add(cyanPointLight);

    const tealRimLight = new THREE.PointLight(0x14b8a6, 2.5, 12);
    tealRimLight.position.set(-4, 2, -2);
    scene.add(tealRimLight);

    const copperWarmLight = new THREE.PointLight(0xf97316, 2.0, 8);
    copperWarmLight.position.set(2, 1.5, 1);
    scene.add(copperWarmLight);

    // 1. LAB BENCH / TABLE
    const tableGeo = new THREE.BoxGeometry(9, 0.3, 4);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(0, -0.15, 0);
    table.receiveShadow = true;
    scene.add(table);

    // Table glowing cyan trim line
    const trimGeo = new THREE.BoxGeometry(9.05, 0.05, 4.05);
    const trimMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.set(0, -0.02, 0);
    scene.add(trim);

    // Floor Grid
    const grid = new THREE.GridHelper(20, 20, 0x06b6d4, 0x1e293b);
    grid.position.set(0, -1.8, 0);
    scene.add(grid);

    // 2. HOLOGRAPHIC SMARTBOARD (Background)
    const boardGroup = new THREE.Group();
    smartboardRef.current = boardGroup;
    boardGroup.position.set(0, 2.6, -1.8);

    // Board Frame
    const frameGeo = new THREE.BoxGeometry(5.6, 2.8, 0.1);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x083344,
      emissiveIntensity: 0.5,
    });
    const boardFrame = new THREE.Mesh(frameGeo, frameMat);
    boardGroup.add(boardFrame);

    // Board Screen
    const screenGeo = new THREE.PlaneGeometry(5.4, 2.6);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x082f49,
      transparent: true,
      opacity: 0.9,
    });
    const boardScreen = new THREE.Mesh(screenGeo, screenMat);
    boardScreen.position.z = 0.06;
    boardGroup.add(boardScreen);

    // Glowing Neon Border for Smartboard
    const borderEdges = new THREE.EdgesGeometry(screenGeo);
    const borderLine = new THREE.LineSegments(
      borderEdges,
      new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 })
    );
    borderLine.position.z = 0.07;
    boardGroup.add(borderLine);
    scene.add(boardGroup);

    // 3. DIGITAL PRECISION BALANCE (Cân điện tử)
    const scaleGroup = new THREE.Group();
    scaleGroup.position.set(0, 0.1, 0.2);

    const scaleBaseGeo = new THREE.BoxGeometry(2.4, 0.25, 2.0);
    const scaleBaseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.6,
      roughness: 0.3,
    });
    const scaleBase = new THREE.Mesh(scaleBaseGeo, scaleBaseMat);
    scaleGroup.add(scaleBase);

    // Stainless Pan
    const panGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.05, 32);
    const panMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });
    const pan = new THREE.Mesh(panGeo, panMat);
    pan.position.set(0, 0.15, 0);
    scaleGroup.add(pan);

    // Scale Display Screen
    const dispGeo = new THREE.PlaneGeometry(0.8, 0.25);
    const dispMat = new THREE.MeshBasicMaterial({ color: 0x047857 });
    const dispMesh = new THREE.Mesh(dispGeo, dispMat);
    dispMesh.position.set(0, 0.05, 1.01);
    scaleDisplayRef.current = dispMesh;
    scaleGroup.add(dispMesh);
    scene.add(scaleGroup);

    // 4. GRADUATED CYLINDER (Ống đong thể tích 15 cm3)
    const cylGroup = new THREE.Group();
    cylGroup.position.set(2.4, 0.8, -0.2);

    // Glass cylinder body
    const glassGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.6, 24, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 0.6,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    cylGroup.add(glassMesh);

    // Cylinder base
    const cylBaseGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 24);
    const cylBaseMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
    const cylBase = new THREE.Mesh(cylBaseGeo, cylBaseMat);
    cylBase.position.y = -0.8;
    cylGroup.add(cylBase);

    // Water level inside
    const waterGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.9, 24);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.y = -0.3;
    cylinderWaterRef.current = waterMesh;
    cylGroup.add(waterMesh);
    scene.add(cylGroup);

    // 5. ALLOY BLOCKS GROUP (Unified vs Split)
    const alloyGroup = new THREE.Group();
    alloyGroupRef.current = alloyGroup;
    alloyGroup.position.set(0, 0.6, 0.2);

    // COPPER BLOCK (Reddish Brown / Polished Copper)
    const copperGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb85d19, // Authentic polished copper
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x451a03,
      emissiveIntensity: 0.2,
    });
    const copperMesh = new THREE.Mesh(copperGeo, copperMat);
    copperMesh.castShadow = true;
    copperMeshRef.current = copperMesh;
    alloyGroup.add(copperMesh);

    // ZINC BLOCK (Bright Silvery Gray)
    const zincGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const zincMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // Radiant metallic zinc
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x1e293b,
      emissiveIntensity: 0.2,
    });
    const zincMesh = new THREE.Mesh(zincGeo, zincMat);
    zincMesh.castShadow = true;
    zincMeshRef.current = zincMesh;
    alloyGroup.add(zincMesh);

    // Split Energy Ring / Glowing Aura
    const splitEffGroup = new THREE.Group();
    splitEffectRef.current = splitEffGroup;
    const ringGeo = new THREE.TorusGeometry(0.7, 0.02, 16, 40);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    splitEffGroup.add(ring1);
    alloyGroup.add(splitEffGroup);

    scene.add(alloyGroup);

    // 6. 3D STYLIZED CHARACTERS
    // A. Teacher Character (Left side, polite STEM attire)
    const teacherGroup = new THREE.Group();
    teacherGroupRef.current = teacherGroup;
    teacherGroup.position.set(-2.2, 0.4, 0.5);
    teacherGroup.rotation.y = 0.45;

    // Teacher Head
    const tHeadGeo = new THREE.SphereGeometry(0.28, 20, 20);
    const tSkinMat = new THREE.MeshStandardMaterial({ color: 0xfbd38d, roughness: 0.5 });
    const tHead = new THREE.Mesh(tHeadGeo, tSkinMat);
    tHead.position.set(0, 1.6, 0);
    teacherGroup.add(tHead);

    // Teacher Hair
    const tHairGeo = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const tHairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const tHair = new THREE.Mesh(tHairGeo, tHairMat);
    tHair.position.set(0, 1.65, -0.02);
    teacherGroup.add(tHair);

    // Teacher Glasses Frame
    const tGlassesGeo = new THREE.TorusGeometry(0.09, 0.015, 8, 16);
    const tGlassesMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const tGlassL = new THREE.Mesh(tGlassesGeo, tGlassesMat);
    tGlassL.position.set(-0.1, 1.62, 0.26);
    teacherGroup.add(tGlassL);
    const tGlassR = new THREE.Mesh(tGlassesGeo, tGlassesMat);
    tGlassR.position.set(0.1, 1.62, 0.26);
    teacherGroup.add(tGlassR);

    // Teacher Animated Mouth (for talking effect)
    const tMouthGeo = new THREE.BoxGeometry(0.08, 0.02, 0.02);
    const tMouthMat = new THREE.MeshBasicMaterial({ color: 0x991b1b });
    const tMouth = new THREE.Mesh(tMouthGeo, tMouthMat);
    tMouth.position.set(0, 1.48, 0.27);
    teacherMouthRef.current = tMouth;
    teacherGroup.add(tMouth);

    // Teacher Torso (Smart Blazer)
    const tTorsoGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.8, 16);
    const tBlazerMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.6 }); // STEM Teal blazer
    const tTorso = new THREE.Mesh(tTorsoGeo, tBlazerMat);
    tTorso.position.set(0, 1.05, 0);
    teacherGroup.add(tTorso);

    // Teacher Necktie
    const tTieGeo = new THREE.BoxGeometry(0.05, 0.35, 0.03);
    const tTieMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const tTie = new THREE.Mesh(tTieGeo, tTieMat);
    tTie.position.set(0, 1.1, 0.24);
    teacherGroup.add(tTie);
    scene.add(teacherGroup);

    // B. Student Character (Right side, Grade 9 uniform)
    const studentGroup = new THREE.Group();
    studentGroupRef.current = studentGroup;
    studentGroup.position.set(2.2, 0.3, 0.6);
    studentGroup.rotation.y = -0.45;

    // Student Head
    const sHeadGeo = new THREE.SphereGeometry(0.25, 20, 20);
    const sSkinMat = new THREE.MeshStandardMaterial({ color: 0xfed7aa, roughness: 0.5 });
    const sHead = new THREE.Mesh(sHeadGeo, sSkinMat);
    sHead.position.set(0, 1.45, 0);
    studentGroup.add(sHead);

    // Student Hair
    const sHairGeo = new THREE.SphereGeometry(0.27, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const sHairMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
    const sHair = new THREE.Mesh(sHairGeo, sHairMat);
    sHair.position.set(0, 1.5, 0);
    studentGroup.add(sHair);

    // Student Uniform Shirt & Vest
    const sTorsoGeo = new THREE.CylinderGeometry(0.2, 0.23, 0.7, 16);
    const sUniformMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.6 }); // Royal blue uniform vest
    const sTorso = new THREE.Mesh(sTorsoGeo, sUniformMat);
    sTorso.position.set(0, 0.95, 0);
    studentGroup.add(sTorso);

    // Student Thumbs Up Arms (Visible during Scene 5 celebration)
    const thumbsGroup = new THREE.Group();
    studentThumbsRef.current = thumbsGroup;
    const thumbArmGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.35);
    const thumbArmMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8 });
    const tArmL = new THREE.Mesh(thumbArmGeo, thumbArmMat);
    tArmL.position.set(-0.25, 1.15, 0.2);
    tArmL.rotation.z = 0.6;
    thumbsGroup.add(tArmL);
    const tArmR = new THREE.Mesh(thumbArmGeo, thumbArmMat);
    tArmR.position.set(0.25, 1.15, 0.2);
    tArmR.rotation.z = -0.6;
    thumbsGroup.add(tArmR);

    // Gold Glowing Thumbs
    const thumbHandGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const thumbHandMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const tHandL = new THREE.Mesh(thumbHandGeo, thumbHandMat);
    tHandL.position.set(-0.35, 1.35, 0.25);
    thumbsGroup.add(tHandL);
    const tHandR = new THREE.Mesh(thumbHandGeo, thumbHandMat);
    tHandR.position.set(0.35, 1.35, 0.25);
    thumbsGroup.add(tHandR);
    thumbsGroup.visible = false;
    studentGroup.add(thumbsGroup);
    scene.add(studentGroup);

    // 7. VOLUMETRIC FLOATING PARTICLES (Cyan / Teal)
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 12;
      particlePos[i + 1] = Math.random() * 5 - 0.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // ANIMATION LOOP
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Floating particles motion
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsed * 0.02;
      }

      // Voiceover mouth speaking animation
      if (teacherMouthRef.current) {
        if (isPlaying && (currentSceneIndex === 0 || currentSceneIndex === 1 || currentSceneIndex === 3)) {
          teacherMouthRef.current.scale.y = 1 + Math.sin(elapsed * 15) * 1.5;
        } else {
          teacherMouthRef.current.scale.y = 1;
        }
      }

      // Gentle breathing idle movement for characters
      if (teacherGroupRef.current) {
        teacherGroupRef.current.position.y = 0.4 + Math.sin(elapsed * 2) * 0.02;
      }
      if (studentGroupRef.current) {
        studentGroupRef.current.position.y = 0.3 + Math.sin(elapsed * 2.2 + 1) * 0.02;
      }

      // SCENE-SPECIFIC 3D PRESENTATION
      if (activeTab === 'sandbox') {
        // SANDBOX MODE: Dynamic sizing based on sandboxVolumeX
        const xVol = sandboxVolumeX;
        const yVol = Math.max(0.1, 15 - xVol);
        // Scale proportionally to cube root of volume
        const copperScale = Math.cbrt(xVol / 10);
        const zincScale = Math.cbrt(yVol / 5);

        if (copperMeshRef.current && zincMeshRef.current && alloyGroupRef.current) {
          copperMeshRef.current.visible = true;
          zincMeshRef.current.visible = true;
          copperMeshRef.current.position.set(-0.7, 0, 0);
          zincMeshRef.current.position.set(0.7, 0, 0);

          copperMeshRef.current.scale.set(copperScale, copperScale, copperScale);
          zincMeshRef.current.scale.set(zincScale, zincScale, zincScale);

          copperMeshRef.current.rotation.y = elapsed * 0.5;
          zincMeshRef.current.rotation.y = elapsed * 0.5;
        }

        if (cameraRef.current) {
          cameraRef.current.position.lerp(new THREE.Vector3(0, 2.2, 5.2), 0.05);
          cameraRef.current.lookAt(0, 0.8, 0);
        }
      } else {
        // CINEMATIC VIDEO MODE: Timeline-driven transitions
        const t = currentTime;

        if (copperMeshRef.current && zincMeshRef.current && splitEffectRef.current && cameraRef.current) {
          if (t < 20) {
            // SCENE 1 & 2: Unified alloy block
            copperMeshRef.current.position.set(0, 0, 0);
            zincMeshRef.current.position.set(0, 0, 0);
            copperMeshRef.current.scale.set(1, 1, 1);
            zincMeshRef.current.scale.set(0.98, 0.98, 0.98); // inside/intertwined
            splitEffectRef.current.visible = false;

            if (alloyGroupRef.current) {
              alloyGroupRef.current.rotation.y = elapsed * 0.4;
              alloyGroupRef.current.position.y = 0.6 + Math.sin(elapsed * 2) * 0.05;
            }

            if (t < 8) {
              // Scene 1: Camera Dolly-in
              const factor = t / 8;
              cameraRef.current.position.set(0, 2.8 - factor * 0.4, 7.8 - factor * 1.5);
              cameraRef.current.lookAt(0, 0.9, 0);
            } else {
              // Scene 2: Pan to Smartboard
              const factor = (t - 8) / 12;
              cameraRef.current.position.set(-0.6 * factor, 2.4, 6.3 - factor * 0.5);
              cameraRef.current.lookAt(-0.3 * factor, 1.4, -0.5);
            }
          } else if (t < 35) {
            // SCENE 3: Splitting into Copper and Zinc
            const splitProgress = Math.min(1, (t - 20) / 4); // 4 seconds separation
            copperMeshRef.current.position.set(-0.75 * splitProgress, 0, 0);
            zincMeshRef.current.position.set(0.75 * splitProgress, 0, 0);

            copperMeshRef.current.scale.set(1, 1, 1);
            zincMeshRef.current.scale.set(0.85, 0.85, 0.85);

            splitEffectRef.current.visible = true;
            splitEffectRef.current.rotation.z = elapsed * 3;

            cameraRef.current.position.lerp(new THREE.Vector3(0, 1.9, 4.3), 0.05);
            cameraRef.current.lookAt(0, 0.6, 0.2);
          } else if (t < 50) {
            // SCENE 4: Equation Solving side-by-side
            copperMeshRef.current.position.set(-0.8, 0, 0);
            zincMeshRef.current.position.set(0.8, 0, 0);
            splitEffectRef.current.visible = false;

            cameraRef.current.position.lerp(new THREE.Vector3(0, 2.3, 5.5), 0.05);
            cameraRef.current.lookAt(0, 1.2, -0.5);
          } else {
            // SCENE 5: Celebration & Thumbs-up
            copperMeshRef.current.position.set(-0.9, 0.1 * Math.sin(elapsed * 3), 0);
            zincMeshRef.current.position.set(0.9, 0.1 * Math.cos(elapsed * 3), 0);

            if (studentThumbsRef.current) {
              studentThumbsRef.current.visible = true;
            }

            cameraRef.current.position.lerp(new THREE.Vector3(0, 2.6, 7.2), 0.05);
            cameraRef.current.lookAt(0, 1.0, 0);
          }
        }
      }

      renderer.render(scene, camera);
      reqAnimRef.current = requestAnimationFrame(animate);
    };

    reqAnimRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [activeTab, currentTime, currentSceneIndex, isPlaying, sandboxVolumeX]);

  // Video Controls handlers
  const handlePlayPause = () => {
    if (currentTime >= 60) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    speakCurrentScene(0);
  };

  const handleSeek = (newSec: number) => {
    setCurrentTime(Math.min(60, Math.max(0, newSec)));
  };

  const handleSelectScene = (scene: SceneInfo) => {
    setCurrentTime(scene.startSec);
    setIsPlaying(true);
    speakCurrentScene(scene.id - 1);
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    setLocalMuted(nextMuted);
    setMuted(nextMuted);
    if (nextMuted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  // Sandbox Live Calculations
  const copperMass = useMemo(() => {
    return +(sandboxVolumeX * 8.9).toFixed(2);
  }, [sandboxVolumeX]);

  const zincVolume = useMemo(() => {
    return +(15 - sandboxVolumeX).toFixed(2);
  }, [sandboxVolumeX]);

  const zincMass = useMemo(() => {
    return +(zincVolume * 7).toFixed(2);
  }, [zincVolume]);

  const totalCalculatedMass = useMemo(() => {
    return +(copperMass + zincMass).toFixed(2);
  }, [copperMass, zincMass]);

  const massDelta = useMemo(() => {
    return +(totalCalculatedMass - 124).toFixed(2);
  }, [totalCalculatedMass]);

  const isCorrectSandbox = Math.abs(sandboxVolumeX - 10) < 0.05;

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen pb-16">
      {/* Top Header Bar */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 py-4 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Phim Hoạt Hình 3D STEM: Bài Toán Hợp Kim Đồng và Kẽm
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-cyan-950 text-cyan-300 border border-cyan-800">
                Toán 9 GDPT 2018
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Đạo diễn & Biên tập Sư phạm: <strong className="text-cyan-400">Teacher Lê Thanh Tùng</strong> • 60 Giây Điện Ảnh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Đóng</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Phim Hoạt hình 3D (60s)</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'sandbox'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Phòng Thí nghiệm Tương tác (Sandbox)</span>
          </button>

          <button
            onClick={() => setActiveTab('storyboard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'storyboard'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Kịch bản Đạo diễn 5 Cảnh</span>
          </button>

          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'prompts'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Bộ Prompts AI Video (Sora, Runway, Kling)</span>
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shrink-0 ${
              activeTab === 'solutions'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Lời giải chi tiết & Phương pháp mở rộng</span>
          </button>
        </div>
      </div>

      {/* Main Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* TAB 1: CINEMATIC 3D VIDEO PLAYER */}
        {activeTab === 'video' && (
          <div className="space-y-6">
            
            {/* 16:9 Video Player Screen */}
            <div
              ref={videoContainerRef}
              className="relative w-full aspect-video max-h-[620px] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 flex flex-col justify-between"
            >
              {/* Three.js Canvas Container */}
              <div ref={mountRef} className="absolute inset-0 z-0 w-full h-full" />

              {/* Top Video HUD Info */}
              <div className="relative z-10 p-4 sm:p-6 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent flex items-start justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>{currentScene.title} ({currentScene.timeRange})</span>
                  </div>
                  <h2 className="text-sm sm:text-lg font-bold text-white drop-shadow-md">
                    {currentScene.visualSummary}
                  </h2>
                </div>

                {/* Floating Mathematical Data Badges */}
                <div className="hidden md:flex flex-col items-end gap-1.5 text-xs">
                  <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-cyan-200 font-mono shadow-sm">
                    Khối lượng: <span className="font-bold text-cyan-400">124 g</span>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-cyan-500/40 text-cyan-200 font-mono shadow-sm">
                    Thể tích: <span className="font-bold text-cyan-400">15 cm³</span>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-amber-500/40 text-amber-200 font-mono shadow-sm">
                    Đồng: <span className="font-bold text-amber-400">8,9 g/cm³</span> | Kẽm: <span className="font-bold text-slate-300">7 g/cm³</span>
                  </div>
                </div>
              </div>

              {/* Subtitles Overlay */}
              {subtitlesEnabled && (
                <div className="relative z-10 px-4 sm:px-12 py-3 text-center">
                  <div className="inline-block max-w-3xl px-4 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 text-white text-xs sm:text-base font-medium shadow-xl">
                    <p className="leading-relaxed text-cyan-100">{currentScene.dialogue}</p>
                  </div>
                </div>
              )}

              {/* Bottom Video Controls Bar */}
              <div className="relative z-10 p-3 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-2">
                
                {/* Timeline Scrubber */}
                <div className="relative group">
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => handleSeek(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                  />
                  {/* Scene Marks on Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none flex justify-between px-1">
                    <span className="w-1 h-2 bg-cyan-500/50 rounded-sm" style={{ left: '0%' }} title="Cảnh 1" />
                    <span className="w-1 h-2 bg-cyan-500/50 rounded-sm" style={{ left: '13.3%' }} title="Cảnh 2 (8s)" />
                    <span className="w-1 h-2 bg-cyan-500/50 rounded-sm" style={{ left: '33.3%' }} title="Cảnh 3 (20s)" />
                    <span className="w-1 h-2 bg-cyan-500/50 rounded-sm" style={{ left: '58.3%' }} title="Cảnh 4 (35s)" />
                    <span className="w-1 h-2 bg-cyan-500/50 rounded-sm" style={{ left: '83.3%' }} title="Cảnh 5 (50s)" />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 sm:gap-4">
                    {/* Play / Pause */}
                    <button
                      onClick={handlePlayPause}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-cyan-500/30 transition cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>

                    {/* Restart */}
                    <button
                      onClick={handleRestart}
                      title="Xem lại từ đầu"
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Time Counter */}
                    <div className="font-mono text-cyan-300 font-bold text-xs sm:text-sm">
                      {Math.floor(currentTime).toString().padStart(2, '0')}:
                      {Math.floor((currentTime % 1) * 10).toString().padStart(1, '0')}s / 60:0s
                    </div>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg p-1 border border-slate-700/60">
                      {[1, 1.25, 1.5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                            playbackSpeed === spd ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Subtitles Toggle */}
                    <button
                      onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                        subtitlesEnabled ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      CC
                    </button>

                    {/* Audio Mute */}
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                    </button>

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Scene Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {SCENES.map((scene, idx) => {
                const isActive = currentSceneIndex === idx;
                return (
                  <button
                    key={scene.id}
                    onClick={() => handleSelectScene(scene)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      isActive
                        ? 'bg-cyan-950/70 border-cyan-500 shadow-md shadow-cyan-950 text-white'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>Cảnh {scene.id}</span>
                      <span className="font-mono text-slate-400">{scene.timeRange}</span>
                    </div>
                    <div className="font-extrabold text-xs line-clamp-1">{scene.title.split(': ')[1]}</div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">{scene.visualSummary}</p>
                  </button>
                );
              })}
            </div>

            {/* Problem Statement Card */}
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Info className="w-4 h-4" />
                <span>Đề bài chính xác (Giữ nguyên dữ kiện toán học):</span>
              </div>
              <blockquote className="p-4 rounded-xl bg-slate-950/80 border-l-4 border-cyan-500 text-slate-200 text-sm sm:text-base italic leading-relaxed">
                “Một vật có khối lượng 124 g và thể tích 15 cm³ là hợp kim của đồng và kẽm. Tính xem trong đó có bao nhiêu gam đồng và bao nhiêu gam kẽm, biết rằng 1 cm³ đồng nặng 8,9 g và 1 cm³ kẽm nặng 7 g.”
              </blockquote>
            </div>

          </div>
        )}

        {/* TAB 2: INTERACTIVE STEM SANDBOX */}
        {activeTab === 'sandbox' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: 3D Lab Simulation */}
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative min-h-[380px] flex flex-col justify-between p-4">
                <div ref={mountRef} className="absolute inset-0 w-full h-full" />
                
                {/* Sandbox Floating HUD */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Mô hình 3D khối Đồng & Kẽm tỉ lệ thực</span>
                  </div>

                  {isCorrectSandbox ? (
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-black animate-bounce flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ĐẠT CHUẨN: 124g!</span>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-medium">
                      Lệch: {massDelta > 0 ? `+${massDelta}` : massDelta} g
                    </div>
                  )}
                </div>

                {/* Bottom 3D Labels */}
                <div className="relative z-10 flex justify-around text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-amber-500/40 text-amber-300">
                    <div className="font-bold">Đồng (Cu)</div>
                    <div>{sandboxVolumeX.toFixed(1)} cm³ ({copperMass} g)</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-400/40 text-slate-200">
                    <div className="font-bold">Kẽm (Zn)</div>
                    <div>{zincVolume.toFixed(1)} cm³ ({zincMass} g)</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Sliders & Live Physics Balance */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-cyan-400" />
                      <span>Thí nghiệm kéo trượt Thể tích Đồng (x)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Kéo thanh trượt để thay đổi thể tích đồng từ 0 đến 15 cm³. Quan sát khối lượng trên cân điện tử!
                    </p>
                  </div>

                  {/* Volume X Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-amber-400">Thể tích đồng (x):</span>
                      <span className="font-mono text-sm font-black text-cyan-300 bg-slate-800 px-2.5 py-0.5 rounded-md">
                        {sandboxVolumeX.toFixed(1)} cm³
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      step={0.5}
                      value={sandboxVolumeX}
                      onChange={(e) => setSandboxVolumeX(parseFloat(e.target.value))}
                      className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>0 cm³ (Toàn kẽm: 105g)</span>
                      <span className="text-cyan-400 font-bold">10 cm³ (Đáp án)</span>
                      <span>15 cm³ (Toàn đồng: 133.5g)</span>
                    </div>
                  </div>

                  {/* Quick Value Presets */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-slate-400">Thử nhanh:</span>
                    {[5, 8, 10, 12].map((val) => (
                      <button
                        key={val}
                        onClick={() => {
                          setSandboxVolumeX(val);
                          if (val === 10) {
                            playCorrectSound();
                            confetti({ particleCount: 40 });
                          } else {
                            playTickSound();
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          sandboxVolumeX === val
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {val} cm³ {val === 10 && '★'}
                      </button>
                    ))}
                  </div>

                  {/* Real-time Math & Balance Output */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>Chỉ số Cân Điện Tử:</span>
                      <span
                        className={`font-mono text-lg font-black px-3 py-1 rounded-lg ${
                          isCorrectSandbox
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500 shadow-md shadow-emerald-900/50'
                            : 'bg-slate-900 text-cyan-300 border border-cyan-800'
                        }`}
                      >
                        {totalCalculatedMass} g
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-300 pt-2 border-t border-slate-800">
                      <div className="flex justify-between">
                        <span>Khối lượng Đồng: <MathView formula={`m_1 = 8,9 \\times ${sandboxVolumeX.toFixed(1)}`} /></span>
                        <span className="font-mono text-amber-400">{copperMass} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Khối lượng Kẽm: <MathView formula={`m_2 = 7 \\times (15 - ${sandboxVolumeX.toFixed(1)})`} /></span>
                        <span className="font-mono text-slate-300">{zincMass} g</span>
                      </div>
                      <div className="flex justify-between font-bold pt-1 border-t border-slate-800/80">
                        <span>Tổng khối lượng:</span>
                        <span className="font-mono text-cyan-300">{copperMass} + {zincMass} = {totalCalculatedMass} g</span>
                      </div>
                    </div>

                    {isCorrectSandbox && (
                      <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-600 text-emerald-200 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Xuất sắc! Khối lượng đúng bằng 124g!</span>
                        </div>
                        <p className="text-[11px] text-emerald-300">
                          Tại <MathView formula="x = 10\\text{ cm}^3" />, khối lượng đồng là <strong className="text-white">89g</strong> và kẽm là <strong className="text-white">35g</strong>.
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DIRECTOR'S STORYBOARD (5 SCENES DETAILED) */}
        {activeTab === 'storyboard' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span>Kịch Bản Phân Cảnh Chi Tiết – Đạo Diễn & Sư Phạm (Teacher Lê Thanh Tùng)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Thiết kế theo chuẩn định dạng phân cảnh điện ảnh 3D, kết hợp phương pháp dạy học giải quyết vấn đề môn Toán 9.
              </p>
            </div>

            <div className="space-y-4">
              {SCENES.map((scene) => (
                <div
                  key={scene.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-black text-sm flex items-center justify-center">
                        {scene.id}
                      </span>
                      <div>
                        <h3 className="font-extrabold text-base text-white">{scene.title}</h3>
                        <span className="text-xs font-mono text-cyan-400">Thời lượng: {scene.timeRange}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('video');
                        handleSelectScene(scene);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Xem Cảnh Này</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5">
                      <span className="font-bold text-cyan-300 block">🎬 Góc máy & Bối cảnh:</span>
                      <p className="text-slate-300 leading-relaxed">{scene.cameraDesc}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1.5">
                      <span className="font-bold text-amber-300 block">💬 Lời thoại & Khẩu hình (Lip-sync):</span>
                      <p className="text-slate-200 italic leading-relaxed">{scene.dialogue}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs flex items-center gap-2 text-slate-400">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Hiệu ứng thị giác:</strong> {scene.visualSummary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: AI VIDEO GENERATOR PROMPTS (SORA, RUNWAY, KLING) */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-400" />
                <span>Bộ Prompts Tạo Video Hoạt Hình 3D Chuẩn Cho Các Mô Hình AI</span>
              </h2>
              <p className="text-xs text-slate-400">
                Bộ prompts đã được chuẩn hóa ánh sáng teal/cyan, phong cách điện ảnh 3D Pixar/DreamWorks, chuyển động mượt mà, sẵn sàng sao chép và tạo video trên Sora, Runway Gen-3 Alpha, Kling AI, Luma Dream Machine.
              </p>
            </div>

            {/* Prompt Cards */}
            <div className="space-y-4">
              
              {/* Prompt 1: Full 60s Master Prompt */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-800">
                      MASTER PROMPT (Toàn bộ 60s)
                    </span>
                    <span className="text-xs text-slate-400">Dành cho Sora / Runway Gen-3</span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyPrompt(
                        'master',
                        `Cinematic 3D animation, Pixar-style educational video, 16:9 ratio. Modern futuristic STEM classroom with glowing teal, cyan, and white volumetric lighting. A polite young teacher and an eager 9th-grade student interact around a shiny metallic alloy cube. The alloy cube splits smoothly into a reddish-brown copper block and a lustrous silver zinc block. Floating holographic smartboard displays glowing math formulas: 8.9x + 7(15 - x) = 124 leading to x = 10. Natural Vietnamese voiceover and expressions, reflections on metal surfaces, energetic thumbs-up celebration with golden confetti chimes, 4K crisp render, Octane render quality.`
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedPromptId === 'master' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPromptId === 'master' ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-200 leading-relaxed overflow-x-auto">
                  Cinematic 3D animation, Pixar-style educational video, 16:9 ratio. Modern futuristic STEM classroom with glowing teal, cyan, and white volumetric lighting. A polite young teacher and an eager 9th-grade student interact around a shiny metallic alloy cube. The alloy cube splits smoothly into a reddish-brown copper block and a lustrous silver zinc block. Floating holographic smartboard displays glowing math formulas: 8.9x + 7(15 - x) = 124 leading to x = 10. Natural Vietnamese voiceover and expressions, reflections on metal surfaces, energetic thumbs-up celebration with golden confetti chimes, 4K crisp render, Octane render quality.
                </div>
              </div>

              {/* Prompt 2: Vietnamese Text Prompt for Kling / Hailuo */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-teal-950 text-teal-300 text-xs font-bold border border-teal-800">
                      PROMPT TIẾNG VIỆT (Kling AI 1.5 / Luma)
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyPrompt(
                        'vi_prompt',
                        `Video hoạt hình 3D điện ảnh giáo dục môn Toán 9, tỉ lệ 16:9. Phòng học STEM hiện đại với tông màu xanh ngọc teal, cyan và ánh sáng trắng. Hai nhân vật 3D dễ thương gồm một giáo viên trẻ lịch sự và một học sinh lớp 9 mặc đồng phục. Trên bàn thí nghiệm có khối hợp kim sáng bóng nặng 124g, thể tích 15cm³. Khối kim loại tách ra làm đôi: khối đồng màu nâu đỏ và khối kẽm màu bạc ánh kim. Bảng thông minh phát sáng công thức toán: 8,9x + 7(15 - x) = 124 => x = 10. Giáo viên và học sinh mỉm cười giơ ngón tay cái chúc mừng, ánh sáng lung linh rực rỡ.`
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedPromptId === 'vi_prompt' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPromptId === 'vi_prompt' ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                  Video hoạt hình 3D điện ảnh giáo dục môn Toán 9, tỉ lệ 16:9. Phòng học STEM hiện đại với tông màu xanh ngọc teal, cyan và ánh sáng trắng. Hai nhân vật 3D dễ thương gồm một giáo viên trẻ lịch sự và một học sinh lớp 9 mặc đồng phục. Trên bàn thí nghiệm có khối hợp kim sáng bóng nặng 124g, thể tích 15cm³. Khối kim loại tách ra làm đôi: khối đồng màu nâu đỏ và khối kẽm màu bạc ánh kim. Bảng thông minh phát sáng công thức toán: 8,9x + 7(15 - x) = 124 =&gt; x = 10. Giáo viên và học sinh mỉm cười giơ ngón tay cái chúc mừng, ánh sáng lung linh rực rỡ.
                </div>
              </div>

              {/* Prompt 3: Technical Parameters */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-white">⚙️ Thông số kỹ thuật khuyến nghị (Render Settings)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                    <span className="text-slate-400 block">Tỉ lệ khung hình:</span>
                    <strong className="text-cyan-400 text-sm">16:9 (Landscape)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                    <span className="text-slate-400 block">Độ phân giải:</span>
                    <strong className="text-cyan-400 text-sm">1080p / 4K UHD</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                    <span className="text-slate-400 block">Tốc độ khung hình:</span>
                    <strong className="text-cyan-400 text-sm">24fps / 30fps Cinema</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                    <span className="text-slate-400 block">Màu sắc chủ đạo:</span>
                    <strong className="text-cyan-400 text-sm">Teal, Cyan, White</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: SOLUTIONS & EXTENDED METHODS */}
        {activeTab === 'solutions' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Phương Pháp Giải Chuẩn Sư Phạm Môn Toán Lớp 9</span>
              </h2>
              <p className="text-xs text-slate-400">
                Trình bày chuẩn mẫu bài thi vào lớp 10 theo 2 phương pháp: Phương trình 1 ẩn & Hệ phương trình 2 ẩn.
              </p>
            </div>

            {/* Method 1: Single Variable Equation */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-black text-base text-cyan-300">
                  Cách 1: Giải bài toán bằng cách lập phương trình (1 ẩn số)
                </h3>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Trọng tâm SGK
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong>Bước 1: Chọn ẩn và đặt điều kiện:</strong>
                </p>
                <div className="pl-4 border-l-2 border-cyan-500/50 space-y-1">
                  <p>Gọi thể tích của đồng trong hợp kim là <MathView formula="x\text{ (cm}^3\text{)}" />.</p>
                  <p>Điều kiện của ẩn: <MathView formula="0 < x < 15" />.</p>
                  <p>Khi đó, thể tích của kẽm trong hợp kim là <MathView formula="15 - x\text{ (cm}^3\text{)}" />.</p>
                </div>

                <p>
                  <strong>Bước 2: Biểu diễn các đại lượng theo ẩn:</strong>
                </p>
                <div className="pl-4 border-l-2 border-cyan-500/50 space-y-1">
                  <p>Vì 1 cm³ đồng nặng 8,9 g nên khối lượng của đồng là: <MathView formula="8,9x\text{ (g)}" />.</p>
                  <p>Vì 1 cm³ kẽm nặng 7 g nên khối lượng của kẽm là: <MathView formula="7(15 - x)\text{ (g)}" />.</p>
                </div>

                <p>
                  <strong>Bước 3: Lập phương trình và giải:</strong>
                </p>
                <div className="pl-4 border-l-2 border-cyan-500/50 space-y-2">
                  <p>Do tổng khối lượng của vật hợp kim là 124 g, ta có phương trình:</p>
                  <div className="p-3 rounded-xl bg-slate-950 font-mono text-center text-cyan-300">
                    <MathView formula="8,9x + 7(15 - x) = 124" block />
                  </div>
                  <p>Khai triển và thu gọn:</p>
                  <div className="p-3 rounded-xl bg-slate-950 text-center space-y-1">
                    <MathView formula="8,9x + 105 - 7x = 124" block />
                    <MathView formula="1,9x = 124 - 105" block />
                    <MathView formula="1,9x = 19" block />
                    <MathView formula="x = 10\text{ (thỏa mãn điều kiện)}" block />
                  </div>
                </div>

                <p>
                  <strong>Bước 4: Kết luận:</strong>
                </p>
                <div className="pl-4 border-l-2 border-emerald-500 space-y-1 text-emerald-300 font-medium">
                  <p>Thể tích của đồng là <MathView formula="10\text{ cm}^3" />, khối lượng đồng là: <MathView formula="10 \times 8,9 = 89\text{ (g)}" />.</p>
                  <p>Thể tích của kẽm là <MathView formula="15 - 10 = 5\text{ cm}^3" />, khối lượng kẽm là: <MathView formula="5 \times 7 = 35\text{ (g)}" /> (hoặc <MathView formula="124 - 89 = 35\text{ (g)}" />).</p>
                </div>
              </div>
            </div>

            {/* Method 2: System of 2 Linear Equations */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-black text-base text-teal-300">
                  Cách 2: Giải bài toán bằng cách lập hệ hai phương trình bậc nhất hai ẩn
                </h3>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-950 text-teal-400 border border-teal-800">
                  Chương I - Toán 9
                </span>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>Gọi thể tích của đồng là <MathView formula="x\text{ (cm}^3\text{)}" />, thể tích của kẽm là <MathView formula="y\text{ (cm}^3\text{)}" /> (Điều kiện: <MathView formula="0 < x, y < 15" />).</p>
                <p>Theo đề bài ta có hệ phương trình:</p>
                <div className="p-4 rounded-xl bg-slate-950 text-center">
                  <MathView
                    formula={`\\begin{cases} x + y = 15 \\\\ 8,9x + 7y = 124 \\end{cases}`}
                    block
                  />
                </div>
                <p>Nhân hai vế của phương trình thứ nhất với 7:</p>
                <div className="p-4 rounded-xl bg-slate-950 text-center">
                  <MathView
                    formula={`\\begin{cases} 7x + 7y = 105 \\\\ 8,9x + 7y = 124 \\end{cases} \\Rightarrow 1,9x = 19 \\Rightarrow x = 10`}
                    block
                  />
                </div>
                <p>Thay <MathView formula="x = 10" /> vào phương trình thứ nhất: <MathView formula="10 + y = 15 \\Rightarrow y = 5" /> (thỏa mãn điều kiện).</p>
                <p className="font-bold text-cyan-300">
                  Đáp số: Khối lượng đồng là 89 g; khối lượng kẽm là 35 g.
                </p>
              </div>
            </div>

            {/* Print / Export Button */}
            <div className="flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>In Tài Liệu Bài Giải</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
