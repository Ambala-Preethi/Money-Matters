import React from 'react';
import { Modal, Button } from '../common';
import { LogOut } from 'lucide-react';

export const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Sign Out" maxWidth="400px">
      <div className="logout-modal-content">
        <div className="logout-icon-wrapper">
          <LogOut size={28} />
        </div>
        <p className="logout-text">
          Are you sure you want to log out of your Money Matters session?
        </p>
        <div className="modal-actions">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Yes, Log Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};

