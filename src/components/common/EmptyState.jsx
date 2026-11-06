import React from 'react';
import { ReceiptText, PlusCircle } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  title = 'No transactions found',
  description = 'You have not recorded any transactions in this view yet. Start by logging your first expense or income.',
  onAction,
  actionLabel = 'Add Transaction',
}) => {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">
        <ReceiptText size={42} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {onAction && (
        <Button
          variant="primary"
          size="md"
          icon={PlusCircle}
          onClick={onAction}
          className="empty-action-btn"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

