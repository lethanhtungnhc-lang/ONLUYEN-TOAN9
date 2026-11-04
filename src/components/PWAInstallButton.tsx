import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {isInstallable && (
        <button
          onClick={install}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
          title="Cài đặt ứng dụng trên thiết bị"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Cài đặt App</span>
          <span className="sm:hidden">Cài App</span>
        </button>
      )}

      {!isInstallable && isIOS && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
          title="Cài đặt trên iPhone/iPad"
        >
          <Smartphone className="w-4 h-4" />
          <span>Cài trên iOS</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-blue-600" /> Cài đặt trên iPhone / iPad
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">1</span>
                <p>Nhấn vào biểu tượng <strong>Chia sẻ (Share)</strong> ở thanh dưới cùng của Safari.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">2</span>
                <p>Cuộn xuống và chọn <strong>Thêm vào MH chính (Add to Home Screen)</strong>.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">3</span>
                <p>Nhấn <strong>Thêm (Add)</strong> ở góc trên bên phải để hoàn tất.</p>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Ứng dụng chạy toàn màn hình mượt mà như app gốc!</span>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 py-2.5 text-sm font-semibold transition"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
};
