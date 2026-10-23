import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X, Check, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ className?: string; compact?: boolean }> = ({ 
  className = '',
  compact = false
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already installed or running in standalone mode, do not display install buttons
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      try {
        await install();
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  // If neither standard installable nor iOS, return null
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
          isInstallable
            ? 'bg-[#BE185D] hover:bg-[#9D174D] text-white'
            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
        } ${className}`}
        title={isIOS ? 'Hướng dẫn cài đặt trên iPhone/iPad' : 'Cài đặt ứng dụng trên thiết bị'}
        aria-label="Cài đặt ứng dụng Na Duong ESL"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>{compact ? 'Cài đặt' : 'Cài ứng dụng'}</span>
      </button>

      {/* iOS Installation Instruction Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-emerald-100 space-y-4 animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FDF2F8] border border-[#BE185D]/30 flex items-center justify-center text-[#0F4C3A]">
                  <Smartphone className="w-4 h-4 text-[#0F4C3A]" />
                </div>
                <h3 className="text-base font-black text-[#0F4C3A]">
                  Cài đặt trên iOS (Safari)
                </h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps in Vietnamese */}
            <div className="space-y-3 text-xs sm:text-sm text-[#132E22]">
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Để cài ứng dụng <strong>Na Duong ESL</strong> vào màn hình chính của iPhone / iPad:
              </p>

              <div className="space-y-2.5 bg-[#F6FAF7] p-3.5 rounded-2xl border border-emerald-100">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F4C3A] text-[#F9A8D4] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="leading-snug">
                    Nhấn vào biểu tượng <strong>Chia sẻ (Share)</strong> <Share2 className="w-3.5 h-3.5 inline mx-0.5 text-[#BE185D]" /> ở thanh công cụ phía dưới trình duyệt Safari.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F4C3A] text-[#F9A8D4] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="leading-snug">
                    Cuộn xuống và chọn <strong>"Thêm vào MH chính"</strong> (Add to Home Screen) <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-[#BE185D]" />.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0F4C3A] text-[#F9A8D4] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="leading-snug">
                    Nhấn <strong>"Thêm" (Add)</strong> ở góc trên bên phải để hoàn tất cài đặt.
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full py-2.5 bg-[#0F4C3A] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-[#F9A8D4]" />
                <span>Đã hiểu, đóng hướng dẫn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
