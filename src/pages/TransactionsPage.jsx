import React from 'react';
import { TransactionTabs } from '../components/Transactions/TransactionTabs';
import { TransactionList } from '../components/Transactions/TransactionList';
import { ErrorState, Button } from '../components/common';
import { Plus } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

export const TransactionsPage = () => {
  const { transactions, error, loadTransactions, openAddModal } = useTransactions();

  if (error && transactions.length === 0) {
    return (
      <div className="page-error-wrapper">
        <ErrorState
          title="Could not load transactions"
          message={error}
          onRetry={loadTransactions}
        />
      </div>
    );
  }

  return (
    <div className="transactions-page animate-fade-in">
      <div className="transactions-page-header">
        <div>
          <h3 className="section-title">All Transactions</h3>
          <p className="section-subtitle">
            View, filter, edit, and organize all financial records.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={openAddModal}
        >
          Add Transaction
        </Button>
      </div>

      {/* Tabs and Filters */}
      <TransactionTabs />

      {/* Transactions Table / List */}
      <TransactionList />
    </div>
  );
};

