import React, { useState } from 'react';
import { CartItem, CartTotals } from '../types';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, PackageCheck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totals: CartTotals;
  onOrderCompleted: () => void;
  lang: 'en' | 'ar';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  totals,
  onOrderCompleted,
  lang,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Cairo',
    address: '',
    notes: '',
    paymentMethod: 'cod', // cod or card
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const egyptGovernorates = [
    { en: 'Cairo', ar: 'القاهرة' },
    { en: 'Giza', ar: 'الجيزة' },
    { en: 'Alexandria', ar: 'الإسكندرية' },
    { en: 'Al Sharqia', ar: 'الشرقية' },
    { en: 'Dakahlia', ar: 'الدقهلية' },
    { en: 'Gharbia', ar: 'الغربية' },
    { en: 'Monufia', ar: 'المنوفية' },
    { en: 'Qalyubia', ar: 'القليوبية' },
    { en: 'Beheira', ar: 'البحيرة' },
    { en: 'Port Said', ar: 'بورسعيد' },
    { en: 'Suez', ar: 'السويس' },
    { en: 'Ismailia', ar: 'الإسماعيلية' },
    { en: 'Red Sea / Hurghada', ar: 'البحر الأحمر / الغردقة' },
    { en: 'South Sinai / Sharm', ar: 'جنوب سيناء / شرم الشيخ' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `ILV-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#F3EEE3] rounded-lg text-[#947c50]">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                {isAr ? 'إتمام الطلب السريع' : 'Fast Secure Checkout'}
              </h2>
              <span className="text-xs text-stone-500">
                {isAr ? 'عطور إل فانتو - بارفان دو لوكس' : 'IL VANTO — Parfums de Luxe'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {orderId ? (
            /* Success confirmation screen */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                {isAr ? 'شكراً لك! تم استلام طلبك بنجاح' : 'Thank You! Your Order is Confirmed'}
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                {isAr
                  ? `رقم الطلب الخاص بك هو #${orderId}. سيقوم فريق خدمة العملاء بالتواصل معك هاتفياً على رقم ${formData.phone} لتأكيد موعد التوصيل.`
                  : `Your order ID is #${orderId}. Our customer concierge will contact you on ${formData.phone} to confirm delivery schedule.`}
              </p>

              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-stone-200 max-w-md mx-auto text-left rtl:text-right text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">{isAr ? 'الاسم:' : 'Recipient:'}</span>
                  <span className="font-bold text-stone-800">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isAr ? 'المحافظة:' : 'Destination:'}</span>
                  <span className="font-bold text-stone-800">{formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isAr ? 'طريقة الدفع:' : 'Payment:'}</span>
                  <span className="font-bold text-stone-800">
                    {formData.paymentMethod === 'cod'
                      ? isAr
                        ? 'الدفع نقداً عند الاستلام'
                        : 'Cash on Delivery (COD)'
                      : isAr
                      ? 'بطاقة بنكية'
                      : 'Credit Card'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                  <span>{isAr ? 'الإجمالي المطلوب:' : 'Amount to Pay:'}</span>
                  <span>{totals.grandTotal.toLocaleString()} EGP</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="py-3 px-8 rounded-full bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#947c50] transition-colors"
                >
                  {isAr ? 'متابعة التسوق' : 'Back to Store'}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Delivery info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#947c50] mb-3">
                  {isAr ? '1. بيانات التوصيل' : '1. Shipping & Contact Info'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      {isAr ? 'الاسم بالكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={isAr ? 'مثال: أحمد محمد' : 'e.g. Alexander Vance'}
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      {isAr ? 'رقم الهاتف (للتوصيل) *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01012345678"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      {isAr ? 'المحافظة / المدينة *' : 'City / Governorate *'}
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50] bg-white"
                    >
                      {egyptGovernorates.map((gov) => (
                        <option key={gov.en} value={gov.en}>
                          {isAr ? gov.ar : gov.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      {isAr ? 'البريد الإلكتروني (اختياري للإشعار)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@example.com"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 font-medium mb-1">
                      {isAr ? 'العنوان بالتفصيل (الشارع، العمارة، الشقة) *' : 'Street Address & Apartment *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={isAr ? 'شارع التحرير، عمارة 14، شقة 5' : 'Building 14, Apt 5, Zamalek'}
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#947c50] mb-3">
                  {isAr ? '2. وسيلة الدفع' : '2. Payment Method'}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-left rtl:text-right transition-all cursor-pointer ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#947c50] bg-[#FAF8F3] ring-1 ring-[#947c50]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#947c50]" />
                    <div>
                      <div className="font-bold text-stone-900">
                        {isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {isAr ? 'ادفع بعد المعاينة والاستلام' : 'Pay when you receive package'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-left rtl:text-right transition-all cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#947c50] bg-[#FAF8F3] ring-1 ring-[#947c50]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-stone-700" />
                    <div>
                      <div className="font-bold text-stone-900">
                        {isAr ? 'بطاقة بنكية / فيزا' : 'Credit / Debit Card'}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        {isAr ? 'دفع إلكتروني آمن 100%' : '100% Secure 3D payment'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Order summary mini-box */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>{isAr ? 'عدد العطور:' : 'Total Items:'}</span>
                  <span className="font-semibold">
                    {items.reduce((acc, cur) => acc + cur.quantity, 0)} {isAr ? 'عطر' : 'bottles'}
                  </span>
                </div>
                {totals.bundleDiscount > 0 && (
                  <div className="flex justify-between text-[#947c50] font-semibold">
                    <span>{isAr ? 'خصم باقة 2 × 100ML:' : 'Bundle Promo Savings:'}</span>
                    <span>-{totals.bundleDiscount.toLocaleString()} EGP</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>{isAr ? 'التوصيل:' : 'Delivery:'}</span>
                  <span>{totals.isFreeDelivery ? (isAr ? 'مجاني 🚀' : 'FREE') : `${totals.deliveryFee} EGP`}</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200 font-serif-luxury">
                  <span>{isAr ? 'المبلغ الإجمالي للدفع:' : 'Total to Pay:'}</span>
                  <span>{totals.grandTotal.toLocaleString()} EGP</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#947c50] hover:bg-[#836c43] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#947c50]/20"
              >
                {isSubmitting ? (
                  <span>{isAr ? 'جاري تأكيد الطلب...' : 'Confirming your order...'}</span>
                ) : (
                  <span>
                    {isAr
                      ? `تأكيد الطلب بمبلغ ${totals.grandTotal.toLocaleString()} ج.م`
                      : `Confirm Order (${totals.grandTotal.toLocaleString()} EGP)`}
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
