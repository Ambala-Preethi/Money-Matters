import React from 'react';
import { USER_PROFILE, INITIAL_TRANSACTIONS } from '../constants';
import { formatCurrency } from '../utils/formatters';
import { useTransactions } from '../context/TransactionContext';
import { Button } from '../components/common';
import { User, Mail, Shield, Wallet, RotateCcw, CheckCircle } from 'lucide-react';

export const ProfilePage = () => {
  const { financialSummary, addToast } = useTransactions();

  const handleResetData = () => {
    localStorage.setItem(
      'money_matters_transactions_v2',
      JSON.stringify(INITIAL_TRANSACTIONS)
    );
    window.location.reload();
  };

  return (
    <div className="profile-page animate-fade-in">
      <div className="profile-header-banner">
        <div className="profile-avatar-wrap">
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="profile-lg-avatar"
          />
        </div>
        <div className="profile-main-info">
          <h2 className="profile-user-name">{USER_PROFILE.name}</h2>
          <p className="profile-user-role">{USER_PROFILE.role}</p>
          <span className="profile-status-badge">
            <CheckCircle size={14} /> Active Account
          </span>
        </div>
      </div>

      <div className="profile-details-grid">
        {/* Personal Details Card */}
        <div className="profile-card">
          <h4 className="profile-card-title">Personal Information</h4>
          <div className="profile-field-list">
            <div className="profile-field-item">
              <span className="field-label">
                <User size={16} /> Full Name
              </span>
              <span className="field-value">{USER_PROFILE.name}</span>
            </div>
            <div className="profile-field-item">
              <span className="field-label">
                <Mail size={16} /> Email Address
              </span>
              <span className="field-value">{USER_PROFILE.email}</span>
            </div>
            <div className="profile-field-item">
              <span className="field-label">
                <Shield size={16} /> Account Security
              </span>
              <span className="field-value">Two-Factor Authentication Enabled</span>
            </div>
          </div>
        </div>

        {/* Financial Preferences Card */}
        <div className="profile-card">
          <h4 className="profile-card-title">Financial Preferences</h4>
          <div className="profile-field-list">
            <div className="profile-field-item">
              <span className="field-label">
                <Wallet size={16} /> Preferred Currency
              </span>
              <span className="field-value">INR (₹)</span>
            </div>
            <div className="profile-field-item">
              <span className="field-label">Net Balance Recorded</span>
              <span className="field-value font-semibold">
                {formatCurrency(financialSummary.balance)}
              </span>
            </div>
            <div className="profile-field-item">
              <span className="field-label">Total Transactions</span>
              <span className="field-value">
                {financialSummary.transactionCount} transactions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Developer & Demo Settings Card */}
      <div className="profile-card dev-settings-card">
        <h4 className="profile-card-title">Data Management & Demo Tools</h4>
        <p className="dev-settings-description">
          Need to reset the application state to the default demonstration dataset?
          Click below to re-initialize your local database.
        </p>
        <Button
          variant="outline"
          size="sm"
          icon={RotateCcw}
          onClick={handleResetData}
        >
          Reset to Sample Data
        </Button>
      </div>
    </div>
  );
};

