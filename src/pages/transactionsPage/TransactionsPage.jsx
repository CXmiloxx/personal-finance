import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Layout from '@layout/Layout';
import useTransactions from '!/useTransactions';
import Modal from '@/ui/Modal';
import TransactionCard from './components/TransactionCard/TransactionCard';
import TransactionForm from './components/TransactionForm/TransactionForm';

export default function TransactionsPage() {
  const { transactions, deleteTransaction, editTransaction, createTransaction, error } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

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
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Transacciones
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus />
            <span>Nueva Transacción</span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>

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