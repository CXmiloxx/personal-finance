import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '#/AuthContext';
import { useFetch } from './useFetch';
import { CustomAlert } from '@/ui/CustomAlert';

export default function useTransactions() {
  const { get, post, put, del, error: fetchError } = useFetch();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const userId = useMemo(() => user?.id, [user?.id]);

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;

    try {
      const data = await get(`/api/v1/transactions`, {
        params: { userId },
      });

      if (data?.transactions) {
        setTransactions(data.transactions);
        setError(null);
      }
    } catch (err) {
      console.error('Error al obtener transacciones:', err);
      setError(err.message);
      CustomAlert.error('Error', 'No se pudieron cargar las transacciones');
    }
  }, [userId, get]);

  const createTransaction = useCallback(
    async (transactionData) => {
      if (!userId) {
        CustomAlert.error('Error', 'Usuario no autenticado');
        return false;
      }

      try {
        const data = await post(`/api/v1/transactions`, {
          body: { ...transactionData, userId },
        });

        if (data?.message) {
          CustomAlert.success('¡Éxito!', data.message);
        } else {
          CustomAlert.success('¡Éxito!', 'Transacción creada correctamente');
        }

        await fetchTransactions();
        return true;
      } catch (err) {
        const errorMessage = err.message || 'No se pudo crear la transacción';
        CustomAlert.error('Error', errorMessage);
        console.error('Error al crear transacción:', err);
        setError(errorMessage);
        return false;
      }
    },
    [userId, post, fetchTransactions],
  );

  const editTransaction = useCallback(
    async (transactionId, transactionData) => {
      if (!userId) {
        CustomAlert.error('Error', 'Usuario no autenticado');
        return false;
      }

      try {
        const data = await put(`/api/v1/transactions/${transactionId}`, {
          body: { ...transactionData, userId },
        });

        if (data?.message) {
          CustomAlert.success('¡Éxito!', data.message);
        } else {
          CustomAlert.success(
            '¡Éxito!',
            'Transacción actualizada correctamente',
          );
        }

        await fetchTransactions();
        return true;
      } catch (err) {
        const errorMessage =
          err.message || 'No se pudo actualizar la transacción';
        CustomAlert.error('Error', errorMessage);
        console.error('Error al actualizar transacción:', err);
        setError(errorMessage);
        return false;
      }
    },
    [userId, put, fetchTransactions],
  );

  const deleteTransaction = useCallback(
    async (transactionId) => {
      if (!userId) {
        CustomAlert.error('Error', 'Usuario no autenticado');
        return false;
      }

      try {
        const data = await del(`/api/v1/transactions/${transactionId}`, {
          body: { userId, transactionId },
        });

        if (data?.message) {
          CustomAlert.success('¡Éxito!', data.message);
        } else {
          CustomAlert.success('¡Éxito!', 'Transacción eliminada correctamente');
        }

        await fetchTransactions();
        return true;
      } catch (err) {
        const errorMessage =
          err.message || 'No se pudo eliminar la transacción';
        CustomAlert.error('Error', errorMessage);
        console.error('Error al eliminar transacción:', err);
        setError(errorMessage);
        return false;
      }
    },
    [userId, del, fetchTransactions],
  );

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId, fetchTransactions]);

  return {
    transactions,
    error: error || fetchError,
    createTransaction,
    editTransaction,
    deleteTransaction,
    fetchTransactions,
  };
}
