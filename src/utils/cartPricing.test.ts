import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals } from './cartPricing';
import { CartItem, Product } from '../types';

const mockProduct100ml: Product = {
  id: 'prod-1',
  slug: 'spiced-amber-100-ml',
  name: 'Spiced Amber - 100 ML',
  nameAr: 'سبايسد أمبر - 100 مل',
  inspiredBy: 'Blonde Amber — Clive Christian',
  inspiredByBrand: 'Clive Christian',
  category: 'Oriental',
  categoryAr: 'شرقي',
  price: 1200,
  volume: '100 ML',
  character: 'Art Deco decadence in every drop',
  characterAr: 'فخامة الفن المعماري في كل قطرة',
  description: 'Rich amber luxury fragrance',
  descriptionAr: 'عطر عنبري دافئ فخم',
  topNotes: ['Rum', 'Bitter Orange'],
  topNotesAr: ['رم', 'برتقال مر'],
  heartNotes: ['White Tobacco', 'Sandalwood'],
  heartNotesAr: ['تبغ أبيض', 'خشب الصندل'],
  baseNotes: ['Tonka Bean', 'Vanilla'],
  baseNotesAr: ['حبوب التونكا', 'فانيليا'],
  gender: 'unisex',
  image: '/src/assets/spiced_amber.jpg',
  rating: 4.9,
  reviewsCount: 180,
  longevity: '8-12 Hours',
  sillage: 'Heavy',
};

const mockDiscoverySet: Product = {
  id: 'prod-discovery',
  slug: 'discovery-set',
  name: 'Discovery Set (5 x 5ML)',
  nameAr: 'مجموعة الاكتشاف (5 × 5 مل)',
  inspiredBy: 'Il Vanto Custom Flight',
  inspiredByBrand: 'IL VANTO',
  category: 'Fresh',
  categoryAr: 'مجموعة عينات',
  price: 490,
  volume: '5 x 5 ML',
  character: 'Curate your olfactory journey',
  characterAr: 'رحلة عطرية مصغرة',
  description: '5 travel luxury atomizers',
  descriptionAr: 'خمس عينات فاخرة',
  topNotes: [],
  topNotesAr: [],
  heartNotes: [],
  heartNotesAr: [],
  baseNotes: [],
  baseNotesAr: [],
  gender: 'unisex',
  image: '/src/assets/discovery.jpg',
  rating: 4.95,
  reviewsCount: 420,
  longevity: '8-12 Hours',
  sillage: 'Moderate',
};

test('Empty cart calculates zeros correctly', () => {
  const totals = calculateCartTotals([]);
  assert.equal(totals.subtotal, 0);
  assert.equal(totals.grandTotal, 0);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.bundleDiscount, 0);
});

test('1 bottle of 100ML has standard price and standard delivery fee', () => {
  const items: CartItem[] = [
    { id: 'item-1', product: mockProduct100ml, quantity: 1 }
  ];
  const totals = calculateCartTotals(items);
  assert.equal(totals.subtotal, 1200);
  assert.equal(totals.bundleDiscount, 0);
  assert.equal(totals.deliveryFee, 60); // < 2000 EGP
  assert.equal(totals.grandTotal, 1260);
  assert.equal(totals.amountNeededForFreeDelivery, 800); // 2000 - 1200
  assert.equal(totals.isFreeDelivery, false);
});

test('2 bottles of 100ML activate bundle discount: 2 for 1400 EGP (save 1000 EGP)', () => {
  const items: CartItem[] = [
    { id: 'item-1', product: mockProduct100ml, quantity: 2 }
  ];
  const totals = calculateCartTotals(items);
  assert.equal(totals.subtotal, 2400);
  assert.equal(totals.bundleDiscount, 1000); // 2400 - 1400 = 1000 savings
  assert.equal(totals.deliveryFee, 60); // 1400 < 2000 threshold
  assert.equal(totals.grandTotal, 1460); // 1400 + 60
  assert.equal(totals.amountNeededForFreeDelivery, 600);
  assert.equal(totals.bundlePairsCount, 1);
});

test('3 bottles of 100ML (1 bundle pair + 1 single = 2600 EGP) qualifies for free delivery', () => {
  const items: CartItem[] = [
    { id: 'item-1', product: mockProduct100ml, quantity: 3 }
  ];
  const totals = calculateCartTotals(items);
  assert.equal(totals.subtotal, 3600);
  assert.equal(totals.bundleDiscount, 1000); // 1 pair bundle discount
  // 3600 - 1000 = 2600 >= 2000 EGP -> Free delivery!
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.isFreeDelivery, true);
  assert.equal(totals.grandTotal, 2600);
});

test('4 bottles of 100ML (2 bundle pairs = 2800 EGP) saves 2000 EGP with free delivery', () => {
  const items: CartItem[] = [
    { id: 'item-1', product: mockProduct100ml, quantity: 4 }
  ];
  const totals = calculateCartTotals(items);
  assert.equal(totals.subtotal, 4800);
  assert.equal(totals.bundleDiscount, 2000);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.grandTotal, 2800);
  assert.equal(totals.bundlePairsCount, 2);
});

test('Promo code WELCOME10 gives 10% discount after bundle', () => {
  const items: CartItem[] = [
    { id: 'item-1', product: mockProduct100ml, quantity: 2 } // 1400 EGP
  ];
  const totals = calculateCartTotals(items, 'WELCOME10');
  // 1400 * 0.1 = 140 discount
  assert.equal(totals.promoDiscount, 140);
  // 1400 - 140 = 1260 + 60 delivery = 1320
  assert.equal(totals.grandTotal, 1320);
});

test('Discovery set does not count as 100ML bottle for bundle calculation', () => {
  const items: CartItem[] = [
    { id: 'item-1', product: mockProduct100ml, quantity: 1 },
    { id: 'item-2', product: mockDiscoverySet, quantity: 1 }
  ];
  const totals = calculateCartTotals(items);
  assert.equal(totals.bottle100mlCount, 1);
  assert.equal(totals.bundleDiscount, 0);
  assert.equal(totals.subtotal, 1690); // 1200 + 490
  assert.equal(totals.grandTotal, 1750); // 1690 + 60
});
