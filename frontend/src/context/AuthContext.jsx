import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verificar si el token es válido
      setUser({ email: 'Usuario' }); // Por ahora simple
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const register = async (email, password) => {
    try {
      const data = await authService.register({ email, password });
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
