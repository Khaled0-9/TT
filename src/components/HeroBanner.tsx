import React from 'react';
import { Sparkles, ArrowRight, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroBannerProps {
  onExplore: () => void;
  onOpenDiscovery: () => void;
  onOpenQuiz: () => void;
  lang: 'en' | 'ar';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExplore,
  onOpenDiscovery,
  onOpenQuiz,
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <div className="relative w-full">
      {/* Hero Visual Section */}
      <div className="relative h-[580px] sm:h-[640px] lg:h-[720px] w-full bg-stone-900 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <img
          src="/src/assets/hero.jpg"
          alt="IL VANTO luxury fragrance bottles collection"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-stone-950/50" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white flex flex-col items-center">
          {/* Brand Philosophy Sub-badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-5 animate-in fade-in zoom-in duration-500">
            <span className="w-2 h-2 rounded-full bg-[#E5C78A] animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#E7D6B5] uppercase">
              {isAr ? 'الفخامة لم تكن باهظة يوماً' : 'LUXURY WAS A LIE'}
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1] drop-shadow-md">
            {isAr ? (
              <>
                <span className="block text-3xl sm:text-5xl font-light text-stone-200 mb-1">
                  عرض الباقة الشتوية
                </span>
                <span className="text-[#F5E6CA]">2 عطر 100 مل بـ 1400 ج.م</span>
              </>
            ) : (
              <>
                <span className="block text-3xl sm:text-5xl font-light text-stone-200 mb-1">
                  Any 2 x 100ML
                </span>
                <span className="text-[#F5E6CA]">For 1400 EGP</span>
              </>
            )}
          </h1>

          {/* Subtext description */}
          <p className="max-w-2xl text-stone-200 text-sm sm:text-base lg:text-lg mb-8 font-light leading-relaxed">
            {isAr
              ? 'أرقى بدائل النيش العالمية بجودة زيوت نقية فرنسية، ثبات أسطوري، وسعر يحترم ذكاءك.'
              : 'Masterpiece niche impressions crafted with high-percentage French oils, extraordinary sillage, and accessible luxury.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md">
            <button
              onClick={onExplore}
              className="flex-1 min-w-[160px] py-3.5 px-6 rounded-full bg-[#947c50] hover:bg-[#806a42] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-[#947c50]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isAr ? 'تسوق التشكيلة' : 'EXPLORE'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            <button
              onClick={onOpenDiscovery}
              className="flex-1 min-w-[160px] py-3.5 px-6 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-medium text-xs sm:text-sm uppercase tracking-[0.16em] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E5C78A]" />
              <span>{isAr ? 'بوكس العينات (490 ج.م)' : 'Discovery Set'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Reviews Indicator Bar (matching il-vanto.com) */}
      <div className="w-full bg-[#F3F0E6] border-b border-[#E3DECF] py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-stone-800">
          {/* Star reviews counter */}
          <div className="flex items-center gap-2 font-medium">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="font-bold text-stone-900">4.89</span>
            <span className="text-stone-500">{isAr ? 'نجوم' : 'stars'}</span>
            <span className="text-stone-300">•</span>
            <span className="font-bold text-stone-900">2,000+</span>
            <span className="text-stone-500">{isAr ? 'تقييم موثق' : 'reviews'}</span>
            <span className="text-stone-300">•</span>
            <span className="font-bold text-stone-900">50K+</span>
            <span className="text-stone-500">{isAr ? 'عاشق للعطور' : 'members'}</span>
          </div>

          {/* Quick value props */}
          <div className="hidden md:flex items-center gap-6 text-xs text-stone-600">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#947c50]" />
              <span>{isAr ? 'شحن سريع لجميع المحافظات' : 'Fast 48-72h Delivery'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#947c50]" />
              <span>{isAr ? 'زيوت نقية معتمدة IFRA' : 'IFRA Certified French Oils'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-[#947c50]" />
              <span>{isAr ? 'ضمان استرجاع 14 يوماً' : '14-Day Free Returns'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
