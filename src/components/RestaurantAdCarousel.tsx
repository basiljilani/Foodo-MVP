import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Ad {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface RestaurantAdCarouselProps {
  ads: Ad[];
}

const RestaurantAdCarousel: React.FC<RestaurantAdCarouselProps> = ({ ads }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
  };

  if (!ads || ads.length === 0) return null;

  return (
    <div className="relative">
      {/* Current Ad */}
      <div className="relative h-[200px] bg-gradient-to-r from-purple-500 to-pink-500">
        <img
          src={ads[currentIndex].image || 'https://placehold.co/800x400?text=Special+Offer'}
          alt={ads[currentIndex].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-2">{ads[currentIndex].title}</h3>
          <p className="text-white/90">{ads[currentIndex].description}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      {ads.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {ads.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-3' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantAdCarousel;
