import React from 'react';
import { SummaryCards } from '../components/Dashboard/SummaryCards';
import { FinancialOverview } from '../components/Dashboard/FinancialOverview';
import { RecentTransactions } from '../components/Dashboard/RecentTransactions';
import { ErrorState } from '../components/common';
import { useTransactions } from '../context/TransactionContext';

export const DashboardPage = ({ onNavigateToTransactions }) => {
  const { transactions, loading, error, financialSummary, loadTransactions } =
    useTransactions();

  if (error && transactions.length === 0) {
    return (
      <div className="page-error-wrapper">
        <ErrorState
          title="Could not load financial records"
          message={error}
          onRetry={loadTransactions}
        />
      </div>
    );
  }

  return (
    <div className="dashboard-page animate-fade-in">
      {/* 3 Main Summary Cards */}
      <SummaryCards summary={financialSummary} loading={loading} />

      {/* Financial Overview (Charts & Breakdown) */}
      <FinancialOverview transactions={transactions} />

      {/* Recent Transactions List */}
      <RecentTransactions
        onNavigateToTransactions={onNavigateToTransactions}
      />
    </div>
  );
};

