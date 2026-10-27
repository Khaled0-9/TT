import React, { useState } from 'react';
import { Product } from '../types';
import { X, Plus, Minus, Star, ShieldCheck, Sparkles, Droplets, Clock, Wind } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  lang: 'en' | 'ar';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  lang,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'specs' | 'ingredients'>('notes');

  if (!product) return null;

  const isAr = lang === 'ar';

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-950 bg-white/80 rounded-full hover:bg-white transition-colors cursor-pointer"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Imagery & Badges */}
        <div className="md:w-1/2 bg-[#F6F4ED] p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden shadow-md border border-stone-200/60 bg-white">
            <img
              src={product.image}
              alt={isAr ? product.nameAr : product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.isNewDrop && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-stone-900 text-[#F5E6CA] text-xs font-bold uppercase rounded-full">
                {isAr ? 'إصدار جديد' : 'New Drop'}
              </span>
            )}
          </div>

          {/* Quick value badges */}
          <div className="mt-5 grid grid-cols-2 gap-3 w-full max-w-sm text-center text-xs">
            <div className="p-2.5 rounded-lg bg-white/80 border border-stone-200/70 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-[#947c50]" />
              <span className="text-stone-800 font-medium">{product.longevity}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/80 border border-stone-200/70 flex items-center justify-center gap-2">
              <Wind className="w-4 h-4 text-[#947c50]" />
              <span className="text-stone-800 font-medium">{product.sillage} Sillage</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] flex flex-col justify-between">
          <div>
            {/* Category and Inspired-By Tribute */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#947c50]">
                {isAr ? product.categoryAr : product.category} • {product.volume}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{product.rating}</span>
                <span className="text-stone-400">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              {isAr ? product.nameAr : product.name}
            </h2>

            {/* Inspired By Card */}
            <div className="bg-[#FAF8F2] border border-[#E8E2D1] rounded-lg p-3 mb-4">
              <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                {isAr ? 'مستوحى من الأيقونة العالمية' : 'Inspired By:'}
              </div>
              <div className="text-sm font-serif-luxury font-semibold text-stone-900">
                {product.inspiredBy}
              </div>
            </div>

            {/* Price block & 2x100ml bundle alert */}
            <div className="mb-5 pb-4 border-b border-stone-200">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="font-serif-luxury text-2xl font-bold text-stone-900">
                  {product.price.toLocaleString()} EGP
                </span>
                {product.originalPrice && (
                  <span className="text-stone-400 line-through text-sm">
                    {product.originalPrice.toLocaleString()} EGP
                  </span>
                )}
              </div>

              {product.volume === '100 ML' && (
                <div className="bg-[#EFE8D8] text-[#7A633B] text-xs px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#947c50]" />
                  <span>
                    {isAr
                      ? 'وفر 1,000 ج.م: أي زجاجتين 100 مل بـ 1400 ج.م فقط!'
                      : 'Special Bundle: Any 2 x 100ML for 1,400 EGP (Save 1,000 EGP!)'}
                  </span>
                </div>
              )}
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-stone-200 mb-4 gap-4 text-xs font-semibold uppercase tracking-wider">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2 transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'notes'
                    ? 'border-[#947c50] text-[#947c50]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {isAr ? 'الهرم العطري' : 'Olfactory Pyramid'}
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-[#947c50] text-[#947c50]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {isAr ? 'الوصف والمواصفات' : 'Story & Specs'}
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`pb-2 transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'border-[#947c50] text-[#947c50]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                {isAr ? 'المكونات والشهادات' : 'Ingredients'}
              </button>
            </div>

            {/* Tab Content */}
            <div className="mb-6 min-h-[140px]">
              {activeTab === 'notes' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block mb-1">
                      {isAr ? 'الافتتاحية (أول ما تشمه):' : 'Top Notes (First impression):'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? product.topNotesAr : product.topNotes).map((n, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-[#F4F1EA] text-stone-800 font-medium">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-stone-900 block mb-1">
                      {isAr ? 'قلب العطر (روح التوليفة):' : 'Heart Notes (The essence):'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? product.heartNotesAr : product.heartNotes).map((n, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-[#F4F1EA] text-stone-800 font-medium">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-stone-900 block mb-1">
                      {isAr ? 'القاعدة (ما يبقى طوال اليوم):' : 'Base Notes (The lingering trail):'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isAr ? product.baseNotesAr : product.baseNotes).map((n, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-[#F4F1EA] text-stone-800 font-medium">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="text-xs text-stone-700 space-y-2">
                  <p className="leading-relaxed">
                    {isAr ? product.descriptionAr : product.description}
                  </p>
                  <div className="pt-2 grid grid-cols-2 gap-2 text-stone-800">
                    <div>
                      <span className="text-stone-500 block">{isAr ? 'التركيز:' : 'Concentration:'}</span>
                      <span className="font-semibold">Extrait de Parfum (28%)</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">{isAr ? 'الجنس:' : 'Gender:'}</span>
                      <span className="font-semibold uppercase">{product.gender}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div className="text-xs text-stone-600 space-y-2">
                  <p>
                    <strong>{isAr ? 'المكونات المعتمدة:' : 'Ingredients:'}</strong> Alcohol Denat,
                    Parfum (Fragrance Oil Grasse France), Aqua, Coumarin, Limonene, Linalool, Eugenol,
                    Cinnamal, Benzyl Benzoate, Vanillin, Isoeugenol.
                  </p>
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      {isAr
                        ? 'مطابق لمواصفات الهيئة العالمية للعطور IFRA - آمن تماماً على البشرة.'
                        : 'IFRA Compliant & Dermatologically tested high-purity perfume formulation.'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center border border-stone-300 rounded-lg p-1 bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 text-stone-600 hover:text-stone-950 rounded cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-stone-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 text-stone-600 hover:text-stone-950 rounded cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-6 rounded-lg bg-stone-900 hover:bg-[#947c50] text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{isAr ? 'أضف إلى السلة' : 'Add to Cart'}</span>
              <span>•</span>
              <span>{(product.price * quantity).toLocaleString()} EGP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
