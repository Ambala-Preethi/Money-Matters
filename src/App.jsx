import React, { useState } from 'react';
import { TransactionProvider, useTransactions } from './context/TransactionContext';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { ProfilePage } from './pages/ProfilePage';
import { TransactionModal } from './components/Modals/TransactionModal';
import { DeleteConfirmModal } from './components/Modals/DeleteConfirmModal';
import { LogoutModal } from './components/Modals/LogoutModal';
import { ToastContainer } from './components/common';
import './App.css';

const MainLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const {
    modalState,
    closeModal,
    addTransaction,
    updateTransaction,
    deleteModalState,
    closeDeleteModal,
    deleteTransaction,
    actionLoading,
    toasts,
    removeToast,
    addToast,
  } = useTransactions();

  const handleTransactionSubmit = async (formData) => {
    if (modalState.mode === 'edit' && modalState.transaction) {
      return await updateTransaction(modalState.transaction.id, formData);
    } else {
      return await addTransaction(formData);
    }
  };

  const handleDeleteConfirm = async (id) => {
    const res = await deleteTransaction(id);
    if (res && res.success) {
      closeDeleteModal();
    }
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    addToast('You have been logged out successfully.', 'info');
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogoutClick={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="main-viewport">
        <Header
          activePage={activePage}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onLogoutClick={() => setIsLogoutModalOpen(true)}
        />

        <main className="page-content-wrapper">
          {activePage === 'dashboard' && (
            <DashboardPage
              onNavigateToTransactions={() => setActivePage('transactions')}
            />
          )}
          {activePage === 'transactions' && <TransactionsPage />}
          {activePage === 'profile' && <ProfilePage />}
        </main>
      </div>

      {/* Transaction Modal (Add / Edit) */}
      <TransactionModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        transaction={modalState.transaction}
        onClose={closeModal}
        onSubmit={handleTransactionSubmit}
        isLoading={actionLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        transaction={deleteModalState.transaction}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        isLoading={actionLoading}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default function App() {
  return (
    <TransactionProvider>
      <MainLayout />
    </TransactionProvider>
  );
}

