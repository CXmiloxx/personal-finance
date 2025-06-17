import { createContext, useContext, useState, useEffect } from 'react';
import { useFetch } from '!/useFetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  });
  const [user, setUser] = useState(null);

  const { get, post, put, loading: fetchLoading, error: fetchError } = useFetch();

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
        const data = await get(`/api/v1/auth/verify`);
        if (data?.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        setError(error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [get]);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await post(`/api/v1/auth/login`, {
        body: { email, password },
      });

      if (!data?.token) throw new Error('Error al iniciar sesión');

      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);

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
      const data = await post(`/api/v1/auth/register`, {
        body: { name, email, password },
      });

      if (!data) throw new Error('Error al registrarse');

      // No establecemos isAuthenticated aquí, ya que el usuario necesita hacer login
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await post(`/api/v1/auth/forgot-password`, {
        body: { email },
      });
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
      const data = await put(`/api/v1/auth/reset-password`, {
        body: { token, newPassword: password },
      });
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
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signUpUser,
        logout,
        resetPassword,
        newPassword,
        loading: loading || fetchLoading,
        error: error || fetchError,
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
