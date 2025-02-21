import React from 'react';
import ProfileLayout from '../../layouts/ProfileLayout';
import MainLayout from '../../layouts/MainLayout';
import { useSupabaseClient } from '../../contexts/SupabaseContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Utensils, Heart, AlertTriangle, Coffee, Flame, Clock } from 'lucide-react';

export default function Preferences() {
  const { user } = useAuth();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = React.useState(false);
  const [preferences, setPreferences] = React.useState({
    dietary_preferences: [] as string[],
    food_allergies: [] as string[],
    favorite_cuisines: [] as string[],
    favorite_restaurants: [] as string[],
    meal_preferences: [] as string[],
    spice_level: 'medium',
    price_range: 'medium',
    ordering_time: [] as string[],
    cravings: [] as string[],
  });

  React.useEffect(() => {
    if (user?.id) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setPreferences({
          dietary_preferences: data.dietary_preferences || [],
          food_allergies: data.food_allergies || [],
          favorite_cuisines: data.favorite_cuisines || [],
          favorite_restaurants: data.favorite_restaurants || [],
          meal_preferences: data.meal_preferences || [],
          spice_level: data.spice_level || 'medium',
          price_range: data.price_range || 'medium',
          ordering_time: data.ordering_time || [],
          cravings: data.cravings || [],
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error loading preferences');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
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
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error updating preferences');
    } finally {
      setLoading(false);
    }
  };

  const PreferenceSection = ({ 
    title, 
    description,
    icon: Icon,
    items, 
    type,
    bgColorSelected = 'bg-red-500',
    bgColorUnselected = 'bg-gray-100'
  }: { 
    title: string;
    description: string;
    icon: any;
    items: string[]; 
    type: keyof typeof preferences;
    bgColorSelected?: string;
    bgColorUnselected?: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${bgColorSelected} bg-opacity-10`}>
          <Icon className={`h-6 w-6 ${bgColorSelected.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => togglePreference(type, item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              preferences[type].includes(item)
                ? `${bgColorSelected} text-white`
                : `${bgColorUnselected} text-gray-700 hover:bg-gray-200`
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  const togglePreference = (type: keyof typeof preferences, item: string) => {
    setPreferences(prev => ({
      ...prev,
      [type]: prev[type].includes(item)
        ? prev[type].filter(i => i !== item)
        : [...prev[type], item]
    }));
  };

  const RadioGroup = ({ 
    title, 
    description, 
    icon: Icon,
    name, 
    options, 
    value, 
    onChange 
  }) => (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-red-500 bg-opacity-10">
          <Icon className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onChange(name, option.value)}
            className={`relative rounded-lg px-4 py-3 cursor-pointer focus:outline-none ${
              value === option.value
                ? 'bg-red-50 border-2 border-red-500'
                : 'border border-gray-300 hover:border-red-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm">
                  <p className={`font-medium ${
                    value === option.value ? 'text-red-900' : 'text-gray-900'
                  }`}>
                    {option.label}
                  </p>
                  <p className={`text-xs ${
                    value === option.value ? 'text-red-700' : 'text-gray-500'
                  }`}>
                    {option.description}
                  </p>
                </div>
              </div>
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                value === option.value
                  ? 'border-red-500 bg-red-500'
                  : 'border-gray-300'
              }`}>
                {value === option.value && (
                  <div className="h-2.5 w-2.5 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Food Preferences</h2>
          <p className="text-gray-600">Customize your food preferences to get personalized recommendations.</p>

          <PreferenceSection
            title="Dietary Preferences"
            description="Select any dietary restrictions or preferences"
            icon={Utensils}
            items={[
              'Vegetarian',
              'Vegan',
              'Halal',
              'Kosher',
              'Gluten-Free',
              'Dairy-Free',
              'Low-Carb',
              'Keto',
              'Paleo'
            ]}
            type="dietary_preferences"
          />

          <PreferenceSection
            title="Food Allergies"
            description="Select any food allergies or intolerances"
            icon={AlertTriangle}
            items={[
              'Peanuts',
              'Tree Nuts',
              'Milk',
              'Eggs',
              'Soy',
              'Wheat',
              'Fish',
              'Shellfish'
            ]}
            type="food_allergies"
            bgColorSelected="bg-yellow-500"
          />

          <PreferenceSection
            title="Favorite Cuisines"
            description="Select your preferred cuisines"
            icon={Heart}
            items={[
              'Pakistani',
              'Indian',
              'Chinese',
              'Italian',
              'Mexican',
              'Thai',
              'Japanese',
              'Mediterranean',
              'American'
            ]}
            type="favorite_cuisines"
          />

          <PreferenceSection
            title="Meal Preferences"
            description="Select your preferred meal types"
            icon={Coffee}
            items={[
              'Breakfast',
              'Brunch',
              'Lunch',
              'Dinner',
              'Snacks',
              'Desserts',
              'Beverages'
            ]}
            type="meal_preferences"
          />

          <RadioGroup
            title="Spice Level"
            description="Select your preferred spice level"
            icon={Flame}
            name="spice_level"
            value={preferences.spice_level}
            onChange={(name: string, value: string) => setPreferences(prev => ({ ...prev, [name]: value }))}
            options={[
              { value: 'mild', label: 'Mild', description: 'Little to no spice' },
              { value: 'medium', label: 'Medium', description: 'Moderate spice level' },
              { value: 'hot', label: 'Hot', description: 'Very spicy' }
            ]}
          />

          <RadioGroup
            title="Price Range"
            description="Select your preferred price range"
            icon={Clock}
            name="price_range"
            value={preferences.price_range}
            onChange={(name: string, value: string) => setPreferences(prev => ({ ...prev, [name]: value }))}
            options={[
              { value: 'budget', label: 'Budget', description: 'Under Rs. 500' },
              { value: 'medium', label: 'Medium', description: 'Rs. 500 - 1500' },
              { value: 'premium', label: 'Premium', description: 'Above Rs. 1500' }
            ]}
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}
