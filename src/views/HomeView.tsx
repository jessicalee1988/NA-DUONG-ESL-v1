import React from 'react';
import { 
  MessagesSquare, 
  Presentation, 
  BookOpen, 
  ArrowRight, 
  School,
  Sparkles,
  ChevronRight,
  Calculator,
  FlaskConical,
  Landmark,
  Globe2,
  Music2,
  Palette,
  Dumbbell,
  Monitor
} from 'lucide-react';
import { NavigationTab, UserRoleId } from '../types';
import { useLearning } from '../context/LearningContext';
import { SUBJECTS_DATA } from '../data/subjectPhrases';

interface HomeViewProps {
  onSelectTab: (tab: NavigationTab) => void;
  onSelectSubject?: (subjectId: string) => void;
}

const SUBJECT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  math: Calculator,
  science: FlaskConical,
  history: Landmark,
  geography: Globe2,
  music: Music2,
  art: Palette,
  pe: Dumbbell,
  it: Monitor,
};

interface RoleRecommendation {
  roleId: UserRoleId;
  roleTitleVi: string;
  recommendedTab: NavigationTab;
  moduleTitleVi: string;
  noteVi: string;
}

const ROLE_RECOMMENDATIONS: Record<UserRoleId, RoleRecommendation> = {
  homeroom: {
    roleId: 'homeroom',
    roleTitleVi: 'Giáo viên chủ nhiệm',
    recommendedTab: 'classroom',
    moduleTitleVi: 'Tiếng Anh trong lớp học (Classroom English)',
    noteVi: 'Ưu tiên 40 khẩu lệnh ổn định nề nếp, tổ chức hoạt động và câu khen ngợi tạo hứng khởi cho học sinh.',
  },
  subject: {
    roleId: 'subject',
    roleTitleVi: 'Giáo viên bộ môn',
    recommendedTab: 'subjects',
    moduleTitleVi: 'Ngân hàng tiếng Anh bộ môn (Subject English Bank)',
    noteVi: 'Ưu tiên từ vựng chuyên môn và khẩu lệnh hướng dẫn thao tác thực hành cho môn học phụ trách.',
  },
  leadership: {
    roleId: 'leadership',
    roleTitleVi: 'Ban giám hiệu',
    recommendedTab: 'everyday',
    moduleTitleVi: 'Giao tiếp hằng ngày (Everyday English)',
    noteVi: 'Ưu tiên các mẫu câu ngoại giao đón tiếp khách, đối tác giáo dục và giao tiếp lịch thiệp trong nhà trường.',
  },
  staff: {
    roleId: 'staff',
    roleTitleVi: 'Cán bộ, nhân viên',
    recommendedTab: 'everyday',
    moduleTitleVi: 'Giao tiếp hằng ngày (Everyday & School Office)',
    noteVi: 'Ưu tiên các mẫu câu chỉ dẫn vị trí phòng ban, hỗ trợ thủ tục hồ sơ và đón tiếp khách tại trường.',
  },
};

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab, onSelectSubject }) => {
  const { userRole, selectedSubjectId, setSelectedSubjectId } = useLearning();

  // Active role recommendation
  const activeRec = (userRole && ROLE_RECOMMENDATIONS[userRole]) || ROLE_RECOMMENDATIONS.homeroom;
  const currentSubject = SUBJECTS_DATA.find((s) => s.id === selectedSubjectId) || SUBJECTS_DATA[0];

  // Exactly THREE Prominent Learning Category Cards
  const mainModules = [
    {
      id: 'everyday' as NavigationTab,
      nameVi: 'Giao tiếp hằng ngày',
      nameEn: 'Everyday English',
      description: 'Mẫu câu chào hỏi, đón tiếp khách và giao tiếp nhà trường hằng ngày.',
      phraseCount: '40 mẫu câu',
      icon: MessagesSquare,
      iconBg: 'bg-[#F6FAF7] text-[#0F4C3A] border border-emerald-100',
    },
    {
      id: 'classroom' as NavigationTab,
      nameVi: 'Tiếng Anh trong lớp học',
      nameEn: 'Classroom English',
      description: 'Khẩu lệnh ổn định nề nếp, giao nhiệm vụ, nhận xét và khen ngợi học sinh.',
      phraseCount: '40 mẫu câu',
      icon: Presentation,
      iconBg: 'bg-[#FDF2F8] text-[#BE185D] border border-pink-100',
    },
    {
      id: 'subjects' as NavigationTab,
      nameVi: 'Ngân hàng tiếng Anh bộ môn',
      nameEn: 'Subject English Bank',
      description: 'Từ vựng và mẫu câu giảng dạy thực hành cho 8 môn học tích hợp tiểu học.',
      phraseCount: '80 câu · 8 môn',
      icon: BookOpen,
      iconBg: 'bg-emerald-50 text-[#0F4C3A] border border-emerald-200',
    },
  ];

  const handleGoToRecommendation = () => {
    if (userRole === 'subject') {
      if (onSelectSubject && selectedSubjectId) {
        onSelectSubject(selectedSubjectId);
      } else {
        onSelectTab('subjects');
      }
    } else {
      onSelectTab(activeRec.recommendedTab);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. OFFICIAL NA DUONG ESL BANNER */}
      <section className="space-y-3">
        <div 
          onClick={() => onSelectTab('everyday')}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-sm bg-white cursor-pointer group transition-all hover:shadow-md"
          title="Nhấn để bắt đầu học ngay"
        >
          <img
            src="/images/banner.png"
            alt="Na Duong – ESL Primary School – Small Sentences – Big Changes"
            className="w-full h-auto object-contain block"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F4C3A]">
            <School className="w-4 h-4 text-[#0F4C3A]" />
            <span>Trường Tiểu học Na Dương · Xã Na Dương, tỉnh Lạng Sơn, Việt Nam</span>
          </div>
          <button
            onClick={() => onSelectTab('everyday')}
            className="px-5 py-2.5 bg-[#0F4C3A] hover:bg-[#166534] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer group"
          >
            <span>Bắt đầu học</span>
            <ArrowRight className="w-4 h-4 text-[#F9A8D4] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* 2. THREE LEARNING CATEGORY CARDS */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#0F4C3A] tracking-tight">
            3 Danh mục học tập thực hành
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            160 mẫu câu được biên soạn chuẩn mực cho cán bộ, giáo viên và nhân viên
          </p>
        </div>

        {/* 3 Equal-height cards on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {mainModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => onSelectTab(mod.id)}
                className="group flex flex-col justify-between p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-[#166534]/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectTab(mod.id);
                  }
                }}
              >
                <div>
                  {/* Top: Large Prominent Educational Icon (36-40px) & Count Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform ${mod.iconBg}`}>
                      <Icon className="w-9 h-9 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-black px-3 py-1 bg-[#FDF2F8] text-[#BE185D] border border-[#BE185D]/30 rounded-xl shadow-2xs">
                      {mod.phraseCount}
                    </span>
                  </div>

                  {/* Category Title: Dark Green #0F4C3A */}
                  <h3 className="text-lg font-black text-[#0F4C3A] group-hover:text-[#166534] mb-0.5 leading-snug">
                    {mod.nameVi}
                  </h3>
                  <div className="text-xs font-bold text-[#BE185D] mb-3">
                    {mod.nameEn}
                  </div>

                  {/* Vietnamese Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
                    {mod.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#0F4C3A] group-hover:text-[#166534]">
                  <span className="flex items-center gap-1.5">
                    Bắt đầu học
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#F6FAF7] group-hover:bg-[#BE185D] text-[#0F4C3A] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SHORT LEARNING RECOMMENDATION (Based on active role) */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100/80 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#FDF2F8] border border-[#BE185D]/40 flex items-center justify-center text-[#BE185D] shrink-0">
                <Sparkles className="w-4 h-4 text-[#BE185D]" />
              </span>
              <span className="text-xs font-extrabold text-[#0F4C3A] uppercase tracking-wider">
                Gợi ý cho {activeRec.roleTitleVi}
              </span>
              {userRole === 'subject' && currentSubject && (
                <span className="text-xs font-bold text-[#BE185D] bg-[#FDF2F8] px-2.5 py-0.5 rounded-lg border border-[#BE185D]/40">
                  {currentSubject.nameVi}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {userRole === 'subject' && currentSubject
                ? `Thầy/cô môn ${currentSubject.nameVi} nên bắt đầu với 10 câu khẩu lệnh và thuật ngữ môn học chuyên biệt.`
                : activeRec.noteVi}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={handleGoToRecommendation}
              className="px-4 py-2.5 bg-[#0F4C3A] hover:bg-[#166534] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap group"
            >
              <span>Vào học theo gợi ý</span>
              <ChevronRight className="w-4 h-4 text-[#F9A8D4] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* If Subject Teacher, show a quick inline subject switcher */}
        {userRole === 'subject' && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-xs font-bold text-[#0F4C3A] mr-1">
              Đổi môn:
            </span>
            {SUBJECTS_DATA.map((sub) => {
              const SubIcon = SUBJECT_ICONS[sub.id] || BookOpen;
              const isSelected = selectedSubjectId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectId(sub.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FDF2F8] text-[#BE185D] border border-[#BE185D]'
                      : 'bg-[#F6FAF7] text-slate-700 hover:bg-emerald-50 border border-transparent'
                  }`}
                >
                  <SubIcon className="w-3.5 h-3.5 text-[#0F4C3A]" />
                  <span>{sub.nameVi}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
