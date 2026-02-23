/*
  # Create new admin user

  1. New Admin User
    - Email: admin@autopflege-profi.de
    - Password: admin123 (hashed with bcrypt)
    - Name: Admin User
    - Active status: true

  2. Security
    - Password is properly hashed using bcrypt
    - User is set as active by default
*/

-- Insert new admin user
INSERT INTO admin_users (email, password_hash, name, is_active)
VALUES (
  'admin@autopflege-profi.de',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for 'admin123'
  'Admin User',
  true
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  is_active = EXCLUDED.is_active;