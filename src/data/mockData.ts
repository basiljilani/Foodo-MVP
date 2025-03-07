export const mockRestaurants = [
  {
    id: "kfc",
    name: "KFC - F11",
    description: "Kentucky Fried Chicken - World's most popular chicken restaurant chain",
    image: "https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png",
    logo: "https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png",
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
  },
  {
    id: "mcdonalds",
    name: "McDonald's - F10",
    description: "McDonald's - World's leading fast food chain known for burgers and fries",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    bannerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
    themeColor: "#FFC72C",
    rating: 4.2,
    reviewsCount: 850,
    cuisine: "Fast Food",
    priceRange: "$$",
    deliveryTime: "25-40 min",
    minimumOrder: 299,
    deliveryFee: 60,
    isTopRestaurant: true,
    isFeatured: true,
    contact: {
      phone: "+92-51-111-623-623",
      email: "info@mcdonaldspakistan.com",
      website: "www.mcdonaldspakistan.com",
      address: "F10 Markaz",
      city: "Islamabad",
      social: {
        instagram: "mcdonaldspk",
        facebook: "McDonaldsPakistan",
        whatsapp: "+92-51-111-623-623"
      }
    },
    features: {
      isOpen: true,
      acceptsOnlinePayment: true,
      hasHappyHours: true,
      autoAcceptOrders: true,
      atmosphere: "Casual",
      dressCode: "Casual",
      parking: "Available",
      alcohol: "No"
    },
    menuItems: {
      "Popular": [
        {
          id: "mcd-pop1",
          name: "Big Mac",
          description: "The iconic burger featuring two 100% beef patties, special sauce, lettuce, cheese, pickles, and onions on a sesame seed bun",
          price: 650,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "mcd-pop2",
          name: "McChicken",
          description: "A crispy chicken patty topped with mayonnaise and shredded lettuce, served on a perfectly toasted bun",
          price: 550,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "mcd-pop3",
          name: "Quarter Pounder with Cheese",
          description: "A quarter pound of 100% fresh beef topped with onions, pickles, and two slices of melty cheese",
          price: 700,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "mcd-pop4",
          name: "Filet-O-Fish",
          description: "Wild-caught fish from our sustainable fisheries, topped with melty American cheese and creamy tartar sauce",
          price: 600,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "mcd-pop5",
          name: "McNuggets (6 pcs)",
          description: "Tender, juicy chicken nuggets made with white meat, wrapped in a crisp tempura batter",
          price: 450,
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "mcd-pop6",
          name: "World Famous Fries",
          description: "Golden, crispy fries made from quality potatoes and served hot and fresh",
          price: 250,
          isAvailable: true,
          category: "Popular"
        }
      ],
      "Value Meals": [
        {
          id: "mcd-vm1",
          name: "Big Mac Meal",
          description: "Big Mac, medium fries, and a medium drink of your choice",
          price: 850,
          isAvailable: true,
          category: "Value Meals"
        },
        {
          id: "mcd-vm2",
          name: "McChicken Meal",
          description: "McChicken, medium fries, and a medium drink of your choice",
          price: 750,
          isAvailable: true,
          category: "Value Meals"
        },
        {
          id: "mcd-vm3",
          name: "Quarter Pounder Meal",
          description: "Quarter Pounder with Cheese, medium fries, and a medium drink of your choice",
          price: 900,
          isAvailable: true,
          category: "Value Meals"
        },
        {
          id: "mcd-vm4",
          name: "Filet-O-Fish Meal",
          description: "Filet-O-Fish, medium fries, and a medium drink of your choice",
          price: 800,
          isAvailable: true,
          category: "Value Meals"
        }
      ],
      "Breakfast": [
        {
          id: "mcd-br1",
          name: "Egg McMuffin",
          description: "A freshly cracked Grade A egg on a toasted English Muffin topped with Canadian bacon and American cheese",
          price: 450,
          isAvailable: true,
          category: "Breakfast"
        },
        {
          id: "mcd-br2",
          name: "Sausage McMuffin",
          description: "A savory hot sausage patty and a slice of melty American cheese on a freshly toasted English muffin",
          price: 400,
          isAvailable: true,
          category: "Breakfast"
        },
        {
          id: "mcd-br3",
          name: "Hotcakes",
          description: "Three golden brown hotcakes with a side of real butter and sweet maple flavored syrup",
          price: 500,
          isAvailable: true,
          category: "Breakfast"
        },
        {
          id: "mcd-br4",
          name: "Hash Browns",
          description: "Crispy shredded potato hash brown patties that are perfectly crispy on the outside and tender on the inside",
          price: 200,
          isAvailable: true,
          category: "Breakfast"
        }
      ],
      "Chicken & Sandwiches": [
        {
          id: "mcd-cs1",
          name: "Spicy McCrispy",
          description: "Crispy chicken fillet with spicy pepper sauce, crispy lettuce and mayonnaise on a potato roll",
          price: 650,
          isAvailable: true,
          category: "Chicken & Sandwiches"
        },
        {
          id: "mcd-cs2",
          name: "Deluxe Crispy Chicken",
          description: "Crispy chicken fillet topped with Roma tomatoes, lettuce, and mayo on a potato roll",
          price: 600,
          isAvailable: true,
          category: "Chicken & Sandwiches"
        },
        {
          id: "mcd-cs3",
          name: "McArabia Chicken",
          description: "Two grilled chicken patties with lettuce, tomatoes, onions and garlic sauce wrapped in Arabic bread",
          price: 700,
          isAvailable: true,
          category: "Chicken & Sandwiches"
        }
      ],
      "Desserts & Shakes": [
        {
          id: "mcd-ds1",
          name: "McFlurry with OREO Cookies",
          description: "Vanilla soft serve with OREO cookie pieces mixed throughout",
          price: 350,
          isAvailable: true,
          category: "Desserts & Shakes"
        },
        {
          id: "mcd-ds2",
          name: "Chocolate Shake",
          description: "Creamy vanilla soft serve blended with chocolate syrup and topped with whipped cream",
          price: 400,
          isAvailable: true,
          category: "Desserts & Shakes"
        },
        {
          id: "mcd-ds3",
          name: "Strawberry Shake",
          description: "Creamy vanilla soft serve blended with strawberry syrup and topped with whipped cream",
          price: 400,
          isAvailable: true,
          category: "Desserts & Shakes"
        },
        {
          id: "mcd-ds4",
          name: "Hot Fudge Sundae",
          description: "Creamy vanilla soft serve topped with hot fudge and a cherry",
          price: 300,
          isAvailable: true,
          category: "Desserts & Shakes"
        }
      ],
      "Happy Meals": [
        {
          id: "mcd-hm1",
          name: "Hamburger Happy Meal",
          description: "Hamburger, kids fries, apple slices, and your choice of a kids' drink",
          price: 550,
          isAvailable: true,
          category: "Happy Meals"
        },
        {
          id: "mcd-hm2",
          name: "4pc McNuggets Happy Meal",
          description: "4 piece Chicken McNuggets, kids fries, apple slices, and your choice of a kids' drink",
          price: 600,
          isAvailable: true,
          category: "Happy Meals"
        },
        {
          id: "mcd-hm3",
          name: "6pc McNuggets Happy Meal",
          description: "6 piece Chicken McNuggets, kids fries, apple slices, and your choice of a kids' drink",
          price: 650,
          isAvailable: true,
          category: "Happy Meals"
        }
      ],
      "McCafé": [
        {
          id: "mcd-mc1",
          name: "Cappuccino",
          description: "A warm cup of espresso topped with frothy steamed milk",
          price: 350,
          isAvailable: true,
          category: "McCafé"
        },
        {
          id: "mcd-mc2",
          name: "Caramel Macchiato",
          description: "Espresso, vanilla-flavored syrup and steamed milk, topped with caramel drizzle",
          price: 400,
          isAvailable: true,
          category: "McCafé"
        },
        {
          id: "mcd-mc3",
          name: "Mocha",
          description: "Espresso, steamed milk, chocolate syrup, and whipped cream",
          price: 400,
          isAvailable: true,
          category: "McCafé"
        },
        {
          id: "mcd-mc4",
          name: "Hot Chocolate",
          description: "Steamed whole milk and chocolate syrup, topped with whipped cream and chocolate drizzle",
          price: 350,
          isAvailable: true,
          category: "McCafé"
        }
      ]
    },
    menuCategories: [
      "Popular",
      "Value Meals",
      "Breakfast",
      "Chicken & Sandwiches",
      "Desserts & Shakes",
      "Happy Meals",
      "McCafé"
    ]
  },
  {
    id: "savour",
    name: "Savour Foods - F7",
    description: "Savour Foods - Islamabad's favorite spot for authentic Pakistani cuisine and signature pulao",
    image: "https://cdn.brandfetch.io/idlzXxFS50/w/500/h/500/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    logo: "https://cdn.brandfetch.io/idlzXxFS50/w/500/h/500/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    bannerImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200",
    themeColor: "#9C27B0",
    rating: 4.5,
    reviewsCount: 1250,
    cuisine: "Pakistani, Pulao, BBQ",
    priceRange: "$$",
    deliveryTime: "35-50 min",
    minimumOrder: 400,
    deliveryFee: 100,
    isTopRestaurant: true,
    isFeatured: true,
    contact: {
      phone: "+92-51-2655777",
      email: "contact@savourfoods.pk",
      website: "www.savourfoods.com.pk",
      address: "F-7 Markaz, Jinnah Super",
      city: "Islamabad",
      social: {
        instagram: "savourfoodsofficial",
        facebook: "SavourFoodsOfficial",
        whatsapp: "+923001234567"
      }
    },
    features: {
      isOpen: true,
      acceptsOnlinePayment: true,
      hasHappyHours: false,
      autoAcceptOrders: true,
      atmosphere: "Traditional",
      dressCode: "Casual",
      parking: "Available",
      alcohol: "No"
    },
    menuItems: {
      "Popular": [
        {
          id: "savour-pop1",
          name: "Chicken Pulao",
          description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices",
          price: 350,
          image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "savour-pop2",
          name: "Beef Pulao",
          description: "Slow-cooked beef with basmati rice and special spice blend",
          price: 400,
          image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        }
      ],
      "CHICKEN PULAO": [
        {
          id: "savour-cp1",
          name: "Chicken Pulao (Regular)",
          description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices",
          price: 350,
          image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "CHICKEN PULAO"
        },
        {
          id: "savour-cp2",
          name: "Chicken Pulao (Large)",
          description: "Family-sized portion of our signature chicken pulao",
          price: 650,
          image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "CHICKEN PULAO"
        }
      ],
      "CHICKEN": [
        {
          id: "savour-c1",
          name: "Chicken Karahi",
          description: "Spicy chicken curry cooked in a traditional wok with tomatoes and green chilies",
          price: 550,
          image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "CHICKEN"
        },
        {
          id: "savour-c2",
          name: "Chicken Tikka",
          description: "Marinated chicken pieces grilled to perfection",
          price: 450,
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "CHICKEN"
        }
      ],
      "SWEET": [
        {
          id: "savour-s1",
          name: "Kheer",
          description: "Traditional rice pudding with cardamom and nuts",
          price: 200,
          image: "https://images.unsplash.com/photo-1605197161470-5d2a9af8a767?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "SWEET"
        },
        {
          id: "savour-s2",
          name: "Gulab Jamun",
          description: "Sweet milk dumplings soaked in sugar syrup",
          price: 150,
          image: "https://images.unsplash.com/photo-1601303516477-c52cd2c21c87?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "SWEET"
        }
      ],
      "DRINKS": [
        {
          id: "savour-d1",
          name: "Lassi",
          description: "Traditional yogurt-based drink, sweet or salty",
          price: 120,
          image: "https://images.unsplash.com/photo-1626201850121-5a16e8ba6faa?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "DRINKS"
        },
        {
          id: "savour-d2",
          name: "Kashmiri Chai",
          description: "Pink tea with cardamom, cinnamon and nuts",
          price: 150,
          image: "https://images.unsplash.com/photo-1561501878-aabd62634533?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "DRINKS"
        }
      ],
      "SAVOUR ICE CREAMS": [
        {
          id: "savour-ic1",
          name: "Kulfi",
          description: "Traditional Pakistani ice cream with pistachios",
          price: 200,
          image: "https://images.unsplash.com/photo-1582994254571-52c62d96ebab?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "SAVOUR ICE CREAMS"
        },
        {
          id: "savour-ic2",
          name: "Mango Ice Cream",
          description: "Creamy ice cream with fresh mango flavor",
          price: 180,
          image: "https://images.unsplash.com/photo-1501443762994-d11ec9c172f0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "SAVOUR ICE CREAMS"
        }
      ],
      "SIDE ORDERS": [
        {
          id: "savour-so1",
          name: "Raita",
          description: "Yogurt with cucumber and spices",
          price: 80,
          image: "https://images.unsplash.com/photo-1589516761346-19ac0cb1db6a?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "SIDE ORDERS"
        },
        {
          id: "savour-so2",
          name: "Salad",
          description: "Fresh vegetable salad with lemon dressing",
          price: 100,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "SIDE ORDERS"
        }
      ],
      "DAIGH ORDERS": [
        {
          id: "savour-do1",
          name: "Chicken Pulao Daigh",
          description: "Large catering size chicken pulao (serves 10-12)",
          price: 3500,
          image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "DAIGH ORDERS"
        },
        {
          id: "savour-do2",
          name: "Beef Pulao Daigh",
          description: "Large catering size beef pulao (serves 10-12)",
          price: 4000,
          image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "DAIGH ORDERS"
        }
      ]
    },
    menuCategories: [
      "Popular",
      "CHICKEN PULAO",
      "CHICKEN",
      "SWEET",
      "DRINKS",
      "SAVOUR ICE CREAMS",
      "SIDE ORDERS",
      "DAIGH ORDERS"
    ]
  },
  {
    id: "howdy",
    name: "Howdy - F8",
    description: "Islamabad's favorite burger joint with premium quality ingredients and signature sauces",
    image: "/images/coming-soon.svg",
    logo: "/images/coming-soon.svg",
    bannerImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200",
    themeColor: "#FF5722",
    rating: 4.7,
    reviewsCount: 850,
    cuisine: "Fast Food, Burgers",
    priceRange: "$$",
    deliveryTime: "25-40 min",
    minimumOrder: 300,
    deliveryFee: 60,
    isTopRestaurant: true,
    isFeatured: true,
    contact: {
      phone: "+92-51-111-469-39",
      email: "info@howdy.pk",
      website: "www.howdy.pk",
      address: "F8 Markaz",
      city: "Islamabad",
      social: {
        instagram: "howdypakistan",
        facebook: "HowdyPakistan",
        whatsapp: "+92-51-111-469-39"
      }
    },
    features: {
      isOpen: true,
      acceptsOnlinePayment: true,
      hasHappyHours: true,
      autoAcceptOrders: true,
      atmosphere: "Casual",
      dressCode: "Casual",
      parking: "Available",
      alcohol: "No"
    },
    menuItems: {
      "Popular": [
        {
          id: "howdy-pop1",
          name: "Classic Smashed Burger",
          description: "Signature smashed patty with cheese, lettuce, tomato and special sauce",
          price: 550,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "howdy-pop2",
          name: "Loaded Fries",
          description: "Crispy fries topped with cheese sauce, jalapeños and special seasoning",
          price: 350,
          image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        }
      ],
      "Burgers": [
        {
          id: "howdy-b1",
          name: "Classic Smashed Burger",
          description: "Signature smashed patty with cheese, lettuce, tomato and special sauce",
          price: 550,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Burgers"
        },
        {
          id: "howdy-b2",
          name: "Double Trouble",
          description: "Double smashed patties with double cheese and all the fixings",
          price: 750,
          image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Burgers"
        }
      ],
      "Sides": [
        {
          id: "howdy-s1",
          name: "Loaded Fries",
          description: "Crispy fries topped with cheese sauce, jalapeños and special seasoning",
          price: 350,
          image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Sides"
        },
        {
          id: "howdy-s2",
          name: "Onion Rings",
          description: "Crispy battered onion rings with special dipping sauce",
          price: 300,
          image: "https://images.unsplash.com/photo-1581746303826-a0538b0e5f8f?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Sides"
        }
      ],
      "Beverages": [
        {
          id: "howdy-bev1",
          name: "Signature Milkshake",
          description: "Thick and creamy milkshake in various flavors",
          price: 400,
          image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Beverages"
        },
        {
          id: "howdy-bev2",
          name: "Fresh Lemonade",
          description: "Refreshing homemade lemonade",
          price: 200,
          image: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Beverages"
        }
      ]
    },
    menuCategories: [
      "Popular",
      "Burgers",
      "Sides",
      "Beverages"
    ]
  },
  {
    id: "chaaye-khana",
    name: "Chaaye Khana - F7",
    description: "Cozy tea house offering a variety of teas, traditional Pakistani breakfast and comfort food",
    image: "/images/coming-soon.svg",
    logo: "/images/coming-soon.svg",
    bannerImage: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&w=1200",
    themeColor: "#8D6E63",
    rating: 4.6,
    reviewsCount: 1200,
    cuisine: "Cafe, Pakistani, Continental",
    priceRange: "$$",
    deliveryTime: "30-45 min",
    minimumOrder: 350,
    deliveryFee: 70,
    isTopRestaurant: true,
    isFeatured: false,
    contact: {
      phone: "+92-51-2656789",
      email: "info@chaayekhana.com",
      website: "www.chaayekhana.com",
      address: "F7 Markaz",
      city: "Islamabad",
      social: {
        instagram: "chaayekhanaisb",
        facebook: "ChaayeKhanaIsb",
        whatsapp: "+92-51-2656789"
      }
    },
    features: {
      isOpen: true,
      acceptsOnlinePayment: true,
      hasHappyHours: false,
      autoAcceptOrders: true,
      atmosphere: "Cozy",
      dressCode: "Casual",
      parking: "Available",
      alcohol: "No"
    },
    menuItems: {
      "Popular": [
        {
          id: "ck-pop1",
          name: "Doodh Patti Chai",
          description: "Traditional Pakistani milk tea brewed to perfection",
          price: 180,
          image: "https://images.unsplash.com/photo-1561336526-2914f13ceb36?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "ck-pop2",
          name: "Paratha Roll",
          description: "Flaky paratha filled with chicken or beef and special sauces",
          price: 350,
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        }
      ],
      "Breakfast": [
        {
          id: "ck-b1",
          name: "Halwa Puri",
          description: "Traditional Pakistani breakfast with semolina halwa, chickpea curry and fried bread",
          price: 400,
          image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Breakfast"
        },
        {
          id: "ck-b2",
          name: "Omelette Paratha",
          description: "Flaky paratha served with fluffy omelette and chutney",
          price: 350,
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Breakfast"
        }
      ],
      "Tea & Coffee": [
        {
          id: "ck-tc1",
          name: "Doodh Patti Chai",
          description: "Traditional Pakistani milk tea brewed to perfection",
          price: 180,
          image: "https://images.unsplash.com/photo-1561336526-2914f13ceb36?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Tea & Coffee"
        },
        {
          id: "ck-tc2",
          name: "Kashmiri Pink Tea",
          description: "Traditional pink tea with cardamom, cinnamon and nuts",
          price: 250,
          image: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Tea & Coffee"
        }
      ],
      "Main Course": [
        {
          id: "ck-mc1",
          name: "Chicken Karahi",
          description: "Spicy chicken curry cooked in a traditional wok",
          price: 850,
          image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Main Course"
        },
        {
          id: "ck-mc2",
          name: "Biryani",
          description: "Aromatic rice dish with tender chicken and special spices",
          price: 550,
          image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Main Course"
        }
      ]
    },
    menuCategories: [
      "Popular",
      "Breakfast",
      "Tea & Coffee",
      "Main Course"
    ]
  },
  {
    id: "tandoori",
    name: "Tandoori - Blue Area",
    description: "Authentic Pakistani and North Indian cuisine with signature tandoori specialties",
    image: "/images/coming-soon.svg",
    logo: "/images/coming-soon.svg",
    bannerImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200",
    themeColor: "#D32F2F",
    rating: 4.4,
    reviewsCount: 950,
    cuisine: "Pakistani, North Indian",
    priceRange: "$$",
    deliveryTime: "35-50 min",
    minimumOrder: 400,
    deliveryFee: 80,
    isTopRestaurant: false,
    isFeatured: true,
    contact: {
      phone: "+92-51-2278901",
      email: "info@tandoori.pk",
      website: "www.tandoori.pk",
      address: "Blue Area",
      city: "Islamabad",
      social: {
        instagram: "tandooriisb",
        facebook: "TandooriIsb",
        whatsapp: "+92-51-2278901"
      }
    },
    features: {
      isOpen: true,
      acceptsOnlinePayment: true,
      hasHappyHours: false,
      autoAcceptOrders: true,
      atmosphere: "Traditional",
      dressCode: "Casual",
      parking: "Limited",
      alcohol: "No"
    },
    menuItems: {
      "Popular": [
        {
          id: "tandoori-pop1",
          name: "Tandoori Chicken",
          description: "Chicken marinated in yogurt and spices, cooked in a clay oven",
          price: 650,
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        },
        {
          id: "tandoori-pop2",
          name: "Butter Naan",
          description: "Soft bread cooked in tandoor and brushed with butter",
          price: 80,
          image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Popular"
        }
      ],
      "Tandoori Specialties": [
        {
          id: "tandoori-ts1",
          name: "Tandoori Chicken",
          description: "Chicken marinated in yogurt and spices, cooked in a clay oven",
          price: 650,
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Tandoori Specialties"
        },
        {
          id: "tandoori-ts2",
          name: "Seekh Kebab",
          description: "Minced meat kebabs with herbs and spices",
          price: 450,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Tandoori Specialties"
        }
      ],
      "Curries": [
        {
          id: "tandoori-c1",
          name: "Butter Chicken",
          description: "Tandoori chicken cooked in a rich tomato and butter sauce",
          price: 750,
          image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Curries"
        },
        {
          id: "tandoori-c2",
          name: "Palak Paneer",
          description: "Cottage cheese cubes in a spinach gravy",
          price: 550,
          image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Curries"
        }
      ],
      "Breads": [
        {
          id: "tandoori-b1",
          name: "Butter Naan",
          description: "Soft bread cooked in tandoor and brushed with butter",
          price: 80,
          image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Breads"
        },
        {
          id: "tandoori-b2",
          name: "Garlic Naan",
          description: "Naan bread topped with garlic and butter",
          price: 100,
          image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=300&h=200&fit=crop",
          isAvailable: true,
          category: "Breads"
        }
      ]
    },
    menuCategories: [
      "Popular",
      "Tandoori Specialties",
      "Curries",
      "Breads"
    ]
  }
];
