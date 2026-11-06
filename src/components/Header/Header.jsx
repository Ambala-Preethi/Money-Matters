import React from 'react';
import { Menu, Plus, Search } from 'lucide-react';
import { Button } from '../common';
import { useTransactions } from '../../context/TransactionContext';

export const Header = ({
  activePage,
  onOpenMobileMenu,
  onLogoutClick,
}) => {
  const { openAddModal, searchTerm, setSearchTerm } = useTransactions();

  const getPageInfo = () => {
    switch (activePage) {
      case 'transactions':
        return {
          title: 'Transactions',
          subtitle: 'Track, filter, and organize all your credits and debits',
        };
      case 'profile':
        return {
          title: 'My Profile',
          subtitle: 'Manage your personal finance preferences and account',
        };
      case 'dashboard':
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Overview of your personal cash flow, expenses & income',
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-trigger"
          onClick={onOpenMobileMenu}
          aria-label="Open mobile navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="header-title-group">
          <h2 className="header-page-title">{title}</h2>
          <p className="header-page-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {/* Search input in header */}
        <div className="header-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search query"
            >
              ×
            </button>
          )}
        </div>

        {/* Add Transaction Button */}
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={openAddModal}
          className="header-add-btn"
        >
          + Add Transaction
        </Button>
      </div>
    </header>
  );
};

