/**
 * Formats a number to currency string (e.g. $1,250.00)
 */
export const formatCurrency = (amount, currency = '$') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0.00`;
  }
  const numericVal = Math.abs(Number(amount));
  const formatted = numericVal.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency}${formatted}`;
};

/**
 * Formats date into readable format: "04 Nov, 10:30 AM" or "04 Nov 2026"
 */
export const formatDate = (dateString, includeTime = true) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  if (!includeTime) return day;

  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${day}, ${time}`;
};

/**
 * Formats ISO date string to YYYY-MM-DDTHH:mm for datetime-local input
 */
export const toDateTimeLocal = (dateString) => {
  const d = dateString ? new Date(dateString) : new Date();
  if (isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Calculates summary metrics from transactions array
 */
export const calculateFinancialSummary = (transactions = []) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((tx) => {
    const amt = parseFloat(tx.amount) || 0;
    if (tx.type === 'credit') {
      totalIncome += amt;
    } else if (tx.type === 'debit') {
      totalExpense += amt;
    }
  });

  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
    transactionCount: transactions.length,
  };
};

/**
 * Groups transactions by category for expense breakdown
 */
export const getCategoryBreakdown = (transactions = [], type = 'debit') => {
  const filtered = transactions.filter((tx) => tx.type === type);
  const total = filtered.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

  const breakdownMap = {};
  filtered.forEach((tx) => {
    const cat = tx.category || 'Other';
    const amt = parseFloat(tx.amount) || 0;
    breakdownMap[cat] = (breakdownMap[cat] || 0) + amt;
  });

  return Object.entries(breakdownMap)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * Aggregates transactions by day of week or month for overview chart
 */
export const getOverviewChartData = (transactions = []) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayTotals = days.map((day) => ({ day, credit: 0, debit: 0 }));

  transactions.forEach((tx) => {
    const d = new Date(tx.date);
    if (!isNaN(d.getTime())) {
      const dayIndex = d.getDay();
      const amt = parseFloat(tx.amount) || 0;
      if (tx.type === 'credit') {
        dayTotals[dayIndex].credit += amt;
      } else {
        dayTotals[dayIndex].debit += amt;
      }
    }
  });

  return dayTotals;
};

