import { CartItem, CartTotals } from '../types';

export const FREE_DELIVERY_THRESHOLD = 2000;
export const STANDARD_DELIVERY_FEE = 60;
export const BUNDLE_PAIR_PRICE = 1400; // 2 x 100ML for 1400 EGP
export const SINGLE_100ML_PRICE = 1200; // Regular price per 100ML

/**
 * Calculates cart totals according to IL VANTO promotional rules:
 * - 2 x 100ML bottles for 1400 EGP (saves 1,000 EGP per pair)
 * - Free shipping on orders 2,000 EGP or more
 * - Validates promotional coupon codes
 */
export function calculateCartTotals(
  items: CartItem[],
  promoCode?: string
): CartTotals {
  let subtotal = 0;
  let bottle100mlCount = 0;

  for (const item of items) {
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;

    if (item.product.volume === '100 ML') {
      bottle100mlCount += item.quantity;
    }
  }

  // Calculate bundle pairs
  const bundlePairsCount = Math.floor(bottle100mlCount / 2);
  // Each pair normally costs 2 * 1200 = 2400. In bundle it costs 1400. Discount = 1000 per pair.
  const bundleDiscount = bundlePairsCount * (SINGLE_100ML_PRICE * 2 - BUNDLE_PAIR_PRICE);

  const priceAfterBundle = Math.max(0, subtotal - bundleDiscount);

  // Promo code discounts
  let promoDiscount = 0;
  if (promoCode) {
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      promoDiscount = Math.round(priceAfterBundle * 0.1);
    } else if (cleanCode === 'ILVANTO50' || cleanCode === 'VIP50') {
      promoDiscount = Math.min(priceAfterBundle, 50);
    }
  }

  const orderValueAfterDiscounts = Math.max(0, priceAfterBundle - promoDiscount);

  const isFreeDelivery = orderValueAfterDiscounts >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;

  const grandTotal = orderValueAfterDiscounts + deliveryFee;
  const totalSavings = bundleDiscount + promoDiscount;
  const amountNeededForFreeDelivery = isFreeDelivery
    ? 0
    : Math.max(0, FREE_DELIVERY_THRESHOLD - orderValueAfterDiscounts);

  return {
    subtotal,
    bundleDiscount,
    promoDiscount,
    deliveryFee,
    isFreeDelivery,
    freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
    amountNeededForFreeDelivery,
    totalSavings,
    grandTotal,
    bottle100mlCount,
    bundlePairsCount,
  };
}

/**
 * Returns user-facing notification or suggestion regarding the 2x100ml offer
 */
export function getBundleMessage(
  bottle100mlCount: number,
  lang: 'en' | 'ar'
): { title: string; subtitle: string; isOdd: boolean } {
  const isOdd = bottle100mlCount % 2 === 1;

  if (lang === 'ar') {
    if (isOdd) {
      return {
        title: 'عرض الـ 2 × 100ML بـ 1400 ج.م!',
        subtitle: 'أضف زجاجة 100 مل أخرى لتفعيل العرض وتوفير 1,000 ج.م!',
        isOdd: true,
      };
    }
    if (bottle100mlCount >= 2) {
      return {
        title: 'تم تطبيق عرض الـ 2 × 100ML بنجاح!',
        subtitle: `وفرت ${(Math.floor(bottle100mlCount / 2)) * 1000} ج.م بفضل عرض الباقات.`,
        isOdd: false,
      };
    }
    return {
      title: 'عرض خاص: أي 2 × 100ML بـ 1400 ج.م',
      subtitle: 'اختر أي عطرين 100 مل للحصول على الخصم فوراً.',
      isOdd: false,
    };
  }

  // English
  if (isOdd) {
    return {
      title: '2 x 100ML for 1400 EGP Offer!',
      subtitle: 'Add 1 more 100ML bottle to unlock the bundle and save 1,000 EGP!',
      isOdd: true,
    };
  }
  if (bottle100mlCount >= 2) {
    return {
      title: '2 x 100ML Bundle Offer Applied!',
      subtitle: `You saved ${(Math.floor(bottle100mlCount / 2)) * 1000} EGP with bundle pricing.`,
      isOdd: false,
    };
  }
  return {
    title: 'Special Offer: Any 2 x 100ML For 1400 EGP',
    subtitle: 'Add any 2 full-sized perfumes to get the bundle discount.',
    isOdd: false,
  };
}
