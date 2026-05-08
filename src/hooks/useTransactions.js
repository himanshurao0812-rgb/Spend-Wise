import { useState, useCallback } from 'react';

const DB_KEY = 'spendwise_transactions';

// --- Helper: Read all from localStorage ---
function dbGetAll() {
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : [];
}

// --- Helper: Save all to localStorage ---
function dbSaveAll(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// --- Generate unique ID ---
function generateId() {
  return 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

export default function useTransactions() {
  
  const [transactions, setTransactions] = useState(() => dbGetAll());

  // Refresh from localStorage
  const refresh = useCallback(() => {
    setTransactions(dbGetAll());
  }, []);

  // Add a new transaction
  const addTransaction = useCallback((data) => {
    const all = dbGetAll();
    const newTxn = {
      id: generateId(),
      title: data.title.trim(),
      amount: parseFloat(data.amount),
      type: data.type,
      category: data.category,
      date: data.date,
      createdAt: new Date().toISOString(),
    };
    all.unshift(newTxn);
    dbSaveAll(all);
    setTransactions([...all]);
    return newTxn;
  }, []);

  // Update existing transaction
  const updateTransaction = useCallback((id, updatedData) => {
    const all = dbGetAll();
    const index = all.findIndex((t) => t.id === id);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      title: updatedData.title.trim(),
      amount: parseFloat(updatedData.amount),
      type: updatedData.type,
      category: updatedData.category,
      date: updatedData.date,
    };
    dbSaveAll(all);
    setTransactions([...all]);
    return all[index];
  }, []);

  // Delete transaction
  const deleteTransaction = useCallback((id) => {
    let all = dbGetAll();
    const before = all.length;
    all = all.filter((t) => t.id !== id);
    if (all.length === before) return false;
    dbSaveAll(all);
    setTransactions([...all]);
    return true;
  }, []);

  // Get summary
  const getSummary = useCallback(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  // Filter transactions
  const filterTransactions = useCallback(
    (filters = {}) => {
      let results = [...transactions];

      if (filters.type && filters.type !== 'all') {
        results = results.filter((t) => t.type === filters.type);
      }
      if (filters.category && filters.category !== 'all') {
        results = results.filter((t) => t.category === filters.category);
      }
      if (filters.date) {
        results = results.filter((t) => t.date === filters.date);
      }
      if (filters.search && filters.search.trim() !== '') {
        const q = filters.search.trim().toLowerCase();
        results = results.filter((t) => t.title.toLowerCase().includes(q));
      }
      return results;
    },
    [transactions]
  );

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary,
    filterTransactions,
    refresh,
  };
}
