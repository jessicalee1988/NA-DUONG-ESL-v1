import React, { useState, useMemo } from 'react';
import { 
  ChartNoAxesColumn, 
  Heart, 
  CheckCircle2, 
  Trash2, 
  BookOpen, 
  ShieldAlert, 
  Info, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { EVERYDAY_PHRASES } from '../data/everydayPhrases';
import { CLASSROOM_PHRASES } from '../data/classroomPhrases';
import { SUBJECTS_DATA } from '../data/subjectPhrases';
import { PhraseCard } from '../components/PhraseCard';
import { Phrase, NavigationTab } from '../types';

interface ProgressViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigateTab }) => {
  const { completedIds, favoriteIds, clearAllProgress } = useLearning();
  const [activeListTab, setActiveListTab] = useState<'learned' | 'favorites'>('learned');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Consolidate all phrases across the app into one master map
  const allPhrases = useMemo<Phrase[]>(() => {
    const list: Phrase[] = [...EVERYDAY_PHRASES, ...CLASSROOM_PHRASES];
    SUBJECTS_DATA.forEach((s) => {
      list.push(...s.phrases);
    });
    return list;
  }, []);

  // Filtered lists (strictly matching the 160 learning phrases)
  const learnedPhrasesList = useMemo(() => {
    return allPhrases.filter((p) => completedIds.has(p.id));
  }, [allPhrases, completedIds]);

  const favoritePhrasesList = useMemo(() => {
    return allPhrases.filter((p) => favoriteIds.has(p.id));
  }, [allPhrases, favoriteIds]);

  const totalPhrasesCount = allPhrases.length;
  const learnedCount = learnedPhrasesList.length;
  const favoriteCount = favoritePhrasesList.length;
  const overallPercentage = totalPhrasesCount > 0 ? Math.round((learnedCount / totalPhrasesCount) * 100) : 0;

  // Breakdown statistics
  const everydayLearned = EVERYDAY_PHRASES.filter((p) => completedIds.has(p.id)).length;
  const classroomLearned = CLASSROOM_PHRASES.filter((p) => completedIds.has(p.id)).length;
  const subjectsLearned = SUBJECTS_DATA.reduce((acc, s) => {
    return acc + s.phrases.filter((p) => completedIds.has(p.id)).length;
  }, 0);
  const totalSubjectPhrases = SUBJECTS_DATA.reduce((acc, s) => acc + s.phrases.length, 0);

  const activeDisplayList = activeListTab === 'learned' ? learnedPhrasesList : favoritePhrasesList;

  const handleConfirmClear = () => {
    clearAllProgress();
    setConfirmClearOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-[#BE185D] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#BE185D]"></span>
              <span>Quản lý học tập cục bộ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F4C3A] tracking-tight">
              My Learning Progress – Tiến độ học tập
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
              Theo dõi chính xác số lượng mẫu câu thầy/cô đã đánh dấu ghi nhớ và các câu được lưu vào mục yêu thích.
            </p>
          </div>

          {/* Reset progress action */}
          <div className="shrink-0">
            <button
              onClick={() => setConfirmClearOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Đặt lại tiến độ trên máy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Device Local Storage Notice */}
      <div className="bg-[#FDF2F8] border border-[#BE185D]/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-[#0F4C3A] shadow-2xs">
        <Info className="w-5 h-5 text-[#BE185D] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-black text-sm block text-[#0F4C3A]">Lưu ý về lưu trữ dữ liệu cá nhân:</span>
          <p className="leading-relaxed text-slate-700 font-medium">
            Tiến độ học tập và danh sách câu yêu thích được lưu trực tiếp trên trình duyệt của thiết bị hiện tại (Local Storage) và không đồng bộ qua các máy khác. Khi đổi máy tính hoặc xóa dữ liệu duyệt web, tiến độ sẽ được đặt lại từ đầu.
          </p>
        </div>
      </div>

      {/* Real Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* KPI 1: Total Learned */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Mẫu câu đã ghi nhớ</span>
            <CheckCircle2 className="w-4 h-4 text-[#166534]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0F4C3A] tabular-nums">
              {learnedCount}
            </span>
            <span className="text-xs text-slate-400 font-bold">/ {totalPhrasesCount} câu</span>
          </div>
          <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-[#0F4C3A] h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 font-bold text-right tabular-nums">
            Hoàn thành {overallPercentage}% tổng ngân hàng
          </div>
        </div>

        {/* KPI 2: Favorites Count */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
            <span>Mục yêu thích đã lưu</span>
            <Heart className="w-4 h-4 text-[#BE185D] fill-[#BE185D]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#BE185D] tabular-nums">
              {favoriteCount}
            </span>
            <span className="text-xs text-slate-400 font-bold">câu tâm đắc</span>
          </div>
          <p className="text-[11px] text-slate-500 pt-3 font-medium">
            Những câu thường dùng bạn muốn tra cứu nhanh khi lên lớp.
          </p>
        </div>

        {/* KPI 3: Breakdown by Areas */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm space-y-2.5">
          <div className="text-xs font-black text-[#0F4C3A] uppercase tracking-wider">
            Phân bổ theo danh mục
          </div>
          <div className="space-y-1.5 text-xs text-slate-600 font-medium">
            <div className="flex items-center justify-between">
              <span>Giao tiếp hằng ngày:</span>
              <span className="font-bold text-[#0F4C3A] tabular-nums">{everydayLearned}/{EVERYDAY_PHRASES.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tiếng Anh lớp học:</span>
              <span className="font-bold text-[#0F4C3A] tabular-nums">{classroomLearned}/{CLASSROOM_PHRASES.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>8 Môn học tích hợp:</span>
              <span className="font-bold text-[#0F4C3A] tabular-nums">{subjectsLearned}/{totalSubjectPhrases}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Interactive List: Learned vs Favorites */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          {/* Segmented Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveListTab('learned')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeListTab === 'learned'
                  ? 'bg-[#0F4C3A] text-[#F9A8D4] shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-[#F6FAF7] border border-slate-200'
              }`}
            >
              <span>Mẫu câu đã ghi nhớ ({learnedCount})</span>
            </button>

            <button
              onClick={() => setActiveListTab('favorites')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeListTab === 'favorites'
                  ? 'bg-[#BE185D] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-[#F6FAF7] border border-slate-200'
              }`}
            >
              <span>Mục yêu thích ({favoriteCount})</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Nhấn vào thẻ để cập nhật trạng thái
          </span>
        </div>

        {/* List of Phrases */}
        {activeDisplayList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeDisplayList.map((phrase) => (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                badgeCategoryName={phrase.subjectId ? `Môn ${phrase.subjectId.toUpperCase()}` : phrase.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-emerald-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#0F4C3A]">
              {activeListTab === 'learned'
                ? 'Bạn chưa đánh dấu mẫu câu nào là đã học'
                : 'Bạn chưa lưu mẫu câu nào vào mục yêu thích'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
              {activeListTab === 'learned'
                ? 'Trong quá trình đọc các bài học, hãy nhấn vào nút "Ghi nhớ" trên mỗi thẻ câu để theo dõi tiến độ của bạn tại đây.'
                : 'Nhấn vào biểu tượng trái tim trên mỗi thẻ câu để lưu lại những câu bạn tâm đắc nhất.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('everyday')}
                className="px-5 py-2.5 text-xs font-bold bg-[#0F4C3A] text-white rounded-xl hover:bg-[#166534] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Khám phá Giao tiếp hằng ngày</span>
                <ArrowRight className="w-4 h-4 text-[#F9A8D4]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Clearing Progress */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Xác nhận đặt lại tiến độ?
                </h3>
                <p className="text-xs text-slate-500">
                  Thao tác này sẽ xóa toàn bộ danh sách câu đã học và yêu thích trên máy này.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmClearOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmClear}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
