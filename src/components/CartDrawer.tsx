import React, { useState } from 'react';
import { CartItem, CartTotals } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, Truck, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { getBundleMessage } from '../utils/cartPricing';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totals: CartTotals;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onApplyPromo: (code: string) => void;
  appliedPromo?: string;
  onProceedToCheckout: () => void;
  onBrowseStore: () => void;
  lang: 'en' | 'ar';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  totals,
  onUpdateQuantity,
  onRemoveItem,
  onApplyPromo,
  appliedPromo,
  onProceedToCheckout,
  onBrowseStore,
  lang,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const bundleMsg = getBundleMessage(totals.bottle100mlCount, lang);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'WELCOME10' || clean === 'ILVANTO50' || clean === 'VIP50') {
      onApplyPromo(clean);
      setPromoError('');
    } else {
      setPromoError(isAr ? 'كوبون الخصم غير صالح أو منتهي الصلاحية' : 'Invalid promotional code.');
    }
  };

  // Shipping progress calculation
  const shippingPercent = Math.min(
    100,
    Math.round(((totals.freeDeliveryThreshold - totals.amountNeededForFreeDelivery) / totals.freeDeliveryThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-10 rtl:pl-0 rtl:pr-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l rtl:border-l-0 rtl:border-r border-stone-200">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="font-serif-luxury text-lg font-bold text-stone-900">
                {isAr ? 'سلة المشتريات' : 'Your Shopping Bag'}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 font-bold text-stone-700">
                {items.reduce((acc, cur) => acc + cur.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200/60"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-3.5 bg-[#F6F4ED] border-b border-[#E8E3D5] text-xs">
            <div className="flex items-center justify-between font-semibold text-stone-800 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#947c50]" />
                <span>
                  {totals.isFreeDelivery
                    ? isAr
                      ? 'مبروك! طلبك مؤهل للشحن المجاني 🚀'
                      : 'You unlocked FREE delivery! 🚀'
                    : isAr
                    ? `أضف بقيمة ${totals.amountNeededForFreeDelivery.toLocaleString()} ج.م للحصول على شحن مجاني`
                    : `Add ${totals.amountNeededForFreeDelivery.toLocaleString()} EGP more for FREE shipping`}
                </span>
              </div>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#947c50] transition-all duration-500 rounded-full"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>

          {/* Bundle Notification Notice */}
          {bundleMsg.isOdd && (
            <div className="p-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">{bundleMsg.title}</span>
                <span className="text-amber-800">{bundleMsg.subtitle}</span>
              </div>
            </div>
          )}

          {totals.bundleDiscount > 0 && (
            <div className="p-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">
                {isAr
                  ? `تم توفير ${totals.bundleDiscount.toLocaleString()} ج.م بفضل عرض 2 × 100ML!`
                  : `Bundle Active: ${totals.bundleDiscount.toLocaleString()} EGP saved on 2x100ML!`}
              </span>
            </div>
          )}

          {/* Cart Item List */}
          <div className="p-5 overflow-y-auto flex-grow space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center text-stone-500 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif-luxury text-base font-semibold text-stone-800 mb-1">
                  {isAr ? 'سلتك فارغة حالياً' : 'Your bag is empty'}
                </p>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  {isAr
                    ? 'اكتشف مجموعتنا الحصرية من بدائل النيش الفاخرة وعرض الـ 2 بـ 1400 جنيه.'
                    : 'Discover our luxury niche alternatives and special 2 x 100ML bundle offer.'}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onBrowseStore();
                  }}
                  className="py-2.5 px-6 rounded-full bg-[#947c50] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#836c43] transition-colors"
                >
                  {isAr ? 'تصفح العطور' : 'Explore Perfumes'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-stone-200/80 last:border-b-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover border border-stone-200 bg-stone-50 shrink-0"
                  />

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 font-serif-luxury line-clamp-1">
                          {isAr ? item.product.nameAr : item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 line-clamp-1">
                        {item.product.inspiredBy}
                      </div>

                      {item.selectedSamples && item.selectedSamples.length > 0 && (
                        <div className="text-[10px] text-stone-600 bg-stone-100 p-1 rounded mt-1">
                          <strong>{isAr ? 'العينات:' : 'Samples:'}</strong>{' '}
                          {item.selectedSamples.join(', ')}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif-luxury text-xs sm:text-sm font-bold text-stone-900">
                        {(item.product.price * item.quantity).toLocaleString()} EGP
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-[#FAF9F5] border-t border-stone-200 space-y-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={isAr ? 'كود الخصم (مثال: WELCOME10)' : 'Discount Code (e.g. WELCOME10)'}
                  className="flex-grow px-3 py-1.5 text-xs border border-stone-300 rounded-md focus:outline-none focus:border-[#947c50] bg-white uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-900 text-white rounded-md text-xs font-medium hover:bg-stone-800 transition-colors uppercase"
                >
                  {isAr ? 'تطبيق' : 'Apply'}
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>
                    {isAr ? `تم تطبيق الكود ${appliedPromo}` : `Code ${appliedPromo} applied`}
                  </span>
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-rose-600">{promoError}</div>
              )}

              {/* Totals Table */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span>{totals.subtotal.toLocaleString()} EGP</span>
                </div>

                {totals.bundleDiscount > 0 && (
                  <div className="flex justify-between text-[#947c50] font-semibold">
                    <span>{isAr ? 'وفرت في عرض 2 × 100ML' : '2x100ML Bundle Savings'}</span>
                    <span>-{totals.bundleDiscount.toLocaleString()} EGP</span>
                  </div>
                )}

                {totals.promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{isAr ? 'خصم الكوبون' : 'Promo Discount'}</span>
                    <span>-{totals.promoDiscount.toLocaleString()} EGP</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{isAr ? 'الشحن والتوصيل' : 'Delivery Fee'}</span>
                  <span>
                    {totals.isFreeDelivery ? (
                      <span className="text-emerald-700 font-bold">
                        {isAr ? 'مجاني' : 'FREE'}
                      </span>
                    ) : (
                      `${totals.deliveryFee} EGP`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-stone-900 font-bold text-base font-serif-luxury pt-2 border-t border-stone-300">
                  <span>{isAr ? 'الإجمالي النهائي' : 'Grand Total'}</span>
                  <span>{totals.grandTotal.toLocaleString()} EGP</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#947c50] hover:bg-[#836c43] text-white rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#947c50]/20"
              >
                <span>{isAr ? 'إتمام الطلب الآن' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>
                  {isAr
                    ? 'دفع عند الاستلام أو بطاقة بنكية • ضمان استرجاع 14 يوماً'
                    : 'Cash on delivery or card • 14-day money back guarantee'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
