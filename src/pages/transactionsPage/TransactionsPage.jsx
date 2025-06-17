/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiGrid, FiList, FiAlertCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Layout from '@layout/Layout';
import useTransactions from '!/useTransactions';
import useFetchCategories from '!/useFetchCategories';
import Modal from '@/ui/Modal';
import TransactionCard from './components/TransactionCard/TransactionCard';
import TransactionForm from './components/TransactionForm/TransactionForm';

export default function TransactionsPage() {
  const { transactions, deleteTransaction, editTransaction, createTransaction, error } = useTransactions();
  const { categories } = useFetchCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const handleDelete = async (transactionId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      reverseButtons: true,
      padding: '1.5rem',
      width: 'auto',
      customClass: {
        popup: 'rounded-lg',
        title: 'text-lg font-semibold',
        content: 'text-gray-600 dark:text-gray-300',
        confirmButton: 'rounded-lg',
        cancelButton: 'rounded-lg'
      }
    });

    if (result.isConfirmed) {
      await deleteTransaction(transactionId);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    if (categories.length === 0) {
      Swal.fire({
        title: 'No hay categorías',
        text: 'Debes crear al menos una categoría antes de registrar transacciones',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3B82F6',
        padding: '1.5rem',
        width: 'auto',
        customClass: {
          popup: 'rounded-lg',
          title: 'text-lg font-semibold',
          content: 'text-gray-600 dark:text-gray-300',
          confirmButton: 'rounded-lg'
        }
      });
      return;
    }
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      let success;
      if (editingTransaction) {
        success = await editTransaction(editingTransaction.id, formData);
        if (success) {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }
      } else {
        success = await createTransaction(formData);
        if (success) {
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error('Error al guardar la transacción:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Transacciones
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Administra tus ingresos y gastos
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <FiPlus className="w-5 h-5" />
                <span>Nueva Transacción</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Transactions Grid/List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`${viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
              }`}
          >
            <AnimatePresence>
              {transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  viewMode={viewMode}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty States */}
          {transactions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
                <div className="flex justify-center mb-4">
                  <FiAlertCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No hay transacciones
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {categories.length === 0
                    ? 'Primero debes crear una categoría para poder registrar transacciones.'
                    : 'Comienza registrando tu primera transacción para llevar un control de tus gastos e ingresos.'}
                </p>
                {categories.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreate}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Registrar Transacción</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
          title={editingTransaction ? 'Editar Transacción' : 'Nueva Transacción'}
        >
          <TransactionForm
            onSubmit={handleSubmit}
            initialData={editingTransaction}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingTransaction(null);
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
} 