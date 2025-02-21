-- Disable row level security to allow dropping tables
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS vendors DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS restaurants DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS menu_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS favorite_restaurants DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_settings DISABLE ROW LEVEL SECURITY;

-- Drop all tables (in correct order to handle foreign key dependencies)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop tables if they exist
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) 
    LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
    
    -- Drop functions if they exist
    FOR r IN (SELECT proname FROM pg_proc WHERE pronamespace = current_schema()::regnamespace)
    LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS ' || quote_ident(r.proname) || ' CASCADE';
    END LOOP;
    
    -- Drop triggers if they exist
    FOR r IN (SELECT tgname FROM pg_trigger WHERE tgrelid IN (SELECT oid FROM pg_class WHERE relnamespace = current_schema()::regnamespace))
    LOOP
        EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(r.tgname) || ' ON ' || quote_ident(current_schema()) || ' CASCADE';
    END LOOP;
END $$;

-- Now you can run your schema.sql file to recreate everything from scratch
