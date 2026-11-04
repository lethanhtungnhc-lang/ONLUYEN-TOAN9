import React from 'react';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors py-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-400 bg-clip-text text-transparent">
                TOÁN 9 – CHINH PHỤC TRI THỨC
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ứng dụng học tập, luyện thi và hỗ trợ giảng dạy môn Toán 9.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium border border-blue-100 dark:border-blue-900/50">
              <ShieldCheck className="w-3.5 h-3.5" /> Chuẩn GDPT 2018
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-100 dark:border-emerald-900/50">
              <Sparkles className="w-3.5 h-3.5" /> KaTeX Math Engine
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-medium border border-purple-100 dark:border-purple-900/50">
              PWA Cài đặt tức thì
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              © Bản quyền nội dung: Teacher Lê Thanh Tùng
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Ứng dụng được xây dựng phục vụ mục đích học tập và hỗ trợ giảng dạy môn Toán 9.
            </p>
            <p className="text-[11px] text-blue-600 dark:text-blue-400">
              Liên hệ tác giả & Hỗ trợ chuyên môn: <a href="mailto:lethanhtungnhc@gmail.com" className="hover:underline font-semibold">lethanhtungnhc@gmail.com</a>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Kiến tạo với tâm huyết giáo dục</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>cho học sinh & quý Thầy Cô THCS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
