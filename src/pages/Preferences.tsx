import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Layout from '../components/Layout';
import ProfileSidebar from '../components/ProfileSidebar';
import { Heart, Utensils, Leaf, Flame, Clock, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserPreferences {
  favorite_cuisines: string[];
  dietary_restrictions: string[];
  spice_level: string;
  favorite_restaurants: string[];
  meal_size: string;
  preferred_times: string[];
}

export default function Preferences() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences>({
    favorite_cuisines: [],
    dietary_restrictions: [],
    spice_level: 'medium',
    favorite_restaurants: [],
    meal_size: 'medium',
    preferred_times: [],
  });

  // Available options
  const cuisineTypes = [
    'Italian', 'Japanese', 'Chinese', 'Mexican', 'Indian', 
    'Thai', 'Mediterranean', 'American', 'French', 'Korean'
  ];

  const dietaryRestrictions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Halal', 'Kosher', 'Nut-Free', 'Low-Carb', 'Keto'
  ];

  const spiceLevels = [
    { value: 'mild', label: 'Mild' },
    { value: 'medium', label: 'Medium' },
    { value: 'hot', label: 'Hot' },
    { value: 'extra-hot', label: 'Extra Hot' }
  ];

  const mealSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const timeSlots = [
    'Breakfast (6AM-10AM)',
    'Brunch (10AM-12PM)',
    'Lunch (12PM-3PM)',
    'Afternoon (3PM-6PM)',
    'Dinner (6PM-10PM)',
    'Late Night (10PM-2AM)'
  ];

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast.error('Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Preferences saved successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setLoading(false);
    }
  };

  const togglePreference = (category: keyof UserPreferences, item: string) => {
    setPreferences(prev => {
      const current = prev[category] as string[];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  const handleInputChange = (category: keyof UserPreferences, value: string) => {
    setPreferences(prev => ({ ...prev, [category]: value }));
  };

  if (!user || loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white rounded-lg shadow">
              <ProfileSidebar userFullName={user.email?.split('@')[0] || 'User'} />
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">Food Preferences</h1>
                  <button
                    onClick={savePreferences}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>

                {/* Favorite Cuisines */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Utensils className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-medium text-gray-900">Favorite Cuisines</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cuisineTypes.map(cuisine => (
                      <button
                        key={cuisine}
                        onClick={() => togglePreference('favorite_cuisines', cuisine)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          preferences.favorite_cuisines.includes(cuisine)
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-medium text-gray-900">Dietary Restrictions</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dietaryRestrictions.map(restriction => (
                      <button
                        key={restriction}
                        onClick={() => togglePreference('dietary_restrictions', restriction)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          preferences.dietary_restrictions.includes(restriction)
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {restriction}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spice Level */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-medium text-gray-900">Spice Level</h2>
                  </div>
                  <div className="flex gap-4">
                    {spiceLevels.map(level => (
                      <button
                        key={level.value}
                        onClick={() => handleInputChange('spice_level', level.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          preferences.spice_level === level.value
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal Size Preference */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Utensils className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-medium text-gray-900">Portion Size</h2>
                  </div>
                  <div className="flex gap-4">
                    {mealSizes.map(size => (
                      <button
                        key={size.value}
                        onClick={() => handleInputChange('meal_size', size.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          preferences.meal_size === size.value
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Times */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-medium text-gray-900">Preferred Meal Times</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => togglePreference('preferred_times', time)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          preferences.preferred_times.includes(time)
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Favorite Restaurants */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-medium text-gray-900">Favorite Restaurants</h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {preferences.favorite_restaurants.map(restaurant => (
                        <div
                          key={restaurant}
                          className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                        >
                          {restaurant}
                          <button
                            onClick={() => togglePreference('favorite_restaurants', restaurant)}
                            className="hover:text-red-900"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a restaurant (press Enter)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          togglePreference('favorite_restaurants', e.currentTarget.value.trim());
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
