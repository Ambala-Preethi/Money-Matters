import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { TransactionItem } from '../Transactions/TransactionItem';
import { EmptyState, SkeletonRow } from '../common';
import { useTransactions } from '../../context/TransactionContext';

export const RecentTransactions = ({ onNavigateToTransactions }) => {
  const {
    transactions,
    loading,
    openEditModal,
    openDeleteModal,
    openAddModal,
  } = useTransactions();

  // Sort descending by date and take 5
  const recentList = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="recent-transactions-card">
      <div className="recent-header">
        <div className="recent-title-group">
          <Clock size={18} className="recent-icon" />
          <h4 className="recent-title">Recent Transactions</h4>
        </div>
        <button
          type="button"
          className="view-all-btn"
          onClick={onNavigateToTransactions}
        >
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {loading ? (
        <div className="recent-loading-skeletons">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : recentList.length === 0 ? (
        <EmptyState
          title="No recent activity"
          description="You haven't logged any transactions yet. Record your first transaction to see it here."
          onAction={openAddModal}
          actionLabel="+ Add Transaction"
        />
      ) : (
        <>
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
                {recentList.map((tx) => (
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
            {recentList.map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                layout="card"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

