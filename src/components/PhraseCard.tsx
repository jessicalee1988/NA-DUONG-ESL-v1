import React from 'react';
import { Heart, CheckCircle2, Volume2, Loader2 } from 'lucide-react';
import { Phrase } from '../types';
import { useLearning } from '../context/LearningContext';
import { useSpeech } from '../context/SpeechContext';

interface PhraseCardProps {
  phrase: Phrase;
  badgeCategoryName?: string;
}

export const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, badgeCategoryName }) => {
  const { isFavorite, toggleFavorite, isLearned, toggleLearned } = useLearning();
  const { playPhrase, stop, speakingId, isSpeaking, isLoading, playbackSpeed, togglePlaybackSpeed } = useSpeech();

  const favorite = isFavorite(phrase.id);
  const learned = isLearned(phrase.id);
  const isCurrentActive = speakingId === phrase.id && (isSpeaking || isLoading);
  const isCurrentLoading = speakingId === phrase.id && isLoading;

  const handlePlayAudio = () => {
    if (isCurrentActive) {
      stop();
    } else {
      playPhrase(phrase);
    }
  };

  return (
    <div 
      className={`relative flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
        learned 
          ? 'border-emerald-200 bg-[#F6FAF7] shadow-xs' 
          : 'border-slate-200/90 hover:border-[#166534]/40 hover:shadow-xs'
      }`}
    >
      <div>
        {/* Unboxed Metadata row */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="font-mono text-[11px] text-slate-400">{phrase.id}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-[#0F4C3A] text-xs font-black">{badgeCategoryName || phrase.category}</span>
            {phrase.difficulty && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="capitalize text-[11px] text-slate-500 font-medium">{phrase.difficulty === 'beginner' ? 'Cơ bản' : 'Nâng cao'}</span>
              </>
            )}
          </div>

          {/* Quick status text */}
          {learned && (
            <span className="inline-flex items-center gap-1 text-[#166534] text-[11px] font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Đã ghi nhớ
            </span>
          )}
        </div>

        {/* English Phrase */}
        <h3 className="text-base sm:text-lg font-black text-[#0F4C3A] tracking-tight leading-snug mb-0.5">
          “{phrase.english}”
        </h3>

        {/* IPA Transcription */}
        {phrase.ipa && (
          <div className="text-xs font-mono text-[#BE185D] font-bold mb-1.5 tracking-wide">
            {phrase.ipa}
          </div>
        )}

        {/* Vietnamese Translation */}
        <p className="text-sm font-semibold text-[#132E22] mb-2 leading-relaxed">
          {phrase.vietnamese}
        </p>

        {/* Short Usage Context */}
        {phrase.contextNote && (
          <div className="bg-[#FDF2F8] rounded-xl px-2.5 py-1 text-[11px] text-slate-700 border border-[#BE185D]/25 mb-2.5 leading-snug">
            <span className="font-bold text-[#BE185D] mr-1">Ngữ cảnh:</span>
            <span>{phrase.contextNote}</span>
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1.5">
          {/* Audio Button in Deep Pink #BE185D */}
          <button
            onClick={handlePlayAudio}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              isCurrentActive
                ? 'bg-[#0F4C3A] text-[#F9A8D4] shadow-xs ring-2 ring-[#BE185D]/40'
                : 'bg-[#BE185D] hover:bg-[#9D174D] text-white hover:shadow-2xs'
            }`}
            title={isCurrentActive ? 'Đang phát âm... Nhấn để dừng' : 'Nghe phát âm chuẩn tiếng Anh'}
            aria-label={`Nghe phát âm câu: ${phrase.english}`}
          >
            {isCurrentLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Đang tải...</span>
              </>
            ) : isCurrentActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#F9A8D4]" />
                <span>Đang phát...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white" />
                <span>Nghe phát âm</span>
              </>
            )}
          </button>

          {/* Playback speed toggle (0.75x / 1x) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlaybackSpeed();
            }}
            className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer border ${
              playbackSpeed === 0.75
                ? 'bg-[#FDF2F8] text-[#BE185D] border-[#BE185D]/60 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title={`Tốc độ phát âm: ${playbackSpeed}x (Nhấn để chuyển sang ${playbackSpeed === 1 ? '0.75x' : '1x'})`}
            aria-label={`Tốc độ phát âm: ${playbackSpeed}x`}
          >
            {playbackSpeed}x
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mark as Learned Toggle */}
          <button
            onClick={() => toggleLearned(phrase.id)}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              learned
                ? 'bg-emerald-100 text-[#0F4C3A] hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title={learned ? 'Bỏ đánh dấu đã học' : 'Đánh dấu đã thuộc mẫu câu này'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${learned ? 'text-[#0F4C3A]' : 'text-slate-400'}`} />
            <span>{learned ? 'Đã học' : 'Ghi nhớ'}</span>
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={() => toggleFavorite(phrase.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              favorite
                ? 'bg-pink-100 text-[#BE185D] hover:bg-pink-200'
                : 'text-slate-400 hover:text-[#BE185D] hover:bg-slate-100'
            }`}
            title={favorite ? 'Bỏ lưu yêu thích' : 'Lưu vào mục yêu thích'}
            aria-label={favorite ? 'Bỏ thích' : 'Yêu thích'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-[#BE185D] text-[#BE185D]' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
