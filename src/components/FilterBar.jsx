export default function FilterBar({ filters, onChange, onReset }) {
  function handleChange(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <section className="filter-bar" id="filterBar">
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={filters.search}
        onChange={(e) => handleChange('search', e.target.value)}
        id="searchInput"
      />
      <select
        value={filters.type}
        onChange={(e) => handleChange('type', e.target.value)}
        id="filterType"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select
        value={filters.category}
        onChange={(e) => handleChange('category', e.target.value)}
        id="filterCategory"
      >
        <option value="all">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Health">Health</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Salary">Salary</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        title="Filter by date"
        value={filters.date}
        onChange={(e) => handleChange('date', e.target.value)}
        id="filterDate"
      />
      <button className="btn-reset" onClick={onReset} id="clearFilters">
        Clear
      </button>
    </section>
  );
}
