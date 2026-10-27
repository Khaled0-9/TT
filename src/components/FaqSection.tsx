import React, { useState } from 'react';
import { FAQS } from '../data/products';
import { ChevronDown, HelpCircle, PhoneCall, Mail } from 'lucide-react';

interface FaqSectionProps {
  lang: 'en' | 'ar';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isAr = lang === 'ar';

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full py-16 bg-[#FAF9F5] border-b border-[#E8E4DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8D6] text-[#7A633B] text-xs font-semibold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
            {isAr ? 'كل ما تحتاج معرفته عن إل فانتو' : 'All your questions, answered.'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {isAr
              ? 'خدمة العملاء متاحة من الإثنين إلى الجمعة: 8 ص - 8:30 م (متوسط سرعة الرد: أقل من ساعة)'
              : 'Our customer support is available Monday to Friday: 8am-8:30pm (Average response time: 1h)'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-4 sm:p-5 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/70 transition-colors"
                >
                  <span className="font-serif-luxury text-sm sm:text-base font-semibold text-stone-900">
                    {isAr ? faq.qAr : faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#947c50]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-[#FAF9F6]">
                    {isAr ? faq.aAr : faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="mt-8 p-4 rounded-xl bg-[#F4F1EA] border border-stone-200 flex flex-wrap items-center justify-around gap-4 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#947c50]" />
            <span>WhatsApp: <strong>+20 102 345 6789</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#947c50]" />
            <span>Email: <strong>support@il-vanto.com</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
