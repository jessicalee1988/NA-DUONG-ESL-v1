import React from 'react';
import { School, MapPin } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-white border-t border-emerald-100/80 mt-12 py-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Top Row: School & Developer Credits + Quick Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-5 border-b border-slate-100">
          {/* Identity & Credits */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-[#BE185D]/40 shrink-0 flex items-center justify-center p-0.5 shadow-2xs">
                <img
                  src="/images/logo.png"
                  alt="Logo Trường Tiểu học Na Dương"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-[#0F4C3A] text-sm leading-tight">
                  Na Duong – ESL Primary School
                </span>
                <span className="text-[11px] font-bold text-[#BE185D] leading-tight">
                  Small Sentences – Big Changes
                </span>
              </div>
            </div>

            {/* Exact Developer Credits */}
            <div className="text-slate-600 space-y-0.5 font-medium pt-1">
              <div>
                Đơn vị: <strong className="text-[#0F4C3A] font-bold">Trường Tiểu học Na Dương</strong>
              </div>
              <div className="text-[11px] text-slate-500">
                Tác giả: <strong className="text-[#0F4C3A]">Nguyễn Thị Ánh</strong> (English Teacher) & <strong className="text-[#0F4C3A]">Triệu Thu Hà</strong> (Primary School Teacher)
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
                <MapPin className="w-3 h-3 text-[#BE185D] shrink-0" />
                <span>Xã Na Dương, tỉnh Lạng Sơn, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Clean Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 font-bold">
            <button
              onClick={() => onSelectTab('home')}
              className="hover:text-[#BE185D] transition-colors cursor-pointer"
            >
              Trang chủ
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('everyday')}
              className="hover:text-[#BE185D] transition-colors cursor-pointer"
            >
              Giao tiếp hằng ngày
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('classroom')}
              className="hover:text-[#BE185D] transition-colors cursor-pointer"
            >
              Tiếng Anh lớp học
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('subjects')}
              className="hover:text-[#BE185D] transition-colors cursor-pointer"
            >
              Ngân hàng bộ môn
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('progress')}
              className="hover:text-[#BE185D] transition-colors cursor-pointer"
            >
              Tiến độ
            </button>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={() => onSelectTab('about')}
              className="hover:text-[#BE185D] transition-colors cursor-pointer"
            >
              Giới thiệu
            </button>
          </nav>
        </div>

        {/* Bottom Row: Minimal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-1.5 font-medium">
          <div>
            © {new Date().getFullYear()} Na Duong – ESL Primary School.
          </div>
          <div className="flex items-center gap-2">
            <span>Small Sentences – Big Changes · Learn – Listen – Remember</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
