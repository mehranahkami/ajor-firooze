import React, { useState } from "react"

export interface Operator {
  id: string
  name: string
  role: string
  roleType: "sales" | "tech" | "logistics"
  description: string
  phoneDisplay: string
  phoneRaw: string
  whatsappRaw: string
  image: string
  isHighlighted?: boolean
}

const OPERATORS: Operator[] = [
  {
    id: "sales",
    name: "محمدرضا فیروزه‌ای",
    role: "مدیر فروش",
    roleType: "sales",
    description: "استعلام قیمت عمده، پیش‌فاکتور رسمی و هماهنگی ارسال مستقیم",
    phoneDisplay: "۰۹۱۵-۱۲۳-۴۵۶۷",
    phoneRaw: "09151234567",
    whatsappRaw: "989151234567",
    image: "/operator-rezvani.jpg",
    isHighlighted: false,
  },
  {
    id: "tech",
    name: "علیرضا فرهادی",
    role: "مشاور فنی و معماری",
    roleType: "tech",
    description: "مشاوره انتخاب آجر مناسب، هماهنگی رنگ نما و راهنمای اجرا",
    phoneDisplay: "۰۹۱۵-۲۳۴-۵۶۷۸",
    phoneRaw: "09152345678",
    whatsappRaw: "989152345678",
    image: "/operator-karimi.jpg",
    isHighlighted: true,
  },
  {
    id: "logistics",
    name: "حسین نیک‌نژاد",
    role: "کارشناس محاسبات و لجستیک",
    roleType: "logistics",
    description: "محاسبه دقیق متراژ، برآورد بار و هماهنگی حمل‌ونقل تا پروژه",
    phoneDisplay: "۰۹۱۵-۳۴۵-۶۷۸۹",
    phoneRaw: "09153456789",
    whatsappRaw: "989153456789",
    image: "/operator-kazemi.jpg",
    isHighlighted: false,
  },
]

export default function PriceInquiryCTA() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyPhone = (operator: Operator) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(operator.phoneRaw)
      setCopiedId(operator.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const handleWhatsApp = (operator: Operator) => {
    const message = encodeURIComponent(
      `سلام جناب ${operator.name} عزیز، جهت استعلام قیمت و دریافت مشاوره تخصصی از کارخانه آجر فیروزه پیام می‌دهم.`
    )
    window.open(`https://wa.me/${operator.whatsappRaw}?text=${message}`, "_blank")
  }

  return (
    <section id="price-inquiry" className="py-16 sm:py-20 bg-[#faf8f5] relative overflow-hidden border-y border-[#e8dfcf]" dir="rtl">
      {/* Subtle Background Ornament */}
      <div className="absolute inset-0 architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0d9488]/10 border border-[#0d9488]/20 rounded-full text-[#0d9488] text-xs font-bold mb-3 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span>پاسخگویی سریع و مستقیم کارشناسان کارخانه</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#151d1b] tracking-tight mb-3">
            استعلام قیمت و مشاوره تخصصی پروژه
          </h2>

          <p className="text-sm sm:text-base text-[#506360] font-light leading-relaxed">
            تیم متخصص فروش <strong className="font-bold text-[#0d9488]">آجر فیروزه</strong> آماده پاسخگویی و ارائه بهترین قیمت مستقیم کارخانه برای پروژه شماست.
          </p>
        </div>

        {/* 3 Operators Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {OPERATORS.map((op) => (
            <div
              key={op.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 text-center relative transition-all duration-300 flex flex-col justify-between ${
                op.isHighlighted
                  ? "border-2 border-[#0d9488] shadow-lg shadow-[#0d9488]/10 ring-4 ring-[#0d9488]/5"
                  : "border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#b89868]/40"
              }`}
            >
              {/* Avatar Area with Horizontal Line passing behind */}
              <div className="relative mb-4 pt-2">
                {/* Horizontal hairline behind avatar */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-200/80 -translate-y-1/2" />

                <div className="relative inline-block z-10">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-[#10b981]/70 shadow-sm mx-auto">
                    <img
                      src={op.image}
                      alt={op.name}
                      className="w-full h-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Pulsing Green Status Dot */}
                  <div
                    className="absolute bottom-1 right-2 w-4 h-4 bg-[#10b981] rounded-full border-2 border-white shadow-xs flex items-center justify-center"
                    title="آنلاین و آماده پاسخگویی"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#083b38] mb-2">
                  {op.name}
                </h3>

                {/* Role Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e8f6f4] text-[#0f766e] border border-[#bfe7e2] rounded-full text-xs font-bold mb-3.5">
                  {op.roleType === "sales" && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {op.roleType === "tech" && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {op.roleType === "logistics" && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )}
                  <span>{op.role}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#6b7280] leading-relaxed mb-6 px-1 min-h-[42px] flex items-center justify-center">
                  {op.description}
                </p>
              </div>

              {/* Action Buttons: Phone (Terracotta on right) & WhatsApp (Green on left) in RTL */}
              <div className="flex items-center gap-2.5 pt-2">
                {/* Terracotta Call Button */}
                <a
                  href={`tel:${op.phoneRaw}`}
                  onClick={() => handleCopyPhone(op)}
                  className="flex-1 bg-[#9e3d24] hover:bg-[#832f1a] text-white py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-mono tracking-tight text-xs sm:text-[13px]">{op.phoneDisplay}</span>
                </a>

                {/* WhatsApp Button */}
                <button
                  type="button"
                  onClick={() => handleWhatsApp(op)}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-2.5 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-98 shrink-0"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.761.813 2.796.813 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.766-5.77-5.767zm7.844 5.767c0 4.322-3.518 7.84-7.844 7.84-1.341 0-2.613-.342-3.733-.943l-4.148 1.087 1.107-4.048c-.732-1.206-1.146-2.593-1.146-4.025 0-4.322 3.518-7.84 7.844-7.84 4.326 0 7.844 3.518 7.844 7.84z"/>
                  </svg>
                  <span>واتساپ</span>
                </button>
              </div>

              {/* Quick Copied indicator if triggered */}
              {copiedId === op.id && (
                <div className="text-[10px] text-emerald-600 font-bold mt-1 text-center">
                  شماره تماس کپی شد ✓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Banner Ribbon: Working Hours (Right) & Central Office Phone (Left) in RTL */}
        <div className="bg-[#093d3f] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl border border-[#0d9488]/30 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Right: Working Hours */}
          <div className="flex items-center gap-2.5 text-right">
            <svg className="w-5 h-5 text-[#14b8a6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-xs sm:text-sm text-[#e0f2f1] font-medium">
              شنبه تا چهارشنبه — ۸ صبح الی ۵ عصر
            </span>
          </div>

          {/* Left: Terracotta Central Office Call Button */}
          <a
            href="tel:05141234567"
            className="w-full md:w-auto bg-[#9e3d24] hover:bg-[#832f1a] text-white px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer shrink-0"
          >
            <span>تماس با دفتر مرکزی:</span>
            <span className="font-mono text-sm sm:text-base font-bold">۰۵۱-۴۱۲۳۴۵۶۷</span>
          </a>
        </div>
      </div>
    </section>
  )
}
