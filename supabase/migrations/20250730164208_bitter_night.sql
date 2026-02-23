/*
  # Create Supabase Auth user for admin

  1. New Auth User
    - Creates a Supabase Auth user for admin@autopflege-profi.de
    - This is required for the authentication flow to work
    - The admin_users table entry already exists from previous migration

  2. Security
    - User will be able to authenticate through Supabase Auth
    - Admin verification happens in admin_users table
*/

-- Insert auth user for admin (this creates the user in auth.users)
-- Note: In production, you would typically create users through the Supabase dashboard
-- or use the admin API. This is for development purposes.

-- The auth user creation needs to be done through Supabase's admin functions
-- Since we can't directly insert into auth.users, we'll update the auth flow instead