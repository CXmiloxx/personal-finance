import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  });

  const [user, setUser] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(() => {
    return localStorage.getItem('isFirstLogin') === 'true'; // Verificar si es el primer login
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_API}/limbs/auth/verify`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);

          // Si es el primer login, guardamos en localStorage
          if (!localStorage.getItem('isFirstLogin')) {
            localStorage.setItem('isFirstLogin', 'true');
            setIsFirstLogin(true);
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        logout();
      }
    };

    verifyToken();
  }, []);

  const login = async ({ email, password }) => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/limbs/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: email, userPass: password }),
      },
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al iniciar sesión');
    localStorage.setItem('token', data.token);
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setUser(data.user);

    // Si es la primera vez, marcamos en el localStorage
    if (!localStorage.getItem('isFirstLogin')) {
      localStorage.setItem('isFirstLogin', 'true');
      setIsFirstLogin(true);
    }

    return data;
  };

  const signUpUser = async ({ name, email, password }) => {
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/limbs/auth/newUser`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: name,
          userEmail: email,
          userPass: password,
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al registrarse');

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setUser(data.user);

      // Si es la primera vez, marcamos en el localStorage
      if (!localStorage.getItem('isFirstLogin')) {
        localStorage.setItem('isFirstLogin', 'true');
        setIsFirstLogin(true);
      }
    }

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUser(null);
    setIsFirstLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signUpUser, logout, isFirstLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
