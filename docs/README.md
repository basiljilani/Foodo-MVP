# Foodo-MVP Restaurant Data Documentation

This directory contains structured documentation and data for the Foodo-MVP restaurant management system. The goal is to provide a clear path for migrating from mock data to a Supabase database while preserving the existing frontend experience.

## Directory Structure

- `restaurant_schema.md` - Detailed schema documentation for restaurant data
- `restaurants/` - Individual restaurant data files in JSON format
  - `kfc.json` - KFC restaurant data
  - `mcdonalds.json` - McDonald's restaurant data
- `supabase_schema.sql` - Complete SQL schema for Supabase implementation
- `data_migration_guide.md` - Step-by-step guide for migrating to Supabase

## Purpose

This documentation serves several purposes:

1. **Standardization** - Provides a consistent structure for all restaurant data
2. **Scalability** - Makes adding new restaurants straightforward and systematic
3. **Migration Path** - Creates a clear path to move from mock data to Supabase
4. **Preservation** - Ensures the frontend experience remains unchanged during migration

## Adding a New Restaurant

To add a new restaurant:

1. Create a new JSON file in the `restaurants/` directory following the schema
2. Use the existing files (kfc.json, mcdonalds.json) as templates
3. When ready to migrate to Supabase, follow the instructions in `data_migration_guide.md`

## Key Benefits

- **Separation of Concerns** - Data structure is clearly defined and separated from UI components
- **Consistency** - All restaurants follow the same data structure
- **Maintainability** - Easy to update restaurant information in one place
- **Gradual Migration** - Supports a phased approach to database integration

## Next Steps

After adding restaurant data files, you can:

1. Update the mock data in the application to use these JSON files
2. Set up Supabase using the provided schema
3. Implement the data service layer as described in the migration guide
4. Gradually transition from mock data to Supabase while maintaining the same frontend experience
