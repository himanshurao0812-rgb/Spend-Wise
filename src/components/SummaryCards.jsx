import { formatMoney } from '../utils';

export default function SummaryCards({ income, expense, balance }) {
  return (
    <section className="cards" id="summaryCards">
      <div className="card card-income">
        <div className="card-icon">↑</div>
        <div>
          <p className="card-label">Total Income</p>
          <p className="card-value">{formatMoney(income)}</p>
        </div>
      </div>
      <div className="card card-expense">
        <div className="card-icon">↓</div>
        <div>
          <p className="card-label">Total Expense</p>
          <p className="card-value">{formatMoney(expense)}</p>
        </div>
      </div>
      <div className="card card-balance">
        <div className="card-icon">⚖</div>
        <div>
          <p className="card-label">Balance</p>
          <p className="card-value">{formatMoney(balance)}</p>
        </div>
      </div>
    </section>
  );
}
