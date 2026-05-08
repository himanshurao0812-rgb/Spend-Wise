import { useCurrency } from '../context/CurrencyContext';

export default function Navbar({ balance }) {
  const { formatMoney, currency, setCurrency, ObjectKeys } = useCurrency();
  const balanceColor = balance >= 0 ? 'var(--green)' : 'var(--red)';

  return (
    <nav className="navbar" id="navbar">
      <div className="logo">💸 SpendWise</div>
      <div className="nav-balance">
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)}
          style={{ marginRight: '1rem', padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
        >
          {ObjectKeys.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="nav-label">Net Balance</span>
        <span className="nav-amount" style={{ color: balanceColor }}>
          {formatMoney(balance)}
        </span>
      </div>
    </nav>
  );
}
