export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  isTopRestaurant: boolean;
  deliveryFee: number;
  minOrder: number;
  phone: string;
  email: string;
  address: string;
  image: string;
  openingHours: {
    [key: string]: string;
  };
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Karachi Biryani House",
    cuisine: "Pakistani, Biryani, BBQ",
    rating: 4.8,
    reviewCount: 245,
    isTopRestaurant: true,
    deliveryFee: 100,
    minOrder: 500,
    phone: "+92 51 2345678",
    email: "info@karachibiryani.com",
    address: "Shop #4, F-7 Markaz, Islamabad",
    image: "/karachi-biryani.jpg",
    openingHours: {
      "Monday": "11:00 AM - 11:00 PM",
      "Tuesday": "11:00 AM - 11:00 PM",
      "Wednesday": "11:00 AM - 11:00 PM",
      "Thursday": "11:00 AM - 11:00 PM",
      "Friday": "11:00 AM - 11:30 PM",
      "Saturday": "11:00 AM - 11:30 PM",
      "Sunday": "11:00 AM - 11:00 PM"
    }
  }
];
