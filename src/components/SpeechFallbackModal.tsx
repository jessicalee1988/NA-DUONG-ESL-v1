import React from 'react';
import { VolumeX, X, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { useSpeech } from '../context/SpeechContext';

export const SpeechFallbackModal: React.FC = () => {
  const { errorMessage, clearError, isSupported } = useSpeech();

  if (!errorMessage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-200 text-[#0F4C3A]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="speech-error-title"
      >
        <button
          onClick={clearError}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0F4C3A] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-[#BE185D] shrink-0">
            <VolumeX className="w-6 h-6 text-[#BE185D]" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#BE185D]">
              Thông báo phát âm (Text-to-Speech)
            </div>
            <h3 id="speech-error-title" className="text-lg font-bold text-[#0F4C3A]">
              Không thể phát âm thanh
            </h3>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-700 mb-4">
          {errorMessage}
        </p>

        <div className="bg-[#FDF2F8] rounded-2xl p-4 border border-[#BE185D]/30 mb-6 text-xs text-[#0F4C3A] space-y-2">
          <div className="font-semibold flex items-center gap-1.5 text-xs text-[#BE185D]">
            <AlertCircle className="w-4 h-4 text-[#BE185D] shrink-0" />
            <span>Gợi ý khắc phục:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
            <li>Sử dụng trình duyệt <strong>Google Chrome</strong> hoặc <strong>Microsoft Edge</strong> trên máy tính hoặc điện thoại.</li>
            <li>Kiểm tra âm lượng thiết bị hoặc tai nghe đã được bật.</li>
            <li>Đảm bảo đã tải gói giọng đọc tiếng Anh (English - US) trong cài đặt Text-to-Speech của hệ điều hành (Windows/macOS/Android/iOS).</li>
          </ul>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={clearError}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F4C3A] hover:bg-[#166534] text-white font-medium text-xs sm:text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            Đã hiểu, quay lại học
          </button>
        </div>
      </div>
    </div>
  );
};
