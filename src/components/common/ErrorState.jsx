import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Something went wrong',
  message = 'We encountered an error while communicating with the server. Please try again.',
  onRetry,
}) => {
  return (
    <div className="error-state-card" role="alert">
      <div className="error-state-icon">
        <AlertCircle size={36} />
      </div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-message">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          icon={RefreshCw}
          onClick={onRetry}
          className="error-retry-btn"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

