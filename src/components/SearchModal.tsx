import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search as SearchIcon, X, Sparkles, ArrowRight, Plus } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  lang: 'en' | 'ar';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
  lang,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 5);

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q) || p.nameAr.toLowerCase().includes(q);
      const matchInspired = p.inspiredBy.toLowerCase().includes(q) || p.inspiredByBrand.toLowerCase().includes(q);
      const matchNotes = [
        ...p.topNotes,
        ...p.heartNotes,
        ...p.baseNotes,
        ...p.topNotesAr,
        ...p.heartNotesAr,
        ...p.baseNotesAr,
      ].some((note) => note.toLowerCase().includes(q));
      const matchCategory = p.category.toLowerCase().includes(q) || p.categoryAr.toLowerCase().includes(q);

      return matchName || matchInspired || matchNotes || matchCategory;
    });
  }, [query, products]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Search input bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-[#FAF9F5]">
          <SearchIcon className="w-5 h-5 text-stone-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isAr
                ? 'ابحث باسم العطر، النوتات (فانيليا، رم، عنبر...) أو الماركة المستوحى منها...'
                : 'Search by fragrance name, notes (vanilla, rum, tea...) or inspired-by house...'
            }
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
            autoFocus
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs text-stone-500 hover:text-stone-900 uppercase font-semibold"
            >
              {isAr ? 'إغلاق' : 'ESC'}
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div className="p-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-500">{isAr ? 'شائع:' : 'Trending:'}</span>
          {['Vanilla', 'Imagination', 'Blonde Amber', 'Aventus', 'Kilian', 'Althaïr'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded-full bg-white border border-stone-300 text-stone-700 hover:bg-[#FAF8F2] hover:border-[#947c50]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-stone-500">
              <p className="text-sm">
                {isAr ? 'لم نجد عطور مطابقة لبحثك' : 'No matching fragrances found.'}
              </p>
              <button
                onClick={() => setQuery('')}
                className="mt-2 text-xs text-[#947c50] font-semibold underline"
              >
                {isAr ? 'عرض جميع العطور' : 'Show all fragrances'}
              </button>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-[#947c50] hover:bg-[#FAF8F3] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                  />
                  <div>
                    <div className="text-[10px] font-semibold text-[#947c50] uppercase tracking-wider">
                      {isAr ? p.categoryAr : p.category} • {p.volume}
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 font-serif-luxury group-hover:text-[#947c50] transition-colors">
                      {isAr ? p.nameAr : p.name}
                    </h4>
                    <div className="text-xs text-stone-500">
                      {isAr ? 'مستوحى من: ' : 'Inspired by: '}
                      <span className="font-medium text-stone-700">{p.inspiredBy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-stone-900 font-serif-luxury">
                    {p.price.toLocaleString()} EGP
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(p);
                      onClose();
                    }}
                    className="p-2 bg-stone-900 hover:bg-[#947c50] text-white rounded-lg transition-colors cursor-pointer"
                    title={isAr ? 'إضافة إلى السلة' : 'Add to cart'}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
