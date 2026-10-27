import React from 'react';
import { Product } from '../types';
import { Plus, Eye, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  lang: 'en' | 'ar';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  lang,
}) => {
  const isAr = lang === 'ar';

  const familyColors: Record<string, string> = {
    Oriental: 'bg-amber-100/90 text-amber-900 border-amber-300',
    Woody: 'bg-stone-200/90 text-stone-800 border-stone-300',
    Floral: 'bg-rose-100/90 text-rose-900 border-rose-300',
    Gourmand: 'bg-orange-100/90 text-orange-950 border-orange-300',
    Fruity: 'bg-emerald-100/90 text-emerald-950 border-emerald-300',
    Citrus: 'bg-yellow-100/90 text-yellow-950 border-yellow-300',
    Fresh: 'bg-sky-100/90 text-sky-950 border-sky-300',
  };

  const badgeColor = familyColors[product.category] || 'bg-stone-100 text-stone-800 border-stone-200';

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-[#E9E5DB] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#947c50]/50 hover:-translate-y-1">
      {/* Visual Image Container */}
      <div
        onClick={() => onSelect(product)}
        className="relative w-full aspect-square bg-[#F7F5EE] overflow-hidden cursor-pointer flex items-center justify-center p-3"
      >
        <img
          src={product.image}
          alt={isAr ? product.nameAr : product.name}
          className="w-full h-full object-cover object-center rounded-lg transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Fragrance Family Badge */}
          <span
            className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-xs shadow-xs ${badgeColor}`}
          >
            {isAr ? product.categoryAr : product.category}
          </span>

          {/* New / Bestseller Badge */}
          {product.isNewDrop ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-900 text-[#F5E6CA] shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {isAr ? 'جديد' : 'NEW'}
            </span>
          ) : product.isBestseller ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#947c50] text-white shadow-xs">
              {isAr ? 'الأكثر طلباً' : 'BESTSELLER'}
            </span>
          ) : null}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="p-3 bg-white text-stone-900 rounded-full hover:bg-stone-100 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
            title={isAr ? 'عرض التفاصيل والهرم العطري' : 'View fragrance notes pyramid'}
            aria-label={`View details of ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="p-3 bg-[#947c50] text-white rounded-full hover:bg-[#836c43] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
            title={isAr ? 'أضف إلى السلة' : 'Add to cart'}
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Information Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Inspired By tribute line (authentic to il-vanto.com) */}
          <div className="text-[11px] font-medium text-stone-500 uppercase tracking-wider mb-1 line-clamp-1 hover:text-[#947c50] transition-colors">
            {product.inspiredBy}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onSelect(product)}
            className="font-serif-luxury text-base sm:text-lg font-semibold text-stone-900 cursor-pointer hover:text-[#947c50] transition-colors line-clamp-1"
          >
            {isAr ? product.nameAr : product.name}
          </h3>

          {/* Scent short character */}
          <p className="text-xs text-stone-600 font-light mt-1 mb-3 line-clamp-2 italic">
            "{isAr ? product.characterAr : product.character}"
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-bold text-stone-900 font-serif-luxury">
              {product.price.toLocaleString()} EGP
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-normal ml-2">
                  {product.originalPrice.toLocaleString()} EGP
                </span>
              )}
            </div>
            {product.volume === '100 ML' && (
              <span className="text-[10px] text-[#947c50] font-semibold block">
                {isAr ? 'ضمن عرض الـ 2 بـ 1400' : 'Part of 2 for 1400 EGP'}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="py-2 px-3 sm:px-4 rounded-md bg-stone-900 hover:bg-[#947c50] text-white text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAr ? 'إضافة' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
