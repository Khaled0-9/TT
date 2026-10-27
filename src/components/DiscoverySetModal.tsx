import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, Sparkles, Plus, Trash2, ArrowRight } from 'lucide-react';

interface DiscoverySetModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoveryProduct: Product;
  availableProducts: Product[];
  onAddToCart: (product: Product, quantity: number, selectedSamples: string[]) => void;
  lang: 'en' | 'ar';
}

export const DiscoverySetModal: React.FC<DiscoverySetModalProps> = ({
  isOpen,
  onClose,
  discoveryProduct,
  availableProducts,
  onAddToCart,
  lang,
}) => {
  const [selected, setSelected] = useState<string[]>([
    'Spiced Amber - 100 ML',
    'Cookies & Cream - 100 ML',
    'Golden Essence - 100 ML',
  ]);

  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const MAX_SLOTS = 5;

  const toggleProduct = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      if (selected.length < MAX_SLOTS) {
        setSelected([...selected, name]);
      }
    }
  };

  const handleAdd = () => {
    if (selected.length === MAX_SLOTS) {
      onAddToCart(discoveryProduct, 1, selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#F7F5EE] border-b border-[#E7E2D4] flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAE3D0] text-[#786139] text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'صمم رحلتك العطرية' : 'Curate Your Custom Flight'}</span>
            </div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900">
              {isAr ? 'بوكس عينات إل فانتو الفاخر (5 × 5 مل)' : 'Il Vanto Discovery Set (5 x 5ML)'}
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              {isAr
                ? 'اختر 5 عطور لتجربتها براحتك في عبوات زجاجية سعة 5 مل قبل شراء الزجاجة الكبيرة.'
                : 'Select 5 fragrances to test on your skin in travel spray atomizers. Includes 10% voucher!'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-white"
            aria-label="Close discovery set builder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Slots Tray */}
        <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
            <span>
              {isAr ? 'العطور المختارة' : 'Selected Samples'}: ({selected.length}/{MAX_SLOTS})
            </span>
            <span className="text-[#947c50] font-bold">
              {selected.length === MAX_SLOTS
                ? isAr
                  ? 'مكتمل! جاهز للإضافة'
                  : 'Complete! Ready to add'
                : isAr
                ? `متبقي ${MAX_SLOTS - selected.length} عطور`
                : `${MAX_SLOTS - selected.length} slots remaining`}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {[...Array(MAX_SLOTS)].map((_, index) => {
              const item = selected[index];
              return (
                <div
                  key={index}
                  className={`relative aspect-[3/4] rounded-lg border-2 flex flex-col items-center justify-center p-2 text-center transition-all ${
                    item
                      ? 'border-[#947c50] bg-white shadow-xs'
                      : 'border-dashed border-stone-300 bg-stone-100/70 text-stone-400'
                  }`}
                >
                  {item ? (
                    <>
                      <div className="w-6 h-10 border border-stone-700 rounded-xs mb-1.5 flex items-center justify-center bg-stone-900 text-white text-[8px] font-bold">
                        5ml
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-stone-800 line-clamp-2 leading-tight">
                        {item.replace(' - 100 ML', '')}
                      </span>
                      <button
                        onClick={() => toggleProduct(item)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center shadow"
                        title="Remove"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Plus className="w-5 h-5 text-stone-400 mb-1" />
                      <span className="text-[10px] text-stone-400">
                        {isAr ? `عطر ${index + 1}` : `Slot ${index + 1}`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable list of available perfumes */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-grow max-h-[340px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3">
            {isAr ? 'اختر من إبداعاتنا:' : 'Choose from our creations:'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {availableProducts
              .filter((p) => !p.isDiscoverySet)
              .map((p) => {
                const isSelected = selected.includes(p.name);
                const disabled = !isSelected && selected.length >= MAX_SLOTS;

                return (
                  <button
                    key={p.id}
                    disabled={disabled}
                    onClick={() => toggleProduct(p.name)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-left rtl:text-right transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#947c50] bg-[#FAF8F3] ring-1 ring-[#947c50]'
                        : disabled
                        ? 'opacity-40 border-stone-200 bg-stone-50 cursor-not-allowed'
                        : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs ${
                          isSelected
                            ? 'bg-[#947c50] border-[#947c50] text-white'
                            : 'border-stone-300 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900 font-serif-luxury">
                          {isAr ? p.nameAr : p.name}
                        </div>
                        <div className="text-[10px] text-stone-500 line-clamp-1">
                          {p.inspiredBy}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                      {isAr ? p.categoryAr : p.category}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-stone-900 font-serif-luxury">
              {discoveryProduct.price.toLocaleString()} EGP
              {discoveryProduct.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-normal ml-2">
                  {discoveryProduct.originalPrice.toLocaleString()} EGP
                </span>
              )}
            </div>
            <span className="text-[11px] text-stone-500">
              {isAr ? 'يشمل 5 عينات + علبة هدايا فاخرة' : 'Includes 5 x 5ml vials + luxury gift box'}
            </span>
          </div>

          <button
            disabled={selected.length !== MAX_SLOTS}
            onClick={handleAdd}
            className={`py-3 px-6 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md ${
              selected.length === MAX_SLOTS
                ? 'bg-[#947c50] hover:bg-[#836c43] text-white'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>{isAr ? 'أضف البوكس للسلة' : 'Add Box to Bag'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
