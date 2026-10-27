import React, { useState } from 'react';
import { Product } from '../types';
import { X, Sparkles, ArrowRight, RotateCcw, Check, Plus } from 'lucide-react';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  lang: 'en' | 'ar';
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
  lang,
}) => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<'men' | 'women' | 'unisex'>('unisex');
  const [vibe, setVibe] = useState<'date-night' | 'starboy' | 'office-fresh' | 'summer-fresh'>('date-night');
  const [scentProfile, setScentProfile] = useState<string>('warm');

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const resetQuiz = () => {
    setStep(1);
  };

  // Find matching recommendations
  const getRecommendations = (): Product[] => {
    const list = products.filter((p) => !p.isDiscoverySet);
    return list
      .filter((p) => {
        const matchesGender = gender === 'unisex' || p.gender === gender || p.gender === 'unisex';
        const matchesVibe = !p.energyCategory || p.energyCategory === vibe;
        return matchesGender && matchesVibe;
      })
      .slice(0, 3);
  };

  const recommendations = getRecommendations();
  const fallbackList = recommendations.length > 0 ? recommendations : products.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#FAF8F3] border-b border-[#EAE4D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[#EFE8D6] text-[#947c50]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                {isAr ? 'مستشار العطور الذكي من إل فانتو' : 'Find Your Signature Scent'}
              </h2>
              <p className="text-xs text-stone-500">
                {isAr
                  ? 'أجب على ٣ أسئلة بسيطة لاكتشاف العطر الذي يعبر عن شخصيتك بدقة'
                  : 'Answer 3 quick questions to discover your personalized fragrance profile'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-800 rounded-full"
            aria-label="Close scent quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Target / Gender */}
        {step === 1 && (
          <div className="p-6 space-y-5 animate-in fade-in">
            <div className="text-xs font-semibold text-[#947c50] tracking-widest uppercase">
              {isAr ? 'الخطوة 1 من 3' : 'Step 1 of 3'}
            </div>
            <h3 className="font-serif-luxury text-lg font-semibold text-stone-900">
              {isAr ? 'لمن تبحث عن العطر؟' : 'Who is this perfume for?'}
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'men', en: 'For Him', ar: 'للرجال' },
                { id: 'women', en: 'For Her', ar: 'للنساء' },
                { id: 'unisex', en: 'Unisex / Shared', ar: 'للجنسين' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGender(opt.id as any)}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    gender === opt.id
                      ? 'border-[#947c50] bg-[#FAF7F0] ring-2 ring-[#947c50]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="text-sm font-semibold text-stone-900 font-serif-luxury">
                    {isAr ? opt.ar : opt.en}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="py-2.5 px-6 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#947c50] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'التالي' : 'Next'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Occasion / Vibe */}
        {step === 2 && (
          <div className="p-6 space-y-5 animate-in fade-in">
            <div className="text-xs font-semibold text-[#947c50] tracking-widest uppercase">
              {isAr ? 'الخطوة 2 من 3' : 'Step 2 of 3'}
            </div>
            <h3 className="font-serif-luxury text-lg font-semibold text-stone-900">
              {isAr ? 'ما هي المناسبة أو الطاقة المفضلة؟' : 'What is your preferred energy & occasion?'}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: 'starboy',
                  en: 'Starboy / Bold Night Out',
                  ar: 'سهرات وجاذبية لافتة (Starboy)',
                  desc: isAr ? 'عنبر دافئ، عسل، تبغ فاخر' : 'Warm amber, burning honey, magnetic tonka',
                },
                {
                  id: 'date-night',
                  en: 'Cozy Date & Romantic Intimacy',
                  ar: 'موعد رومانسي دافئ (Date Night)',
                  desc: isAr ? 'فانيليا بوربون، معسل تفاح، ياسمين' : 'Bourbon vanilla, apple shisha, velvet jasmine',
                },
                {
                  id: 'office-fresh',
                  en: 'Daily Elegance & Executive Office',
                  ar: 'أناقة يومية والعمل (Office Fresh)',
                  desc: isAr ? 'أكيجالاوود، أناناس ملكي، نجيل الهند' : 'Akigalawood, smoky pineapple, vetiver',
                },
                {
                  id: 'summer-fresh',
                  en: 'Coastal Fresh & High Energy',
                  ar: 'انتعاش صيفي ونظافة (Summer Fresh)',
                  desc: isAr ? 'شاي أسود، حمضيات، أمبروكسان نقي' : 'Smoky black tea, Italian bergamot, mint',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setVibe(opt.id as any)}
                  className={`p-3.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                    vibe === opt.id
                      ? 'border-[#947c50] bg-[#FAF7F0] ring-2 ring-[#947c50]'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="text-xs font-bold text-stone-900 font-serif-luxury mb-1">
                    {isAr ? opt.ar : opt.en}
                  </div>
                  <div className="text-[11px] text-stone-500">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                {isAr ? 'السابق' : 'Back'}
              </button>
              <button
                onClick={() => setStep(3)}
                className="py-2.5 px-6 rounded-lg bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#947c50] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>{isAr ? 'عرض العطور المطابقة' : 'Reveal Matches'}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Match Results */}
        {step === 3 && (
          <div className="p-6 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#947c50] tracking-widest uppercase">
                  {isAr ? 'توصيات إل فانتو الخاصة بك' : 'Your Olfactory Matches'}
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mt-0.5">
                  {isAr ? 'العطور المثالية لاختيارك' : 'Top Curated Matches For You'}
                </h3>
              </div>
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isAr ? 'إعادة الاختبار' : 'Retake'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {fallbackList.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-[#FAF8F3] hover:border-[#947c50] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-stone-200"
                    />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#947c50] block">
                        {isAr ? product.categoryAr : product.category} • {product.volume}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 font-serif-luxury">
                        {isAr ? product.nameAr : product.name}
                      </h4>
                      <div className="text-[11px] text-stone-500">
                        {isAr ? 'مستوحى من: ' : 'Inspired By: '}
                        {product.inspiredBy}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded text-xs font-medium border border-stone-300 hover:bg-stone-200 text-stone-800 transition-colors"
                    >
                      {isAr ? 'التفاصيل' : 'Notes'}
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded text-xs font-semibold bg-[#947c50] hover:bg-[#836c43] text-white transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAr ? 'شراء' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#FAF8F2] p-3 rounded-lg border border-[#E9E3D3] text-xs text-stone-600 flex items-center justify-between">
              <span>
                {isAr
                  ? '💡 نصيحة: بإمكانك إضافة أي عطرين 100 مل بسعر 1400 ج.م فقط!'
                  : '💡 Tip: Add any 2 x 100ML bottles to enjoy the 1400 EGP bundle price!'}
              </span>
              <button
                onClick={onClose}
                className="font-bold text-[#947c50] hover:underline"
              >
                {isAr ? 'تصفح الكل' : 'Browse All'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
