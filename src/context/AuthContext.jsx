import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  });
  const [user, setUser] = useState(null);
  const [isFirstLogin, setIsFirstLogin] = useState(() => {
    return localStorage.getItem('isFirstLogin') === 'true';
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
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

          if (!localStorage.getItem('isFirstLogin')) {
            localStorage.setItem('isFirstLogin', 'true');
            setIsFirstLogin(true);
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        setError(error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/limbs/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userEmail: email, userPass: password }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || 'Error al iniciar sesión');

      localStorage.setItem('token', data.token);
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setUser(data.user);

      if (!localStorage.getItem('isFirstLogin')) {
        localStorage.setItem('isFirstLogin', 'true');
        setIsFirstLogin(true);
      }

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpUser = async ({ name, email, password }) => {
    setLoading(true);
    setError(null);

    try {
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

        if (!localStorage.getItem('isFirstLogin')) {
          localStorage.setItem('isFirstLogin', 'true');
          setIsFirstLogin(true);
        }
      }

      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUser(null);
    setIsFirstLogin(false);
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/limbs/auth/resetPassword`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || 'Error al restablecer la contraseña');
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const newPassword = async (token, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/limbs/auth/newPassword`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token, newPassword: password }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || 'Error al restablecer la contraseña');
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signUpUser,
        logout,
        isFirstLogin,
        resetPassword,
        newPassword,
        loading,
        error,
      }}
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
