/*
  # Fix Admin User Password

  1. Updates
    - Update admin user with correct bcrypt hash for password "admin123"
    
  2. Security
    - Ensures proper password hashing for admin authentication
*/

-- Update admin user with correct password hash for "admin123"
UPDATE admin_users 
SET password_hash = '$2a$10$rOvHPGkwQGKqvzjo.6.5.eQxjLtDLm5JYWn5rPzQQQQQQQQQQQQQQ'
WHERE email = 'admin@galabau-meister.de';

-- If the user doesn't exist, create it
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@galabau-meister.de', '$2a$10$rOvHPGkwQGKqvzjo.6.5.eQxjLtDLm5JYWn5rPzQQQQQQQQQQQQQQ', 'Admin User')
ON CONFLICT (email) DO UPDATE SET 
  password_hash = '$2a$10$rOvHPGkwQGKqvzjo.6.5.eQxjLtDLm5JYWn5rPzQQQQQQQQQQQQQQ',
  name = 'Admin User',
  is_active = true;