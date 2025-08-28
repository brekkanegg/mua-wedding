-- Create RSVPs table
CREATE TABLE rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100),
    side VARCHAR(10) (side IN ('신랑측', '신부측')),
    attendance VARCHAR(10) NOT NULL CHECK (attendance IN ('참석', '불참')),
    meal BOOLEAN NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size >= 1),
    message TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Create index on created_at for faster sorting
CREATE INDEX idx_rsvps_created_at ON rsvps(created_at DESC);
-- Create index on side for filtering
CREATE INDEX idx_rsvps_side ON rsvps(side);
-- Create index on attendance for filtering
CREATE INDEX idx_rsvps_attendance ON rsvps(attendance);
-- Enable Row Level Security (optional but recommended)
ALTER TABLE
    rsvps ENABLE ROW LEVEL SECURITY;
-- Create policy to allow anonymous inserts (for public RSVP submissions)
CREATE POLICY "Allow anonymous inserts" ON rsvps FOR
INSERT
    WITH CHECK (TRUE);
-- Create policy to allow authenticated reads (for admin viewing)
-- You may want to adjust this based on your authentication setup
CREATE POLICY "Allow authenticated reads" ON rsvps FOR
SELECT
    USING (TRUE);
-- Or you can restrict to authenticated users only