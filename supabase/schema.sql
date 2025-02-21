-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table with enhanced profile information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'vendor', 'admin')),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE,
    phone_number TEXT,
    avatar_url TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_preferences table for storing user preferences
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    dietary_preferences TEXT[] DEFAULT '{}',  -- e.g., ['vegetarian', 'halal', 'gluten-free']
    cuisine_preferences TEXT[] DEFAULT '{}',  -- e.g., ['italian', 'japanese', 'indian']
    spice_level TEXT CHECK (spice_level IN ('mild', 'medium', 'hot', 'extra_hot')),
    price_range TEXT[] DEFAULT '{}' CHECK (price_range <@ ARRAY['$', '$$', '$$$', '$$$$']),
    allergens TEXT[] DEFAULT '{}',  -- e.g., ['nuts', 'dairy', 'shellfish']
    favorite_categories TEXT[] DEFAULT '{}',  -- e.g., ['pizza', 'sushi', 'desserts']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id)
);

-- Create user_addresses table for multiple delivery addresses
CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    address_type TEXT NOT NULL CHECK (address_type IN ('home', 'work', 'other')),
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_payment_methods table
CREATE TABLE user_payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    payment_type TEXT NOT NULL CHECK (payment_type IN ('credit_card', 'debit_card', 'upi', 'wallet')),
    card_last_four TEXT,
    card_brand TEXT,
    is_default BOOLEAN DEFAULT false,
    expires_at DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_notifications_settings table
CREATE TABLE user_notification_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    order_updates BOOLEAN DEFAULT true,
    promotional_emails BOOLEAN DEFAULT true,
    special_offers BOOLEAN DEFAULT true,
    newsletter BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id)
);

-- Add Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notification_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view and edit their own data"
    ON users FOR ALL
    USING (auth.uid() = auth_id)
    WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Users can view and edit their own preferences"
    ON user_preferences FOR ALL
    USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id))
    WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view and edit their own addresses"
    ON user_addresses FOR ALL
    USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id))
    WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view and edit their own payment methods"
    ON user_payment_methods FOR ALL
    USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id))
    WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view and edit their own notification settings"
    ON user_notification_settings FOR ALL
    USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id))
    WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamps
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_addresses_updated_at
    BEFORE UPDATE ON user_addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_payment_methods_updated_at
    BEFORE UPDATE ON user_payment_methods
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notification_settings_updated_at
    BEFORE UPDATE ON user_notification_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
