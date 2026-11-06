import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { SkeletonCard } from '../common';

export const SummaryCards = ({ summary, loading = false }) => {
  if (loading) {
    return (
      <div className="summary-cards-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  const { totalIncome, totalExpense, balance, transactionCount } = summary;

  return (
    <div className="summary-cards-grid">
      {/* Available Balance Card */}
      <div className="summary-card card-balance">
        <div className="card-top">
          <div className="card-info">
            <span className="card-label">Total Balance</span>
            <h3 className="card-value">{formatCurrency(balance)}</h3>
          </div>
          <div className="card-icon-pill icon-balance">
            <Wallet size={22} />
          </div>
        </div>
        <div className="card-bottom">
          <span className="card-badge badge-neutral">
            {transactionCount} total records
          </span>
          <span className="card-subtext">Net liquid cash flow</span>
        </div>
      </div>

      {/* Total Credit / Income Card */}
      <div className="summary-card card-income">
        <div className="card-top">
          <div className="card-info">
            <span className="card-label">Total Income / Credit</span>
            <h3 className="card-value text-credit">+{formatCurrency(totalIncome)}</h3>
          </div>
          <div className="card-icon-pill icon-income">
            <ArrowUpRight size={22} />
          </div>
        </div>
        <div className="card-bottom">
          <span className="card-badge badge-credit">
            <TrendingUp size={12} /> Inflow
          </span>
          <span className="card-subtext">Salary, Freelance, Dividends</span>
        </div>
      </div>

      {/* Total Debit / Expense Card */}
      <div className="summary-card card-expense">
        <div className="card-top">
          <div className="card-info">
            <span className="card-label">Total Expenses / Debit</span>
            <h3 className="card-value text-debit">-{formatCurrency(totalExpense)}</h3>
          </div>
          <div className="card-icon-pill icon-expense">
            <ArrowDownLeft size={22} />
          </div>
        </div>
        <div className="card-bottom">
          <span className="card-badge badge-debit">Outflow</span>
          <span className="card-subtext">Shopping, Food, Bills, etc.</span>
        </div>
      </div>
    </div>
  );
};

