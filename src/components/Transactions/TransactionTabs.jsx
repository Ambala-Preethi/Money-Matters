import React from 'react';
import { CATEGORIES } from '../../constants';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';

export const TransactionTabs = () => {
  const {
    transactions,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useTransactions();

  // Counts for tabs
  const allCount = transactions.length;
  const debitCount = transactions.filter((t) => t.type === 'debit').length;
  const creditCount = transactions.filter((t) => t.type === 'credit').length;

  const hasActiveFilters =
    activeTab !== 'all' || selectedCategory !== 'All' || searchTerm.trim() !== '';

  const handleResetFilters = () => {
    setActiveTab('all');
    setSelectedCategory('All');
    setSearchTerm('');
  };

  return (
    <div className="transaction-controls-container">
      {/* Type Filter Tabs */}
      <div className="tx-tabs-list" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`tx-tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <span>All Transactions</span>
          <span className="tab-count-badge">{allCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'debit'}
          className={`tx-tab-item tab-debit ${activeTab === 'debit' ? 'active' : ''}`}
          onClick={() => setActiveTab('debit')}
        >
          <span>Debit (Expense)</span>
          <span className="tab-count-badge">{debitCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'credit'}
          className={`tx-tab-item tab-credit ${activeTab === 'credit' ? 'active' : ''}`}
          onClick={() => setActiveTab('credit')}
        >
          <span>Credit (Income)</span>
          <span className="tab-count-badge">{creditCount}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="tx-filters-bar">
        {/* Search */}
        <div className="filter-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="filter-search-input"
            placeholder="Search by title, notes, or amount..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
            >
              ×
            </button>
          )}
        </div>

        {/* Category Dropdown Filter */}
        <div className="filter-dropdown-group">
          <Filter size={15} className="filter-icon" />
          <select
            className="category-filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters button if any filter applied */}
        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={handleResetFilters}
            title="Reset All Filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};

