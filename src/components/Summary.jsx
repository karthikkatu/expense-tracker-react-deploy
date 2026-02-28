const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function Summary({ total, count, currentFilter }) {
  const safeTotal = Number.isFinite(total) ? total : 0
  const formattedTotal = currencyFormatter.format(safeTotal)

  const label =
    currentFilter === 'All'
      ? 'Total spent — all categories'
      : `Total spent — ${currentFilter}`

  const countLabel =
    count === 0 ? 'No expenses in this view yet.' : `${count} ${count === 1 ? 'expense' : 'expenses'} in current view.`

  return (
    <div className="summary">
      <div className="summary-main">
        <span className="summary-label">{label}</span>
        <span className="summary-total">{formattedTotal}</span>
        <span className="summary-meta">{countLabel}</span>
      </div>
      <div>
        <span className="summary-pill">
          View:{' '}
          {currentFilter === 'All' ? 'All categories' : currentFilter}
        </span>
      </div>
    </div>
  )
}

