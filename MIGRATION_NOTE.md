# Database Migration Required

## Add Name Field to RSVPs Table

If you have an existing database, you'll need to add the `name` field to your RSVPs table. Run this SQL command in your Supabase SQL editor:

```sql
-- Add name column to existing RSVPs table
ALTER TABLE rsvps
ADD COLUMN IF NOT EXISTS name VARCHAR(100);
```

If you're setting up a new database, use the updated schema in `supabase-schema.sql`.

## Changes Made:

1. Added `name` field to RSVP type in `src/lib/supabase.ts`
2. Updated `supabase-schema.sql` to include `name` column
3. Enhanced RSVP component with name input field
