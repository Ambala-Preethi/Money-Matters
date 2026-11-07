export const TRANSACTION_TYPES = {
  CREDIT: 'credit',
  DEBIT: 'debit',
};

export const CATEGORIES = [
  'Entertainment',
  'Food & Dining',
  'Shopping',
  'Salary',
  'Freelance',
  'Investment',
  'Bills & Utilities',
  'Healthcare',
  'Travel & Commute',
  'Education',
  'Transfer',
  'Other',
];

export const CATEGORY_ICONS = {
  Entertainment: 'Film',
  'Food & Dining': 'Utensils',
  Shopping: 'ShoppingBag',
  Salary: 'Briefcase',
  Freelance: 'Laptop',
  Investment: 'TrendingUp',
  'Bills & Utilities': 'Zap',
  Healthcare: 'HeartPulse',
  'Travel & Commute': 'Car',
  Education: 'GraduationCap',
  Transfer: 'ArrowRightLeft',
  Other: 'CircleDot',
};

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-101',
    name: 'Spotify Premium Subscription',
    type: 'debit',
    category: 'Entertainment',
    amount: 299.00,
    date: '2026-11-04T10:30:00Z',
    description: 'Monthly premium family plan subscription',
  },
  {
    id: 'tx-102',
    name: 'Monthly Salary Credit',
    type: 'credit',
    category: 'Salary',
    amount: 75000.00,
    date: '2026-11-01T09:00:00Z',
    description: 'Direct salary deposit for October',
  },
  {
    id: 'tx-103',
    name: 'Supermarket Groceries',
    type: 'debit',
    category: 'Food & Dining',
    amount: 3450.00,
    date: '2026-11-03T16:45:00Z',
    description: 'Weekly organic groceries & essentials',
  },
  {
    id: 'tx-104',
    name: 'UI/UX Design Freelance',
    type: 'credit',
    category: 'Freelance',
    amount: 22500.00,
    date: '2026-11-02T14:15:00Z',
    description: 'Milestone payment for mobile app redesign',
  },
  {
    id: 'tx-105',
    name: 'Electricity & Utility Bill',
    type: 'debit',
    category: 'Bills & Utilities',
    amount: 2150.00,
    date: '2026-10-30T11:20:00Z',
    description: 'State electricity board utility bill',
  },
  {
    id: 'tx-106',
    name: 'Nike Running Shoes',
    type: 'debit',
    category: 'Shopping',
    amount: 6999.00,
    date: '2026-10-28T18:00:00Z',
    description: 'Pegasus running shoes from Nike store',
  },
  {
    id: 'tx-107',
    name: 'Stock Dividend Credit',
    type: 'credit',
    category: 'Investment',
    amount: 4850.00,
    date: '2026-10-25T08:30:00Z',
    description: 'Quarterly equity mutual fund & stock dividend',
  },
  {
    id: 'tx-108',
    name: 'Pharmacy & Health Supplies',
    type: 'debit',
    category: 'Healthcare',
    amount: 1250.00,
    date: '2026-10-22T13:10:00Z',
    description: 'Monthly prescription medicines & vitamins',
  },
];

export const USER_PROFILE = {
  name: 'Oliver Ragfelt',
  email: 'oliver.ragfelt@example.com',
  role: 'Account Holder',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  currency: '₹',
};

