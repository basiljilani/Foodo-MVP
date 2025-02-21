import React, { createContext, useContext, useState } from 'react';

interface AuthUser {
  id: string;
  role: 'customer' | 'vendor';
  email: string;
  profile: {
    full_name: string;
    avatar_url?: string;
    phone_number?: string;
    bio?: string;
    business_name?: string;
    business_address?: string;
    contact_number?: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, role: 'customer' | 'vendor') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isVendor: () => boolean;
  isCustomer: () => boolean;
  updateProfile: (data: Partial<AuthUser['profile']>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_CUSTOMER = {
  id: '1',
  role: 'customer' as const,
  email: 'customer@example.com',
  profile: {
    full_name: 'John Doe',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    phone_number: '+1234567890',
    bio: 'Food lover and adventure seeker'
  }
};

const MOCK_VENDOR = {
  id: '2',
  role: 'vendor' as const,
  email: 'vendor@example.com',
  profile: {
    full_name: 'Jane Smith',
    business_name: 'Jane\'s Diner',
    business_address: '123 Food Street, Cuisine City',
    contact_number: '+1987654321',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    bio: 'Serving happiness since 2020'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

  const signUp = async (email: string, password: string, role: 'customer' | 'vendor') => {
    setLoading(true);
    await simulateDelay();
    
    const mockUser = role === 'customer' ? MOCK_CUSTOMER : MOCK_VENDOR;
    setUser(mockUser);
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await simulateDelay();

    // Mock authentication logic
    if (email === MOCK_CUSTOMER.email) {
      setUser(MOCK_CUSTOMER);
    } else if (email === MOCK_VENDOR.email) {
      setUser(MOCK_VENDOR);
    } else {
      setUser(MOCK_CUSTOMER); // Default to customer for demo
    }
    
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await simulateDelay();
    setUser(null);
    setLoading(false);
  };

  const updateProfile = async (data: Partial<AuthUser['profile']>) => {
    setLoading(true);
    await simulateDelay();
    
    if (user) {
      setUser({
        ...user,
        profile: {
          ...user.profile,
          ...data
        }
      });
    }
    
    setLoading(false);
  };

  const isVendor = () => user?.role === 'vendor';
  const isCustomer = () => user?.role === 'customer';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
      isVendor,
      isCustomer,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
