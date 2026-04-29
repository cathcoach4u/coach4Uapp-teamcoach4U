-- Add a member to the users table.
-- Run in the Supabase SQL editor for the eekefsuaefgpqmjdyniy project.
-- Replace the email address before running.

INSERT INTO users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');
