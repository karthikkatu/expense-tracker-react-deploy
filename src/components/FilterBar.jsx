export function FilterBar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-bar">
      <div>
        <p className="filter-label">Filter by category</p>
        
      </div>
      <div className="filter-select">
        <select
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="All">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

