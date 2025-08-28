# RSVP Setup Guide

## 1. Environment Variables Setup

Create a `.env.local` file in the root directory with the following content:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 2. Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Get your project URL and anon key from the project settings
3. Replace the values in `.env.local` with your actual Supabase credentials

## 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `supabase-schema.sql` to create the RSVPs table

## 4. Features

The RSVP section includes:

-   **하객 구분**: 신랑측/신부측 (Guest Side: Groom/Bride)
-   **참석 여부**: 참석/불참 (Attendance: Attending/Not Attending)
-   **식사 여부**: O/X (Meal: Yes/No)
-   **총 일행**: 본인 포함 인원수 (Party Size: Including self)
-   **메시지**: 선택사항 (Message: Optional)
-   **연락처**: 선택사항 (Phone: Optional)

## 5. Viewing RSVPs

To view submitted RSVPs:

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Select the `rsvps` table

Or create an admin page by accessing the GET endpoint at `/api/rsvp`
