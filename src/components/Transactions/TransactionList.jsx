import React from 'react';
import { TransactionItem } from './TransactionItem';
import { EmptyState, SkeletonRow } from '../common';
import { useTransactions } from '../../context/TransactionContext';

export const TransactionList = () => {
  const {
    filteredTransactions,
    loading,
    openEditModal,
    openDeleteModal,
    openAddModal,
    searchTerm,
    selectedCategory,
    activeTab,
  } = useTransactions();

  if (loading) {
    return (
      <div className="transactions-loading-container">
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
        <SkeletonRow />
      </div>
    );
  }

  const isFiltered =
    activeTab !== 'all' || selectedCategory !== 'All' || searchTerm.trim() !== '';

  if (filteredTransactions.length === 0) {
    return (
      <EmptyState
        title={isFiltered ? 'No matching transactions' : 'No transactions recorded'}
        description={
          isFiltered
            ? 'No records match your active search and filter criteria. Try adjusting your filters or search term.'
            : 'You have not added any transactions yet. Record your daily income and expenses easily.'
        }
        onAction={openAddModal}
        actionLabel="+ Add New Transaction"
      />
    );
  }

  // Sort filtered by date descending
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="transaction-list-container">
      {/* Desktop Table View */}
      <div className="table-responsive desktop-view-only">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                layout="table"
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-view-only">
        {sortedTransactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            layout="card"
          />
        ))}
      </div>
    </div>
  );
};

