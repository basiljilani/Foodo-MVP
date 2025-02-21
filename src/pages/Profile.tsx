import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import { useSupabaseClient } from '../contexts/SupabaseContext';
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, Calendar, FileText } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const supabase = useSupabaseClient();
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState({
    full_name: '',
    phone: '',
    date_of_birth: '',
    bio: '',
    email: user?.email || '',
  });

  React.useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          date_of_birth: data.date_of_birth || '',
          bio: data.bio || '',
          email: user?.email || '',
        });
      }
    } catch (error) {
      toast.error('Error loading profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    id, 
    type = 'text',
    value,
    onChange,
    disabled = false,
    placeholder = ''
  }) => (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
        />
      </div>
    </div>
  );

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-6">
            <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.full_name || 'Your Profile'}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your personal information and preferences
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white rounded-lg shadow">
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              {/* Personal Information Section */}
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    icon={User}
                    label="Full Name"
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                  <InputField
                    icon={Mail}
                    label="Email"
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled={true}
                    placeholder="Your email address"
                  />
                  <InputField
                    icon={Phone}
                    label="Phone Number"
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                  <InputField
                    icon={Calendar}
                    label="Date of Birth"
                    id="date_of_birth"
                    type="date"
                    value={profile.date_of_birth}
                    onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-medium text-gray-900">About You</h3>
                <div className="relative">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute top-3 left-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us a bit about yourself..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}
