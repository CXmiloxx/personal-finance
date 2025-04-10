import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const getInitialAuthState = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuthState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', isAuthenticated);
    }
  }, [isAuthenticated]);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/limbs/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contraseña: password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al iniciar sesión');

      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signUp = async ({ username, email, password }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/limbs/newUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: username, correo: email, contraseña: password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error al registrarse');

      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
