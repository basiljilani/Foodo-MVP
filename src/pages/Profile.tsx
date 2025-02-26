import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import { useSupabaseClient } from '../contexts/SupabaseContext';
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, Calendar, FileText, Camera } from 'lucide-react';

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
    const getProfile = async () => {
      try {
        setLoading(true);
        if (!user?.id) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile({
            ...profile,
            ...data,
          });
        }
      } catch (error) {
        toast.error('Error loading profile data');
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!user?.id) return;

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profile,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <ProfileLayout>
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-medium text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-500">Update your personal information</p>
              </div>
              <div className="h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="flex items-center text-[13px] font-medium text-gray-500 pl-1">
                <User className="w-4 h-4 mr-2 text-red-500" />
                Full Name
              </label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full h-12 px-4 bg-gray-50 rounded-xl border-0 text-gray-900 
                  placeholder:text-gray-400 transition-all duration-300
                  focus:ring-2 focus:ring-red-500/20 focus:bg-white"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="flex items-center text-[13px] font-medium text-gray-500 pl-1">
                <Mail className="w-4 h-4 mr-2 text-red-500" />
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full h-12 px-4 bg-gray-100 rounded-xl border-0 text-gray-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="flex items-center text-[13px] font-medium text-gray-500 pl-1">
                <Phone className="w-4 h-4 mr-2 text-red-500" />
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full h-12 px-4 bg-gray-50 rounded-xl border-0 text-gray-900 
                  placeholder:text-gray-400 transition-all duration-300
                  focus:ring-2 focus:ring-red-500/20 focus:bg-white"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <label className="flex items-center text-[13px] font-medium text-gray-500 pl-1">
                <Calendar className="w-4 h-4 mr-2 text-red-500" />
                Date of Birth
              </label>
              <input
                type="date"
                value={profile.date_of_birth}
                onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                className="w-full h-12 px-4 bg-gray-50 rounded-xl border-0 text-gray-900 
                  transition-all duration-300
                  focus:ring-2 focus:ring-red-500/20 focus:bg-white"
              />
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <label className="flex items-center text-[13px] font-medium text-gray-500 pl-1">
                <FileText className="w-4 h-4 mr-2 text-red-500" />
                Bio
              </label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 text-gray-900 
                  placeholder:text-gray-400 transition-all duration-300 resize-none
                  focus:ring-2 focus:ring-red-500/20 focus:bg-white"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="relative h-12 px-6 bg-red-500 text-white font-medium rounded-xl 
                  transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/20
                  disabled:opacity-50 disabled:hover:shadow-none disabled:hover:bg-red-500"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}
