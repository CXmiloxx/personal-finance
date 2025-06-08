import { useState, useCallback, useMemo } from 'react';

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoriza el token para evitar acceder a localStorage cada vez
  const token = useMemo(() => localStorage.getItem('token'), []);

  // Función principal para hacer fetch
  const fetchData = useCallback(async (url, method = 'GET', options = {}, useToken = true) => {
    setLoading(true);
    setError(null);

    try {
      const defaultHeaders = {
        'Content-Type': 'application/json',
        ...(useToken && token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await fetch(url, {
        method,
        headers: {
          ...defaultHeaders,
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  const get = useCallback((url, options = {}, useToken = true) => {
    return fetchData(url, 'GET', options, useToken);
  }, [fetchData]);

  const post = useCallback((url, options = {}, useToken = true) => {
    return fetchData(url, 'POST', options, useToken);
  }, [fetchData]);

  const put = useCallback((url, options = {}, useToken = true) => {
    return fetchData(url, 'PUT', options, useToken);
  }, [fetchData]);

  const patch = useCallback((url, options = {}, useToken = true) => {
    return fetchData(url, 'PATCH', options, useToken);
  }, [fetchData]);

  const del = useCallback((url, options = {}, useToken = true) => {
    return fetchData(url, 'DELETE', options, useToken);
  }, [fetchData]);

  return { get, post, put, patch, del, loading, error };
};
