import React, { useState } from 'react';
import { Review } from '../types';
import { Star, CheckCircle2, MessageSquarePlus, X, ThumbsUp } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
  lang: 'en' | 'ar';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
  lang,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProduct, setNewProduct] = useState('Spiced Amber - 100 ML');
  const [newText, setNewText] = useState('');

  const isAr = lang === 'ar';

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newText) return;

    const addedReview: Review = {
      id: `user-rev-${Date.now()}`,
      author: newAuthor,
      authorAr: newAuthor,
      rating: newRating,
      date: 'Just now',
      text: newText,
      textAr: newText,
      productName: newProduct,
      verified: true,
    };

    onAddReview(addedReview);
    setShowReviewModal(false);
    setNewText('');
    setNewAuthor('');
  };

  return (
    <section className="w-full py-16 bg-[#F6F4ED] border-y border-[#E7E2D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBE5D3] text-[#786139] text-xs font-semibold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#786139]" />
              <span>{isAr ? 'تجارب عملاء حقيقية' : 'Verified Buyer Experiences'}</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
              {isAr ? 'آراء وتجارب محبي إل فانتو' : 'Customers are saying'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="font-bold text-stone-900 text-sm">4.89 ★</span>
              <span className="text-stone-500 text-xs">
                ({(reviews.length + 2210).toLocaleString()} {isAr ? 'تقييم' : 'reviews'})
              </span>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-[#947c50] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{isAr ? 'اكتب تقييمك' : 'Write a review'}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating and Verification */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isAr ? 'مشتري مؤكد' : 'Verified Buyer'}
                    </span>
                  )}
                </div>

                {/* Scent target */}
                <div className="text-xs font-semibold text-[#947c50] mb-2 uppercase tracking-wide">
                  {rev.productName}
                </div>

                {/* Text comment */}
                <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed mb-4">
                  "{isAr ? rev.textAr || rev.text : rev.text}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-stone-800">
                  {isAr ? rev.authorAr || rev.author : rev.author}
                </span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-stone-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                {isAr ? 'شاركنا رأيك في عطر إل فانتو' : 'Write a Product Review'}
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {isAr ? 'اسمك الكريم:' : 'Your Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder={isAr ? 'مثال: كريم حامد' : 'e.g. Liam Parker'}
                  className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50]"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {isAr ? 'العطر الذي جربته:' : 'Which fragrance?'}
                </label>
                <select
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50] bg-white"
                >
                  <option value="Spiced Amber - 100 ML">Spiced Amber (Clive Christian Blonde Amber)</option>
                  <option value="Cookies & Cream - 100 ML">Cookies & Cream (PDM Althaïr)</option>
                  <option value="Golden Essence - 100 ML">Golden Essence (JPG Le Male Elixir)</option>
                  <option value="Wild Woods - 100 ML">Wild Woods (Bois Impérial)</option>
                  <option value="Euphoria - 100 ML">Euphoria (LV Imagination)</option>
                  <option value="Hookah - 100 ML">Hookah (Kilian Smoking Hot)</option>
                  <option value="Velvet Dream - 100 ML">Velvet Dream (Valentino Born in Roma Intense)</option>
                  <option value="Carnation - 100 ML">Carnation (Creed Aventus)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {isAr ? 'تقييمك (من 1 إلى 5):' : 'Rating:'}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  {isAr ? 'تجربتك مع الثبات والفوحان والريحة:' : 'Review details:'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder={
                    isAr
                      ? 'شاركنا رأيك في العطر ومدى قربه من الأصلي...'
                      : 'Share your impression regarding longevity, projection and drydown...'
                  }
                  className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-[#947c50]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#947c50] hover:bg-[#836c43] text-white rounded-lg font-semibold uppercase tracking-wider"
              >
                {isAr ? 'نشر التقييم' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
