import React from 'react';
import {
  LayoutDashboard,
  Receipt,
  User,
  LogOut,
  Wallet,
  X,
} from 'lucide-react';
import { USER_PROFILE } from '../../constants';

export const Sidebar = ({
  activePage,
  onNavigate,
  isOpen = false,
  onClose,
  onLogoutClick,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleItemClick = (pageId) => {
    onNavigate(pageId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <Wallet size={24} />
          </div>
          <div className="brand-text">
            <h1 className="brand-name">Money Matters</h1>
            <span className="brand-tagline">Personal Finance</span>
          </div>
          {isOpen && (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          <p className="nav-section-title">MAIN MENU</p>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <Icon size={20} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {isActive && <span className="nav-active-pill" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Card & Sign Out */}
        <div className="sidebar-footer">
          <div className="user-profile-widget">
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">{USER_PROFILE.name}</span>
              <span className="user-role">{USER_PROFILE.role}</span>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-logout-btn"
            onClick={onLogoutClick}
            title="Log Out"
            aria-label="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  );
};

