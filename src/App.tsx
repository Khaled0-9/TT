import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, REVIEWS } from './data/products';
import { Product, CartItem, Review } from './types';
import { calculateCartTotals } from './utils/cartPricing';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { DiscoverySetModal } from './components/DiscoverySetModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Check,
  Package,
  Layers,
  HeartHandshake,
  Compass,
} from 'lucide-react';

export default function App() {
  // Default to Arabic because user asked in Arabic ("عايزك تعملي موقع زي دا"), toggleable at any time
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('il_vanto_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isAr = lang === 'ar';

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('il_vanto_cart', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  // Set HTML dir and lang attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  }, [lang, isAr]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart calculations using our decoupled tested utility
  const cartTotals = useMemo(() => {
    return calculateCartTotals(cartItems, appliedPromo);
  }, [cartItems, appliedPromo]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
  }, [cartItems]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, selectedSamples?: string[]) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && !selectedSamples
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          selectedSamples,
        };
        return [...prev, newItem];
      }
    });

    const name = isAr ? product.nameAr : product.name;
    showToast(
      isAr
        ? `تمت إضافة "${name}" إلى حقيبة التسوق!`
        : `Added "${name}" to your shopping bag!`
    );
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    setAppliedPromo('');
  };

  const discoveryProduct = PRODUCTS.find((p) => p.isDiscoverySet) || PRODUCTS[0];

  // Filtering products
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS.filter((p) => !p.isDiscoverySet);
    if (activeCategory === 'new-drops') return PRODUCTS.filter((p) => p.isNewDrop);
    if (activeCategory === 'bestsellers') return PRODUCTS.filter((p) => p.isBestseller);
    if (activeCategory === 'men') return PRODUCTS.filter((p) => p.gender === 'men' || p.gender === 'unisex');
    if (activeCategory === 'women') return PRODUCTS.filter((p) => p.gender === 'women' || p.gender === 'unisex');
    if (activeCategory === 'discovery') return PRODUCTS.filter((p) => p.isDiscoverySet);

    // Family categories
    return PRODUCTS.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase() && !p.isDiscoverySet
    );
  }, [activeCategory]);

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAF9F5] ${isAr ? 'font-arabic-luxury' : 'font-sans'}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-[#947c50]/50 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300">
          <div className="w-5 h-5 rounded-full bg-[#947c50] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenScentQuiz={() => setIsQuizOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          if (cat === 'discovery') {
            setIsDiscoveryOpen(true);
          } else {
            setActiveCategory(cat);
          }
        }}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Editorial Hero Banner */}
        <HeroBanner
          onExplore={() => {
            const el = document.getElementById('collection-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenDiscovery={() => setIsDiscoveryOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          lang={lang}
        />

        {/* 2 x 100ML Bundle Showcase Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl border border-[#E4DEC9] shadow-lg p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F6F2E8] border border-[#E2D8C3] flex items-center justify-center text-[#947c50] shrink-0">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#947c50]/10 text-[#7A633B] text-[11px] font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  {isAr ? 'العرض الأكثر توفيراً في مصر' : 'BEST VALUE PROMOTION'}
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
                  {isAr ? 'عرض الـ 2 × 100ML بـ 1400 ج.م' : 'Any 2 x 100ML For 1400 EGP'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  {isAr
                    ? 'سعر الزجاجة الواحدة 1,200 ج.م — أضف أي زجاجتين واحصل عليهما معاً بـ 1400 ج.م فقط (وفر 1,000 ج.م فوراً).'
                    : 'Regular bottle is 1,200 EGP — add any two 100ML perfumes to your cart and unlock the 1,400 EGP bundle price.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-stone-200">
              <div className="text-right rtl:text-left">
                <span className="text-xs text-stone-500 block">
                  {isAr ? 'في سلتك الآن:' : 'Currently in bag:'}
                </span>
                <span className="font-bold text-stone-900 text-sm">
                  {cartTotals.bottle100mlCount} {isAr ? 'زجاجة 100 مل' : 'bottles (100ml)'}
                </span>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById('collection-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-3 px-6 rounded-xl bg-stone-900 hover:bg-[#947c50] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>{isAr ? 'اختر عطريك الآن' : 'Pick Your Pair'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </section>

        {/* Collection Grid Section */}
        <section id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section Heading & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#947c50] block mb-1">
                {isAr ? 'شتاء 2026' : 'Winter Launches S’2026'}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
                {activeCategory === 'new-drops'
                  ? isAr
                    ? 'أحدث الإصدارات'
                    : 'New Drops'
                  : activeCategory === 'bestsellers'
                  ? isAr
                    ? 'العطور الأكثر طلباً'
                    : 'Most Popular Bestsellers'
                  : isAr
                  ? 'تشكيلة عطور إل فانتو النيش'
                  : 'Niche Fragrance Collection'}
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', en: 'All Scents', ar: 'كل العطور' },
                { id: 'bestsellers', en: 'Bestsellers', ar: 'الأكثر مبيعاً' },
                { id: 'new-drops', en: 'New Drops', ar: 'جديد' },
                { id: 'men', en: 'For Him', ar: 'رجالي' },
                { id: 'women', en: 'For Her', ar: 'نسائي' },
                { id: 'oriental', en: 'Oriental', ar: 'شرقي' },
                { id: 'woody', en: 'Woody', ar: 'خشبي' },
                { id: 'gourmand', en: 'Gourmand', ar: 'جورماند' },
                { id: 'citrus', en: 'Citrus', ar: 'حمضيات' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  {isAr ? tab.ar : tab.en}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                lang={lang}
              />
            ))}
          </div>
        </section>

        {/* "Pick Your Energy" Occasions Showcase (matching il-vanto.com) */}
        <section className="w-full py-16 bg-[#F4F1EA] border-y border-[#E4DEC9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#947c50] block mb-2">
                {isAr ? 'عطرك لكل مناسبة' : 'Our picks for every occasion'}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
                {isAr ? 'اختر طاقتك العطرية' : 'Pick Your Energy'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                {isAr
                  ? 'تمت صياغة كل عطر ليمنحك هالة خاصة تليق بحضورك في كل وقت ومكان.'
                  : 'Tailored olfactory mood boards calibrated to elevate your aura anywhere you go.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  titleEn: 'SUMMER FRESH',
                  titleAr: 'انتعاش صيفي نقي',
                  subEn: 'Euphoria & Chillwave',
                  subAr: 'يوفوريا وتشيل ويف',
                  descEn: 'Smoky Ceylon tea, Italian bergamot & ambergris',
                  descAr: 'شاي أسود مدخن، برغموت كالابريا وعنبر فاخر',
                  category: 'citrus',
                  image: '/src/assets/fresh_woods.jpg',
                },
                {
                  titleEn: 'CLASSICAL DATE',
                  titleAr: 'سهرة كلاسيكية دافئة',
                  subEn: 'Hookah & Velvet Dream',
                  subAr: 'هوكا وفلفت دريم',
                  descEn: 'Apple shisha tobacco, bourbon vanilla & jasmine',
                  descAr: 'معسل تفاح مدخن، فانيليا بوربون وياسمين',
                  category: 'oriental',
                  image: '/src/assets/spiced_amber.jpg',
                },
                {
                  titleEn: 'STARBOY COLLECTION',
                  titleAr: 'مجموعة ستار بوي الجريئة',
                  subEn: 'Spiced Amber & Golden Essence',
                  subAr: 'سبايسد أمبر وجولدن إيسنس',
                  descEn: 'Dark rum, blazing honey & roasted tonka bean',
                  descAr: 'رم مدخن، عسل ذهبي مسكور وحبوب التونكا',
                  category: 'bestsellers',
                  image: '/src/assets/hero.jpg',
                },
                {
                  titleEn: 'OFFICE FRESH',
                  titleAr: 'أناقة واثقة للعمل',
                  subEn: 'Wild Woods & Carnation',
                  subAr: 'وايلد وودز وكارنيشن',
                  descEn: 'Akigalawood, smoky pineapple & royal birch',
                  descAr: 'خشب الأكيجالاوود، أناناس مدخن وبتولا ملكي',
                  category: 'woody',
                  image: '/src/assets/fresh_woods.jpg',
                },
              ].map((card, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setActiveCategory(card.category);
                    const el = document.getElementById('collection-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-stone-900 aspect-[4/5] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  <img
                    src={card.image}
                    alt={card.titleEn}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] group-hover:scale-108 group-hover:brightness-[0.7] transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-semibold text-[#E5C78A] uppercase tracking-widest mb-1">
                      {isAr ? card.subAr : card.subEn}
                    </span>
                    <h3 className="font-serif-luxury text-xl font-bold mb-1 leading-tight">
                      {isAr ? card.titleAr : card.titleEn}
                    </h3>
                    <p className="text-xs text-stone-300 font-light line-clamp-2 mb-4">
                      {isAr ? card.descAr : card.descEn}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5E6CA] group-hover:text-white transition-colors">
                      <span>{isAr ? 'استكشف المجموعة' : 'Explore Scents'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discovery Set Spotlight Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-[#1C1A17] rounded-3xl overflow-hidden text-white border border-stone-800 shadow-2xl flex flex-col lg:flex-row items-center">
            {/* Image */}
            <div className="lg:w-1/2 w-full aspect-video lg:aspect-square relative overflow-hidden">
              <img
                src="/src/assets/discovery.jpg"
                alt="IL VANTO luxury sample discovery flight box"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#E5C78A] text-xs font-semibold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>{isAr ? 'جرب قبل الشراء' : 'Test Before Full Size'}</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {isAr ? (
                  <>
                    بوكس الاكتشاف الفاخر
                    <span className="block text-[#E5C78A]">٥ عينات سعة ٥ مل بـ 490 ج.م</span>
                  </>
                ) : (
                  <>
                    The Discovery Set
                    <span className="block text-[#E5C78A]">5 x 5ML Flight For 490 EGP</span>
                  </>
                )}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                {isAr
                  ? 'لا تشترِ عطر بدون تجربة! اختر 5 عطور من تشكيلة إل فانتو، سنرسلها لك في عبوات زجاجية فاخرة مع بخاخ ذهبي وعلبة هدايا مطرزة، بالإضافة إلى كوبون خصم 10% لشرائك القادم.'
                  : 'Never blind buy again. Customize your private tasting flight with 5 authentic 5ml glass atomizers in our gold-foil gift box. Includes a 10% voucher code towards any full-sized 100ml bottle!'}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsDiscoveryOpen(true)}
                  className="py-3.5 px-8 rounded-full bg-[#947c50] hover:bg-[#836c43] text-white font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-[#947c50]/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? 'صمم البوكس الخاص بك' : 'Build Your Flight'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E5C78A]" />
                  <span>{isAr ? 'اختبار النوتات' : 'Scent Quiz'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <ReviewsSection
          reviews={reviewsList}
          onAddReview={(newRev) => {
            setReviewsList([newRev, ...reviewsList]);
            showToast(isAr ? 'شكراً لك! تم إضافة تقييمك بنجاح.' : 'Thank you! Review submitted.');
          }}
          lang={lang}
        />

        {/* Frequently Asked Questions */}
        <FaqSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          if (cat === 'discovery') {
            setIsDiscoveryOpen(true);
          } else {
            setActiveCategory(cat);
            const el = document.getElementById('collection-grid');
            el?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        lang={lang}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        lang={lang}
      />

      <DiscoverySetModal
        isOpen={isDiscoveryOpen}
        onClose={() => setIsDiscoveryOpen(false)}
        discoveryProduct={discoveryProduct}
        availableProducts={PRODUCTS}
        onAddToCart={(p, q, samples) => handleAddToCart(p, q, samples)}
        lang={lang}
      />

      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        lang={lang}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        totals={cartTotals}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onApplyPromo={(code) => {
          setAppliedPromo(code);
          showToast(isAr ? `تم تطبيق الكود ${code}` : `Promo code ${code} applied`);
        }}
        appliedPromo={appliedPromo}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onBrowseStore={() => {
          const el = document.getElementById('collection-grid');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        lang={lang}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        totals={cartTotals}
        onOrderCompleted={handleOrderCompleted}
        lang={lang}
      />
    </div>
  );
}
