import React from 'react';
import { Modal, Button } from '../common';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { AlertTriangle } from 'lucide-react';

export const DeleteConfirmModal = ({
  isOpen,
  transaction,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!transaction) return null;

  const isCredit = transaction.type === 'credit';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Transaction"
      maxWidth="440px"
    >
      <div className="delete-modal-content">
        <div className="delete-warning-icon">
          <AlertTriangle size={32} />
        </div>

        <p className="delete-warning-text">
          Are you sure you want to permanently delete this transaction? This action
          cannot be undone.
        </p>

        <div className="delete-tx-preview">
          <div className="delete-tx-details">
            <span className="delete-tx-title">{transaction.name}</span>
            <span className="delete-tx-meta">
              {transaction.category} • {formatDate(transaction.date, false)}
            </span>
          </div>
          <div
            className={`delete-tx-amount ${isCredit ? 'text-credit' : 'text-debit'}`}
          >
            {isCredit ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </div>
        </div>

        <div className="modal-actions">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            isLoading={isLoading}
            onClick={() => onConfirm(transaction.id)}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

