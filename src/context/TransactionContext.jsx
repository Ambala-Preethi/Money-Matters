import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { transactionService } from '../services/transactionService';
import { calculateFinancialSummary } from '../utils/formatters';

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters & Search
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'debit' | 'credit'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State for Add / Edit
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'add', // 'add' | 'edit'
    transaction: null,
  });

  // Modal State for Delete Confirmation
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    transaction: null,
  });

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch all transactions from API
  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      console.error('Failed to load transactions:', err);
      setError(err.message || 'Failed to retrieve transactions. Please try again.');
      addToast(err.message || 'Failed to retrieve transactions.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  // Add Transaction
  const addTransaction = useCallback(
    async (transactionData) => {
      setActionLoading(true);
      try {
        const created = await transactionService.create(transactionData);
        setTransactions((prev) => [created, ...prev]);
        addToast('Transaction added successfully!', 'success');
        return { success: true, data: created };
      } catch (err) {
        console.error('Error adding transaction:', err);
        addToast(err.message || 'Failed to add transaction.', 'error');
        return { success: false, error: err.message };
      } finally {
        setActionLoading(false);
      }
    },
    [addToast]
  );

  // Update Transaction
  const updateTransaction = useCallback(
    async (id, transactionData) => {
      setActionLoading(true);
      try {
        const updated = await transactionService.update(id, transactionData);
        setTransactions((prev) =>
          prev.map((item) => (item.id === id ? updated : item))
        );
        addToast('Transaction updated successfully!', 'success');
        return { success: true, data: updated };
      } catch (err) {
        console.error('Error updating transaction:', err);
        addToast(err.message || 'Failed to update transaction.', 'error');
        return { success: false, error: err.message };
      } finally {
        setActionLoading(false);
      }
    },
    [addToast]
  );

  // Delete Transaction
  const deleteTransaction = useCallback(
    async (id) => {
      setActionLoading(true);
      try {
        await transactionService.delete(id);
        setTransactions((prev) => prev.filter((item) => item.id !== id));
        addToast('Transaction deleted successfully!', 'success');
        return { success: true };
      } catch (err) {
        console.error('Error deleting transaction:', err);
        addToast(err.message || 'Failed to delete transaction.', 'error');
        return { success: false, error: err.message };
      } finally {
        setActionLoading(false);
      }
    },
    [addToast]
  );

  // Modal helpers
  const openAddModal = useCallback(() => {
    setModalState({ isOpen: true, mode: 'add', transaction: null });
  }, []);

  const openEditModal = useCallback((transaction) => {
    setModalState({ isOpen: true, mode: 'edit', transaction });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, mode: 'add', transaction: null });
  }, []);

  const openDeleteModal = useCallback((transaction) => {
    setDeleteModalState({ isOpen: true, transaction });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalState({ isOpen: false, transaction: null });
  }, []);

  // Filtered transactions computation
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Filter by type
      if (activeTab === 'debit' && tx.type !== 'debit') return false;
      if (activeTab === 'credit' && tx.type !== 'credit') return false;

      // Filter by category
      if (selectedCategory !== 'All' && tx.category !== selectedCategory) return false;

      // Filter by search query
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const nameMatch = tx.name?.toLowerCase().includes(query);
        const catMatch = tx.category?.toLowerCase().includes(query);
        const descMatch = tx.description?.toLowerCase().includes(query);
        const amountMatch = String(tx.amount).includes(query);
        if (!nameMatch && !catMatch && !descMatch && !amountMatch) return false;
      }

      return true;
    });
  }, [transactions, activeTab, selectedCategory, searchTerm]);

  // Derived financial summary
  const financialSummary = useMemo(() => {
    return calculateFinancialSummary(transactions);
  }, [transactions]);

  const value = {
    transactions,
    filteredTransactions,
    loading,
    actionLoading,
    error,
    financialSummary,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    modalState,
    openAddModal,
    openEditModal,
    closeModal,
    deleteModalState,
    openDeleteModal,
    closeDeleteModal,
    toasts,
    addToast,
    removeToast,
    loadTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

