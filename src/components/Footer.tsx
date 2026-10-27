import React, { useState } from 'react';
import { Sparkles, Shield, Heart, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  lang: 'en' | 'ar';
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, lang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const isAr = lang === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#1A1816] text-[#E7E2D6] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Grid */}
        <div className="pb-12 border-b border-stone-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E5C78A] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'عضوية نادي إل فانتو' : 'Join Il Vanto Club'}</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
              {isAr
                ? 'اشترك ليصلك جديد الإصدارات والخصومات الحصرية'
                : 'Sign up for new stories and personal offers'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              {isAr
                ? 'احصل فوراً على كود خصم 10% على أول طلب لك بعد الاشتراك.'
                : 'Receive an instant 10% coupon code and priority access to limited seasonal drops.'}
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#282522] border border-[#947c50]/50 text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#947c50] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F5E6CA]">
                    {isAr ? 'تم الاشتراك بنجاح! كود خصمك: WELCOME10' : 'Welcome! Use code: WELCOME10 for 10% off'}
                  </div>
                  <div className="text-xs text-stone-400">
                    {isAr ? 'قم بنسخ الكود واستخدامه عند السلة.' : 'Enter code in your cart drawer to save.'}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAr ? 'أدخل بريدك الإلكتروني...' : 'Enter your email...'}
                  className="flex-grow px-4 py-3 rounded-lg bg-stone-900 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-[#947c50]"
                />
                <button
                  type="submit"
                  className="py-3 px-6 rounded-lg bg-[#947c50] hover:bg-[#836c43] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                >
                  {isAr ? 'اشتراك' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links & Brand Story */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="font-cinzel-brand text-xl font-bold tracking-[0.2em] text-white">
              IL VANTO
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#C4B59D]">
              PARFUMS DE LUXE
            </div>
            <p className="text-stone-400 leading-relaxed pt-1">
              {isAr
                ? 'دار عطور نيش فاخرة تقدم إبداعات عطرية مستوحاة من أشهر العطور العالمية بأعلى معايير الجودة وثبات يدوم طويلاً.'
                : 'A niche perfume house offering masterfully formulated impressions of the world’s most coveted iconic scents.'}
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'التشكيلات' : 'Collections'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('new-drops')}
                  className="hover:text-white transition-colors"
                >
                  {isAr ? 'أحدث الإصدارات' : 'Winter Launches S’2026'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bestsellers')}
                  className="hover:text-white transition-colors"
                >
                  {isAr ? 'الأكثر طلباً' : 'Bestselling Fragrances'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('men')}
                  className="hover:text-white transition-colors"
                >
                  {isAr ? 'عطور الرجال' : 'For Him'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('women')}
                  className="hover:text-white transition-colors"
                >
                  {isAr ? 'عطور النساء' : 'For Her'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('discovery')}
                  className="hover:text-white transition-colors"
                >
                  {isAr ? 'بوكس العينات (5 × 5 مل)' : 'Discovery Set (5 x 5ML)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Service & Policies */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'خدمة العملاء' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>{isAr ? 'سياسة الاستبدال والاسترجاع (14 يوماً)' : '14-Day Return & Exchange Policy'}</li>
              <li>{isAr ? 'الشحن والتوصيل (مجاني فوق 2000 ج.م)' : 'Delivery (Free over 2,000 EGP)'}</li>
              <li>{isAr ? 'شهادات نقاء الزيوت IFRA' : 'IFRA Purity Compliance'}</li>
              <li>{isAr ? 'الدفع عند الاستلام متاح لجميع المحافظات' : 'Cash On Delivery Available'}</li>
            </ul>
          </div>

          {/* Follow us & Social */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              {isAr ? 'تابعنا على مواقع التواصل' : 'Connect With Us'}
            </h4>
            <div className="flex flex-col space-y-2 text-stone-400">
              <a
                href="https://www.instagram.com/il_vanto/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E5C78A] transition-colors"
              >
                Instagram: @il_vanto
              </a>
              <a
                href="https://www.tiktok.com/@il.vanto"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E5C78A] transition-colors"
              >
                TikTok: @il.vanto
              </a>
              <a
                href="https://www.facebook.com/p/Il-vanto-61578330161227/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E5C78A] transition-colors"
              >
                Facebook: Il Vanto
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div>
            © 2026 IL VANTO. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4">
            <span>Visa • Mastercard • Meeza • Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
