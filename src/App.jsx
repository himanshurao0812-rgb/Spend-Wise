import { useState, useCallback } from 'react';
import useTransactions from './hooks/useTransactions';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import Toast from './components/Toast';

const DEFAULT_FILTERS = {
  search: '',
  type: 'all',
  category: 'all',
  date: '',
};

export default function App() {
  const {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary,
    filterTransactions,
  } = useTransactions();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editingTxn, setEditingTxn] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success', key: 0 });

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast((prev) => ({ message, type, key: prev.key + 1 }));
  }, []);

  // Get computed values
  const summary = getSummary();
  const filteredList = filterTransactions(filters);

  // Handle form submit (add or edit)
  function handleFormSubmit(formData) {
    if (!formData.title || !formData.amount || parseFloat(formData.amount) <= 0) {
      showToast('Please fill in all fields correctly!', 'error');
      return;
    }

    if (formData.id) {
      // Update
      const result = updateTransaction(formData.id, formData);
      if (result) {
        showToast('Transaction updated! ✅');
      } else {
        showToast('Update failed!', 'error');
        return;
      }
    } else {
      // Add
      addTransaction(formData);
      showToast('Transaction added! 🎉');
    }
    setEditingTxn(null);
  }

  // Handle edit button
  function handleEdit(txn) {
    setEditingTxn(txn);
  }

  // Handle cancel edit
  function handleCancelEdit() {
    setEditingTxn(null);
  }

  // Handle delete
  function handleDelete(id) {
    const success = deleteTransaction(id);
    if (success) {
      showToast('Transaction deleted! 🗑');
    } else {
      showToast('Delete failed!', 'error');
    }
  }

  // Handle filter change
  function handleFilterChange(newFilters) {
    setFilters(newFilters);
  }

  // Handle reset filters
  function handleResetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <>
      <Navbar balance={summary.balance} />

      <main className="container">
        <SummaryCards
          income={summary.income}
          expense={summary.expense}
          balance={summary.balance}
        />

        <TransactionForm
          onSubmit={handleFormSubmit}
          editingTxn={editingTxn}
          onCancelEdit={handleCancelEdit}
        />

        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <TransactionList
          transactions={filteredList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <Toast key={toast.key} message={toast.message} type={toast.type} />
    </>
  );
}
