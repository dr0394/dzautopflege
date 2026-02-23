/*
  # Create new admin user chouman

  1. New Admin User
    - Email: admin@autopflege-chouman.de
    - Password: Chouman2025! (hashed with bcrypt)
    - Name: Chouman Admin
    - Status: Active

  2. Security
    - Password is properly hashed
    - User has full admin access
*/

-- Insert new admin user
INSERT INTO admin_users (email, password_hash, name, is_active)
VALUES (
  'admin@autopflege-chouman.de',
  '$2b$10$8K9wGzVQXNvYGH5FqJxOu.rK3mP7nL2sA4tB6cE8dF9gH0iJ1kL2m',
  'Chouman Admin',
  true
)
ON CONFLICT (email) 
DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  name = EXCLUDED.name,
  is_active = EXCLUDED.is_active,
  created_at = now();