import { useState, useCallback, useMemo } from 'react';

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_URL_API;

  // Memoriza el token para evitar acceder a localStorage cada vez
  const token = useMemo(() => localStorage.getItem('token'), []);

  // Función principal para hacer fetch
  const fetchData = useCallback(
    async (url, method = 'GET', options = {}, useToken = true) => {
      setLoading(true);
      setError(null);

      try {
        const defaultHeaders = {
          'Content-Type': 'application/json',
          ...(useToken && token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const response = await fetch(`${API_URL}${url}`, {
          method,
          headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        const data = await response.json();

        if (!response.ok) {

          throw new Error(data.message || 'Error en la petición');
        }
        return data;
      } catch (err) {
        const errorMessage = err.message || 'Error en la petición';
        setError(errorMessage);
        console.error('Fetch error:', errorMessage);
        throw err; // Re-lanzamos el error para manejarlo en el componente
      } finally {
        setLoading(false);
      }
    },
    [token, API_URL],
  );

  const get = useCallback(
    (url, options = {}, useToken = true) => {
      return fetchData(url, 'GET', options, useToken);
    },
    [fetchData],
  );

  const post = useCallback(
    (url, options = {}, useToken = true) => {
      return fetchData(url, 'POST', options, useToken);
    },
    [fetchData],
  );

  const put = useCallback(
    (url, options = {}, useToken = true) => {
      return fetchData(url, 'PUT', options, useToken);
    },
    [fetchData],
  );

  const patch = useCallback(
    (url, options = {}, useToken = true) => {
      return fetchData(url, 'PATCH', options, useToken);
    },
    [fetchData],
  );

  const del = useCallback(
    (url, options = {}, useToken = true) => {
      return fetchData(url, 'DELETE', options, useToken);
    },
    [fetchData],
  );

  return { get, post, put, patch, del, loading, error };
};
