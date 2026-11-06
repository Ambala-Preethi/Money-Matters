import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = ({ toasts = [], onRemove }) => {
  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';
        const Icon = isError ? AlertCircle : isInfo ? Info : CheckCircle2;

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type || 'success'}`}>
            <div className="toast-icon">
              <Icon size={18} />
            </div>
            <div className="toast-content">
              <p className="toast-message">{toast.message}</p>
            </div>
            <button
              type="button"
              className="toast-close"
              onClick={() => onRemove(toast.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

