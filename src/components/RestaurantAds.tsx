import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
}

// KFC ads
const kfcAds: Ad[] = [
  {
    id: '1',
    title: 'Buy 1 Get 1 Free',
    description: 'On all Zinger Burgers',
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
    description: '20% off with Student ID',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Happy Hours',
    description: '50% off on Krush Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Free Delivery',
    description: 'On orders above Rs. 1000',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=300&fit=crop'
  }
];

// McDonald's ads
const mcdonaldsAds: Ad[] = [
  {
    id: '1',
    title: 'Happy Meal Deal',
    description: 'Free toy with every Happy Meal',
    image: 'https://images.unsplash.com/photo-1619881590738-a111d176d906?w=500&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'McSaver Menu',
    description: 'Meals starting at Rs. 250',
    image: 'https://images.unsplash.com/photo-1561758033-7e924f619b47?w=500&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Breakfast Special',
    description: 'Buy 1 Get 1 on McMuffins',
    image: 'https://images.unsplash.com/photo-1552895638-f7fe08d2f7d5?w=500&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'McDelivery Offer',
    description: 'Free McFlurry on orders above Rs. 800',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Weekend Family Bundle',
    description: '20% off on family bundles',
    image: 'https://images.unsplash.com/photo-1552526881-5517a57b6d4a?w=500&h=300&fit=crop'
  }
];

// Savour Foods ads
const savourAds: Ad[] = [
  {
    id: '1',
    title: 'Family Deal',
    description: 'Mutton Pulao for 4 with drinks at Rs. 2000',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Lunch Special',
    description: '20% off on all Pulao dishes from 12-3 PM',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'BBQ Platter',
    description: 'Mix of kebabs and tikkas at special price',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Free Delivery',
    description: 'On orders above Rs. 1000',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Ramadan Special',
    description: 'Iftar deals starting from Rs. 500',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=300&fit=crop'
  }
];

interface RestaurantAdsProps {
  id?: string;
}

export default function RestaurantAds({ id }: RestaurantAdsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  
  // Select appropriate ads based on restaurant ID
  let ads = kfcAds;
  if (id === 'mcdonalds') {
    ads = mcdonaldsAds;
  } else if (id === 'savour') {
    ads = savourAds;
  }

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
  }, [direction, ads.length]);

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
