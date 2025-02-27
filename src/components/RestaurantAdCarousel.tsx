import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Database } from '../types/supabase';

type Ad = Database['public']['Tables']['restaurant_ads']['Row'];

interface RestaurantAdCarouselProps {
  ads: Ad[];
}

export default function RestaurantAdCarousel({ ads }: RestaurantAdCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // Auto-advance every 5 seconds
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [ads.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + ads.length) % ads.length);
  };

  if (!ads || ads.length === 0) return null;

  return (
    <div className="relative h-full">
      <div className="relative overflow-hidden rounded-xl aspect-[16/9]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
          >
            <img
              src={ads[currentIndex].image_url}
              alt={ads[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10">
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h4 className="text-base font-medium text-white mb-1.5">{ads[currentIndex].title}</h4>
                <p className="text-sm text-gray-200 line-clamp-2">{ads[currentIndex].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 hover:opacity-100 transition-opacity">
          <button
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/30 transition-colors"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur flex items-center justify-center text-white hover:bg-black/30 transition-colors"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / ads.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
