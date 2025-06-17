import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '#/AuthContext';
import { useFetch } from './useFetch';
import { CustomAlert } from '@/ui/CustomAlert';

export default function useStatistics() {
  const { get, error: fetchError } = useFetch();
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totals: { income: 0, expense: 0, balance: 0 },
    topTransactions: [],
    recentTransactions: [],
    averageExpense: '0.00',
    topCategory: { name: '', total: '0.00' },
    periodAverages: [],
  });
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Memoize user ID to prevent unnecessary re-renders
  const idUser = useMemo(() => user?.id, [user?.id]);

  // Memoize fetchStatistics function
  const fetchStatistics = useCallback(async () => {
    if (!idUser) return;

    setLoading(true);
    try {
      const data = await get(`/api/v1/statistics`, {
        params: { userId: idUser },
      });

      if (data) {
        // Validate and transform data
        const validatedData = {
          totals: {
            income: Number(data.totals?.income) || 0,
            expense: Number(data.totals?.expense) || 0,
            balance: Number(data.totals?.balance) || 0,
          },
          topTransactions: Array.isArray(data.topTransactions)
            ? data.topTransactions
            : [],
          recentTransactions: Array.isArray(data.recentTransactions)
            ? data.recentTransactions
            : [],
          averageExpense: data.averageExpense || '0.00',
          topCategory: {
            name: data.topCategory?.name || '',
            total: data.topCategory?.total || '0.00',
          },
          periodAverages: Array.isArray(data.periodAverages)
            ? data.periodAverages.map((item) => ({
                period: item.period,
                average: Number(item.average) || 0,
              }))
            : [],
        };

        setStatistics(validatedData);
        setError(null);
      }
    } catch (err) {
      console.error('Error al obtener estadísticas:', err);
      setError(err.message);
      CustomAlert.error('Error', 'No se pudieron cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  }, [idUser, get]);

  useEffect(() => {
    if (idUser) {
      fetchStatistics();
    }
  }, [idUser, fetchStatistics]);

  // Memoize the return object to prevent unnecessary re-renders
  const returnValue = useMemo(
    () => ({
      statistics,
      loading,
      error: error || fetchError,
      refetch: fetchStatistics,
    }),
    [statistics, loading, error, fetchError, fetchStatistics],
  );

  return returnValue;
}
