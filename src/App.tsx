import React, { useState, useEffect } from "react"
import PriceInquiryCTA from "./components/PriceInquiryCTA"

// Types
export interface BrickProduct {
  id: string
  name: string
  latinName: string
  category: string
  categoryId: string
  badgeStatus: string
  badgeTag: string
  dimensions: string
  waterAbs: string
  piecesPerMeter: string
  kilnTemp: string
  pricePerMeter: number
  toneHex: string
  accentHex: string
  image: string
  description: string
  finish: string
}

export interface BrickCategory {
  id: string
  name: string
  latinName: string
  shortDesc: string
  heroHeadline: string
  heroSubhead: string
  bannerImage: string
  accentColor: string
  badgeText: string
  modelsCount: string
  specs: { label: string; value: string }[]
}

export interface ProjectCase {
  title: string
  location: string
  architect: string
  material: string
  year: string
  image: string
  category: string
}

// Categories Data
const CATEGORIES: BrickCategory[] = [
  {
    id: "grey",
    name: "آجر مدرن طوسی، دودی و ذغالی",
    latinName: "GALAXY GREY & CHARCOAL ARCHITECTURE",
    shortDesc: "پخت در شرایط اتمسفر احیایی برای دستیابی به خنثی‌ترین و لوکس‌ترین طیف‌های طوسی کهکشانی و ذغالی مات.",
    heroHeadline: "کالکشن تخصصی آجر نسوز طوسی دودی و کهکشانی",
    heroSubhead: "طراحی شده برای پروژه‌های مینیمال، ویلاهای مدرن و سازه‌های بتنی اکسپوز؛ مقاوم در برابر دوده شهری و بدون تغییر رنگ با تابش مستقیم آفتاب.",
    bannerImage: "/galaxy-grey.jpg",
    accentColor: "#4b5563",
    badgeText: "مدرن و مینیمال",
    modelsCount: "۳ مدل اختصاصی",
    specs: [
      { label: "دمای پخت کوره", value: "۱۲۶۰ تا ۱۳۰۰ °C" },
      { label: "جذب آب میانگین", value: "۳.۸٪ تا ۵.۱٪" },
      { label: "کلاس ثبات رنگ", value: "مقاوم به UV و باران اسیدی" },
    ],
  },
  {
    id: "english",
    name: "آجر نسوز انگلیسی (اخرایی و روستیک)",
    latinName: "ROYAL ENGLISH OCHRE & TERRACOTTA",
    shortDesc: "طیف‌های عمیق قرمز اخرایی، جگری سوخته و روستیک برگرفته از غنی‌ترین کائولن و اکسید آهن نیشابور.",
    heroHeadline: "کالکشن آجر نسوز انگلیسی اخرایی سلطنتی",
    heroSubhead: "گرمای باوقار و اصالت جاودان؛ فرمولاسیون پخت ۱۴۲۰ درجه کوره شاتل که با گذشت دهه‌ها، اصیل‌تر و زیباتر جلوه می‌کند.",
    bannerImage: "/hero-facade.jpg",
    accentColor: "#9e3d24",
    badgeText: "اخرایی اصیل",
    modelsCount: "۳ مدل اختصاصی",
    specs: [
      { label: "دمای پخت کوره", value: "۱۳۸۰ تا ۱۴۲۰ °C" },
      { label: "جذب آب میانگین", value: "۴.۲٪ تا ۴.۶٪" },
      { label: "ضمانت ثبات رنگ", value: "۲۵ سال کتبی" },
    ],
  },
  {
    id: "turquoise",
    name: "آجر لعابدار سنتی فیروزه نیشابور",
    latinName: "PERSIAN TURQUOISE GLAZED CERAMIC BRICK",
    shortDesc: "هنر لعاب‌کاری دوپخت سنتی با رنگدانه‌های کانی مس و سیلیس نیشابور؛ نگین درخشان معماری ایرانی.",
    heroHeadline: "کالکشن آجر لعابدار فیروزه نیشابور",
    heroSubhead: "تلاقی خاک اخرایی و لعاب شیشه‌ای فیروزه؛ سطحی کاملاً نفوذناپذیر در برابر رطوبت، مناسب برای کتیبه‌ها، سردرب‌ها، آب‌نماها و نوارهای نمادین نما.",
    bannerImage: "/material-lab.jpg",
    accentColor: "#0d9488",
    badgeText: "لعاب کوره دوپخت",
    modelsCount: "۳ مدل سنتی و مدرن",
    specs: [
      { label: "دمای پخت کوره", value: "دوپخت ۱۲۰۰ °C" },
      { label: "جذب آب لعاب", value: "کمتر از ۱.۵٪ (نفوذناپذیر)" },
      { label: "فرمولاسیون", value: "رنگدانه طبیعی مس و فیروزه" },
    ],
  },
  {
    id: "qazaghi",
    name: "آجر سنتی قزاقی دست‌ساز",
    latinName: "HANDCRAFTED HERITAGE QAZAGHI",
    shortDesc: "قالب‌گیری دستی با گل ورزیده در کوره‌های سنتی؛ بافت‌های نوستالژیک اخرایی، خاکی و پوست‌پیازی.",
    heroHeadline: "کالکشن آجر قزاقی سنتی و دست‌ساز",
    heroSubhead: "اصالت تاریخی معماری فاخر ایرانی؛ بدون افزودنی‌های پلیمری، با تنفس طبیعی سازه و همخوانی فوق‌العاده با چوب و حیاط‌های مرکزی.",
    bannerImage: "https://images.unsplash.com/photo-1629608564457-5d74829a9e14?auto=format&fit=crop&w=1200&q=85",
    accentColor: "#b84f2b",
    badgeText: "دست‌ساز مالون",
    modelsCount: "۲ مدل تاریخی",
    specs: [
      { label: "دمای پخت کوره", value: "۱۰۸۰ °C سنتی" },
      { label: "جذب آب میانگین", value: "۶.۵٪" },
      { label: "روش ساخت", value: "۱۰۰٪ قالب‌گیری دستی" },
    ],
  },
  {
    id: "shamouti",
    name: "آجر نسوز شاموتی زرین و نخودی",
    latinName: "AMBER & GOLDEN SHAMOUTI FIREBRICK",
    shortDesc: "طیف‌های کرم شنی، کهربایی و طلایی پخته؛ همنشینی چشم‌نواز با بتن اکسپوز و سازه‌های شیشه‌ای.",
    heroHeadline: "کالکشن آجر نسوز شاموتی زرین",
    heroSubhead: "تولید شده با درصد بالای آلومینا برای تحمل بالاترین شوک‌های دمایی اقلیم‌های کویری و کوهستانی، با بازتاب ملایم نور روز.",
    bannerImage: "https://images.unsplash.com/photo-1608533240316-dd18303ed09c?auto=format&fit=crop&w=1200&q=85",
    accentColor: "#cf9f65",
    badgeText: "شاموتی پخته",
    modelsCount: "۲ مدل کهربایی",
    specs: [
      { label: "دمای پخت کوره", value: "۱۲۸۰ °C" },
      { label: "جذب آب میانگین", value: "۵.۱٪" },
      { label: "مقاومت حرارتی", value: "تا ۱۲۰۰ °C شوک مداوم" },
    ],
  },
  {
    id: "floor",
    name: "آجر فرش کف سنگین مقاومت بالا",
    latinName: "HEAVY TRAFFIC PAVING BRICK",
    shortDesc: "آجر با چگالی بالا جهت کفسازی پیاده‌راه‌ها، محوطه باغ‌ها، روف‌گاردن و حیاط‌های سنتی با مقاومت سایشی فوق‌العاده.",
    heroHeadline: "کالکشن آجر فرش کف سنگین ترافیکی",
    heroSubhead: "مقاوم در برابر تردد خودرویی، لغزش، یخبندان مکرر و نمک‌پاشی زمستانه با تراکم بلورین و پخت یکپارچه.",
    bannerImage: "https://images.unsplash.com/photo-1490478965551-2364145dccb4?auto=format&fit=crop&w=1200&q=85",
    accentColor: "#7e341f",
    badgeText: "ضد سایش ترافیکی",
    modelsCount: "۲ مدل سنگین",
    specs: [
      { label: "دمای پخت کوره", value: "۱۳۵۰ °C" },
      { label: "جذب آب میانگین", value: "۳.۱٪" },
      { label: "تحمل فشار", value: "بیش از ۵۰ MPa" },
    ],
  },
]

// Products Data with the exact requested card specs
const PRODUCTS: BrickProduct[] = [
  // --- GREY / CHARCOAL (Matching User Image HK-105) ---
  {
    id: "HK-105",
    name: "آجر نسوز طوسی دودی کهکشانی",
    latinName: "GALAXY GREY FIREBRICK",
    category: "آجر مدرن طوسی، دودی و ذغالی",
    categoryId: "grey",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۳۱ × ۷ × ۲.۷ سانتی‌متر",
    waterAbs: "۵.۱٪",
    piecesPerMeter: "۴۰ قالب",
    kilnTemp: "۱۲۶۰ درجه سانتی‌گراد",
    pricePerMeter: 940000,
    toneHex: "#5a6265",
    accentHex: "#33383a",
    image: "/galaxy-grey.jpg",
    description: "تولید شده با فرآیند اتمسفر کاهشی؛ دانه‌بندی میکرونیزه برای ایجاد جلوه‌ای مات، لوکس و کاملاً سازگار با سبک معماری های‌تک.",
    finish: "نیمه‌مات متالیک ریزدانه",
  },
  {
    id: "HK-106",
    name: "آجر نسوز مشکی فانتوم ذغالی",
    latinName: "PHANTOM BLACK FIREBRICK",
    category: "آجر مدرن طوسی، دودی و ذغالی",
    categoryId: "grey",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۳۱ × ۷ × ۲.۷ سانتی‌متر",
    waterAbs: "۳.۸٪",
    piecesPerMeter: "۴۰ قالب",
    kilnTemp: "۱۳۰۰ درجه سانتی‌گراد",
    pricePerMeter: 1080000,
    toneHex: "#272a2b",
    accentHex: "#111213",
    image: "https://images.unsplash.com/photo-1613533107702-3295757a6395?auto=format&fit=crop&w=900&q=85",
    description: "تیره ترین طیف آجر نسوز کشور؛ مقاومت حداکثری در برابر نشست گردوغبار و آلاینده‌های کلان‌شهرها.",
    finish: "مشکی ذغالی ابریشمی",
  },
  {
    id: "HK-107",
    name: "آجر نسوز طوسی نقره‌ای خطی بلند",
    latinName: "LINEAR SILVER GREY BRICK",
    category: "آجر مدرن طوسی، دودی و ذغالی",
    categoryId: "grey",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۴۰ × ۶ × ۲.۵ سانتی‌متر",
    waterAbs: "۴.۴٪",
    piecesPerMeter: "۳۶ قالب",
    kilnTemp: "۱۲۸۰ درجه سانتی‌گراد",
    pricePerMeter: 1150000,
    toneHex: "#82898c",
    accentHex: "#515658",
    image: "https://images.unsplash.com/photo-1588451186824-f9278b63cb1f?auto=format&fit=crop&w=900&q=85",
    description: "فرمت طولی کشیده ۴۰ سانتی‌متری برای کشیدگی افقی ساختمان و القای حس آرامش معماری معاصر اروپایی.",
    finish: "سندبلاست ملایم خطی",
  },

  // --- ENGLISH OCHRE ---
  {
    id: "FZ-101",
    name: "آجر نسوز انگلیسی اخرایی سلطنتی",
    latinName: "ROYAL OCHRE FIREBRICK",
    category: "آجر نسوز انگلیسی (اخرایی و روستیک)",
    categoryId: "english",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۳۱ × ۷ × ۲.۷ سانتی‌متر",
    waterAbs: "۴.۶٪",
    piecesPerMeter: "۴۰ قالب",
    kilnTemp: "۱۳۸۰ درجه سانتی‌گراد",
    pricePerMeter: 880000,
    toneHex: "#9e3d24",
    accentHex: "#682514",
    image: "https://images.unsplash.com/photo-1518714049508-96a3054cdaef?auto=format&fit=crop&w=900&q=85",
    description: "رنگ اخرایی اصیل نیشابور، پخته شده در بالاترین حرارت کوره شاتل؛ همنشینی ماندگار با بندکشی‌های صدفی و طوسی.",
    finish: "رستیک حرارتی ملایم",
  },
  {
    id: "FZ-102",
    name: "آجر نسوز انگلیسی جگری دانه سیاه",
    latinName: "DEEP LIVER RED FIREBRICK",
    category: "آجر نسوز انگلیسی (اخرایی و روستیک)",
    categoryId: "english",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۳۱ × ۷ × ۲.۷ سانتی‌متر",
    waterAbs: "۴.۲٪",
    piecesPerMeter: "۴۰ قالب",
    kilnTemp: "۱۴۰۰ درجه سانتی‌گراد",
    pricePerMeter: 920000,
    toneHex: "#6e2511",
    accentHex: "#451408",
    image: "https://images.unsplash.com/photo-1540416748211-881609804978?auto=format&fit=crop&w=900&q=85",
    description: "دانه های نسوز طبیعی مگنزیت در بطن رنگ جگری عمیق؛ بافت دار و جلوه‌بخش به دیوارهای بیرونی و باربیکیو.",
    finish: "صخره‌ای دانه سیاه",
  },
  {
    id: "FZ-103",
    name: "آجر نسوز اخرایی پلاک باریک مدرن",
    latinName: "SLENDER OCHRE LINEAR BRICK",
    category: "آجر نسوز انگلیسی (اخرایی و روستیک)",
    categoryId: "english",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۵۰ × ۵ × ۲.۵ سانتی‌متر",
    waterAbs: "۴.۵٪",
    piecesPerMeter: "۳۴ قالب",
    kilnTemp: "۱۳۸۰ درجه سانتی‌گراد",
    pricePerMeter: 1220000,
    toneHex: "#b84f2b",
    accentHex: "#7a3118",
    image: "/hero-facade.jpg",
    description: "طول استثنایی ۵۰ سانتی‌متری؛ انتخاب اول دفاتر برتر معماری در مسابقات و جوایز معمار سال.",
    finish: "پلاک تخت خطی صیقلی",
  },

  // --- TURQUOISE GLAZED ---
  {
    id: "FZ-201",
    name: "آجر لعابدار سنتی فیروزه نیشابور",
    latinName: "PERSIAN TURQUOISE GLAZED BRICK",
    category: "آجر لعابدار سنتی فیروزه نیشابور",
    categoryId: "turquoise",
    badgeStatus: "آماده بارگیری",
    badgeTag: "لعاب کوره دوپخت",
    dimensions: "۲۰ × ۲۰ × ۲ سانتی‌متر",
    waterAbs: "۱.۴٪",
    piecesPerMeter: "۲۵ قالب",
    kilnTemp: "۱۱۸۰ درجه سانتی‌گراد",
    pricePerMeter: 1850000,
    toneHex: "#0d9488",
    accentHex: "#042f2e",
    image: "https://images.unsplash.com/photo-1614789458044-1b85f1a76468?auto=format&fit=crop&w=900&q=85",
    description: "کریستال شیشه‌ای لعاب فیروزه حاوی کانی‌های معدنی مس و سیلیس؛ مقاومت ۱۰۰ ساله در برابر نور خورشید.",
    finish: "لعاب براق کریستالی سنتی",
  },
  {
    id: "FZ-202",
    name: "آجر پلاک لعابدار فیروزه‌ای باریک",
    latinName: "SLENDER TURQUOISE FACADE BRICK",
    category: "آجر لعابدار سنتی فیروزه نیشابور",
    categoryId: "turquoise",
    badgeStatus: "آماده بارگیری",
    badgeTag: "لعاب کوره دوپخت",
    dimensions: "۲۵ × ۵.۵ × ۲ سانتی‌متر",
    waterAbs: "۱.۶٪",
    piecesPerMeter: "۶۵ قالب",
    kilnTemp: "۱۲۰۰ درجه سانتی‌گراد",
    pricePerMeter: 1620000,
    toneHex: "#14b8a6",
    accentHex: "#0f766e",
    image: "/material-lab.jpg",
    description: "مناسب برای چیدمان عمودی و نوارهای میان آجر اخرایی؛ ایجاد هارمونی اصیل معماری صفوی در قالبی مینیمال.",
    finish: "لعاب ترک‌دار کراکله",
  },
  {
    id: "FZ-203",
    name: "آجر مشبک فخر و مدین با لعاب فیروزه",
    latinName: "LATTICE TURQUOISE SCREEN BRICK",
    category: "آجر لعابدار سنتی فیروزه نیشابور",
    categoryId: "turquoise",
    badgeStatus: "آماده بارگیری",
    badgeTag: "لعاب کوره دوپخت",
    dimensions: "۲۰ × ۲۰ × ۱۰ سانتی‌متر",
    waterAbs: "۲.۰٪",
    piecesPerMeter: "۲۵ قالب",
    kilnTemp: "۱۱۸۰ درجه سانتی‌گراد",
    pricePerMeter: 2400000,
    toneHex: "#0f766e",
    accentHex: "#063d39",
    image: "/project-cultural.jpg",
    description: "طراحی ۳ بعدی مشبک جهت کنترل ورود نور خورشید، ایجاد سایه‌اندازهای هندسی چشم‌نواز و شکست باد.",
    finish: "حجمی مشبک لعابدار",
  },

  // --- QAZAGHI ---
  {
    id: "FZ-301",
    name: "آجر قزاقی اخرایی دست‌ساز سنتی",
    latinName: "HANDCRAFTED OCHRE QAZAGHI",
    category: "آجر سنتی قزاقی دست‌ساز",
    categoryId: "qazaghi",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر سنتی دست‌ساز",
    dimensions: "۲۰ × ۵.۵ × ۵.۵ سانتی‌متر",
    waterAbs: "۶.۵٪",
    piecesPerMeter: "۷۵ قالب",
    kilnTemp: "۱۰۸۰ درجه سانتی‌گراد",
    pricePerMeter: 690000,
    toneHex: "#b84f2b",
    accentHex: "#7b2f16",
    image: "https://images.unsplash.com/photo-1629608564457-5d74829a9e14?auto=format&fit=crop&w=900&q=85",
    description: "گل‌ورزیده کاملاً سنتی با دست استادکاران قدیمی؛ هر قالب دارای هویتی یکتا و حسی زنده از خاک کهن.",
    finish: "دست‌ساز مالون سنتی",
  },
  {
    id: "FZ-302",
    name: "آجر قزاقی ختایی خاکی و زرد کهن",
    latinName: "HISTORIC KHATAYI PAVING BRICK",
    category: "آجر سنتی قزاقی دست‌ساز",
    categoryId: "qazaghi",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر سنتی دست‌ساز",
    dimensions: "۲۰ × ۲۰ × ۴ سانتی‌متر",
    waterAbs: "۶.۸٪",
    piecesPerMeter: "۲۵ قالب",
    kilnTemp: "۱۰۵۰ درجه سانتی‌گراد",
    pricePerMeter: 740000,
    toneHex: "#d6a267",
    accentHex: "#9b6b33",
    image: "https://images.unsplash.com/photo-1608533240316-dd18303ed09c?auto=format&fit=crop&w=900&q=85",
    description: "قالب مربعی ختایی؛ بازآفرینی کف‌فرش‌ها و سردرهای تاریخی عهد صفوی و قاجار با دوام ماندگار.",
    finish: "مات ماسه‌ای سنتی",
  },

  // --- SHAMOUTI ---
  {
    id: "FZ-401",
    name: "آجر نسوز شاموتی کهربایی پخته",
    latinName: "AMBER SHAMOUTI FIREBRICK",
    category: "آجر نسوز شاموتی زرین و نخودی",
    categoryId: "shamouti",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۳۱ × ۷ × ۲.۷ سانتی‌متر",
    waterAbs: "۵.۱٪",
    piecesPerMeter: "۴۰ قالب",
    kilnTemp: "۱۲۸۰ درجه سانتی‌گراد",
    pricePerMeter: 820000,
    toneHex: "#cf9f65",
    accentHex: "#996f3a",
    image: "https://images.unsplash.com/photo-1608533240316-dd18303ed09c?auto=format&fit=crop&w=900&q=85",
    description: "رنگ گرم کهربایی متناسب با اقلیم‌های آفتابی و کویری؛ ضد بازتاب نور مستقیم با بافت ماسه‌ای لطیف.",
    finish: "مات ماسه‌ای ضد شوره",
  },
  {
    id: "FZ-402",
    name: "آجر شاموتی کرم روشن دانه‌ریز",
    latinName: "LIGHT CREAM SHAMOUTI",
    category: "آجر نسوز شاموتی زرین و نخودی",
    categoryId: "shamouti",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر نسوز نما",
    dimensions: "۳۱ × ۷ × ۲.۷ سانتی‌متر",
    waterAbs: "۵.۴٪",
    piecesPerMeter: "۴۰ قالب",
    kilnTemp: "۱۲۶۰ درجه سانتی‌گراد",
    pricePerMeter: 860000,
    toneHex: "#e5cca8",
    accentHex: "#b59567",
    image: "https://images.unsplash.com/photo-1588451186824-f9278b63cb1f?auto=format&fit=crop&w=900&q=85",
    description: "طیف روشن نخودی صدفی؛ جایگزین مدرن و بادوام برای سنگ‌های تراورتن کرم، بدون خطر افتادگی نما.",
    finish: "صاف دانه ریز یکدست",
  },

  // --- FLOOR ---
  {
    id: "FZ-501",
    name: "آجر فرش نسوز کف ترافیکی اخرایی",
    latinName: "HEAVY TRAFFIC OCHRE FLOOR BRICK",
    category: "آجر فرش کف سنگین مقاومت بالا",
    categoryId: "floor",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر فرش سنگین",
    dimensions: "۲۰ × ۲۰ × ۴.۵ سانتی‌متر",
    waterAbs: "۳.۱٪",
    piecesPerMeter: "۲۵ قالب",
    kilnTemp: "۱۳۵۰ درجه سانتی‌گراد",
    pricePerMeter: 980000,
    toneHex: "#7e341f",
    accentHex: "#491b0f",
    image: "https://images.unsplash.com/photo-1490478965551-2364145dccb4?auto=format&fit=crop&w=900&q=85",
    description: "ضخامت ۴.۵ سانتی‌متر برای تحمل بار سنگین ترافیکی اتومبیل؛ کاملاً ضد لغزش در بارندگی و شستشو.",
    finish: "زبـر ضد لغزش ترافیکی",
  },
  {
    id: "FZ-502",
    name: "آجر کف فرش روستیک خاکی و قهوه‌ای",
    latinName: "RUSTIC COURTYARD PAVING BRICK",
    category: "آجر فرش کف سنگین مقاومت بالا",
    categoryId: "floor",
    badgeStatus: "آماده بارگیری",
    badgeTag: "آجر فرش سنگین",
    dimensions: "۲۰ × ۱۰ × ۵ سانتی‌متر",
    waterAbs: "۳.۶٪",
    piecesPerMeter: "۵۰ قالب",
    kilnTemp: "۱۲۹۰ درجه سانتی‌گراد",
    pricePerMeter: 890000,
    toneHex: "#8d4f36",
    accentHex: "#522a1b",
    image: "https://images.unsplash.com/photo-1490478965551-2364145dccb4?auto=format&fit=crop&w=900&q=85",
    description: "قالب بلوکی با بافت صخره‌ای؛ ایده‌آل برای محوطه‌سازی ویلاها، آب‌نماها و مسیرهای باغی سنگفرش.",
    finish: "بافت سنتی روستیک محوطه",
  },
]

const PROJECTS: ProjectCase[] = [
  {
    title: "ویلای بوستان کاشان",
    location: "کاشان، حاشیه کویر",
    architect: "دفتر معماری کلوت و همکاران",
    material: "آجر نسوز انگلیسی اخرایی FZ-101 با آب‌نمای فیروزه",
    year: "۱۴۰۳",
    image: "/project-villa.jpg",
    category: "ویلایی لوکس",
  },
  {
    title: "پاویون و نگارخانه فخر و مدین",
    location: "اصفهان، میدان جلفا",
    architect: "استودیو معماری پدیدار",
    material: "آجر قزاقی دست‌ساز اخرایی FZ-102 با چیدمان پارامتریک مشبک",
    year: "۱۴۰۲",
    image: "/project-cultural.jpg",
    category: "فرهنگی و عمومی",
  },
  {
    title: "عمارت معاصر نیشابور",
    location: "نیشابور، باغات کهن",
    architect: "آتلیه طراحی خاک و فیروزه",
    material: "ترکیب آجر اخرایی سوخته و کتیبه‌های لعاب فیروزه‌ای اصیل",
    year: "۱۴۰۴",
    image: "/hero-facade.jpg",
    category: "اقامتگاهی معاصر",
  },
]

// Mortar Simulator Presets
const MORTAR_COLORS = [
  { name: "سفید صدفی", hex: "#f3ede2", note: "بیشترین کنتراست خطی، تفکیک واضح هر قالب آجر" },
  { name: "طوسی سیمانی", hex: "#9ca3af", note: "هماهنگی مدرن، ملایم‌سازی خطوط و نگاه یکپارچه نما" },
  { name: "ذغالی دودی", hex: "#374151", note: "عمق‌بخشی به رنگ اخرایی و جلوه سایه‌روشن دراماتیک" },
  { name: "نخودی سنتی", hex: "#d8c49e", note: "بازتولید نمای کاروانسراها و بناهای میراث کهن ایرانی" },
  { name: "فیروزه‌ای نیشابور", hex: "#14b8a6", note: "امضای اختصاصی برند؛ خطوط باریک فیروزه‌ای در بطن خاک اخرایی" },
]

const WHATSAPP_NUMBER = "989154220000"

export default function App() {
  // Navigation: null = Home View, string = Category Dedicated View
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<BrickProduct | null>(null)

  // Clear any legacy custom font choices to ensure consistent fixed typography
  useEffect(() => {
    try {
      localStorage.removeItem("firouzeh_site_font")
      document.documentElement.removeAttribute("data-site-font")
    } catch {
      // ignore
    }
  }, [])

  // Mortar Atelier State (Online material showroom)
  const [atelierBrick, setAtelierBrick] = useState<BrickProduct>(PRODUCTS[0])
  const [selectedMortar, setSelectedMortar] = useState(MORTAR_COLORS[0])
  const [mortarWidth, setMortarWidth] = useState(10) // mm

  // Calculator & Quote State
  const [calcArea, setCalcArea] = useState(140)
  const [calcBrickType, setCalcBrickType] = useState<string>("HK-105")
  const [calcJoint, setCalcJoint] = useState<"standard" | "flush" | "none">("standard")
  const [calcWastePercent, setCalcWastePercent] = useState(5)
  const [quoteRequested, setQuoteRequested] = useState(false)

  // Sample Box Form State
  const [sampleFirm, setSampleFirm] = useState("")
  const [sampleCity, setSampleCity] = useState("")
  const [samplePhone, setSamplePhone] = useState("")
  const [sampleSubmitted, setSampleSubmitted] = useState(false)

  // Calculation derivation
  const currentCalcProduct = PRODUCTS.find((p) => p.id === calcBrickType) || PRODUCTS[0]
  const piecesPerMeter = calcJoint === "none" ? 50 : calcJoint === "flush" ? 44 : 40
  const grossAreaWithWaste = calcArea * (1 + calcWastePercent / 100)
  const totalPieces = Math.ceil(grossAreaWithWaste * piecesPerMeter)
  const totalWeightTons = ((totalPieces * 1.9) / 1000).toFixed(1)
  const estimatedMaterialCost = totalPieces * currentCalcProduct.pricePerMeter / 40

  // Scroll to top when active category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeCategoryId])

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategoryId)
  const categoryProducts = activeCategoryId
    ? PRODUCTS.filter((p) => p.categoryId === activeCategoryId)
    : []

  const handleWhatsAppInquiry = (productName: string, productCode: string) => {
    const text = encodeURIComponent(
      `سلام و درود، جهت استعلام قیمت قطعی، زمان بارگیری و سفارش کد «${productCode} - ${productName}» از کارخانه آجر فیروزه پیام می‌دهم.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank")
  }

  const navigateToSection = (sectionId: string) => {
    if (activeCategoryId !== null) {
      setActiveCategoryId(null)
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        el?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      const el = document.getElementById(sectionId)
      el?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#151d1b] selection:bg-[#0d9488] selection:text-white">
      {/* Editorial Top Notice */}
      <div className="bg-[#151d1b] text-[#c7d5d2] text-xs py-2 px-6 border-b border-[#263532]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
            <span className="font-light">
              کارخانه آجر فیروزه نیشابور · عرضه مستقیم پالت صادراتی و تحویل فوری به سراسر کشور
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#93a6a2]">
            <span>پخت مداوم کوره در دمای ۱۴۲۰°C</span>
            <span>|</span>
            <span dir="ltr">تلفن کارخانه: ۰۵۱-۴۲۲۰۰۰۰۰</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Brand Header */}
      <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8e2d5]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => setActiveCategoryId(null)}
            className="flex items-center gap-3.5 text-right group cursor-pointer"
          >
            <div className="w-11 h-11 border border-[#b89868]/40 p-1 flex items-center justify-center bg-white shadow-xs">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                <div className="bg-[#9e3d24] transition-transform duration-300 group-hover:scale-105" />
                <div className="bg-[#0d9488] transition-transform duration-300 group-hover:scale-105" />
                <div className="bg-[#0f766e] transition-transform duration-300 group-hover:scale-105" />
                <div className="bg-[#782a15] transition-transform duration-300 group-hover:scale-105" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-[#151d1b] flex items-center gap-2">
                آجر فیروزه
                <span className="text-[11px] font-semibold text-[#0d9488] px-2 py-0.5 bg-[#0d9488]/10 rounded-xs">
                  نیشابور
                </span>
              </span>
              <span className="text-[10px] text-[#788784] font-light">
                تولیدکننده تخصصی آجر نما، نسوز و لعابدار سنتی
              </span>
            </div>
          </button>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#4a5754]">
            <button
              onClick={() => setActiveCategoryId(null)}
              className={`hover:text-[#9e3d24] transition-colors py-2 cursor-pointer ${activeCategoryId === null ? "text-[#9e3d24] font-black" : ""
                }`}
            >
              صفحه اصلی
            </button>

            <button
              onClick={() => navigateToSection("categories-directory")}
              className="hover:text-[#9e3d24] transition-colors py-2 cursor-pointer"
            >
              دسته‌بندی‌های آجر
            </button>

            <button
              onClick={() => navigateToSection("atelier")}
              className="hover:text-[#0d9488] transition-colors py-2 flex items-center gap-1.5 cursor-pointer"
            >
              نمایشگاه و آتلیه آنلاین بندکشی
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
            </button>

            <button
              onClick={() => navigateToSection("calculator")}
              className="hover:text-[#9e3d24] transition-colors py-2 cursor-pointer"
            >
              محاسبه‌گر و استعلام متراژ
            </button>

            <button
              onClick={() => navigateToSection("projects")}
              className="hover:text-[#9e3d24] transition-colors py-2 cursor-pointer"
            >
              پروژه‌های معماری
            </button>

            <button
              onClick={() => navigateToSection("standards")}
              className="hover:text-[#9e3d24] transition-colors py-2 cursor-pointer"
            >
              استانداردهای آزمایشگاهی
            </button>

            <button
              onClick={() => navigateToSection("price-inquiry")}
              className="text-[#0d9488] hover:text-[#09635b] font-bold transition-colors py-2 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>استعلام قیمت و کارشناسان</span>
            </button>
          </nav>

          {/* Action Header Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigateToSection("price-inquiry")}
              className="border border-[#0d9488] text-[#0d9488] hover:bg-[#0d9488] hover:text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span>استعلام قیمت</span>
            </button>

            <button
              onClick={() => navigateToSection("sample-box")}
              className="bg-[#9e3d24] hover:bg-[#782a15] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>درخواست باکس نمونه</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* VIEW 1: HOME PAGE (CATEGORIES SHOWN FIRST, THEN ALL SPECIALIZED SECTIONS) */}
      {/* ========================================================================= */}
      {activeCategoryId === null ? (
        <main>
          {/* Main Hero Section */}
          <section className="relative overflow-hidden border-b border-[#e8e2d5] bg-gradient-to-b from-[#faf8f5] via-[#faf8f5] to-[#f4eee3] py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Hero Description */}
                <div className="lg:col-span-7">
                  {/* Traditional Persian Architectural Seal */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9e3d24]/10 border border-[#9e3d24]/20 rounded-full text-[#9e3d24] mb-4 shadow-2xs">
                    <span className="font-aviny text-base sm:text-lg">« اصالت کهن خشت و فیروزه نیشابور »</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#0d9488]">معماری فاخر ایرانی</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs tracking-widest text-[#788784] mb-4">
                    <span className="w-8 h-px bg-[#9e3d24]" />
                    <span className="font-medium">آتلیه مهندسی و کارخانه تخصصی آجر فیروزه نیشابور</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#151d1b] leading-[1.25] tracking-tight mb-5">
                    تلاقی اصالت <span className="text-[#9e3d24]">خاک اخرایی</span> و درخشش <span className="text-[#0d9488]">فیروزه</span>
                  </h1>

                  <p className="text-[#4a5754] text-sm sm:text-base leading-relaxed font-light mb-8 max-w-2xl text-justify">
                    برای بررسی مشخصات ابعادی، درصد جذب آب، کاتالوگ رنگی و استعلام لحظه‌ای هر خانواده، لطفاً دسته‌بندی مورد نظر خود را در زیر انتخاب فرمایید تا وارد صفحه اختصاصی آن آجر شوید:
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <a
                      href="#price-inquiry"
                      className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-3 text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                      <span>استعلام فوری قیمت کارخانه</span>
                      <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                    <a
                      href="#categories-directory"
                      className="bg-[#9e3d24] hover:bg-[#782a15] text-white px-6 py-3 text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      مشاهده دسته‌بندی‌های آجر
                    </a>
                    <a
                      href="#atelier"
                      className="bg-transparent border border-[#0d9488] text-[#0d9488] hover:bg-[#0d9488] hover:text-white px-6 py-3 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      ورود به آتلیه آنلاین
                      <span className="w-2 h-2 rounded-full bg-[#0d9488]" />
                    </a>
                  </div>

                  {/* Highlights with Persian Font tabular numerals */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e2d9ca]">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#9e3d24]">۱۴۲۰°C</div>
                      <div className="text-[11px] text-[#788784] mt-0.5 font-medium">پخت کوره مداوم</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#0d9488]">&lt; ۵.۱٪</div>
                      <div className="text-[11px] text-[#788784] mt-0.5 font-medium">جذب آب ضد شوره</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-[#151d1b]">۲۵ سال</div>
                      <div className="text-[11px] text-[#788784] mt-0.5 font-medium">گارانتی ثبات فیزیکی</div>
                    </div>
                  </div>
                </div>

                {/* Left Visual Preview */}
                <div className="lg:col-span-5">
                  <div className="relative border-4 border-white shadow-xl overflow-hidden bg-[#e8dfd1]">
                    <img
                      src="/hero-facade.jpg"
                      alt="نمای اجرا شده آجر فیروزه"
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                    <div className="p-3.5 bg-white text-xs border-t border-[#e8e2d5] flex items-center justify-between">
                      <span className="font-bold text-[#151d1b]">عمارت نیشابور · اجرای معاصر</span>
                      <span className="text-[11px] text-[#0d9488] font-bold">تلفیق اخرایی و فیروزه‌ای</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Persian Architectural Heritage Strip with Aviny Calligraphy */}
          <div className="bg-[#151d1b] text-white py-5 border-y border-[#b89868]/30">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full border border-[#b89868] flex items-center justify-center font-aviny text-xl text-[#14b8a6] bg-[#0d9488]/10 shrink-0">
                  ف
                </div>
                <div>
                  <p className="font-aviny text-xl sm:text-2xl text-[#f3ede2] leading-snug">
                    « خشت بر خشت، پیوند جاودان خاک نیشابور و فیروزه آسمان »
                  </p>
                  <p className="text-[11px] text-[#93a6a2] font-light mt-0.5">
                    تولید با دستگاه‌های تمام‌اتوماتیک هیدرولیک و پخت در بالاترین استاندارد نسوز کشور
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 bg-[#0d9488]/20 border border-[#0d9488]/40 text-[#14b8a6] text-xs font-bold rounded-sm">
                  لعاب اختصاصی دوپخت فیروزه
                </span>
                <span className="px-3 py-1 bg-[#9e3d24]/20 border border-[#9e3d24]/40 text-[#fca5a5] text-xs font-bold rounded-sm">
                  خاک نسوز کائولن نیشابور
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* SECTION 1: PRIMARY CATEGORIES DIRECTORY (در اولویت اول صفحه اصلی)        */}
          {/* ========================================================================= */}
          <section id="categories-directory" className="py-20 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#9e3d24] mb-2 tracking-wider">
                  <span>کاتالوگ جامع دسته‌بندی‌ها</span>
                  <span className="w-12 h-px bg-[#9e3d24]" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#151d1b] tracking-tight">
                  دسته‌بندی‌های تخصصی آجر فیروزه
                </h2>
              </div>
              <p className="text-sm text-[#788784] max-w-md font-light leading-relaxed">
                طیف‌های متنوع آجر نما، سنتی و دکوراتیو کارخانه آجر فیروزه نیشابور با بالاترین استاندارد مهندسی پخت کوره
              </p>
            </div>

            {/* 6 Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className="bg-white border border-[#e8e2d5] hover:border-[#9e3d24] transition-all duration-300 group cursor-pointer shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Category Banner Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd1]">
                      <img
                        src={category.bannerImage}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Subtle Badge */}
                      <div className="absolute top-3 right-3 bg-[#151d1b]/80 backdrop-blur-xs text-white text-xs px-3 py-1 font-medium">
                        {category.badgeText}
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-[#788784] mb-2 font-mono">
                        <span>{category.modelsCount}</span>
                        <span className="text-[#9e3d24] font-bold">۰{index + 1}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-[#151d1b] group-hover:text-[#9e3d24] transition-colors mb-2.5">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#506360] font-light leading-relaxed line-clamp-2">
                        {category.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Clean CTA Link */}
                  <div className="px-6 pb-6 pt-2">
                    <div className="pt-4 border-t border-[#f0eae0] flex items-center justify-between text-xs font-bold text-[#151d1b] group-hover:text-[#9e3d24] transition-colors">
                      <span>مشاهده کالکشن و مدل‌ها</span>
                      <div className="w-8 h-8 rounded-full bg-[#f8f5ee] group-hover:bg-[#9e3d24] group-hover:text-white flex items-center justify-center transition-all duration-300">
                        <svg className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* CALL TO ACTION: DIRECT FACTORY PRICE INQUIRY & EXPERT OPERATORS          */}
          {/* ========================================================================= */}
          <PriceInquiryCTA />

          {/* ========================================================================= */}
          {/* SECTION 2: THE ONLINE MATERIAL SHOWROOM & MORTAR ATELIER (نمایشگاه آنلاین) */}
          {/* ========================================================================= */}
          <section id="atelier" className="py-20 bg-[#151d1b] text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0d9488] mb-2 tracking-widest uppercase">
                    <span>نمایشگاه آنلاین و آتلیه هم‌نشینی متریال</span>
                    <span className="w-12 h-px bg-[#0d9488]" />
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    شبیه‌ساز زنده بندکشی و رنگ آجر نما
                  </h2>
                </div>
                <p className="text-sm text-[#93a6a2] max-w-lg font-light leading-relaxed">
                  رنگ و ضخامت بندکشی، دمای بصری نما را به کلی دگرگون می‌سازد. در این نمایشگاه آنلاین، همنشینی آجر انتخابی‌تان را با انواع ملات‌های مهندسی به صورت زنده آزمایش کنید.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left: Live Simulated Masonry Wall */}
                <div className="lg:col-span-7 bg-[#1c2725] p-6 lg:p-8 border border-[#2a3835] shadow-2xl">
                  <div className="flex items-center justify-between text-xs text-[#93a6a2] pb-4 mb-4 border-b border-[#2a3835]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
                      <span>پیش‌نمایش زنده چیدمان نما (Running Bond)</span>
                    </div>
                    <div className="font-mono text-[11px]">
                      آجر: <b className="text-white">{atelierBrick.name}</b>
                    </div>
                  </div>

                  {/* Live Rendered Wall */}
                  <div
                    className="w-full h-84 sm:h-96 rounded-xs p-3 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                    style={{
                      backgroundColor: selectedMortar.hex,
                      boxShadow: "inset 0 0 35px rgba(0,0,0,0.45)",
                    }}
                  >
                    {[...Array(6)].map((_, rowIndex) => {
                      const isOffset = rowIndex % 2 === 1
                      return (
                        <div
                          key={rowIndex}
                          className="flex gap-2 w-full justify-center"
                          style={{
                            marginBottom: `${mortarWidth / 2.5}px`,
                            height: "14%",
                          }}
                        >
                          {[...Array(isOffset ? 5 : 4)].map((_, colIndex) => {
                            return (
                              <div
                                key={colIndex}
                                className="h-full transition-all duration-300 relative rounded-2xs"
                                style={{
                                  flex: isOffset && (colIndex === 0 || colIndex === 4) ? "0.5" : "1",
                                  backgroundColor: atelierBrick.toneHex,
                                  boxShadow: `0 1px 3px rgba(0,0,0,0.3), inset 0 0 6px ${atelierBrick.accentHex}`,
                                  border: `1px solid ${atelierBrick.accentHex}`,
                                  marginRight: `${mortarWidth / 3}px`,
                                }}
                              >
                                <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-black to-transparent" />
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}

                    {/* Scale marker */}
                    <div className="absolute bottom-3 left-3 bg-[#151d1b]/90 backdrop-blur-xs text-[10px] font-mono px-3 py-1 text-white border border-white/10 flex items-center gap-3">
                      <span>بندکشی: {mortarWidth} میلی‌متر</span>
                      <span>|</span>
                      <span>ملات: {selectedMortar.name}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#151d1b] border border-[#2a3835] text-xs text-[#93a6a2] leading-relaxed">
                    <span className="text-[#0d9488] font-bold block mb-1">تحلیل هارمونی کارشناسی:</span>
                    {selectedMortar.note} — ترکیب با رنگ {atelierBrick.name} جلوه‌ای عمیق و اصیل پدید می‌آورد.
                  </div>
                </div>

                {/* Right: Atelier Controls */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                  {/* Select Brick */}
                  <div className="bg-[#1c2725] p-6 border border-[#2a3835]">
                    <label className="text-xs font-mono font-bold text-[#b89868] uppercase block mb-3">
                      ۱. انتخاب مدل و بافت آجر
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCTS.slice(0, 6).map((brick) => (
                        <button
                          key={brick.id}
                          onClick={() => setAtelierBrick(brick)}
                          className={`p-3 text-right text-xs transition-all border flex items-center gap-2.5 cursor-pointer ${atelierBrick.id === brick.id
                              ? "bg-[#151d1b] border-[#0d9488] text-white shadow-sm"
                              : "bg-[#151d1b]/50 border-transparent text-[#93a6a2] hover:border-[#2a3835]"
                            }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full shrink-0 border border-black/20"
                            style={{ backgroundColor: brick.toneHex }}
                          />
                          <span className="truncate">{brick.name.replace("آجر ", "")}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Mortar Color */}
                  <div className="bg-[#1c2725] p-6 border border-[#2a3835]">
                    <label className="text-xs font-mono font-bold text-[#0d9488] uppercase block mb-3">
                      ۲. پالت رنگ ملات بندکشی نانو
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {MORTAR_COLORS.map((mortar) => (
                        <button
                          key={mortar.name}
                          onClick={() => setSelectedMortar(mortar)}
                          className={`p-3 text-right text-xs transition-all border flex items-center gap-3 cursor-pointer ${selectedMortar.name === mortar.name
                              ? "bg-[#151d1b] border-[#0d9488] text-white shadow-sm"
                              : "bg-[#151d1b]/50 border-transparent text-[#93a6a2] hover:border-[#2a3835]"
                            }`}
                        >
                          <span
                            className="w-5 h-5 rounded-xs shrink-0 border border-white/20"
                            style={{ backgroundColor: mortar.hex }}
                          />
                          <div>
                            <div className="font-bold text-white">{mortar.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Adjust Joint Thickness */}
                  <div className="bg-[#1c2725] p-6 border border-[#2a3835]">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono font-bold text-[#b89868] uppercase">
                        ۳. ضخامت بندکشی (میلی‌متر)
                      </label>
                      <span className="font-mono text-sm font-bold text-[#0d9488]">
                        {mortarWidth} mm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="20"
                      step="1"
                      value={mortarWidth}
                      onChange={(e) => setMortarWidth(Number(e.target.value))}
                      className="w-full accent-[#0d9488] bg-[#151d1b] h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#788784] font-mono mt-2">
                      <span>۶ mm (بند باریک مدرن)</span>
                      <span>۱۰ mm (استاندارد نما)</span>
                      <span>۲۰ mm (بند برجسته سنتی)</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: TECHNICAL ESTIMATOR & ONLINE QUOTE (محاسبه‌گر و استعلام متراژ) */}
          {/* ========================================================================= */}
          <section id="calculator" className="py-20 bg-[#f4eee3] border-b border-[#e8e2d5]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-2xl mx-auto text-center mb-12">
                <span className="text-xs font-mono font-bold text-[#9e3d24] tracking-widest uppercase block mb-2">
                  استعلام و محاسبه‌گر مهندسی نما
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#151d1b] tracking-tight mb-4">
                  برآورد دقیق متراژ، تعداد قالب و تناژ بارگیری
                </h2>
                <p className="text-sm text-[#4a5754] font-light">
                  متراژ نما و نوع آجر را مشخص کنید تا محاسبات دقیق تعداد قالب، ضایعات مجاز و ظرفیت ناوگان حمل کارخانه به صورت لحظه‌ای انجام گیرد.
                </p>
              </div>

              <div className="max-w-5xl mx-auto bg-white border border-[#e2d9ca] shadow-lg grid grid-cols-1 lg:grid-cols-12 overflow-hidden">

                {/* Inputs */}
                <div className="lg:col-span-7 p-8 border-b lg:border-b-0 lg:border-l border-[#e8e2d5]">
                  <h3 className="text-base font-bold text-[#151d1b] mb-6 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#9e3d24] text-white text-xs flex items-center justify-center font-mono">
                      ۱
                    </span>
                    مشخصات نقشه نما
                  </h3>

                  {/* Area Slider */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="wall-area-input-home" className="text-xs font-medium text-[#4a5754]">
                        متراژ خالص سطح نما (متر مربع):
                      </label>
                      <div className="flex items-center gap-1 font-mono text-base font-bold text-[#9e3d24]">
                        <input
                          id="wall-area-input-home"
                          type="number"
                          min="10"
                          max="3000"
                          value={calcArea}
                          onChange={(e) => setCalcArea(Math.max(1, Number(e.target.value)))}
                          className="w-20 text-center border border-[#e8e2d5] py-0.5 bg-[#faf8f5]"
                        />
                        <span className="text-xs text-[#788784]">m²</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="1200"
                      step="10"
                      value={calcArea}
                      onChange={(e) => setCalcArea(Number(e.target.value))}
                      className="w-full accent-[#9e3d24] h-2 bg-[#f0eae0] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Brick Selection */}
                  <div className="mb-6">
                    <label className="text-xs font-medium text-[#4a5754] block mb-2">
                      مدل آجر در نظر گرفته شده:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCTS.slice(0, 6).map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => setCalcBrickType(prod.id)}
                          className={`p-2.5 text-right text-xs border transition-all flex items-center gap-2 cursor-pointer ${calcBrickType === prod.id
                              ? "border-[#9e3d24] bg-[#9e3d24]/5 text-[#9e3d24] font-bold"
                              : "border-[#e8e2d5] text-[#4a5754] hover:border-[#b89868]"
                            }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: prod.toneHex }}
                          />
                          <span className="truncate">{prod.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Joint & Waste */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#4a5754] block mb-1.5">
                        نوع اجرای بندکشی:
                      </label>
                      <select
                        value={calcJoint}
                        onChange={(e) => setCalcJoint(e.target.value as any)}
                        className="w-full text-xs p-2.5 border border-[#e8e2d5] bg-[#faf8f5] text-[#151d1b]"
                      >
                        <option value="standard">بندکشی استاندارد (۱۰ mm)</option>
                        <option value="flush">بند باریک معاصر (۶ mm)</option>
                        <option value="none">خشکه‌چین بدون بند (۰ mm)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#4a5754] block mb-1.5">
                        درصد ضایعات و برش (پرت):
                      </label>
                      <select
                        value={calcWastePercent}
                        onChange={(e) => setCalcWastePercent(Number(e.target.value))}
                        className="w-full text-xs p-2.5 border border-[#e8e2d5] bg-[#faf8f5] text-[#151d1b]"
                      >
                        <option value={3}>۳٪ (پروژه ساده بدون قوس)</option>
                        <option value={5}>۵٪ (استاندارد مهندسی نما)</option>
                        <option value={8}>۸٪ (طرح‌های مشبک و برش‌دار)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Calculation Output */}
                <div className="lg:col-span-5 bg-[#151d1b] text-white p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-[#2a3835] mb-6">
                      <span className="text-xs font-mono text-[#0d9488]">گزارش برآورد مهندسی</span>
                      <span className="text-[11px] text-[#788784]">تحویل درب کارخانه</span>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <span className="text-xs text-[#93a6a2] block mb-1">تعداد قالب مورد نیاز (با احتساب پرت):</span>
                        <div className="text-3xl font-black text-white font-mono">
                          {totalPieces.toLocaleString("fa-IR")}{" "}
                          <span className="text-sm font-normal text-[#0d9488]">قالب</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2a3835] text-xs">
                        <div>
                          <span className="text-[#788784] block">وزن تخمینی بار:</span>
                          <span className="text-white font-bold font-mono text-sm">{totalWeightTons} تن</span>
                        </div>
                        <div>
                          <span className="text-[#788784] block">پودر بندکشی نانو:</span>
                          <span className="text-white font-bold font-mono text-sm">{Math.round(calcArea * 4.2)} کیلو</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#2a3835] text-xs">
                        <span className="text-[#788784] block">ناوگان حمل پیشنهادی:</span>
                        <span className="text-[#0d9488] font-bold text-xs mt-0.5 block">
                          {Number(totalWeightTons) > 20
                            ? "۱ دستگاه تریلی کفی (ظرفیت ۲۴ تن)"
                            : Number(totalWeightTons) > 10
                              ? "۱ دستگاه کامیون ده چرخ (ظرفیت ۱۵ تن)"
                              : "۱ دستگاه خاور روباز (ظرفیت ۵ تن)"}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-[#2a3835]">
                        <span className="text-[#788784] text-xs block mb-1">برآورد تقریبی ارزش متریال:</span>
                        <div className="text-2xl font-black text-[#b89868] font-mono">
                          {Math.round(estimatedMaterialCost).toLocaleString("fa-IR")}{" "}
                          <span className="text-xs font-normal text-white">تومان</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#2a3835]">
                    {quoteRequested ? (
                      <div className="bg-[#0d9488]/20 border border-[#0d9488] text-[#0d9488] p-3 text-center text-xs">
                        درخواست پیش‌فاکتور ثبت شد؛ کارشناس فروش با شما تماس خواهد گرفت.
                      </div>
                    ) : (
                      <button
                        onClick={() => setQuoteRequested(true)}
                        className="w-full bg-[#9e3d24] hover:bg-[#782a15] text-white py-3 text-xs font-bold transition-all text-center cursor-pointer shadow-xs"
                      >
                        دریافت پیش‌فاکتور رسمی و زمان‌بندی بارگیری
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 4: ARCHITECTURAL CASE STUDIES (پروژه‌های شاخص اجرا شده)            */}
          {/* ========================================================================= */}
          <section id="projects" className="py-20 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#9e3d24] mb-2 tracking-wider">
                  <span>شاهکارهای ماندگار</span>
                  <span className="w-12 h-px bg-[#9e3d24]" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#151d1b] tracking-tight">
                  پروژه‌های اجرا شده با آجر فیروزه
                </h2>
              </div>
              <p className="text-sm text-[#788784] max-w-md font-light leading-relaxed">
                مروری بر آثار معماران برجسته که با انتخاب آجر فیروزه، روح پایداری و شکوه هنر ایرانی را در کالبد ساختمان‌های معاصر دمیده‌اند.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PROJECTS.map((proj, idx) => (
                <article
                  key={proj.title}
                  className="bg-white border border-[#e8e2d5] overflow-hidden group shadow-xs hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfd1]">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-[#151d1b]/90 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1">
                      ۰{idx + 1} · {proj.year}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 text-[#151d1b] text-xs font-bold px-3 py-1">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#151d1b] mb-2 group-hover:text-[#9e3d24] transition-colors">
                      {proj.title}
                    </h3>

                    <div className="space-y-2 text-xs text-[#4a5754] font-light pt-3 border-t border-[#f0eae0]">
                      <div className="flex justify-between">
                        <span className="text-[#93a6a2]">موقعیت:</span>
                        <span className="font-medium text-[#151d1b]">{proj.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#93a6a2]">طراح و معمار:</span>
                        <span className="font-medium text-[#151d1b]">{proj.architect}</span>
                      </div>
                      <div className="pt-2 text-[11px] text-[#788784] leading-relaxed">
                        <b>متریال به‌کار رفته:</b> {proj.material}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 5: LABORATORY & TECHNICAL STANDARDS (آزمایشگاه کانی‌شناسی)         */}
          {/* ========================================================================= */}
          <section id="standards" className="py-20 bg-[#fbf9f5] border-t border-[#e8e2d5]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <span className="text-xs font-mono font-bold text-[#0d9488] tracking-widest uppercase block mb-2">
                  کیفیت اثبات‌شده در آزمایشگاه متالورژی
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#151d1b] tracking-tight mb-4">
                  استانداردهای مهندسی آجر فیروزه
                </h2>
                <p className="text-sm text-[#788784] font-light">
                  نتایج آزمون‌های فیزیکی و شیمیایی صورت گرفته در آزمایشگاه همکار استاندارد، ضامن اصالت و ماندگاری نمای پروژه شماست.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 border-t-4 border-t-[#9e3d24] border-x border-b border-[#e8e2d5] shadow-xs">
                  <div className="text-3xl font-black text-[#9e3d24] font-mono mb-2">۴۲ MPa</div>
                  <h3 className="text-sm font-bold text-[#151d1b] mb-2">مقاومت فشاری سازه‌ای</h3>
                  <p className="text-xs text-[#788784] font-light leading-relaxed">
                    تحمل بار فشاری بیش از ۲ برابر حداقل استاندارد ملی ایران شماره ۷؛ مناسب برای دیوارهای باربر و نماهای مرتفع.
                  </p>
                </div>

                <div className="bg-white p-6 border-t-4 border-t-[#0d9488] border-x border-b border-[#e8e2d5] shadow-xs">
                  <div className="text-3xl font-black text-[#0d9488] font-mono mb-2">&lt; ۵.۲٪</div>
                  <h3 className="text-sm font-bold text-[#151d1b] mb-2">آزمون جذب آب مویین</h3>
                  <p className="text-xs text-[#788784] font-light leading-relaxed">
                    تراکم بافت سیلیکاتی مانع نفوذ آب باران و رطوبت به داخل لایه‌های آجر و بروز ترک‌های یخبندانی در زمستان می‌شود.
                  </p>
                </div>

                <div className="bg-white p-6 border-t-4 border-t-[#9e3d24] border-x border-b border-[#e8e2d5] shadow-xs">
                  <div className="text-3xl font-black text-[#9e3d24] font-mono mb-2">صفر٪</div>
                  <h3 className="text-sm font-bold text-[#151d1b] mb-2">شوره و آلوئک (Efflorescence)</h3>
                  <p className="text-xs text-[#788784] font-light leading-relaxed">
                    شستشوی چندمرحله‌ای خاک کائولن و حذف کامل سولفات‌ها؛ تضمین شفافیت رنگ نما حتی در اقلیم‌های فوق‌مرطوب.
                  </p>
                </div>

                <div className="bg-white p-6 border-t-4 border-t-[#0d9488] border-x border-b border-[#e8e2d5] shadow-xs">
                  <div className="text-3xl font-black text-[#0d9488] font-mono mb-2">۱۰۰ سیکل</div>
                  <h3 className="text-sm font-bold text-[#151d1b] mb-2">مقاومت چرخه‌های ذوب و انجماد</h3>
                  <p className="text-xs text-[#788784] font-light leading-relaxed">
                    آزمون موفق ۱۰۰ سیکل متناوب از دمای ۲۰- تا ۶۰+ درجه سانتی‌گراد بدون کوچک‌ترین پوسته‌شدگی یا افت مقاومت.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 6: ARCHITECTURAL SAMPLE BOX REQUEST (درخواست باکس فیزیکی نمونه)    */}
          {/* ========================================================================= */}
          <section id="sample-box" className="py-20 bg-[#151d1b] text-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Visual */}
                <div className="lg:col-span-6">
                  <div className="border border-[#2a3835] p-3 bg-[#1c2725] relative">
                    <img
                      src="/material-lab.jpg"
                      alt="میز متریال و سمپل باکس معماری آجر فیروزه نیشابور"
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                    <div className="mt-4 p-4 bg-[#151d1b] border border-[#2a3835]">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 bg-[#9e3d24]" />
                        <span className="w-3 h-3 bg-[#0d9488]" />
                        <span className="text-xs font-bold text-white">
                          محتویات باکس چوبی نمونه‌های فیروزه:
                        </span>
                      </div>
                      <p className="text-xs text-[#93a6a2] font-light mt-2 leading-relaxed">
                        شامل قطعات واقعی آجر با بافت‌های مختلف، نمونه کاشی لعابدار فیروزه‌ای، کاتالوگ رنگ و شیشه‌های نمونه ملات‌های نانو مخصوص بندکشی.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-6">
                  <span className="text-xs font-mono font-bold text-[#0d9488] tracking-widest uppercase block mb-2">
                    ویژه دفاتر معماری و سازندگان فاخر
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                    سفارش باکس فیزیکی نمونه‌های آجر
                  </h2>
                  <p className="text-sm text-[#93a6a2] font-light leading-relaxed mb-8">
                    دیدن رنگ در مانیتور کافی نیست؛ متریال را در دستان خود لمس کنید، با نور طبیعی آتلیه خود بسنجید و با اطمینان در پروژه‌هایتان بگنجانید. باکس نمونه ظرف ۴۸ ساعت ارسال می‌شود.
                  </p>

                  {sampleSubmitted ? (
                    <div className="bg-[#0d9488]/15 border border-[#0d9488] p-6 text-center">
                      <div className="w-12 h-12 bg-[#0d9488] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        ✓
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">
                        درخواست باکس نمونه شما ثبت شد
                      </h3>
                      <p className="text-xs text-[#93a6a2]">
                        کارشناس آتلیه فیروزه با شماره {samplePhone} تماس گرفته و هماهنگی ارسال به شهر {sampleCity} را انجام خواهد داد.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (samplePhone) setSampleSubmitted(true)
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="sample-firm" className="text-xs text-[#93a6a2] block mb-1.5">
                            نام دفتر معماری یا کارفرما:
                          </label>
                          <input
                            id="sample-firm"
                            type="text"
                            required
                            value={sampleFirm}
                            onChange={(e) => setSampleFirm(e.target.value)}
                            placeholder="مثلاً: آتلیه معماری خاک"
                            className="w-full text-xs p-3 bg-[#1c2725] border border-[#2a3835] text-white placeholder-[#506360] focus:border-[#0d9488] outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="sample-city" className="text-xs text-[#93a6a2] block mb-1.5">
                            شهر و آدرس دفتر:
                          </label>
                          <input
                            id="sample-city"
                            type="text"
                            required
                            value={sampleCity}
                            onChange={(e) => setSampleCity(e.target.value)}
                            placeholder="مثلاً: تهران، نیاوران"
                            className="w-full text-xs p-3 bg-[#1c2725] border border-[#2a3835] text-white placeholder-[#506360] focus:border-[#0d9488] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="sample-phone" className="text-xs text-[#93a6a2] block mb-1.5">
                          شماره تماس مستقیم معمار / مدیر پروژه:
                        </label>
                        <input
                          id="sample-phone"
                          type="tel"
                          required
                          value={samplePhone}
                          onChange={(e) => setSamplePhone(e.target.value)}
                          placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
                          className="w-full text-xs p-3 bg-[#1c2725] border border-[#2a3835] text-white placeholder-[#506360] focus:border-[#0d9488] outline-none font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#9e3d24] hover:bg-[#782a15] text-white py-3.5 text-xs font-bold transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        ارسال رایگان پکیج نمونه‌های فیزیکی
                        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                      <p className="text-[11px] text-[#788784] text-center mt-2">
                        ارسال نمونه برای دفاتر معماری و پروژه‌های در حال ساخت رایگان است.
                      </p>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </section>
        </main>
      ) : (
        /* ========================================================================= */
        /* VIEW 2: CATEGORY DEDICATED PAGE (هیروسکشن همان آجر + کارت‌های آجر)        */
        /* ========================================================================= */
        <main>
          {/* Breadcrumb & Return to All Categories */}
          <div className="bg-[#f3ede2] border-b border-[#e8e2d5] py-3.5 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#788784]">
                <button
                  onClick={() => setActiveCategoryId(null)}
                  className="hover:text-[#9e3d24] transition-colors font-medium cursor-pointer"
                >
                  خانه
                </button>
                <span>/</span>
                <button
                  onClick={() => setActiveCategoryId(null)}
                  className="hover:text-[#9e3d24] transition-colors font-medium cursor-pointer"
                >
                  دسته‌بندی‌های آجر
                </button>
                <span>/</span>
                <span className="text-[#151d1b] font-bold">{currentCategory?.name}</span>
              </div>

              <button
                onClick={() => setActiveCategoryId(null)}
                className="text-[#9e3d24] hover:text-[#782a15] font-bold flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 border border-[#e8e2d5]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>بازگشت به همه دسته‌بندی‌ها</span>
              </button>
            </div>
          </div>

          {/* DEDICATED HERO SECTION FOR THIS SPECIFIC CATEGORY */}
          <section className="relative overflow-hidden bg-[#151d1b] text-white py-16 lg:py-20 border-b border-[#2a3835]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Hero Info */}
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#0d9488] border border-white/10 text-xs font-mono font-bold mb-4">
                    <span>{currentCategory?.latinName}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-5">
                    {currentCategory?.heroHeadline}
                  </h1>

                  <p className="text-[#c7d5d2] text-sm sm:text-base leading-relaxed font-light mb-8 max-w-2xl text-justify">
                    {currentCategory?.heroSubhead}
                  </p>

                  {/* Verified Category Specs */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2a3835]">
                    {currentCategory?.specs.map((spec) => (
                      <div key={spec.label}>
                        <div className="text-lg sm:text-xl font-black text-[#0d9488] font-mono">
                          {spec.value}
                        </div>
                        <div className="text-[11px] text-[#788784] mt-0.5">{spec.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Category Visual Banner */}
                <div className="lg:col-span-5">
                  <div className="relative border-2 border-white/20 shadow-2xl overflow-hidden bg-[#1c2725]">
                    <img
                      src={currentCategory?.bannerImage}
                      alt={currentCategory?.name}
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                    <div className="p-3 bg-[#151d1b] border-t border-[#2a3835] flex items-center justify-between text-xs text-[#93a6a2]">
                      <span>کالکشن کارخانه نیشابور</span>
                      <span className="font-mono text-white">{currentCategory?.modelsCount}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* BRICK PRODUCTS GRID FOR THIS CATEGORY (EXACT USER CARD DESIGN) */}
          <section className="py-20 max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#e8e2d5]">
              <div>
                <span className="text-xs font-mono font-bold text-[#9e3d24] uppercase tracking-wider block mb-1">
                  محصولات آماده سفارش در این دسته
                </span>
                <h2 className="text-2xl font-black text-[#151d1b]">
                  مدل‌های موجود در {currentCategory?.name}
                </h2>
              </div>
              <div className="text-xs text-[#788784]">
                نمایش <b>{categoryProducts.length}</b> مدل با مشخصات ابعادی و قیمت رسمی
              </div>
            </div>

            {/* Product Cards Grid matching the exact design from user image */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <BrickProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  onWhatsApp={(name, id) => handleWhatsAppInquiry(name, id)}
                />
              ))}
            </div>

            {/* Quick Switcher to Other Categories */}
            <div className="mt-20 p-8 bg-[#f3ede2] border border-[#e8e2d5] text-center">
              <h3 className="text-base font-bold text-[#151d1b] mb-4">
                کاوش در سایر دسته‌بندی‌های آجر فیروزه:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.filter((c) => c.id !== activeCategoryId).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryId(cat.id)}
                    className="bg-white hover:bg-[#9e3d24] hover:text-white border border-[#e8e2d5] text-[#151d1b] px-4 py-2 text-xs font-medium transition-all cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ========================================================================= */}
      {/* PRODUCT SPECIFICATION MODAL                                               */}
      {/* ========================================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div className="bg-white max-w-xl w-full border border-[#b89868] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 left-4 text-[#788784] hover:text-[#151d1b] text-xl font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#1f2937] text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                {selectedProduct.id}
              </span>
              <span className="text-xs text-[#0d9488] font-bold">
                {selectedProduct.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#151d1b] mb-1">
              {selectedProduct.name}
            </h3>
            <div className="text-xs font-mono text-[#788784] mb-4">
              {selectedProduct.latinName}
            </div>

            <p className="text-xs text-[#4a5754] leading-relaxed mb-6 font-light">
              {selectedProduct.description}
            </p>

            {/* Complete Specs Grid */}
            <div className="bg-[#fbf7ee] rounded-xl p-4 border border-[#f3ede0] grid grid-cols-2 gap-4 text-xs mb-6">
              <div>
                <span className="text-[11px] text-[#788784] block">ابعاد استاندارد:</span>
                <span className="font-bold text-[#0e4a45] font-mono text-sm">{selectedProduct.dimensions}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#788784] block">درصد جذب آب:</span>
                <span className="font-bold text-[#0e4a45] font-mono text-sm">{selectedProduct.waterAbs}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#788784] block">تعداد در هر مترمربع:</span>
                <span className="font-bold text-[#0e4a45] font-mono text-sm">{selectedProduct.piecesPerMeter}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#788784] block">دمای پخت کوره:</span>
                <span className="font-bold text-[#0e4a45] font-mono text-sm">{selectedProduct.kilnTemp}</span>
              </div>
            </div>

            {/* Price Preview */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#f0eae0]">
              <span className="text-xs text-[#788784]">قیمت پایه هر مترمربع:</span>
              <span className="text-xl font-black text-[#9e3d24] font-mono">
                {selectedProduct.pricePerMeter.toLocaleString("fa-IR")} تومان
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleWhatsAppInquiry(selectedProduct.name, selectedProduct.id)
                  setSelectedProduct(null)
                }}
                className="flex-1 bg-[#0d9488] hover:bg-[#0f766e] text-white py-3 text-xs font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>استعلام بارگیری و سفارش فوری در واتساپ</span>
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-3 border border-[#e8e2d5] text-xs font-medium text-[#788784] hover:bg-[#faf8f5] cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dignified Architectural Footer */}
      <footer className="bg-[#101715] text-[#93a6a2] border-t border-[#232f2c] pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#232f2c]">
            <div className="md:col-span-5">
              <span className="text-lg font-black text-white block mb-3">آجر فیروزه نیشابور</span>
              <p className="text-xs text-[#93a6a2] font-light leading-relaxed max-w-sm mb-4">
                تولیدکننده تخصصی انواع آجر نسوز نما، انگلیسی، طوسی کهکشانی، شاموتی، قزاقی دست‌ساز و کاشی لعابدار فیروزه.
              </p>
              <div className="text-xs text-[#788784] font-mono">
                دفتر کارخانه: نیشابور، فاز صنعتی نسوز · تلفن: ۰۵۱-۴۲۲۰۰۰۰۰
              </div>
            </div>

            <div className="md:col-span-7 flex flex-wrap gap-4 items-center justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className="text-xs text-[#93a6a2] hover:text-[#0d9488] transition-colors cursor-pointer border border-[#232f2c] px-3 py-1.5"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#506360] gap-4">
            <div>© کلیه حقوق برای کارخانه آجر فیروزه نیشابور محفوظ است.</div>
            <div>تضمین کیفیت و ثبات رنگ ۲۵ ساله کتبی</div>
          </div>
        </div>
      </footer>


    </div>
  )
}

// =========================================================================
// BRICK PRODUCT CARD COMPONENT
// EXACTLY MATCHING THE USER'S ATTACHED DESIGN
// =========================================================================
interface BrickProductCardProps {
  product: BrickProduct
  onSelect: (product: BrickProduct) => void
  onWhatsApp: (name: string, id: string) => void
}

function BrickProductCard({ product, onSelect, onWhatsApp }: BrickProductCardProps) {
  return (
    <article className="bg-white border border-[#e5e7eb] rounded-2xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Image Container */}
        <div className="relative aspect-[16/11] overflow-hidden bg-[#e8dfd1]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top-Right Badge: Dark Pill with Code e.g. HK-105 */}
          <div className="absolute top-3.5 right-3.5 bg-[#1f2937] text-white text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
            {product.id}
          </div>

          {/* Top-Left Badge: Green/Turquoise Pill with Status e.g. آماده بارگیری • */}
          <div className="absolute top-3.5 left-3.5 bg-[#10b981] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span>{product.badgeStatus}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          </div>

          {/* Bottom-Left Badge: White Pill with Ochre/Red Text e.g. آجر نسوز نما */}
          <div className="absolute bottom-3 left-3 bg-white/95 text-[#9e3d24] text-xs font-bold px-3 py-1 rounded-full shadow-md border border-black/5">
            {product.badgeTag}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 pb-2">
          {/* Main Title (Centered, Bold, Dark Teal) */}
          <h3 className="text-base sm:text-lg font-black text-[#0a423e] text-center mb-1 line-clamp-1 group-hover:text-[#9e3d24] transition-colors">
            {product.name}
          </h3>

          {/* Subtitle (Latin Caps, Subtle Grey) */}
          <div className="text-[11px] font-semibold text-[#6b7280] tracking-wider text-center font-sans mb-4">
            {product.latinName}
          </div>

          {/* Technical Specs 2x2 Grid (Warm Cream/Beige Container) */}
          <div className="bg-[#fbf7ee] rounded-2xl p-4 border border-[#f3ede0] grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs mb-4">
            {/* Row 1 Right: ابعاد استاندارد */}
            <div className="text-right">
              <span className="text-[11px] text-[#788784] block font-light">ابعاد استاندارد</span>
              <span className="text-[#0a423e] font-bold font-mono text-xs sm:text-[13px] mt-0.5 block">
                {product.dimensions}
              </span>
            </div>

            {/* Row 1 Left: درصد جذب آب */}
            <div className="text-left">
              <span className="text-[11px] text-[#788784] block font-light">درصد جذب آب</span>
              <span className="text-[#0a423e] font-bold font-mono text-xs sm:text-[13px] mt-0.5 block">
                {product.waterAbs}
              </span>
            </div>

            {/* Row 2 Right: تعداد در متر */}
            <div className="text-right">
              <span className="text-[11px] text-[#788784] block font-light">تعداد در متر</span>
              <span className="text-[#0a423e] font-bold font-mono text-xs sm:text-[13px] mt-0.5 block">
                {product.piecesPerMeter}
              </span>
            </div>

            {/* Row 2 Left: پخت کوره */}
            <div className="text-left">
              <span className="text-[11px] text-[#788784] block font-light">پخت کوره</span>
              <span className="text-[#0a423e] font-bold font-mono text-xs sm:text-[13px] mt-0.5 block">
                {product.kilnTemp}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action & Price Footer */}
      <div className="p-5 sm:p-6 pt-0">
        {/* Solid Separator */}
        <div className="border-t border-gray-100 mb-4" />

        {/* Price & Primary Action Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Left Action Button: Dark Teal Pill */}
          <button
            onClick={() => onSelect(product)}
            className="bg-[#0a3834] hover:bg-[#072a27] text-white px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0"
          >
            <span>مشاهده جزئیات و خرید</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Right Price Display */}
          <div className="text-right">
            <span className="text-[10px] text-[#788784] block font-light">قیمت پایه هر مترمربع</span>
            <span className="text-base sm:text-lg font-black text-[#9e3d24] font-mono leading-tight">
              {product.pricePerMeter.toLocaleString("fa-IR")}{" "}
              <span className="text-xs font-bold">تومان</span>
            </span>
          </div>
        </div>

        {/* Dotted Separator */}
        <div className="border-t border-dashed border-gray-200 my-3" />

        {/* Full-Width WhatsApp Button (Mint/Light Turquoise) */}
        <button
          onClick={() => onWhatsApp(product.name, product.id)}
          className="w-full bg-[#f0fdf9] hover:bg-[#e0f7f1] border border-[#a7f3d0] text-[#0d9488] rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>استعلام فوری واتساپ</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </article>
  )
}
