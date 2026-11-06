import React from 'react';

export const Loader = ({ message = 'Loading financial data...', fullPage = false }) => {
  return (
    <div className={`loader-container ${fullPage ? 'loader-fullpage' : ''}`}>
      <div className="spinner" />
      {message && <p className="loader-text">{message}</p>}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-value" />
      <div className="skeleton-line skeleton-sub" />
    </div>
  );
};

export const SkeletonRow = () => {
  return (
    <div className="skeleton-row">
      <div className="skeleton-circle" />
      <div className="skeleton-col">
        <div className="skeleton-line skeleton-w60" />
        <div className="skeleton-line skeleton-w40" />
      </div>
      <div className="skeleton-col right">
        <div className="skeleton-line skeleton-w50" />
      </div>
    </div>
  );
};

