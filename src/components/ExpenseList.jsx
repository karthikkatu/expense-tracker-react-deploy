const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="expense-list">
        <div className="expense-empty">
          No expenses match this view yet. Add a new entry or adjust the category filter above.
        </div>
      </div>
    )
  }

  return (
    <div className="expense-list">
      <div className="expense-list-header">
        <span>Title & notes</span>
        <span>Amount & Category</span>
        <span />
      </div>

      {expenses.map((expense) => (
        <div key={expense.id} className="expense-row">
          <div>
            <div className="expense-title">{expense.title}</div>
            {expense.description && (
              <div className="expense-description">{expense.description}</div>
            )}
          </div>

          <div className="expense-amount">
            {currencyFormatter.format(expense.amount)}
          </div>

          <div>
            <span className="expense-category-pill">{expense.category}</span>
          </div>

          <div className="expense-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onEdit(expense.id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={() => onDelete(expense.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

