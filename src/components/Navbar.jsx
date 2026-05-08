import { formatMoney } from '../utils';

export default function Navbar({ balance }) {
  const balanceColor = balance >= 0 ? 'var(--green)' : 'var(--red)';

  return (
    <nav className="navbar" id="navbar">
      <div className="logo">💸 SpendWise</div>
      <div className="nav-balance">
        <span className="nav-label">Net Balance</span>
        <span className="nav-amount" style={{ color: balanceColor }}>
          {formatMoney(balance)}
        </span>
      </div>
    </nav>
  );
}
