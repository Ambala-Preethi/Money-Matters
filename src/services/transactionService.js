import { request } from './api';

/**
 * Service to handle all Transaction CRUD operations
 */
export const transactionService = {
  /**
   * Fetches all transactions from REST API
   */
  async getAll() {
    const response = await request('/transactions', { method: 'GET' });
    return response.data || [];
  },

  /**
   * Creates a new transaction via REST API
   */
  async create(transactionData) {
    const response = await request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
    return response.data;
  },

  /**
   * Updates an existing transaction via REST API
   */
  async update(id, transactionData) {
    const response = await request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...transactionData }),
    });
    return response.data;
  },

  /**
   * Deletes a transaction by ID via REST API
   */
  async delete(id) {
    const response = await request(`/transactions/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    return response;
  },
};

