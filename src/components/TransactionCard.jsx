import { useState } from 'react';
import { formatDate, CATEGORY_EMOJI } from '../utils';
import { useCurrency } from '../context/CurrencyContext';

export default function TransactionCard({ txn, onEdit, onDelete }) {
  const { formatMoney } = useCurrency();
  const [confirming, setConfirming] = useState(false);

  const emoji = CATEGORY_EMOJI[txn.category] || '📦';
  const isIncome = txn.type === 'income';
  const amtClass = isIncome ? 'amount-income' : 'amount-expense';
  const badgeClass = isIncome ? 'badge-income' : 'badge-expense';
  const sign = isIncome ? '+' : '−';

  function handleDeleteClick() {
    if (confirming) {
      onDelete(txn.id);
    } else {
      setConfirming(true);
    }
  }

  return (
    <div className="txn-card" data-id={txn.id}>
      <div className="txn-left">
        <div className="txn-emoji">{emoji}</div>
        <div className="txn-info">
          <div className="txn-name">{txn.title}</div>
          <div className="txn-meta">
            {formatDate(txn.date)} &nbsp;·&nbsp;
            <span className={`txn-badge ${badgeClass}`}>{txn.type}</span>
            &nbsp;·&nbsp; {txn.category}
          </div>
        </div>
      </div>
      <div className="txn-right">
        <div className={`txn-amount ${amtClass}`}>
          {sign}{formatMoney(txn.amount)}
        </div>
        <div className="txn-actions">
          <button className="btn-edit" onClick={() => onEdit(txn)}>
            Edit
          </button>
          {confirming ? (
            <>
              <button className="btn-confirm-delete" onClick={handleDeleteClick}>
                Sure?
              </button>
              <button
                className="btn-cancel-delete"
                onClick={() => setConfirming(false)}
              >
                No
              </button>
            </>
          ) : (
            <button className="btn-delete" onClick={handleDeleteClick}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
