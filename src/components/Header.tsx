import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, Globe, User, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenScentQuiz: () => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenScentQuiz,
  lang,
  onToggleLang,
  activeCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const isAr = lang === 'ar';

  const navLinks = [
    { id: 'all', label: isAr ? 'الرئيسية' : 'Home' },
    { id: 'new-drops', label: isAr ? 'أحدث الإصدارات' : 'NEW DROPS' },
    { id: 'bestsellers', label: isAr ? 'الأكثر مبيعاً' : 'Bestsellers' },
    { id: 'men', label: isAr ? 'للرجال' : 'For Him' },
    { id: 'women', label: isAr ? 'للنساء' : 'For Her' },
    { id: 'discovery', label: isAr ? 'مجموعة الاكتشاف' : 'Discovery Sets' },
  ];

  const handleNavClick = (id: string) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
      {/* Top Marquee Announcement Bar */}
      <div className="bg-[#947c50] text-[#FFFDF9] text-xs font-medium tracking-widest uppercase overflow-hidden py-2 border-b border-[#836d44] select-none">
        <div className="animate-ticker flex items-center gap-12 whitespace-nowrap">
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F3E7CA]" />
            {isAr ? 'عطور بدائل النيش الفاخرة' : 'INDULGE YOUR SENSES'}
          </span>
          <span>•</span>
          <span className="font-semibold text-white">
            {isAr ? 'شحن مجاني للطلبات فوق 2,000 ج.م' : 'FREE DELIVERY ABOVE 2,000 EGP'}
          </span>
          <span>•</span>
          <span className="bg-[#FAF9F5] text-[#947c50] px-2 py-0.5 rounded text-[11px] font-bold">
            {isAr ? 'عرض 2 × 100ML بـ 1400 ج.م' : 'SPECIAL: 2 x 100ML FOR 1400 EGP'}
          </span>
          <span>•</span>
          <span>{isAr ? 'عينات مجانية مع كل طلب' : 'COMPLIMENTARY TESTER VIAL WITH EVERY BOTTLE'}</span>
          <span>•</span>
          <span>{isAr ? 'ضمان استرجاع واستبدال 14 يوماً' : '14-DAY RISK-FREE SATISFACTION GUARANTEE'}</span>
          <span>•</span>
          {/* Duplicate for infinite loop */}
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F3E7CA]" />
            {isAr ? 'عطور بدائل النيش الفاخرة' : 'INDULGE YOUR SENSES'}
          </span>
          <span>•</span>
          <span className="font-semibold text-white">
            {isAr ? 'شحن مجاني للطلبات فوق 2,000 ج.م' : 'FREE DELIVERY ABOVE 2,000 EGP'}
          </span>
          <span>•</span>
          <span className="bg-[#FAF9F5] text-[#947c50] px-2 py-0.5 rounded text-[11px] font-bold">
            {isAr ? 'عرض 2 × 100ML بـ 1400 ج.م' : 'SPECIAL: 2 x 100ML FOR 1400 EGP'}
          </span>
          <span>•</span>
          <span>{isAr ? 'عينات مجانية مع كل طلب' : 'COMPLIMENTARY TESTER VIAL WITH EVERY BOTTLE'}</span>
          <span>•</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
        {/* Left: Mobile Menu Toggle & Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 hover:text-stone-950 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-200/50"
            aria-label="Open search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs uppercase tracking-[0.18em] transition-colors pb-1 relative font-medium ${
                  activeCategory === link.id
                    ? 'text-[#947c50] font-semibold'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {link.label}
                {activeCategory === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#947c50]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex items-center justify-center flex-col cursor-pointer group shrink-0" onClick={() => onSelectCategory('all')}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Hand-drawn Botanical Oval Crest */}
            <div className="w-7 h-9 sm:w-9 sm:h-11 border border-stone-800 rounded-full flex items-center justify-center p-0.5 sm:p-1 relative overflow-hidden group-hover:border-[#947c50] transition-colors">
              <svg viewBox="0 0 24 32" className="w-full h-full fill-none stroke-current text-stone-800 group-hover:text-[#947c50] transition-colors">
                <path d="M12 28V6" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M12 18C15 15 19 16 19 12C16 12 13 15 12 18Z" strokeWidth="1" />
                <path d="M12 14C9 11 5 12 5 8C8 8 11 11 12 14Z" strokeWidth="1" />
                <path d="M12 6C13.5 3 10.5 2 12 1C13.5 2 10.5 3 12 6Z" strokeWidth="1" />
              </svg>
            </div>
            <div className="text-center">
              <span className="block font-cinzel-brand text-base sm:text-2xl font-bold tracking-[0.18em] sm:tracking-[0.25em] text-stone-900 group-hover:text-[#947c50] transition-colors">
                IL VANTO
              </span>
              <span className="block text-[8px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-stone-500 font-medium -mt-1">
                PARFUMS DE LUXE
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          {/* Scent Quiz Button */}
          <button
            onClick={onOpenScentQuiz}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D5CDBC] bg-[#F4F1EA] text-stone-800 hover:bg-[#EAE4D7] text-xs font-medium tracking-wide transition-colors"
            title={isAr ? 'اختبار اختيار العطر المناسب' : 'Fragrance Finder'}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#947c50]" />
            <span>{isAr ? 'اكتشف عطرك' : 'Scent Quiz'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-semibold rounded-md border border-stone-300 hover:border-stone-400 bg-white/70 text-stone-800 transition-colors"
            aria-label="Toggle language"
            title="Switch language / تغيير اللغة"
          >
            <Globe className="w-3 h-3 text-stone-600" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Account Modal Trigger */}
          <button
            onClick={() => setShowAccountModal(true)}
            className="hidden sm:flex p-2 text-stone-700 hover:text-stone-950 transition-colors rounded-full hover:bg-stone-200/50"
            aria-label="Open account page"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 sm:p-2.5 bg-stone-900 hover:bg-[#947c50] text-white rounded-full transition-all shadow-sm flex items-center justify-center group"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B39359] text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-[#FAF9F5] shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E8E4DA] px-6 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left rtl:text-right py-2 px-3 rounded-md text-xs font-medium uppercase tracking-wider transition-colors ${
                  activeCategory === link.id
                    ? 'bg-[#947c50] text-white'
                    : 'text-stone-800 hover:bg-stone-200/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenScentQuiz();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-[#947c50]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'اختبار اكتشف عطرك المثالي' : 'Find Your Signature Scent'}</span>
            </button>
            <button
              onClick={onToggleLang}
              className="text-xs font-medium text-stone-600 underline"
            >
              {isAr ? 'Switch to English' : 'التحويل للعربية'}
            </button>
          </div>
        </div>
      )}

      {/* Simple Account Info Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 text-stone-900">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif-luxury text-lg font-semibold">
                {isAr ? 'حساب العميل' : 'Customer Account'}
              </h3>
              <button
                onClick={() => setShowAccountModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-stone-600 mb-4">
              {isAr
                ? 'مرحباً بك في إل فانتو. يمكنك إتمام طلبك بدون تسجيل، أو تتبع طلباتك عبر البريد ورقم الهاتف.'
                : 'Welcome to IL VANTO. You can order with fast 1-click guest checkout, or track your packages directly.'}
            </p>
            <div className="bg-[#FAF9F5] p-3 rounded-lg border border-stone-200 text-xs space-y-1 mb-4">
              <div className="font-semibold text-stone-800">{isAr ? 'خدمة العملاء' : 'Customer Concierge'}:</div>
              <div className="text-stone-600">WhatsApp / Call: +20 102 345 6789</div>
              <div className="text-stone-600">support@il-vanto.com</div>
            </div>
            <button
              onClick={() => setShowAccountModal(false)}
              className="w-full py-2.5 bg-stone-900 text-white rounded-md text-xs font-medium uppercase tracking-wider hover:bg-stone-800"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
