
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthState, UserRole } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Acessos mockados
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@identifica-ig.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Moderator User',
    email: 'moderator@identifica-ig.com',
    password: 'moderator123',
    role: 'moderator' as UserRole,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Test User',
    email: 'user@identifica-ig.com',
    password: 'user123',
    role: 'user' as UserRole,
    createdAt: new Date(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Try to authenticate with Supabase first
      const { data: supabaseData, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (supabaseError) {
        // If Supabase auth fails, fall back to mock data
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          toast({
            title: 'Erro ao entrar',
            description: 'Email ou senha inválidos',
            variant: 'destructive',
          });
          throw new Error('Invalid credentials');
        }

        // Remove password before storing
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        setAuthState({
          user: userWithoutPassword,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // If Supabase auth succeeds, get user role and data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseData.user?.id)
          .single();
          
        const userRole = profileData?.role || 'user';
        
        // Create user object from Supabase data
        const userWithRole: User = {
          id: supabaseData.user?.id || '',
          name: supabaseData.user?.user_metadata?.full_name || profileData?.full_name || email.split('@')[0],
          email: supabaseData.user?.email || email,
          role: userRole as UserRole,
          createdAt: new Date(supabaseData.user?.created_at || Date.now()),
        };
        
        localStorage.setItem('user', JSON.stringify(userWithRole));
        
        setAuthState({
          user: userWithRole,
          isAuthenticated: true,
          isLoading: false,
        });
      }
      
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo(a) de volta!',
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Erro ao entrar',
        description: error instanceof Error ? error.message : 'Ocorreu um erro no login',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Try to register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        }
      });

      if (error) {
        // If Supabase registration fails, check if the user exists in mock data
        const userExists = MOCK_USERS.some((u) => u.email === email);
        if (userExists) {
          toast({
            title: 'Erro ao registrar',
            description: 'Este email já está em uso',
            variant: 'destructive',
          });
          throw new Error('Email already in use');
        }

        // Add to mock data as fallback
        const newUser = {
          id: `${MOCK_USERS.length + 1}`,
          name,
          email,
          password,
          role: 'user' as UserRole,
          createdAt: new Date(),
        };

        // Add user to mock data
        MOCK_USERS.push(newUser);

        // Remove password before storing
        const { password: _, ...userWithoutPassword } = newUser;
        
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        setAuthState({
          user: userWithoutPassword,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Registration successful in Supabase
        const userRole = 'user';
        
        // Create user object from Supabase data
        const userWithRole: User = {
          id: data.user?.id || '',
          name: name,
          email: data.user?.email || email,
          role: userRole as UserRole,
          createdAt: new Date(data.user?.created_at || Date.now()),
        };
        
        localStorage.setItem('user', JSON.stringify(userWithRole));
        
        setAuthState({
          user: userWithRole,
          isAuthenticated: true,
          isLoading: false,
        });
      }
      
      toast({
        title: 'Registro realizado com sucesso',
        description: 'Sua conta foi criada!',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Erro ao registrar',
        description: error instanceof Error ? error.message : 'Ocorreu um erro no registro',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = () => {
    // Sign out from Supabase
    supabase.auth.signOut().catch(console.error);
    
    // Clear local storage and state
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    toast({
      title: 'Logout realizado',
      description: 'Você saiu da sua conta',
    });
  };

  const requestPasswordReset = async (email: string) => {
    try {
      // Try with Supabase first
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        // Fallback to mock data
        const user = MOCK_USERS.find((u) => u.email === email);
        if (!user) {
          toast({
            title: 'Erro',
            description: 'Email não encontrado',
            variant: 'destructive',
          });
          throw new Error('Email not found');
        }
      }

      toast({
        title: 'Redefinição de senha solicitada',
        description: 'Verifique seu email para instruções',
      });
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro na redefinição de senha',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
