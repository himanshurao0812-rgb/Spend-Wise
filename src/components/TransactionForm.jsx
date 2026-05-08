import { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  { value: 'Food', label: '🍔 Food' },
  { value: 'Transport', label: '🚗 Transport' },
  { value: 'Shopping', label: '🛍 Shopping' },
  { value: 'Health', label: '💊 Health' },
  { value: 'Entertainment', label: '🎬 Entertainment' },
  { value: 'Salary', label: '💼 Salary' },
  { value: 'Other', label: '📦 Other' },
];

export default function TransactionForm({ onSubmit, editingTxn, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);

  const formRef = useRef(null);
  const isEditing = !!editingTxn;

  // When editingTxn changes, populate the form
  useEffect(() => {
    if (editingTxn) {
      setTitle(editingTxn.title);
      setAmount(String(editingTxn.amount));
      setType(editingTxn.type);
      setCategory(editingTxn.category);
      setDate(editingTxn.date);
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editingTxn]);

  function resetForm() {
    setTitle('');
    setAmount('');
    setType('income');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !amount || parseFloat(amount) <= 0) {
      return;
    }

    onSubmit({
      id: editingTxn?.id || null,
      title,
      amount,
      type,
      category,
      date,
    });

    resetForm();
  }

  function handleCancel() {
    resetForm();
    onCancelEdit();
  }

  return (
    <section className="form-section" ref={formRef} id="transactionForm">
      <h2 className="section-title">
        {isEditing ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
      <form className="txn-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Transaction title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="txnTitle"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="txnAmount"
          />
        </div>
        <div className="form-row">
          <select value={type} onChange={(e) => setType(e.target.value)} id="txnType">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} id="txnCategory">
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="txnDate"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" id="submitBtn">
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </button>
          {isEditing && (
            <button type="button" className="btn-secondary" onClick={handleCancel} id="cancelEdit">
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
