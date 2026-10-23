import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Check, 
  ChevronDown, 
  MessagesSquare, 
  Presentation, 
  BookOpen, 
  ChartNoAxesColumn, 
  Info,
  Home,
  UserCheck,
  Users,
  Award,
  Briefcase
} from 'lucide-react';
import { NavigationTab, UserRoleId } from '../types';
import { useLearning } from '../context/LearningContext';
import { SUBJECTS_DATA } from '../data/subjectPhrases';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onSelectSubject?: (subjectId: string) => void;
}

const ROLE_OPTIONS: { id: UserRoleId; labelVi: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'homeroom', labelVi: 'GV Chủ nhiệm', labelEn: 'Homeroom', icon: Users },
  { id: 'subject', labelVi: 'GV Bộ môn', labelEn: 'Subject', icon: BookOpen },
  { id: 'leadership', labelVi: 'Ban giám hiệu', labelEn: 'Leadership', icon: Award },
  { id: 'staff', labelVi: 'Cán bộ, nhân viên', labelEn: 'Staff', icon: Briefcase },
];

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onSelectSubject }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [modulesDropdownOpen, setModulesDropdownOpen] = useState(false);
  
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const modulesDropdownRef = useRef<HTMLDivElement>(null);
  
  const { completedIds, userRole, setUserRole, selectedSubjectId, setSelectedSubjectId } = useLearning();

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (modulesDropdownRef.current && !modulesDropdownRef.current.contains(event.target as Node)) {
        setModulesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setModulesDropdownOpen(false);
  };

  const currentRole = ROLE_OPTIONS.find((r) => r.id === userRole) || null;
  const currentRoleIcon = currentRole ? currentRole.icon : UserCheck;

  const isModuleActive = currentTab === 'everyday' || currentTab === 'classroom' || currentTab === 'subjects';

  return (
    <header className="sticky top-0 z-40 bg-[#0F4C3A] text-white border-b border-[#166534]/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-16 sm:h-17">
          {/* Left: Official School Logo & Title */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Về trang chủ Na Duong – ESL Primary School"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-[#F472B6]/60 shadow-xs group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center p-0.5">
              <img
                src="/images/logo.png"
                alt="Logo Trường Tiểu học Na Dương"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-white block leading-tight">
                Na Duong – ESL
              </span>
              <span className="text-[11px] font-bold text-[#F9A8D4] block leading-none tracking-wide">
                Primary School
              </span>
            </div>
          </button>

          {/* Center/Right Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {/* Home */}
            <button
              onClick={() => handleNav('home')}
              className={`py-1.5 transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'home' 
                  ? 'text-[#F9A8D4] font-bold border-b-2 border-[#F9A8D4]' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Trang chủ
            </button>

            {/* Learning Modules Dropdown */}
            <div className="relative" ref={modulesDropdownRef}>
              <button
                onClick={() => setModulesDropdownOpen(!modulesDropdownOpen)}
                className={`inline-flex items-center gap-1.5 py-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isModuleActive 
                    ? 'text-[#F9A8D4] font-bold border-b-2 border-[#F9A8D4]' 
                    : 'text-white/80 hover:text-white'
                }`}
                aria-expanded={modulesDropdownOpen}
              >
                <span>Chương trình học</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${modulesDropdownOpen ? 'rotate-180 text-[#F9A8D4]' : ''}`} />
              </button>

              {modulesDropdownOpen && (
                <div className="absolute left-0 mt-2.5 w-72 bg-[#0F4C3A] rounded-2xl shadow-2xl border border-[#166534] py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#F9A8D4]">
                    3 Mô-đun thực hành (160 câu)
                  </div>
                  <button
                    onClick={() => handleNav('everyday')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                      currentTab === 'everyday' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F9A8D4] shrink-0">
                      <MessagesSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Giao tiếp hằng ngày</div>
                      <div className="text-[11px] text-white/60">Everyday English · 40 câu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('classroom')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                      currentTab === 'classroom' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F9A8D4] shrink-0">
                      <Presentation className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Tiếng Anh trong lớp học</div>
                      <div className="text-[11px] text-white/60">Classroom English · 40 câu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav('subjects')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                      currentTab === 'subjects' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F9A8D4] shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">Ngân hàng bộ môn</div>
                      <div className="text-[11px] text-white/60">Subject English · 80 câu / 8 môn</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Progress */}
            <button
              onClick={() => handleNav('progress')}
              className={`py-1.5 inline-flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'progress' 
                  ? 'text-[#F9A8D4] font-bold border-b-2 border-[#F9A8D4]' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <ChartNoAxesColumn className="w-4 h-4 text-[#F9A8D4]" />
              <span>Tiến độ</span>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-[#BE185D] text-white rounded-full tabular-nums shadow-2xs">
                {completedIds.size}/160
              </span>
            </button>

            {/* About */}
            <button
              onClick={() => handleNav('about')}
              className={`py-1.5 transition-all whitespace-nowrap cursor-pointer ${
                currentTab === 'about' 
                  ? 'text-[#F9A8D4] font-bold border-b-2 border-[#F9A8D4]' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Giới thiệu
            </button>
          </nav>

          {/* Right Action: PWA Install + User Role Selector + Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* PWA Install Button (desktop) */}
            <div className="hidden sm:block">
              <PWAInstallButton />
            </div>

            {/* Compact Role Selector Dropdown */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#166534] bg-[#166534]/50 hover:bg-[#166534]/80 text-xs font-semibold text-white transition-all cursor-pointer shadow-xs"
                title="Thay đổi vai trò công tác"
                aria-expanded={roleDropdownOpen}
              >
                {React.createElement(currentRoleIcon, { className: "w-4 h-4 text-[#F9A8D4]" })}
                <span className="hidden sm:inline">
                  {currentRole ? currentRole.labelVi : 'Chọn vai trò'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${roleDropdownOpen ? 'rotate-180 text-[#F9A8D4]' : ''}`} />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0F4C3A] rounded-2xl shadow-2xl border border-[#166534] py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F9A8D4] border-b border-white/10 mb-1">
                    Vai trò của bạn tại trường
                  </div>
                  {ROLE_OPTIONS.map((opt) => {
                    const isSelected = userRole === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setUserRole(opt.id);
                          if (opt.id === 'subject' && !selectedSubjectId) {
                            setSelectedSubjectId('math');
                          }
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F9A8D4]' : 'text-white/70'}`} />
                          <div>
                            <div>{opt.labelVi}</div>
                            <div className="text-[10px] text-white/50 font-normal">{opt.labelEn}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#F9A8D4] stroke-[2.5]" />}
                      </button>
                    );
                  })}

                  {/* Quick subject selector if Subject Teacher */}
                  {userRole === 'subject' && (
                    <div className="mt-2 pt-2 border-t border-white/10 px-3">
                      <div className="text-[10px] font-bold text-[#F9A8D4] uppercase tracking-wider mb-1.5">
                        Môn đang phụ trách:
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px]">
                        {SUBJECTS_DATA.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSelectedSubjectId(s.id);
                              setRoleDropdownOpen(false);
                              if (onSelectSubject) onSelectSubject(s.id);
                            }}
                            className={`px-2 py-1 rounded-md text-left truncate transition-colors ${
                              selectedSubjectId === s.id
                                ? 'bg-[#BE185D] text-white font-bold'
                                : 'hover:bg-white/10 text-white/80'
                            }`}
                          >
                            {s.nameVi}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#F9A8D4]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#166534] bg-[#0F4C3A] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
          {/* PWA Install Button on mobile */}
          <div className="pt-1">
            <PWAInstallButton className="w-full justify-center py-2.5 text-xs font-bold" />
          </div>

          {/* Main Modules */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#F9A8D4] px-2 mb-2">
              Chương trình học
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => handleNav('home')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'home' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <Home className="w-5 h-5 text-[#F9A8D4]" />
                <span>Trang chủ</span>
              </button>

              <button
                onClick={() => handleNav('everyday')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'everyday' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessagesSquare className="w-5 h-5 text-[#F9A8D4]" />
                  <span>Giao tiếp hằng ngày</span>
                </div>
                <span className="text-[11px] text-white/60">40 câu</span>
              </button>

              <button
                onClick={() => handleNav('classroom')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'classroom' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Presentation className="w-5 h-5 text-[#F9A8D4]" />
                  <span>Tiếng Anh trong lớp học</span>
                </div>
                <span className="text-[11px] text-white/60">40 câu</span>
              </button>

              <button
                onClick={() => handleNav('subjects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'subjects' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#F9A8D4]" />
                  <span>Ngân hàng tiếng Anh bộ môn</span>
                </div>
                <span className="text-[11px] text-white/60">80 câu / 8 môn</span>
              </button>
            </div>
          </div>

          {/* Progress & About */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#F9A8D4] px-2 mb-2">
              Tiến độ & Giới thiệu
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => handleNav('progress')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'progress' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ChartNoAxesColumn className="w-5 h-5 text-[#F9A8D4]" />
                  <span>Tiến độ học tập</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-[#BE185D] text-white rounded-md tabular-nums">
                  {completedIds.size}/160
                </span>
              </button>

              <button
                onClick={() => handleNav('about')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                  currentTab === 'about' ? 'bg-[#166534] text-[#F9A8D4] font-bold' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <Info className="w-5 h-5 text-[#F9A8D4]" />
                <span>Giới thiệu đề án & Tác giả</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
