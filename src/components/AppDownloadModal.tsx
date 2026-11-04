import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Download,
  Share2,
  PlusSquare,
  CheckCircle2,
  Laptop,
  Apple,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Copy,
  ExternalLink
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'AUTO' | 'IOS' | 'ANDROID' | 'DESKTOP'>(
    isIOS ? 'IOS' : 'ANDROID'
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with decorative gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 p-5 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold backdrop-blur-xs">
              <Smartphone className="w-3.5 h-3.5" /> Ứng Dụng Di Động Thông Minh (PWA)
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Tải & Cài Đặt TOÁN 9 – Chinh Phục Tri Thức
            </h3>
            <p className="text-xs text-blue-100">
              Hoạt động mượt mà trên iPhone, Samsung, Xiaomi, Oppo, iPad, Laptop
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('ANDROID')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'ANDROID'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-500" /> Android
          </button>

          <button
            onClick={() => setActiveTab('IOS')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'IOS'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Apple className="w-4 h-4 text-slate-800 dark:text-white" /> iPhone / iPad
          </button>

          <button
            onClick={() => setActiveTab('DESKTOP')}
            className={`flex-1 py-3 text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'DESKTOP'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Laptop className="w-4 h-4 text-indigo-500" /> Máy tính PC / Mac
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 dark:text-slate-300">
          
          {/* Quick Install Button if browser supports 1-click */}
          {isInstallable && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 justify-center sm:justify-start">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Trình duyệt đã sẵn sàng cài đặt!
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Nhấn nút để thêm ngay vào màn hình chính chỉ trong 1 giây.
                </div>
              </div>
              <button
                onClick={() => {
                  install();
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer transition shrink-0"
              >
                <Download className="w-4 h-4" /> Cài Đặt Ngay
              </button>
            </div>
          )}

          {/* TAB: ANDROID */}
          {activeTab === 'ANDROID' && (
            <div className="space-y-3.5">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-black">
                  1
                </span>
                Hướng dẫn cài đặt trên các dòng điện thoại Android
              </div>
              <p className="text-slate-500 text-[11px]">
                Áp dụng cho mọi hãng điện thoại: Samsung Galaxy, Xiaomi / Redmi, Oppo, Realme, Vivo, Google Pixel, Huawei, v.v.
              </p>

              <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <p>Mở trang web trong trình duyệt <strong>Google Chrome</strong> hoặc <strong>Cốc Cốc</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <p>Nhấn vào biểu tượng <strong>Menu 3 dấu chấm (⋮)</strong> ở góc trên bên phải màn hình.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <p>Chọn mục <strong>"Cài đặt ứng dụng"</strong> hoặc <strong>"Thêm vào Màn hình chính"</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    4
                  </span>
                  <p>Nhấn xác nhận <strong>"Cài đặt"</strong>. Biểu tượng ứng dụng Toán 9 sẽ xuất hiện ngay ngoài màn hình điện thoại!</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: IOS */}
          {activeTab === 'IOS' && (
            <div className="space-y-3.5">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-black">
                  🍎
                </span>
                Hướng dẫn cài đặt trên iPhone và iPad
              </div>
              <p className="text-slate-500 text-[11px]">
                Apple hỗ trợ cài đặt ứng dụng Web App trực tiếp từ trình duyệt Safari không cần tài khoản App Store.
              </p>

              <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <p>Mở liên kết ứng dụng bằng trình duyệt mặc định <strong>Safari</strong> trên iPhone / iPad.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    Nhấn vào nút <strong>Chia sẻ</strong> <Share2 className="w-3.5 h-3.5 text-blue-600 inline" /> (hình vuông có mũi tên chỉ lên ở thanh công cụ dưới đáy Safari).
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="flex items-center gap-1.5 flex-wrap">
                    Cuộn danh sách xuống và chọn <strong>"Thêm vào MH chính" (Add to Home Screen)</strong> <PlusSquare className="w-3.5 h-3.5 text-blue-600 inline" />.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    4
                  </span>
                  <p>Nhấn nút <strong>"Thêm" (Add)</strong> ở góc trên bên phải để hoàn tất cài đặt.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DESKTOP */}
          {activeTab === 'DESKTOP' && (
            <div className="space-y-3.5">
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center font-black">
                  💻
                </span>
                Cài đặt trên Máy tính Windows, MacOS hoặc Chromebook
              </div>

              <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    1
                  </span>
                  <p>Mở ứng dụng trên trình duyệt <strong>Google Chrome</strong> hoặc <strong>Microsoft Edge</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    2
                  </span>
                  <p>Nhìn vào góc phải thanh địa chỉ URL, nhấp vào biểu tượng <strong>Cài đặt ứng dụng</strong> (màn hình máy tính có mũi tên tải xuống).</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                    3
                  </span>
                  <p>Nhấn <strong>"Cài đặt"</strong> để tạo lối tắt riêng trên Desktop và thanh Taskbar / Dock.</p>
                </div>
              </div>
            </div>
          )}

          {/* Advantages of PWA */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-1.5">
            <div className="font-bold text-[11px] text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Ưu điểm vượt trội khi cài App:
            </div>
            <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-blue-800/90 dark:text-blue-300/90">
              <li>Mở trực tiếp từ màn hình chính, không cần nhập lại địa chỉ web.</li>
              <li>Toàn màn hình không bị che bởi thanh công cụ trình duyệt.</li>
              <li>Dung lượng siêu nhẹ (chưa tới 5MB), không chiếm bộ nhớ điện thoại.</li>
              <li>Hỗ trợ lưu bài học và làm bài tập mượt mà ngay cả khi mạng chập chờn.</li>
            </ul>
          </div>

          {/* Copy link share */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-500">Chia sẻ link cài đặt cho bạn bè:</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã sao chép link
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Sao chép link App
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
