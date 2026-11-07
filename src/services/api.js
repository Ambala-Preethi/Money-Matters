import { INITIAL_TRANSACTIONS } from '../constants';

const STORAGE_KEY = 'money_matters_transactions_v2';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Helper to initialize local storage with realistic mock transactions if empty
 */
const getStoredTransactions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('LocalStorage read error, falling back to in-memory data:', err);
    return INITIAL_TRANSACTIONS;
  }
};

const setStoredTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (err) {
    console.warn('LocalStorage write error:', err);
  }
};

/**
 * Generic API request wrapper with error handling and mock fallback
 */
export const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // If a live API base URL is provided, attempt the actual fetch
  if (API_BASE_URL) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.warn(`Fetch to ${url} failed, using local mock handler:`, err.message);
      // Fall through to mock handler below
    }
  }

  // Built-in resilient Mock REST service
  return mockRestHandler(endpoint, options);
};

/**
 * Simulates a realistic REST API with network latency & persistence
 */
const mockRestHandler = async (endpoint, options = {}) => {
  // Simulate network latency (250-400ms) for realistic loading state experience
  await new Promise((resolve) => setTimeout(resolve, 350));

  const method = (options.method || 'GET').toUpperCase();
  const transactions = getStoredTransactions();

  // GET /transactions
  if (method === 'GET' && (endpoint === '/transactions' || endpoint === '/all-transactions')) {
    return {
      status: 'success',
      data: transactions,
      count: transactions.length,
    };
  }

  // POST /transactions
  if (method === 'POST' && (endpoint === '/transactions' || endpoint === '/add-transaction')) {
    const body = options.body ? JSON.parse(options.body) : {};
    if (!body.name || !body.amount || !body.type) {
      throw new Error('Validation Error: Missing required transaction fields (name, amount, type).');
    }

    const newTx = {
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: body.name.trim(),
      amount: parseFloat(body.amount),
      type: body.type,
      category: body.category || 'Other',
      date: body.date || new Date().toISOString(),
      description: body.description || '',
    };

    const updatedList = [newTx, ...transactions];
    setStoredTransactions(updatedList);

    return {
      status: 'success',
      message: 'Transaction created successfully',
      data: newTx,
    };
  }

  // PUT /transactions/:id
  if (method === 'PUT' && (endpoint.startsWith('/transactions/') || endpoint === '/update-transaction')) {
    const body = options.body ? JSON.parse(options.body) : {};
    let targetId = body.id;
    if (!targetId && endpoint.startsWith('/transactions/')) {
      targetId = endpoint.replace('/transactions/', '');
    }

    const index = transactions.findIndex((tx) => tx.id === targetId);
    if (index === -1) {
      throw new Error(`Transaction with ID "${targetId}" not found.`);
    }

    const updatedTx = {
      ...transactions[index],
      name: body.name ? body.name.trim() : transactions[index].name,
      amount: body.amount !== undefined ? parseFloat(body.amount) : transactions[index].amount,
      type: body.type || transactions[index].type,
      category: body.category || transactions[index].category,
      date: body.date || transactions[index].date,
      description: body.description !== undefined ? body.description : transactions[index].description,
    };

    transactions[index] = updatedTx;
    setStoredTransactions(transactions);

    return {
      status: 'success',
      message: 'Transaction updated successfully',
      data: updatedTx,
    };
  }

  // DELETE /transactions/:id
  if (method === 'DELETE' && (endpoint.startsWith('/transactions/') || endpoint === '/delete-transaction')) {
    let targetId = options.body ? JSON.parse(options.body)?.id : null;
    if (!targetId && endpoint.startsWith('/transactions/')) {
      targetId = endpoint.replace('/transactions/', '');
    }

    const exists = transactions.some((tx) => tx.id === targetId);
    if (!exists) {
      throw new Error(`Transaction with ID "${targetId}" not found.`);
    }

    const filtered = transactions.filter((tx) => tx.id !== targetId);
    setStoredTransactions(filtered);

    return {
      status: 'success',
      message: 'Transaction deleted successfully',
      id: targetId,
    };
  }

  throw new Error(`Endpoint ${method} ${endpoint} not recognized.`);
};

