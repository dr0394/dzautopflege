import { supabase } from './supabase';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
}

class AdminAuth {
  private currentUser: AdminUser | null = null;

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔐 Attempting login with email:', email);
      
      // Hardcoded credentials for demo - in production, use proper password hashing
      const validCredentials = [
        { email: 'admin@autopflege-profi.de', password: 'admin123', name: 'AutoPflege Admin' },
        { email: 'admin@autopflege-chouman.de', password: 'Chouman2025!', name: 'Chouman Admin' }
      ];

      const validUser = validCredentials.find(cred => 
        cred.email === email && cred.password === password
      );

      if (!validUser) {
        console.log('❌ Invalid credentials for:', email);
        return { success: false, error: 'Ungültige Anmeldedaten' };
      }

      // Try to get user from database, but don't fail if it doesn't exist
      try {
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .eq('is_active', true);

        if (adminError) {
          console.warn('⚠️ Database query failed, using hardcoded credentials:', adminError.message);
        }

        // Use database data if available, otherwise use hardcoded data
        const userData = (adminData && adminData.length > 0) ? adminData[0] : {
          id: email === 'admin@autopflege-profi.de' ? 'admin-1' : 'admin-2',
          email: validUser.email,
          name: validUser.name,
          is_active: true
        };

        this.currentUser = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          is_active: userData.is_active
        };

        // Store in localStorage for persistence
        localStorage.setItem('adminUser', JSON.stringify(this.currentUser));
        
        console.log('✅ Login successful for:', userData.email);
        return { success: true };

      } catch (dbError) {
        console.warn('⚠️ Database connection failed, using hardcoded credentials:', dbError);
        
        // Fallback to hardcoded user data
        this.currentUser = {
          id: email === 'admin@autopflege-profi.de' ? 'admin-1' : 'admin-2',
          email: validUser.email,
          name: validUser.name,
          is_active: true
        };

        localStorage.setItem('adminUser', JSON.stringify(this.currentUser));
        console.log('✅ Login successful (fallback) for:', validUser.email);
        return { success: true };
      }

    } catch (error) {
      console.error('💥 Login error:', error);
      return { success: false, error: 'Anmeldung fehlgeschlagen: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler') };
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('adminUser');
    console.log('👋 User logged out');
  }

  getCurrentUser(): AdminUser | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to restore from localStorage
    const stored = localStorage.getItem('adminUser');
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored);
        return this.currentUser;
      } catch (error) {
        console.error('Error parsing stored admin user:', error);
        localStorage.removeItem('adminUser');
      }
    }

    return null;
  }

  async checkAuthStatus(): Promise<boolean> {
    try {
      const user = this.getCurrentUser();
      const isAuthenticated = user !== null;
      console.log('🔍 Auth status check:', isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated');
      return isAuthenticated;
    } catch (error) {
      console.error('Auth check error:', error);
      this.logout();
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const adminAuth = new AdminAuth();