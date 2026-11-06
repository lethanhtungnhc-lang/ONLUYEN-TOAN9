import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  File,
  Layers,
  GraduationCap,
  HardDrive
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { UploadedDocument } from '../types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploaded?: (doc: UploadedDocument) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onUploaded,
}) => {
  const { addDocument } = useApp();
  const { currentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<UploadedDocument['category']>('EXAM_PAPER');
  const [assignedClass, setAssignedClass] = useState('Toàn khối 9');
  const [note, setNote] = useState('');

  // Selected file state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');
  const [fileSizeStr, setFileSizeStr] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileSizeStr(formatFileSize(file.size));
    if (!title.trim()) {
      // Auto-fill title from filename
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setTitle(cleanName);
    }

    // Read file as base64 dataUrl for client download & preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setFileSizeStr(formatFileSize(file.size));
    if (!title.trim()) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileDataUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tên tài liệu hoặc đề thi.');
      return;
    }
    if (!selectedFile) {
      setErrorMsg('Vui lòng chọn hoặc kéo thả tệp tài liệu cần tải lên.');
      return;
    }

    setIsUploading(true);
    setErrorMsg('');

    try {
      const docPayload = {
        title: title.trim(),
        category,
        fileName: selectedFile.name,
        fileSize: fileSizeStr || '1.0 MB',
        fileType: selectedFile.type || 'application/octet-stream',
        dataUrl: fileDataUrl,
        uploadedBy: currentUser?.name || 'Giáo viên',
        assignedClass,
        note: note.trim(),
      };

      // 1. Add to local state via AppContext
      addDocument(docPayload);

      // 2. Try posting to full-stack server
      try {
        await fetch('/api/upload-document', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(docPayload),
        });
      } catch (err) {
        console.log('Server upload optional fallback', err);
      }

      alert('Đã tải lên tài liệu / đề kiểm tra thành công!');
      if (onUploaded) onUploaded({ ...docPayload, id: `doc-${Date.now()}`, uploadedAt: new Date().toISOString().split('T')[0] });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi tải lên tài liệu.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 p-5 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-[11px] font-bold backdrop-blur-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>Kho Tài Liệu & Đề Thi Môn Toán 9</span>
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Tải Lên Tài Liệu & Đề Kiểm Tra
            </h3>
            <p className="text-xs text-blue-100">
              Hỗ trợ file Word (.docx), PDF (.pdf), Excel (.xlsx), Text (.txt), Hình ảnh đề
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Drag & Drop File Zone */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Chọn tệp tài liệu / đề kiểm tra:
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="p-5 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-800 hover:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-center cursor-pointer transition space-y-2"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.xlsx,.xls,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-10 h-10 mx-auto rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {selectedFile ? selectedFile.name : 'Nhấn để chọn tệp hoặc kéo thả tệp vào đây'}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {selectedFile ? `Dung lượng: ${fileSizeStr}` : 'PDF, DOCX, XLSX, TXT (Tối đa 25MB)'}
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Tên tài liệu / đề thi: <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Đề kiểm tra Cuối Học kỳ I Toán 9 (Chuẩn CV 7991)"
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Thể loại tài liệu:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as UploadedDocument['category'])}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="EXAM_PAPER">Đề kiểm tra định kỳ (CV 7991)</option>
                <option value="MATRIX_SPEC">Ma trận & Bản đặc tả</option>
                <option value="REVIEW_TOPIC">Chuyên đề ôn tập vào 10</option>
                <option value="SYLLABUS">Đề cương ôn tập học kỳ</option>
                <option value="LESSON_PLAN">Giáo án & Bài giảng Toán 9</option>
              </select>
            </div>

            {/* Assigned Class */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Lớp áp dụng:
              </label>
              <select
                value={assignedClass}
                onChange={(e) => setAssignedClass(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Toàn khối 9">Toàn khối 9 (Trường Nguyễn Hữu Cảnh)</option>
                <option value="Lớp 9A1">Lớp 9A1 (Chuyên đề Nâng cao)</option>
                <option value="Lớp 9A2">Lớp 9A2 (Chuẩn kiến thức)</option>
                <option value="Lớp 9A3">Lớp 9A3 (Bồi dưỡng vào 10)</option>
                <option value="Lớp 9A4">Lớp 9A4 (Luyện thi cơ bản)</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Ghi chú của Giáo viên:
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú về cấu trúc đề, thời gian nộp bài hoặc yêu cầu ôn tập..."
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'Đang tải lên...' : 'Lưu Tài Liệu / Đề Thi'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
