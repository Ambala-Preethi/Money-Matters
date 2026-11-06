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
    name: 'Spotify Subscription',
    type: 'debit',
    category: 'Entertainment',
    amount: 15.99,
    date: '2026-11-04T10:30:00Z',
    description: 'Monthly premium family plan subscription',
  },
  {
    id: 'tx-102',
    name: 'Monthly Salary Credit',
    type: 'credit',
    category: 'Salary',
    amount: 4500.00,
    date: '2026-11-01T09:00:00Z',
    description: 'Direct deposit from Acme Corp',
  },
  {
    id: 'tx-103',
    name: 'Whole Foods Grocery',
    type: 'debit',
    category: 'Food & Dining',
    amount: 132.40,
    date: '2026-11-03T16:45:00Z',
    description: 'Weekly organic groceries',
  },
  {
    id: 'tx-104',
    name: 'UI/UX Design Freelance',
    type: 'credit',
    category: 'Freelance',
    amount: 1250.00,
    date: '2026-11-02T14:15:00Z',
    description: 'Milestone payment for mobile app redesign',
  },
  {
    id: 'tx-105',
    name: 'Electricity & Gas Bill',
    type: 'debit',
    category: 'Bills & Utilities',
    amount: 94.50,
    date: '2026-10-30T11:20:00Z',
    description: 'October utility bill payment',
  },
  {
    id: 'tx-106',
    name: 'Nike Running Shoes',
    type: 'debit',
    category: 'Shopping',
    amount: 140.00,
    date: '2026-10-28T18:00:00Z',
    description: 'Pegasus 40 running sneakers',
  },
  {
    id: 'tx-107',
    name: 'Stock Dividend',
    type: 'credit',
    category: 'Investment',
    amount: 88.25,
    date: '2026-10-25T08:30:00Z',
    description: 'Quarterly dividend payout',
  },
  {
    id: 'tx-108',
    name: 'Pharmacy Prescription',
    type: 'debit',
    category: 'Healthcare',
    amount: 35.80,
    date: '2026-10-22T13:10:00Z',
    description: 'Routine allergy medications',
  },
];

export const USER_PROFILE = {
  name: 'Oliver Ragfelt',
  email: 'oliver.ragfelt@example.com',
  role: 'Account Holder',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  currency: '$',
};

