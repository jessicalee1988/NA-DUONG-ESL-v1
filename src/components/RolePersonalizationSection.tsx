import React from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  Briefcase, 
  ArrowRight, 
  Calculator, 
  FlaskConical, 
  Landmark, 
  Globe2, 
  Music2, 
  Palette, 
  Dumbbell, 
  Monitor, 
  UserCheck,
  Check
} from 'lucide-react';
import { UserRoleId, NavigationTab } from '../types';
import { useLearning } from '../context/LearningContext';
import { SUBJECTS_DATA } from '../data/subjectPhrases';

interface RolePersonalizationSectionProps {
  onSelectTab: (tab: NavigationTab) => void;
  onSelectSubject?: (subjectId: string) => void;
}

export interface RoleConfig {
  id: UserRoleId;
  titleVi: string;
  titleEn: string;
  shortLabel: string;
  descriptionVi: string;
  icon: React.FC<{ className?: string }>;
  accentBg: string;
  recommendedTab: NavigationTab;
  recommendedTabTitleVi: string;
  recommendationNote: string;
}

export const ROLE_CONFIGS: RoleConfig[] = [
  {
    id: 'homeroom',
    titleVi: 'Giáo viên chủ nhiệm',
    titleEn: 'Homeroom Teacher',
    shortLabel: 'GV Chủ nhiệm',
    descriptionVi: 'Quản lý nề nếp lớp học, giao tiếp với học sinh đầu & cuối giờ, khen ngợi động viên.',
    icon: Users,
    accentBg: 'bg-[#BCEBD8]',
    recommendedTab: 'classroom',
    recommendedTabTitleVi: 'Tiếng Anh trong lớp học (Classroom English)',
    recommendationNote: 'Ưu tiên học 40 khẩu lệnh sư phạm, cách ổn định nề nếp và các câu khen ngợi tạo hứng khởi cho học sinh.',
  },
  {
    id: 'subject',
    titleVi: 'Giáo viên bộ môn',
    titleEn: 'Subject Teacher',
    shortLabel: 'GV Bộ môn',
    descriptionVi: 'Giảng dạy các bộ môn chuyên biệt: Toán, Khoa học, Mỹ thuật, Âm nhạc, Tin học, Thể chất, Lịch sử & Địa lý.',
    icon: BookOpen,
    accentBg: 'bg-[#FDF2F8]',
    recommendedTab: 'subjects',
    recommendedTabTitleVi: 'Ngân hàng tiếng Anh bộ môn (Subject English Bank)',
    recommendationNote: 'Ưu tiên học hệ thống từ vựng, chỉ dẫn thao tác thực hành và nhận xét theo từng môn học chuyên môn.',
  },
  {
    id: 'leadership',
    titleVi: 'Ban giám hiệu',
    titleEn: 'School Leadership',
    shortLabel: 'Ban giám hiệu',
    descriptionVi: 'Quản lý điều hành toàn diện nhà trường, đón tiếp đoàn khách, đối tác giáo dục và hội đồng sư phạm.',
    icon: Award,
    accentBg: 'bg-[#C9E9FF]',
    recommendedTab: 'everyday',
    recommendedTabTitleVi: 'Giao tiếp hằng ngày (Everyday English)',
    recommendationNote: 'Ưu tiên học các mẫu câu ngoại giao lịch thiệp, đón tiếp đại biểu đến thăm trường và giao tiếp công sở.',
  },
  {
    id: 'staff',
    titleVi: 'Cán bộ, nhân viên',
    titleEn: 'School Staff',
    shortLabel: 'Cán bộ, nhân viên',
    descriptionVi: 'Nhân viên văn thư, thiết bị, thư viện, y tế học đường, bán trú và bảo vệ trường.',
    icon: Briefcase,
    accentBg: 'bg-[#FFD9E5]',
    recommendedTab: 'everyday',
    recommendedTabTitleVi: 'Giao tiếp hằng ngày (Everyday & School Office)',
    recommendationNote: 'Ưu tiên học các mẫu câu hướng dẫn thủ tục giấy tờ, chỉ dẫn phòng ban và đón tiếp khách tại cổng trường.',
  },
];

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

export const RolePersonalizationSection: React.FC<RolePersonalizationSectionProps> = ({
  onSelectTab,
  onSelectSubject,
}) => {
  const { userRole, setUserRole, selectedSubjectId, setSelectedSubjectId } = useLearning();

  const currentRoleConfig = ROLE_CONFIGS.find((r) => r.id === userRole) || ROLE_CONFIGS[0];
  const currentSubject = SUBJECTS_DATA.find((s) => s.id === selectedSubjectId) || SUBJECTS_DATA[0];

  const handleRoleSelect = (roleId: UserRoleId) => {
    setUserRole(roleId);
    if (roleId === 'subject' && !selectedSubjectId) {
      setSelectedSubjectId('math');
    }
  };

  const handleGoToRecommendation = () => {
    if (currentRoleConfig.id === 'subject') {
      if (onSelectSubject && selectedSubjectId) {
        onSelectSubject(selectedSubjectId);
      } else {
        onSelectTab('subjects');
      }
    } else {
      onSelectTab(currentRoleConfig.recommendedTab);
    }
  };

  return (
    <section id="role-selection-section" className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
      {/* Header & Segmented Role Selector Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FDF2F8] flex items-center justify-center text-[#BE185D] shrink-0 font-bold border border-[#BE185D]/30">
            <UserCheck className="w-4 h-4 text-[#BE185D]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0F4C3A] leading-tight">
              Cá nhân hóa theo vai trò công tác
            </h3>
            <span className="text-[11px] text-slate-500">
              Chọn vai trò của thầy/cô để nhận lộ trình gợi ý phù hợp nhất
            </span>
          </div>
        </div>

        {/* 4 Roles Segmented Control */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
          {ROLE_CONFIGS.map((config) => {
            const isSelected = userRole === config.id;
            const Icon = config.icon;
            return (
              <button
                key={config.id}
                onClick={() => handleRoleSelect(config.id)}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0F4C3A] shadow-xs ring-1 ring-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0F4C3A]' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{config.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Sub-selector if 'Subject Teacher' */}
      {userRole === 'subject' && (
        <div className="pt-2 border-t border-slate-100 animate-in fade-in space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#0F4C3A]">
              Chọn môn học thầy/cô phụ trách giảng dạy:
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              8 môn học tích hợp
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
            {SUBJECTS_DATA.map((sub) => {
              const SubIcon = SUBJECT_ICONS[sub.id] || BookOpen;
              const isSelected = selectedSubjectId === sub.id;

              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubjectId(sub.id);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#FDF2F8] border-[#BE185D] text-[#BE185D] font-bold shadow-2xs ring-1 ring-[#BE185D]/40'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div 
                    className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: sub.accentColor }}
                  >
                    <SubIcon className="w-3 h-3 text-[#0F4C3A]" />
                  </div>
                  <span className="truncate">{sub.nameVi}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendation Action Strip */}
      <div className="bg-linear-to-r from-[#F6FAF7] to-[#FDF2F8] border border-emerald-100 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs text-[#0F4C3A]">
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
            <span className="font-bold">Lộ trình khuyến nghị:</span>
            <span className="font-semibold underline decoration-[#0F4C3A]/40">{currentRoleConfig.recommendedTabTitleVi}</span>
            {userRole === 'subject' && currentSubject && (
              <span className="text-[#BE185D] font-bold">({currentSubject.nameVi})</span>
            )}
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {userRole === 'subject' && currentSubject
              ? `Tập trung vào 10 mẫu câu thực hành và tình huống sư phạm môn ${currentSubject.nameVi}.`
              : currentRoleConfig.recommendationNote}
          </p>
        </div>

        <button
          onClick={handleGoToRecommendation}
          className="self-end sm:self-center px-4 py-2 bg-[#0F4C3A] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Học theo gợi ý</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F9A8D4]" />
        </button>
      </div>
    </section>
  );
};
