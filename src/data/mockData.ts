export const mockRestaurants = [
  {
    id: "kfc",
    name: "KFC - F11",
    description: "Kentucky Fried Chicken - World's most popular chicken restaurant chain",
    image: "https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png",
    logo: "https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png",
    bannerImage: "https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png",
    themeColor: "#E4002B",
    rating: 4.0,
    reviewsCount: 1000,
    cuisine: "Fast Food",
    priceRange: "$$",
    deliveryTime: "30-45 min",
    minimumOrder: 259,
    deliveryFee: 50,
    isTopRestaurant: true,
    isFeatured: true,
    contact: {
      phone: "+92-51-111-532-532",
      email: "info@kfcpakistan.com",
      website: "www.kfcpakistan.com",
      address: "F11 Markaz",
      city: "Islamabad",
      social: {
        instagram: "kfcpakistan",
        facebook: "KFCPakistan",
        whatsapp: "+92-51-111-532-532"
      }
    },
    features: {
      isOpen: true,
      acceptsOnlinePayment: true,
      hasHappyHours: false,
      autoAcceptOrders: true,
      atmosphere: "Casual",
      dressCode: "Casual",
      parking: "Available",
      alcohol: "No"
    },
    menuItems: {
      "Popular": [
        {
          id: "pop1",
          name: "Hot Wings",
          description: "10 Pieces Spicy and Fiery hot, get ready for a ride of flavor and spice",
          price: 670,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "pop2",
          name: "Pepsi Kombo",
          description: "Krunch burger with hot & crispy chicken piece & soft drink - 345 ml",
          price: 620,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "pop3",
          name: "Krunch Combo",
          description: "Enjoy a crispy crunchy chicken fillet on a bed of lettuce with a soft bun",
          price: 590,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "pop4",
          name: "Midnight Deal 2",
          description: "2 Krunch burgers with 2 regular soft drinks",
          price: 610,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "pop5",
          name: "Xtreme Duo Box",
          description: "2 Zinger burgers, 2 chicken pieces, large fries and 2 regular soft drinks",
          price: 1560,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "pop6",
          name: "Mighty Zinger Burger",
          description: "2 whole muscle zingers with cheese and fresh lettuce, all bundled in a soft bun",
          price: 770,
          isAvailable: true,
          category: "Popular"
        }
      ],
      "Ramadan Deals": [
        {
          id: "2",
          name: "Iftar Box",
          description: "Perfect box for breaking your fast",
          price: 799,
          isAvailable: true,
          category: "Ramadan Deals"
        },
        {
          id: "ram1",
          name: "Iftar Ki Baithak",
          description: "3 Zingers + 8 pcs Wings Bucket + 3 Reg. Drinks + 1 Fries Bucket",
          price: 1790,
          isAvailable: true,
          category: "Ramadan Deals"
        },
        {
          id: "ram2",
          name: "Leg Piece Bucket",
          description: "9 Pieces Drumsticks Bucket",
          price: 1590,
          isAvailable: true,
          category: "Ramadan Deals"
        }
      ],
      "New Arrivals": [
        {
          id: "3",
          name: "Twister Combo",
          description: "Fresh tortilla wrap with crispy chicken",
          price: 670,
          isAvailable: true,
          category: "New Arrivals"
        },
        {
          id: "new1",
          name: "K-Zing",
          description: "K-Zing features a Zinger fillet dunked in our signature black Korean sauce",
          price: 650,
          isAvailable: true,
          category: "New Arrivals"
        },
        {
          id: "new2",
          name: "K-Zing Combo",
          description: "K-Zing features a Zinger fillet dunked in our signature black Korean sauce",
          price: 940,
          isAvailable: true,
          category: "New Arrivals"
        },
        {
          id: "new3",
          name: "Cheesy Chicken Loaded Fries",
          description: "Enjoy our Cheesy Chicken Loaded Fries - topped with crispy hot shots",
          price: 650,
          isAvailable: true,
          category: "New Arrivals"
        }
      ],
      "Midnight Deals": [
        {
          id: "4",
          name: "Midnight Box",
          description: "Perfect for late night cravings",
          price: 899,
          isAvailable: true,
          category: "Midnight Deals"
        },
        {
          id: "mid1",
          name: "Midnight Deal 1",
          description: "Zinger burger with regular soft drink",
          price: 520,
          isAvailable: true,
          category: "Midnight Deals"
        },
        {
          id: "mid2",
          name: "Midnight Deal 2",
          description: "2 Krunch burgers with 2 regular soft drinks",
          price: 610,
          isAvailable: true,
          category: "Midnight Deals"
        }
      ],
      "PEPSI Kamaal Kombos": [
        {
          id: "5",
          name: "Krunch + Regular Drink",
          description: "Value combo with regular Pepsi",
          price: 520,
          isAvailable: true,
          category: "PEPSI Kamaal Kombos"
        },
        {
          id: "pepsi1",
          name: "Pepsi Kombo",
          description: "Krunch burger with hot & crispy chicken piece & soft drink - 345 ml",
          price: 620,
          isAvailable: true,
          category: "PEPSI Kamaal Kombos"
        }
      ],
      "Everyday Value": [
        {
          id: "ev1",
          name: "Krunch Burger",
          description: "Enjoy the crispy chicken fillet in a soft bun with our signature sauce",
          price: 310,
          isAvailable: true,
          category: "Everyday Value"
        },
        {
          id: "ev2",
          name: "Krunch Burger with Drink",
          description: "Enjoy a crispy crunchy chicken fillet on a bed of lettuce with a soft bun",
          price: 410,
          isAvailable: true,
          category: "Everyday Value"
        },
        {
          id: "ev3",
          name: "Krunch Chicken Combo",
          description: "Krunch Burger with Hot & Crispy Chicken Piece & 345ml Drink",
          price: 620,
          isAvailable: true,
          category: "Everyday Value"
        },
        {
          id: "ev4",
          name: "Krunch Combo",
          description: "Enjoy a crispy crunchy chicken fillet on a bed of lettuce with a soft bun",
          price: 590,
          isAvailable: true,
          category: "Everyday Value"
        },
        {
          id: "ev5",
          name: "Rice & Spice",
          description: "Add some spice to your rice with KFC's Rice and Spice! With lovely pieces of chicken",
          price: 390,
          isAvailable: true,
          category: "Everyday Value"
        },
        {
          id: "ev6",
          name: "Zingeratha",
          description: "Crispy zinger strips rolled into a golden paratha with a fusion of Imli ki chatni",
          price: 390,
          isAvailable: true,
          category: "Everyday Value"
        },
        {
          id: "ev7",
          name: "Chicken And Chips",
          description: "2 Pieces hot and crispy chicken, dinner roll, fries and dip sauce",
          price: 620,
          isAvailable: true,
          category: "Everyday Value"
        },
        {
          id: "ev8",
          name: "3 Pieces Chicken",
          description: "3 Pieces of Hot and Crispy fried chicken",
          price: 690,
          isAvailable: true,
          category: "Everyday Value"
        }
      ],
      "Meal Box": [
        {
          id: "7",
          name: "Krunch Combo",
          description: "1 Krunch burger + 1 Regular fries + 1 Regular drink",
          price: 520,
          isAvailable: true,
          category: "Meal Box"
        },
        {
          id: "mb1",
          name: "Crispy Box",
          description: "2 Pieces hot and crispy chicken, regular fries, coleslaw and regular drink",
          price: 710,
          isAvailable: true,
          category: "Meal Box"
        },
        {
          id: "mb2",
          name: "Boneless Box",
          description: "4 Zinger strips, dinner roll, regular fries, coleslaw, dip and regular soft drink",
          price: 710,
          isAvailable: true,
          category: "Meal Box"
        },
        {
          id: "mb3",
          name: "Crispy Duo Box",
          description: "5 Chicken pieces, large fries and 2 regular soft drinks",
          price: 1350,
          isAvailable: true,
          category: "Meal Box"
        },
        {
          id: "mb4",
          name: "Xtreme Duo Box",
          description: "2 Zinger burgers, 2 chicken pieces, large fries and 2 regular soft drinks",
          price: 1560,
          isAvailable: true,
          category: "Meal Box"
        }
      ],
      "Family Deals": [
        {
          id: "fd1",
          name: "Value Bucket",
          description: "9 Pieces hot and crispy chicken",
          price: 2050,
          isAvailable: true,
          category: "Family Deals"
        },
        {
          id: "fd2",
          name: "Family Festival 1",
          description: "4 Kruch burger, 4 pieces chicken, 2 dinner roll and 1.5 litre drink",
          price: 2190,
          isAvailable: true,
          category: "Family Deals"
        },
        {
          id: "fd3",
          name: "Family Festival 2",
          description: "2 Zinger burgers, 2 krunch burgers, 4 pieces chicken, 2 dinner roll and 1.5 litre drink",
          price: 2390,
          isAvailable: true,
          category: "Family Deals"
        },
        {
          id: "fd4",
          name: "Family Festival 3",
          description: "4 Zinger burgers, 4 pieces chicken, 2 dinner roll and 1.5 litre soft drink",
          price: 2590,
          isAvailable: true,
          category: "Family Deals"
        },
        {
          id: "8",
          name: "Family Festival 1",
          description: "4 Zinger burgers + 2 Large fries + 1.5L drink",
          price: 2450,
          isAvailable: true,
          category: "Family Deals"
        }
      ],
      "Chicky Meals": [
        {
          id: "9",
          name: "Kids Joy Meal",
          description: "1 Chicken piece + 1 Small fries + 1 Small drink + Toy",
          price: 595,
          isAvailable: true,
          category: "Chicky Meals"
        },
        {
          id: "cm1",
          name: "Chicky Meal 1",
          description: "Krunch burger, chicky fries, and regular soft drink or slice juice",
          price: 550,
          isAvailable: true,
          category: "Chicky Meals"
        },
        {
          id: "cm2",
          name: "Chicky Meal with Toy 1",
          description: "Krunch burger, chicky fries, and regular soft drink or slice juice and a toy",
          price: 670,
          isAvailable: true,
          category: "Chicky Meals"
        },
        {
          id: "cm3",
          name: "Chicky Meal 2",
          description: "4 Pieces of nuggets, chicky fries and regular soft drink or slice juice",
          price: 550,
          isAvailable: true,
          category: "Chicky Meals"
        },
        {
          id: "cm4",
          name: "Chicky Meal with Toy 2",
          description: "4 Pieces of nuggets, chicky fries and regular soft drink or slice juice and a toy",
          price: 670,
          isAvailable: true,
          category: "Chicky Meals"
        }
      ],
      "Make It a Meal": [
        {
          id: "10",
          name: "Zinger Burger Combo",
          description: "1 Zinger burger + 1 Regular fries + 1 Regular drink",
          price: 750,
          isAvailable: true,
          category: "Make It a Meal"
        }
      ],
      "Snacks": [
        {
          id: "11",
          name: "Hot Wings",
          description: "6 Spicy hot wings",
          price: 490,
          isAvailable: true,
          category: "Snacks"
        }
      ],
      "Beverages": [
        {
          id: "12",
          name: "Pepsi Regular",
          description: "330ml",
          price: 140,
          isAvailable: true,
          category: "Beverages"
        }
      ]
    },
    menuCategories: [
      "Popular",
      "Ramadan Deals",
      "New Arrivals",
      "Midnight Deals",
      "PEPSI Kamaal Kombos",
      "Everyday Value",
      "Meal Box",
      "Family Deals",
      "Chicky Meals",
      "Make It a Meal",
      "Snacks",
      "Beverages"
    ]
  }
];
