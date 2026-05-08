// Category emoji map
export const CATEGORY_EMOJI = {
  Food: '🍔',
  Transport: '🚗',
  Shopping: '🛍',
  Health: '💊',
  Entertainment: '🎬',
  Salary: '💼',
  Other: '📦',
};

// Format number as Indian currency
export function formatMoney(amount) {
  return (
    '₹' +
    amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

// Format date nicely
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
