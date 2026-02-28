import { useEffect, useState } from 'react'

const EMPTY_FORM = {
  title: '',
  amount: '',
  category: '',
  description: '',
}

export function ExpenseForm({ categories, onSave, editingExpense, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title ?? '',
        amount:
          typeof editingExpense.amount === 'number' && !Number.isNaN(editingExpense.amount)
            ? String(editingExpense.amount)
            : '',
        category: editingExpense.category ?? '',
        description: editingExpense.description ?? '',
      })
      setErrors({})
    } else {
      setForm(EMPTY_FORM)
      setErrors({})
    }
  }, [editingExpense])

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Title is required.'
    }

    const numericAmount = Number(form.amount)
    if (!form.amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = 'Enter a valid positive amount.'
    }

    if (!form.category || !categories.includes(form.category)) {
      nextErrors.category = 'Pick a category from the list.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const payload = {
      id: editingExpense?.id,
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      description: form.description.trim(),
    }

    onSave(payload)

    if (!editingExpense) {
      setForm(EMPTY_FORM)
      setErrors({})
    }
  }

  const handleCancel = () => {
    if (editingExpense) {
      onCancelEdit?.()
    } else {
      setForm(EMPTY_FORM)
      setErrors({})
    }
  }

  const isEditing = Boolean(editingExpense)

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">{isEditing ? 'Edit expense' : 'Add new expense'}</h2>
          <p className="panel-caption">
            {isEditing
              ? 'Update the selected record and save your changes.'
              : 'Fill out the form to add a new expense to your tracker.'}
          </p>
        </div>
        <span className="badge-soft">{isEditing ? 'Edit' : 'Add'}</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field-grid">
          <div className="field-full">
            <label className="field-label">
              Title<span className="field-required">*</span>
            </label>
            <input
              className={`field-input${errors.title ? ' error' : ''}`}
              type="text"
              value={form.title}
              onChange={handleChange('title')}
              placeholder="Groceries, rideshare, utilities..."
              autoComplete="off"
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          <div>
            <label className="field-label">
              Amount<span className="field-required">*</span>
            </label>
            <input
              className={`field-input${errors.amount ? ' error' : ''}`}
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={handleChange('amount')}
              placeholder="0.00"
              inputMode="decimal"
            />
            {errors.amount && <p className="field-error">{errors.amount}</p>}
          </div>

          <div>
            <label className="field-label">
              Category<span className="field-required">*</span>
            </label>
            <select
              className={`field-select${errors.category ? ' error' : ''}`}
              value={form.category}
              onChange={handleChange('category')}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="field-error">{errors.category}</p>}
          </div>

          <div className="field-full">
            <label className="field-label">Description</label>
            <textarea
              className="field-textarea"
              rows={3}
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Optional notes such as merchant, payment method, or context."
            />
          </div>
        </div>

        <div className="form-footer">
          <div className="form-footer-left">
            
          </div>
          <div className="form-footer-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              {isEditing ? 'Cancel edit' : 'Reset'}
            </button>
            <button type="submit">{isEditing ? 'Save changes' : 'Add expense'}</button>
          </div>
        </div>
      </form>
    </div>
  )
}

