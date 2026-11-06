import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CategoryIcon } from '../common/CategoryIcon';

export const TransactionItem = ({
  transaction,
  onEdit,
  onDelete,
  layout = 'table', // 'table' | 'card'
}) => {
  const isCredit = transaction.type === 'credit';

  if (layout === 'card') {
    return (
      <div className="transaction-card-mobile">
        <div className="card-mobile-top">
          <div className="tx-icon-wrapper">
            <span className={`category-icon-bubble ${isCredit ? 'bubble-credit' : 'bubble-debit'}`}>
              <CategoryIcon category={transaction.category} size={18} />
            </span>
            <div className="tx-details">
              <h5 className="tx-name">{transaction.name}</h5>
              <span className="tx-meta">
                {transaction.category} • {formatDate(transaction.date, false)}
              </span>
            </div>
          </div>
          <div className={`tx-amount ${isCredit ? 'text-credit' : 'text-debit'}`}>
            {isCredit ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </div>
        </div>

        {transaction.description && (
          <p className="tx-description">{transaction.description}</p>
        )}

        <div className="card-mobile-actions">
          <span className={`tx-type-badge ${isCredit ? 'badge-credit' : 'badge-debit'}`}>
            {isCredit ? 'Credit' : 'Debit'}
          </span>
          <div className="action-buttons-group">
            <button
              type="button"
              className="action-icon-btn edit-btn"
              onClick={() => onEdit(transaction)}
              title="Edit Transaction"
              aria-label={`Edit ${transaction.name}`}
            >
              <Edit2 size={15} />
            </button>
            <button
              type="button"
              className="action-icon-btn delete-btn"
              onClick={() => onDelete(transaction)}
              title="Delete Transaction"
              aria-label={`Delete ${transaction.name}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Table Row
  return (
    <tr className="tx-table-row">
      {/* Name and Icon */}
      <td className="tx-col-name">
        <div className="tx-info-flex">
          <span className={`category-icon-bubble ${isCredit ? 'bubble-credit' : 'bubble-debit'}`}>
            <CategoryIcon category={transaction.category} size={18} />
          </span>
          <div className="tx-text-group">
            <span className="tx-name">{transaction.name}</span>
            {transaction.description && (
              <span className="tx-description-inline">{transaction.description}</span>
            )}
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="tx-col-category">
        <span className="category-tag">{transaction.category}</span>
      </td>

      {/* Date */}
      <td className="tx-col-date">
        <span className="tx-date">{formatDate(transaction.date)}</span>
      </td>

      {/* Type */}
      <td className="tx-col-type">
        <span className={`tx-type-badge ${isCredit ? 'badge-credit' : 'badge-debit'}`}>
          {isCredit ? 'Credit' : 'Debit'}
        </span>
      </td>

      {/* Amount */}
      <td className="tx-col-amount">
        <span className={`tx-amount-val ${isCredit ? 'text-credit' : 'text-debit'}`}>
          {isCredit ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </span>
      </td>

      {/* Actions */}
      <td className="tx-col-actions">
        <div className="action-buttons-group">
          <button
            type="button"
            className="action-icon-btn edit-btn"
            onClick={() => onEdit(transaction)}
            title="Edit Transaction"
            aria-label={`Edit ${transaction.name}`}
          >
            <Edit2 size={15} />
          </button>
          <button
            type="button"
            className="action-icon-btn delete-btn"
            onClick={() => onDelete(transaction)}
            title="Delete Transaction"
            aria-label={`Delete ${transaction.name}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

