import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  Landmark, 
  Globe2, 
  Music2, 
  Palette, 
  Dumbbell, 
  Monitor, 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';
import { SUBJECTS_DATA } from '../data/subjectPhrases';
import { SubjectItem } from '../types';
import { FocusLearningCard } from '../components/FocusLearningCard';
import { useLearning } from '../context/LearningContext';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Calculator,
  FlaskConical,
  Landmark,
  Globe2,
  Globe: Globe2,
  Music2,
  Music: Music2,
  Palette,
  Dumbbell,
  Activity: Dumbbell,
  Monitor,
};

interface SubjectBankViewProps {
  initialSubjectId?: string | null;
  onClearInitialSubject?: () => void;
}

export const SubjectBankView: React.FC<SubjectBankViewProps> = ({ 
  initialSubjectId,
  onClearInitialSubject 
}) => {
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(initialSubjectId || null);
  const [situationFilter, setSituationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { completedIds } = useLearning();

  React.useEffect(() => {
    if (initialSubjectId) {
      setActiveSubjectId(initialSubjectId);
    }
  }, [initialSubjectId]);

  const activeSubject = useMemo(() => {
    return SUBJECTS_DATA.find((s) => s.id === activeSubjectId) || null;
  }, [activeSubjectId]);

  // Filtered phrases in active subject
  const filteredPhrases = useMemo(() => {
    if (!activeSubject) return [];
    return activeSubject.phrases.filter((phrase) => {
      const matchSituation = situationFilter === 'all' || phrase.category === situationFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        phrase.english.toLowerCase().includes(q) ||
        phrase.vietnamese.toLowerCase().includes(q) ||
        (phrase.contextNote?.toLowerCase().includes(q) ?? false);
      return matchSituation && matchSearch;
    });
  }, [activeSubject, situationFilter, searchQuery]);

  const handleSelectSubject = (id: string) => {
    setActiveSubjectId(id);
    setSituationFilter('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSubjectList = () => {
    setActiveSubjectId(null);
    setSituationFilter('all');
    setSearchQuery('');
    if (onClearInitialSubject) onClearInitialSubject();
  };

  // If a subject is selected, render the dedicated Subject Page
  if (activeSubject) {
    const IconComponent = ICON_MAP[activeSubject.iconName] || BookOpen;
    const learnedInSubject = activeSubject.phrases.filter((p) => completedIds.has(p.id)).length;
    const progressPercent = Math.round((learnedInSubject / activeSubject.phrases.length) * 100);

    return (
      <div className="space-y-8 animate-in fade-in">
        {/* Back navigation button */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToSubjectList}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0F4C3A] bg-white border border-slate-200 rounded-xl hover:bg-[#F6FAF7] transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0F4C3A]" />
            <span>Quay lại tất cả bộ môn</span>
          </button>

          <span className="text-xs text-slate-500 font-bold">
            Bộ môn {SUBJECTS_DATA.findIndex((s) => s.id === activeSubject.id) + 1} / {SUBJECTS_DATA.length}
          </span>
        </div>

        {/* Dedicated Subject Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FDF2F8] border border-[#BE185D]/30 shadow-2xs flex items-center justify-center shrink-0">
                <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-[#BE185D]" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-[#BE185D] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#BE185D]"></span>
                  <span>Ngân hàng thuật ngữ & tình huống</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0F4C3A] tracking-tight">
                  {activeSubject.nameEn} – {activeSubject.nameVi}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
                  {activeSubject.descriptionVi}
                </p>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-[#F6FAF7] rounded-2xl p-4 border border-emerald-100 shadow-2xs min-w-52 space-y-2 shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>Tiến độ môn học</span>
                <span className="font-black text-[#0F4C3A] tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#0F4C3A] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between font-medium">
                <span>Đã ghi nhớ: <strong className="text-[#0F4C3A]">{learnedInSubject}</strong>/{activeSubject.phrases.length} câu</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#166534]" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar for this Subject */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Tìm câu hỏi hoặc khẩu lệnh môn ${activeSubject.nameVi}...`}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] transition-all placeholder:text-slate-400 text-[#132E22]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-[#0F4C3A] p-1 cursor-pointer"
                >
                  Xóa
                </button>
              )}
            </div>

            <span className="text-xs text-slate-500 font-medium self-end sm:self-center">
              Hiển thị <strong className="text-[#0F4C3A]">{filteredPhrases.length}</strong> câu
            </span>
          </div>

          {/* Situational Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSituationFilter('all')}
              className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                situationFilter === 'all'
                  ? 'bg-[#0F4C3A] text-[#F9A8D4] shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-[#F6FAF7] border border-slate-200 hover:text-[#0F4C3A] hover:border-emerald-200'
              }`}
            >
              Tất cả tình huống ({activeSubject.phrases.length})
            </button>
            {activeSubject.situations.map((sit) => {
              const isSelected = situationFilter === sit;
              const countInSit = activeSubject.phrases.filter((p) => p.category === sit).length;
              return (
                <button
                  key={sit}
                  onClick={() => setSituationFilter(sit)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F4C3A] text-[#F9A8D4] shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-[#F6FAF7] border border-slate-200 hover:text-[#0F4C3A] hover:border-emerald-200'
                  }`}
                >
                  <span>{sit}</span>
                  {countInSit > 0 && (
                    <span className="ml-1.5 opacity-80 tabular-nums">({countInSit})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Focused Single-Expression Learning View */}
        {filteredPhrases.length > 0 ? (
          <FocusLearningCard
            phrases={filteredPhrases}
            categoryTitle={`${activeSubject.nameVi} · ${situationFilter !== 'all' ? situationFilter : 'Mẫu câu bộ môn'}`}
          />
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-emerald-200 p-8 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#0F4C3A]">
              Không tìm thấy mẫu câu trong môn học này
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc tình huống.
            </p>
            <button
              onClick={() => {
                setSituationFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold bg-[#FDF2F8] text-[#BE185D] border border-[#BE185D] rounded-xl hover:bg-pink-100 transition-colors cursor-pointer"
            >
              Xem tất cả mẫu câu môn {activeSubject.nameVi}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Otherwise, render the Grid of 8 Illustrated Subject Cards
  return (
    <div className="space-y-8">
      {/* Subject Bank Overview Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm">
        <div className="space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-[#BE185D] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BE185D]"></span>
            <span>Mô-đun 03 · Giảng dạy tích hợp</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F4C3A] tracking-tight">
            Subject English Bank – Ngân hàng tiếng Anh bộ môn
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed font-medium">
            Hỗ trợ giáo viên đưa tiếng Anh vào từng tiết học chuyên môn một cách tự nhiên và sinh động. Chọn một trong 8 bộ môn bên dưới để mở kho mẫu câu chuyên biệt:
          </p>
        </div>
      </div>

      {/* Grid of 8 Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBJECTS_DATA.map((subject) => {
          const IconComponent = ICON_MAP[subject.iconName] || BookOpen;
          const learnedCount = subject.phrases.filter((p) => completedIds.has(p.id)).length;

          return (
            <div
              key={subject.id}
              onClick={() => handleSelectSubject(subject.id)}
              className="group flex flex-col justify-between p-6 rounded-3xl border border-slate-200/90 hover:border-[#166534]/50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#BE185D] bg-[#FDF2F8] border border-[#BE185D]/30 group-hover:scale-105 transition-transform shadow-2xs">
                    <IconComponent className="w-6 h-6 text-[#BE185D]" />
                  </div>

                  <span className="text-xs font-bold text-slate-500 tabular-nums px-2.5 py-1 bg-[#F6FAF7] rounded-lg border border-emerald-100/60">
                    {learnedCount}/{subject.phrases.length} đã học
                  </span>
                </div>

                <h3 className="text-base font-black text-[#0F4C3A] tracking-tight group-hover:text-[#166534] mb-0.5">
                  {subject.nameVi}
                </h3>
                <div className="text-xs font-bold text-[#BE185D] mb-2.5">
                  {subject.nameEn}
                </div>

                <p className="text-xs text-slate-600 font-medium line-clamp-3 leading-relaxed mb-4">
                  {subject.descriptionVi}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#0F4C3A] group-hover:text-[#BE185D]">
                <span>Vào học bộ môn</span>
                <ArrowRight className="w-4 h-4 text-[#BE185D] transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
