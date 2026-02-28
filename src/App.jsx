import { useMemo, useState } from 'react'
import './App.css'
import { ExpenseForm } from './components/ExpenseForm.jsx'
import { FilterBar } from './components/FilterBar.jsx'
import { ExpenseList } from './components/ExpenseList.jsx'
import { Summary } from './components/Summary.jsx'

const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Shopping', 'Entertainment', 'Other']

function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [editingExpense, setEditingExpense] = useState(null)

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === 'All') return expenses
    return expenses.filter((expense) => expense.category === selectedCategory)
  }, [expenses, selectedCategory])

  const totalForView = useMemo(
    () => filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [filteredExpenses],
  )

  const handleSaveExpense = (payload) => {
    if (payload.id) {
      setExpenses((prev) =>
        prev.map((expense) => (expense.id === payload.id ? { ...expense, ...payload } : expense)),
      )
      setEditingExpense(null)
      return
    }

    const newExpense = {
      ...payload,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      createdAt: new Date().toISOString(),
    }

    setExpenses((prev) => [newExpense, ...prev])
  }

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
    if (editingExpense && editingExpense.id === id) {
      setEditingExpense(null)
    }
  }

  const handleEditRequest = (id) => {
    const target = expenses.find((expense) => expense.id === id)
    if (target) {
      setEditingExpense(target)
      // Ensure the selected category matches the item being edited for clarity
      if (selectedCategory !== 'All' && selectedCategory !== target.category) {
        setSelectedCategory('All')
      }
    }
  }

  const handleClearEditing = () => {
    setEditingExpense(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Expense Tracker Pro</h1>
          <p className="app-subtitle">
            Track your daily spending with smart filters, inline validation, and real-time insights.
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="app-main-left">
          <ExpenseForm
            key={editingExpense ? editingExpense.id : 'new'}
            categories={CATEGORIES}
            onSave={handleSaveExpense}
            onCancelEdit={handleClearEditing}
            editingExpense={editingExpense}
          />
        </section>

        <section className="app-main-right">
          <FilterBar
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <Summary
            total={totalForView}
            count={filteredExpenses.length}
            currentFilter={selectedCategory}
          />

          <ExpenseList
            expenses={filteredExpenses}
            onEdit={handleEditRequest}
            onDelete={handleDeleteExpense}
          />
        </section>
      </main>
    </div>
  )
}

export default App
