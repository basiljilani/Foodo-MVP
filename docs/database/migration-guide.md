# Foodo-MVP Migration Guide: Mock Data to Supabase

This guide outlines the step-by-step process for migrating Foodo-MVP from using static JSON files to a scalable Supabase database while preserving the exact frontend experience.

## Key Principles

1. **Preserve Web Experience**: The web version of Foodo-MVP has reached an optimal state and must be maintained. All changes must preserve the current web functionality.

2. **Exact Data Structure**: The data service layer will return data in the exact format that frontend components expect, regardless of the source.

3. **Gradual Migration**: The approach allows for migrating one restaurant at a time, testing thoroughly before proceeding.

4. **Fallback Mechanism**: Mock data will be retained as a fallback in case of database connectivity issues.

## Migration Steps

### Phase 1: Preparation (Current State)

✅ **Create standardized JSON schema**
- Individual restaurant data files in `docs/restaurants/` directory
- Consistent structure across all restaurant files

✅ **Design SQL schema for Supabase**
- Tables designed to match frontend data requirements
- Optimized for performance with 50,000+ restaurants
- PostGIS integration for location-based features

✅ **Create data service implementation plan**
- Service layer that abstracts data source
- TypeScript interfaces matching current data structure
- Fallback to mock data when needed

### Phase 2: Supabase Setup (Next Steps)

1. **Create Supabase Project**
   ```bash
   # Install Supabase CLI if not already installed
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Initialize Supabase project
   supabase init
   ```

2. **Apply SQL Schema**
   - Go to the Supabase dashboard
   - Navigate to the SQL Editor
   - Run the SQL schema from `docs/database/supabase_schema.sql`
   - Verify all tables and functions are created correctly

3. **Set Up Environment Variables**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_USE_SUPABASE=false  # Keep as false initially
   ```

4. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

### Phase 3: Implementation

1. **Create Data Service Layer**
   - Implement `restaurantService.ts` as outlined in the implementation guide
   - Create TypeScript interfaces for all data structures

2. **Update Imports in Components**
   - Identify all components that directly import JSON files
   - Replace with service layer functions
   - Example:
     ```tsx
     // Before
     import kfcData from '../docs/restaurants/kfc.json';
     
     // After
     import { getRestaurantById } from '../services/restaurantService';
     const [restaurant, setRestaurant] = useState(null);
     useEffect(() => {
       getRestaurantById('kfc').then(setRestaurant);
     }, []);
     ```

3. **Import Data to Supabase**
   - Run the data import script from the implementation guide
   - Verify data is correctly imported
   - Test queries to ensure data can be retrieved in the expected format

### Phase 4: Testing and Validation

1. **Test with a Single Restaurant**
   - Choose one restaurant (e.g., KFC)
   - Temporarily modify the service to use Supabase only for that restaurant
   - Test all features thoroughly:
     - Restaurant listing
     - Restaurant details page
     - Menu categories and items
     - Near Me feature
     - Ads display

2. **Visual Regression Testing**
   - Compare screenshots before and after the change
   - Ensure UI is identical in all viewports
   - Verify all animations and interactions work as expected

3. **Performance Testing**
   - Measure load times before and after
   - Ensure no degradation in performance
   - Test with network throttling to simulate slower connections

### Phase 5: Gradual Rollout

1. **Restaurant-by-Restaurant Migration**
   - Migrate one restaurant at a time
   - Test thoroughly after each migration
   - Monitor for any issues or regressions

2. **Enable Supabase for All Restaurants**
   - Once all restaurants are migrated and tested
   - Set `VITE_USE_SUPABASE=true` in environment variables
   - Deploy the updated application

3. **Monitor and Optimize**
   - Watch for any errors or performance issues
   - Optimize database queries if needed
   - Consider adding caching for frequently accessed data

## Rollback Plan

If issues are encountered during migration:

1. **Immediate Rollback**
   - Set `VITE_USE_SUPABASE=false` to revert to mock data
   - This can be done without redeploying the application

2. **Partial Rollback**
   - If only specific restaurants have issues
   - Modify the service to use mock data for problematic restaurants only

3. **Data Correction**
   - If data inconsistencies are found
   - Fix the data in Supabase
   - No frontend changes needed

## Future Enhancements

Once the migration is complete, these enhancements can be considered:

1. **Caching Layer**
   - Implement client-side caching for restaurant data
   - Reduce database queries and improve performance

2. **Real-time Updates**
   - Leverage Supabase's real-time capabilities
   - Update UI when restaurant data changes

3. **Admin Dashboard**
   - Create an admin interface for managing restaurant data
   - Allow updating menu items, prices, and availability

4. **Analytics Integration**
   - Track popular restaurants and menu items
   - Gather insights on user behavior

## Conclusion

This migration approach ensures:

1. **Zero disruption** to the current web experience
2. **Scalability** to support 50,000+ restaurants
3. **Resilience** with fallback to mock data
4. **Flexibility** for future enhancements

The key to success is maintaining the exact data structure expected by the frontend while changing the underlying data source. By following this guide, the migration can be accomplished with minimal risk and maximum confidence.
