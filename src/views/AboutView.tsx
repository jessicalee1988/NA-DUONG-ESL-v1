import React from 'react';
import { 
  School, 
  MapPin, 
  BookOpen, 
  Users, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  Heart,
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-10 sm:space-y-12 max-w-4xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FDF2F8] text-[#BE185D] border border-[#BE185D]/30 rounded-full text-xs font-bold shadow-2xs">
          <School className="w-4 h-4 text-[#BE185D]" />
          <span>Sáng kiến kinh nghiệm & Chuyển đổi số giáo dục</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F4C3A] tracking-tight">
          Về ứng dụng Na Duong – ESL Primary School
        </h1>
        <p className="text-base sm:text-lg font-bold text-[#BE185D]">
          Small Sentences – Big Changes
        </p>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          Đề án tự học và thực hành tiếng Anh thiết thực dành cho cán bộ quản lý, giáo viên và nhân viên Trường Tiểu học Na Dương, xã Na Dương, tỉnh Lạng Sơn, Việt Nam.
        </p>
      </div>

      {/* Official Banner Preview */}
      <div className="rounded-3xl overflow-hidden border border-emerald-100 shadow-md bg-white">
        <img
          src="/images/banner.png"
          alt="Na Duong – ESL Primary School – Small Sentences – Big Changes"
          className="w-full h-auto object-contain block"
        />
      </div>

      {/* Mission & Purpose Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#FDF2F8] border border-[#BE185D]/30 flex items-center justify-center text-[#0F4C3A] shrink-0 shadow-2xs">
            <BookOpen className="w-6 h-6 text-[#0F4C3A]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#0F4C3A]">
              Mục tiêu & Ý nghĩa đề án
            </h2>
            <div className="text-xs text-slate-500 font-semibold">
              Small Sentences – Big Changes · Xây dựng môi trường song ngữ tự nhiên tại tiểu học
            </div>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[#132E22] leading-relaxed font-medium">
          <p>
            Nhằm hiện thực hóa định hướng đổi mới phương pháp giảng dạy và từng bước đưa tiếng Anh trở thành ngôn ngữ thứ hai trong nhà trường phổ thông, đề án <strong className="text-[#0F4C3A] font-bold">Na Duong – ESL Primary School</strong> ra đời với phương châm <strong className="text-[#BE185D] font-bold">"Small Sentences – Big Changes"</strong> (Những câu nói ngắn – Những đổi thay lớn).
          </p>
          <p>
            Ứng dụng chú trọng giảm bớt áp lực ngữ pháp hàn lâm, tập trung tối đa vào tính ứng dụng trực tiếp: giúp thầy cô giáo các môn văn hóa, giáo viên chuyên biệt và đội ngũ cán bộ, nhân viên có thể sử dụng ngay những câu khẩu lệnh, lời chào, lời khen và chỉ dẫn chuẩn mực trong sinh hoạt, công tác hằng ngày.
          </p>

          <div className="p-5 rounded-2xl bg-[#F6FAF7] border border-emerald-100 space-y-2">
            <span className="font-black text-[#0F4C3A] block">
              Sứ mệnh của "Na Duong – ESL Primary School":
            </span>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
              <li>Cung cấp 160 mẫu câu chuẩn bản ngữ ngắn gọn, thiết thực, gắn liền với các tình huống diễn ra hằng ngày tại Trường Tiểu học Na Dương.</li>
              <li>Hỗ trợ giáo viên đưa khẩu lệnh và tiếng Anh giao tiếp vào 8 môn học phổ thông (Toán, Khoa học, Lịch sử, Địa lý, Âm nhạc, Mỹ thuật, Thể dục, Tin học).</li>
              <li>Giúp cán bộ, nhân viên tự tin chào đón các đoàn khách, phụ huynh và đối tác khi đến thăm trường.</li>
              <li>Tạo phong trào tự học ngoại ngữ vui tươi, dễ nhớ, có phát âm mẫu và kiểm tra ghi nhớ nhanh.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Developers Section: Nguyễn Thị Ánh & Triệu Thu Hà */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100/90 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-black uppercase tracking-wider text-[#BE185D] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BE185D]"></span>
            <span>Ban biên soạn & Tác giả phát triển đề án</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F4C3A] tracking-tight">
            Đội ngũ tác giả – Trường Tiểu học Na Dương
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Sự phối hợp giữa chuyên môn Ngoại ngữ và Nghiệp vụ sư phạm Tiểu học thực tiễn
          </p>
        </div>

        {/* 2 Developer Cards + Logo Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Developer 1: Nguyễn Thị Ánh */}
          <div className="p-6 rounded-2xl bg-[#F6FAF7] border border-emerald-100/80 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#0F4C3A]/20 flex items-center justify-center text-[#0F4C3A] shadow-xs shrink-0 p-1">
                <GraduationCap className="w-8 h-8 text-[#0F4C3A]" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#0F4C3A] uppercase tracking-wider block">
                  Author & Content Lead
                </span>
                <h3 className="text-lg font-black text-[#0F4C3A]">
                  Nguyễn Thị Ánh
                </h3>
                <div className="text-xs font-semibold text-slate-600">
                  English Teacher · Giáo viên Tiếng Anh
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Trường Tiểu học Na Dương
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-2 border-t border-slate-200/60">
              Chịu trách nhiệm biên soạn hệ thống 160 mẫu câu chuẩn ngữ dụng quốc tế, chuẩn hóa ngữ âm bản xứ và thiết kế lộ trình thực hành sư phạm phù hợp cho giáo viên tiểu học.
            </p>
          </div>

          {/* Developer 2: Triệu Thu Hà */}
          <div className="p-6 rounded-2xl bg-[#FDF2F8] border border-[#BE185D]/20 shadow-2xs flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#BE185D]/40 flex items-center justify-center text-[#BE185D] shadow-xs shrink-0 p-1">
                <Award className="w-8 h-8 text-[#BE185D]" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#BE185D] uppercase tracking-wider block">
                  Co-Author & Primary Pedagogy
                </span>
                <h3 className="text-lg font-black text-[#0F4C3A]">
                  Triệu Thu Hà
                </h3>
                <div className="text-xs font-semibold text-slate-600">
                  Primary School Teacher · Giáo viên Tiểu học
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Trường Tiểu học Na Dương
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-2 border-t border-slate-200/60">
              Đồng tác giả nghiên cứu tính ứng dụng thực tế trong quản lý lớp học, xây dựng các ngữ cảnh khẩu lệnh môn học và tối ưu hóa giải pháp số để thầy cô dễ dàng áp dụng mỗi ngày.
            </p>
          </div>
        </div>

        {/* Developer Quote Message */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0F4C3A] to-[#166534] text-white shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F9A8D4] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F9A8D4]" />
            <span>Thông điệp từ các tác giả</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-white/95 italic font-medium">
            "Chúng tôi tin rằng việc xây dựng môi trường sử dụng tiếng Anh trong trường học bắt đầu từ những điều giản dị nhất. Chỉ với những câu nói ngắn gọn hàng ngày (Small Sentences), thầy cô và các em học sinh sẽ cùng nhau tạo nên những chuyển biến tích cực, tự tin và to lớn (Big Changes) cho Trường Tiểu học Na Dương."
          </p>
          <div className="text-right text-xs font-bold text-[#F9A8D4] pt-1">
            — Nguyễn Thị Ánh & Triệu Thu Hà
          </div>
        </div>
      </section>

      {/* Institutional Unit Card with Official Logo */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white border-2 border-[#BE185D]/40 shadow-sm shrink-0 flex items-center justify-center p-1">
            <img
              src="/images/logo.png"
              alt="Logo Trường Tiểu học Na Dương"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Đơn vị công tác & Áp dụng
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#0F4C3A]">
              Trường Tiểu học Na Dương
            </h3>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#BE185D] shrink-0" />
              <span>Xã Na Dương, tỉnh Lạng Sơn, Việt Nam</span>
            </div>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-slate-500 sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 font-medium">
          <span className="font-bold text-[#0F4C3A] block">Small Sentences – Big Changes</span>
          <span>Dành cho tập thể cán bộ giáo viên nhà trường</span>
        </div>
      </section>

      {/* Visual Identity Note */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FDF2F8] border border-[#BE185D]/30 text-[#0F4C3A] flex items-center justify-center shrink-0 shadow-2xs">
          <School className="w-8 h-8 sm:w-10 sm:h-10 text-[#0F4C3A]" />
        </div>
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg font-black text-[#0F4C3A]">
            Bộ nhận diện & Không gian học tập chuẩn mực
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Với thiết kế đồ họa giao diện chuẩn mực kết hợp hai gam màu chủ đạo Xanh lá đậm (Forest Green #0F4C3A) và Hồng đậm (Deep Pink #BE185D) đồng bộ cùng biểu trưng chính thức của Trường Tiểu học Na Dương, ứng dụng mang đến không gian học tập trực quan, trang trọng và truyền cảm hứng tự tin cho mỗi giáo viên.
          </p>
        </div>
      </section>

      {/* Development Roadmap */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F4C3A]">
          <Calendar className="w-4 h-4 text-[#0F4C3A]" />
          <span>Quy mô & Tính năng hệ thống</span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#F6FAF7] border border-emerald-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#166534] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-black text-[#0F4C3A] text-sm block">160 Mẫu câu thực hành · 100% Âm thanh thu sẵn chuẩn WAV</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Hoàn thiện 3 phân hệ thực hành trọng tâm gồm Giao tiếp hằng ngày (40 câu), Tiếng Anh trong lớp học (40 câu), Ngân hàng 8 môn học tích hợp (80 câu), tích hợp 100% trọn bộ 160 tệp âm thanh thu sẵn chất lượng cao (hỗ trợ điều chỉnh tốc độ 0.75x và 1x), học ngoại tuyến PWA và lưu tiến độ học tập trên thiết bị.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
