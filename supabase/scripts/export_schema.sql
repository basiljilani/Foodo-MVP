-- Export complete database schema
SELECT 
    'CREATE TABLE ' || relname || ' (' || 
    string_agg(
        column_name || ' ' || data_type || 
        CASE 
            WHEN character_maximum_length IS NOT NULL 
            THEN '(' || character_maximum_length || ')'
            ELSE ''
        END || 
        CASE 
            WHEN is_nullable = 'NO' THEN ' NOT NULL'
            ELSE ''
        END ||
        CASE 
            WHEN column_default IS NOT NULL 
            THEN ' DEFAULT ' || column_default
            ELSE ''
        END,
        ', '
    ) || ');' as create_statement
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY relname;

-- Export foreign keys
SELECT
    'ALTER TABLE ' || tc.table_name || ' ADD CONSTRAINT ' || tc.constraint_name || 
    ' FOREIGN KEY (' || kcu.column_name || 
    ') REFERENCES ' || ccu.table_name || 
    ' (' || ccu.column_name || ');' as foreign_keys
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY';

-- Export indexes
SELECT 
    'CREATE INDEX ' || schemaname || '.' || tablename || '_' || indexname || 
    ' ON ' || tablename || ' USING ' || indexdef || ';' as indexes
FROM pg_indexes
WHERE schemaname = 'public';

-- Export RLS policies
SELECT 
    'CREATE POLICY ' || polname || ' ON ' || tablename || 
    ' FOR ' || operation || 
    ' TO ' || roles || 
    ' USING (' || definition || ');' as policies
FROM pg_policies
WHERE schemaname = 'public';
