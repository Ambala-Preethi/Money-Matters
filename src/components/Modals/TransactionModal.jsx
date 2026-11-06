import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Button } from '../common';
import { CATEGORIES, TRANSACTION_TYPES } from '../../constants';
import { toDateTimeLocal } from '../../utils/formatters';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export const TransactionModal = ({
  isOpen,
  mode = 'add',
  transaction = null,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const isEdit = mode === 'edit';

  const [formData, setFormData] = useState({
    name: '',
    type: TRANSACTION_TYPES.DEBIT,
    category: CATEGORIES[0],
    amount: '',
    date: toDateTimeLocal(),
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (isEdit && transaction) {
        setFormData({
          name: transaction.name || '',
          type: transaction.type || TRANSACTION_TYPES.DEBIT,
          category: transaction.category || CATEGORIES[0],
          amount: transaction.amount !== undefined ? String(transaction.amount) : '',
          date: toDateTimeLocal(transaction.date),
          description: transaction.description || '',
        });
      } else {
        setFormData({
          name: '',
          type: TRANSACTION_TYPES.DEBIT,
          category: CATEGORIES[0],
          amount: '',
          date: toDateTimeLocal(),
          description: '',
        });
      }
      setErrors({});
    }
  }, [isOpen, isEdit, transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Transaction title is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Title must be at least 2 characters';
    }

    const numericAmount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(numericAmount)) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (numericAmount <= 0) {
      newErrors.amount = 'Amount must be greater than zero';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: formData.name.trim(),
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
      description: formData.description.trim(),
    };

    const res = await onSubmit(payload);
    if (res && res.success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Transaction' : 'Add New Transaction'}
      subtitle={
        isEdit
          ? 'Modify existing financial transaction details'
          : 'Record a new debit or credit transaction'
      }
      maxWidth="520px"
    >
      <form onSubmit={handleSubmit} className="transaction-form" noValidate>
        {/* Transaction Type Segmented Toggle */}
        <div className="form-group">
          <label className="form-label">Transaction Type</label>
          <div className="type-toggle-group">
            <button
              type="button"
              className={`type-toggle-btn type-debit ${formData.type === 'debit' ? 'active' : ''}`}
              onClick={() => handleTypeSelect('debit')}
            >
              <ArrowDownLeft size={16} />
              <span>Expense / Debit</span>
            </button>
            <button
              type="button"
              className={`type-toggle-btn type-credit ${formData.type === 'credit' ? 'active' : ''}`}
              onClick={() => handleTypeSelect('credit')}
            >
              <ArrowUpRight size={16} />
              <span>Income / Credit</span>
            </button>
          </div>
        </div>

        {/* Transaction Title */}
        <Input
          label="Transaction Title"
          name="name"
          placeholder="e.g. Grocery Store, Client Invoice"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        {/* Amount and Category Grid */}
        <div className="form-row-2">
          <Input
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            prefix="$"
            value={formData.amount}
            onChange={handleChange}
            error={errors.amount}
            required
          />

          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORIES}
            error={errors.category}
            required
          />
        </div>

        {/* Date and Time */}
        <Input
          label="Date & Time"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />

        {/* Optional Description / Notes */}
        <Input
          label="Notes / Description (Optional)"
          name="description"
          placeholder="Add memo or reference note..."
          value={formData.description}
          onChange={handleChange}
        />

        {/* Form Actions */}
        <div className="modal-actions">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant={formData.type === 'credit' ? 'primary' : 'primary'}
            isLoading={isLoading}
          >
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

