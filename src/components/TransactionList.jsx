import TransactionCard from './TransactionCard';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <section className="txn-section" id="transactionList">
      <h2 className="section-title">Transactions</h2>
      <div className="txn-list">
        {transactions.length === 0 ? (
          <div className="empty-state">No transactions found.</div>
        ) : (
          transactions.map((txn) => (
            <TransactionCard
              key={txn.id}
              txn={txn}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}
