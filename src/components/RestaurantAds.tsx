import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ads: Ad[] = [
  {
    id: '1',
    title: 'Buy 1 Get 1 Free',
    description: 'On all Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Family Deal',
    description: '30% off on Buckets',
    image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=500&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Student Special',
    description: '20% off with ID',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Happy Hours',
    description: '50% off on Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Free Delivery',
    description: 'On orders above Rs. 1000',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=300&fit=crop'
  }
];

export default function RestaurantAds() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + direction;
        if (nextIndex >= ads.length - 1) {
          setDirection(-1);
          return ads.length - 1;
        }
        if (nextIndex <= 0) {
          setDirection(1);
          return 0;
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [direction]);

  const variants = {
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

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          <div className="relative h-full">
            <img
              src={ads[currentIndex].image}
              alt={ads[currentIndex].title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-white text-xl font-semibold">
                {ads[currentIndex].title}
              </h3>
              <p className="text-white/90 text-sm mt-0.5">
                {ads[currentIndex].description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Progress dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {ads.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-3' : 'bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
