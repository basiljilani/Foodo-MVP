import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, Users, ChefHat, Filter, Sparkles, Coffee, Soup, UtensilsCrossed } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

// Sample recipe data
const recipes = [
  {
    id: 1,
    title: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2940&auto=format&fit=crop",
    time: "1.5 hrs",
    servings: "6",
    difficulty: "Hard",
    tags: ["Dawat", "Special", "Chawal", "Gosht"],
    rating: 5.0,
    description: "Masaledaar Hyderabadi biryani with tender chicken and aromatic long-grain rice"
  },
  {
    id: 2,
    title: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2940&auto=format&fit=crop",
    time: "45 min",
    servings: "4",
    difficulty: "Medium",
    tags: ["Raat ka Khana", "Special", "Gosht"],
    rating: 4.9,
    description: "Creamy and rich butter chicken with perfect balance of spices"
  },
  {
    id: 3,
    title: "Palak Paneer",
    image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?q=80&w=2787&auto=format&fit=crop",
    time: "35 min",
    servings: "4",
    difficulty: "Easy",
    tags: ["Roz Marra", "Sabzi", "Dopeher ka Khana"],
    rating: 4.7,
    description: "Creamy spinach curry with fresh paneer cubes, perfect with roti or naan"
  },
  {
    id: 4,
    title: "Masala Dosa",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2940&auto=format&fit=crop",
    time: "45 min",
    servings: "3",
    difficulty: "Medium",
    tags: ["Nashta", "Special", "Roz Marra"],
    rating: 4.8,
    description: "Crispy dosa served with spicy potato masala and coconut chutney"
  },
  {
    id: 5,
    title: "Chicken Tikka",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2940&auto=format&fit=crop",
    time: "40 min",
    servings: "4",
    difficulty: "Medium",
    tags: ["Dawat", "Special", "Gosht"],
    rating: 4.9,
    description: "Tender chicken pieces marinated in spices and grilled to perfection"
  },
  {
    id: 6,
    title: "Chana Masala",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2936&auto=format&fit=crop",
    time: "35 min",
    servings: "4",
    difficulty: "Easy",
    tags: ["Roz Marra", "Dopeher ka Khana", "Special"],
    rating: 4.6,
    description: "Spicy chickpea curry cooked with onions, tomatoes and aromatic spices"
  }
];

const categories = [
  { name: "Sab Kuch", icon: Sparkles },
  { name: "Nashta", icon: Coffee },
  { name: "Dopeher ka Khana", icon: Soup },
  { name: "Raat ka Khana", icon: UtensilsCrossed },
  { name: "Dawat Special", icon: ChefHat },
];

const mealTypes = [
  "Roz Marra",
  "Special",
  "Dawat",
  "Ramzan",
  "Nashta",
  "Dopeher ka Khana",
  "Raat ka Khana"
];

const dishTypes = [
  "Gosht",
  "Chawal",
  "Daal",
  "Sabzi",
  "Roti",
  "Meetha"
];

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState("Sab Kuch");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedDishType, setSelectedDishType] = useState("");

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Desi Recipes
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Aj Khanay Mai Kya Banaya Jaye? Find the perfect desi recipe for any occasion!
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Recipe dhoondhein..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Kis Waqt Ka Khana?</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-full flex items-center space-x-2 ${
                    selectedCategory === category.name
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-12 space-y-6">
            {/* Meal Type Filter */}
            <div>
              <h3 className="text-lg font-medium mb-3">Kis Occasion Ka Khana?</h3>
              <div className="flex flex-wrap gap-2">
                {mealTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMealType(selectedMealType === type ? "" : type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedMealType === type
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Dish Type Filter */}
            <div>
              <h3 className="text-lg font-medium mb-3">Kis Qism Ka Khana?</h3>
              <div className="flex flex-wrap gap-2">
                {dishTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedDishType(selectedDishType === type ? "" : type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedDishType === type
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
                      ⭐️ {recipe.rating}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {recipe.servings} servings
                    </div>
                    <div className="flex items-center">
                      <ChefHat className="h-4 w-4 mr-1" />
                      {recipe.difficulty}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0] }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-red-500 text-white text-xl font-bold rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
            >
              ✨ Maza Aya? ✨
            </motion.button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
