# Supabase Project Setup Documentation

## How to Export Current State

### 1. Database Schema
To get a complete view of your database schema:
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Run the script from `supabase/scripts/export_schema.sql`
4. Save the output as `current_schema.sql`

### 2. API Settings
Document your API settings:
```bash
# From Supabase Dashboard > Settings > API
Project URL: https://[YOUR-PROJECT-ID].supabase.co
Project API Keys:
- anon public
- service_role (keep secure)
```

### 3. Authentication Settings
From Dashboard > Authentication:
- Enabled providers
- Email template settings
- Custom redirect URLs

### 4. Storage Buckets
From Dashboard > Storage:
```sql
-- List all buckets and policies
SELECT 
    buckets.name,
    policies.name as policy_name,
    policies.definition
FROM storage.buckets
LEFT JOIN storage.policies 
ON buckets.id = policies.bucket_id;
```

### 5. Edge Functions
From Dashboard > Edge Functions:
- List of deployed functions
- Environment variables

### 6. Database Functions
```sql
-- Export all custom functions
SELECT 
    routine_name,
    routine_definition
FROM information_schema.routines
WHERE routine_schema = 'public';
```

## Maintaining Documentation

### 1. Schema Changes
When making schema changes:
1. Create migration files in `supabase/migrations/`
2. Document changes in `docs/development_log.md`
3. Update TypeScript types

### 2. API Changes
When modifying API:
1. Update API documentation
2. Update TypeScript types
3. Test affected endpoints

### 3. Security Updates
When updating security:
1. Document RLS policies
2. Update role permissions
3. Test access patterns

## Best Practices

### 1. Version Control
- Keep migration files in git
- Document breaking changes
- Tag major versions

### 2. Testing
- Maintain test data scripts
- Document test cases
- Keep test environment separate

### 3. Backup
Regular exports of:
- Schema
- RLS policies
- Functions
- Storage policies

## Troubleshooting

### Common Issues
1. RLS Policy Conflicts
2. Foreign Key Constraints
3. Type Mismatches

### Debug Process
1. Check logs in Dashboard
2. Review RLS policies
3. Test queries in SQL Editor
4. Verify TypeScript types

## Development Workflow

### 1. Local Development
```bash
# Start local Supabase
supabase start

# Apply migrations
supabase migration up

# Generate types
supabase gen types typescript --local > src/types/supabase.ts
```

### 2. Deployment
```bash
# Deploy to production
supabase db push

# Verify changes
supabase db diff
```

### 3. Monitoring
- Check Dashboard > Database > Performance
- Monitor API usage
- Review error logs
