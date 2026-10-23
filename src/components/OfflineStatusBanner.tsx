import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { getCachedAudioCount, cacheAll160AudioFiles, ALL_160_AUDIO_URLS } from '../services/offlineAudioService';

export const OfflineStatusBanner: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [cachedCount, setCachedCount] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<{ current: number; total: number }>({
    current: 0,
    total: ALL_160_AUDIO_URLS.length,
  });
  const [showManager, setShowManager] = useState<boolean>(false);
  const totalAudios = ALL_160_AUDIO_URLS.length;

  // Check cached count on mount and whenever connectivity changes
  const checkCachedStatus = async () => {
    const count = await getCachedAudioCount();
    setCachedCount(count);
  };

  useEffect(() => {
    checkCachedStatus();
  }, [isOnline]);

  const handleDownloadAllAudio = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setDownloadProgress({ current: cachedCount, total: totalAudios });

    try {
      const result = await cacheAll160AudioFiles((curr, tot) => {
        setDownloadProgress({ current: curr, total: tot });
        setCachedCount(curr);
      });
      setCachedCount(result.cachedCount);
    } finally {
      setIsDownloading(false);
    }
  };

  const isFullyCached = cachedCount >= totalAudios;

  return (
    <>
      {/* 1. Offline Notification Bar (Appears when device loses network connectivity) */}
      {!isOnline && (
        <div className="bg-amber-500 text-white px-4 py-2.5 text-xs font-bold shadow-md flex items-center justify-between sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse text-amber-100" />
            <span>
              <strong>Chế độ ngoại tuyến:</strong> Đang hoạt động từ bộ nhớ thiết bị.
              {cachedCount > 0 ? (
                <span className="ml-1 opacity-90 font-medium">
                  ({cachedCount}/{totalAudios} âm thanh đã lưu sẵn).
                </span>
              ) : (
                <span className="ml-1 opacity-90 font-medium">
                  (Chỉ các mẫu câu đã mở trước đó có thể phát âm thanh).
                </span>
              )}
            </span>
          </div>
        </div>
      )}

      {/* 2. Compact Offline Audio Status in UI (Optional modal/panel toggle) */}
      {showManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-100 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FDF2F8] border border-[#BE185D]/30 flex items-center justify-center text-[#0F4C3A]">
                  <Wifi className="w-4 h-4 text-[#0F4C3A]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#0F4C3A]">
                    Học tiếng Anh ngoại tuyến (Offline)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Lưu trữ 160 tệp âm thanh WAV trực tiếp trên thiết bị
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowManager(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Offline Cache Status Info */}
            <div className="space-y-3 text-xs sm:text-sm text-[#132E22]">
              <div className="p-4 rounded-2xl bg-[#F6FAF7] border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>Trạng thái âm thanh đã lưu:</span>
                  <span className="font-mono text-[#0F4C3A] tabular-nums">
                    {cachedCount} / {totalAudios} câu ({Math.round((cachedCount / totalAudios) * 100)}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#0F4C3A] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((cachedCount / totalAudios) * 100)}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed pt-1">
                  {isFullyCached ? (
                    <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tất cả 160 âm thanh đã được lưu trên máy. Thầy cô có thể tắt mạng và học bất cứ lúc nào!
                    </span>
                  ) : (
                    <span>
                      Khi tải xong, toàn bộ 160 câu phát âm chuẩn WAV sẽ nghe được ngay cả khi máy bay hoặc không có mạng Wi-Fi/4G.
                    </span>
                  )}
                </p>
              </div>

              {!isFullyCached && isOnline && (
                <button
                  onClick={handleDownloadAllAudio}
                  disabled={isDownloading}
                  className="w-full py-3 bg-[#0F4C3A] hover:bg-[#166534] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#F9A8D4]" />
                      <span>Đang tải âm thanh ({downloadProgress.current}/{downloadProgress.total})...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#F9A8D4]" />
                      <span>Tải 160 tệp âm thanh để dùng ngoại tuyến</span>
                    </>
                  )}
                </button>
              )}

              {isFullyCached && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Ứng dụng đã sẵn sàng 100% để học ngoại tuyến không cần mạng!</span>
                </div>
              )}
            </div>

            <div className="pt-1 text-right">
              <button
                onClick={() => setShowManager(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Offline / Cache Status Pill in Floating bottom left or Header */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:block">
        <button
          onClick={() => setShowManager(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer border ${
            isFullyCached
              ? 'bg-white hover:bg-[#F6FAF7] text-[#0F4C3A] border-emerald-200'
              : 'bg-white hover:bg-[#FDF2F8] text-slate-700 border-slate-200'
          }`}
          title="Xem trạng thái học ngoại tuyến và tải âm thanh"
        >
          {isFullyCached ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Offline sẵn sàng (160/160)</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-[#0F4C3A] shrink-0" />
              <span>Tải âm thanh Offline ({cachedCount}/160)</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
