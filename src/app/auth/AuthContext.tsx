import { createContext, useContext, useState, ReactNode } from 'react';
import { authApi } from '../api';

export interface Usuario {
  id: string | number;
  nome: string;
  email: string;
  cargo: string;
  avatar?: string;
  token?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);



export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const saved = sessionStorage.getItem('crm_usuario');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const { token, usuario: usuarioApi } = await authApi.login(email, senha);
      const usuarioComToken = { ...usuarioApi, token };
      setUsuario(usuarioComToken);
      sessionStorage.setItem('crm_usuario', JSON.stringify(usuarioComToken));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    sessionStorage.removeItem('crm_usuario');
  };

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, isAuthenticated: !!usuario }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
