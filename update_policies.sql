
-- Users can update own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert own data
CREATE POLICY "Users can insert own data" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

