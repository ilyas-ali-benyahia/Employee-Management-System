import { useEffect, useState } from 'react'
import { EmployeeForm } from './components/EmployeeForm'
import { EmployeeList } from './components/EmployeeList'

const API_URL = 'http://localhost:5500/api/employees'

async function getEmployeesFromDB() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Could not load employees. Is the backend server running?')
  }

  return response.json()
}

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('All departments')

  useEffect(() => {
    getEmployeesFromDB()
      .then((data) => setEmployees(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function handleSaved(savedEmployee, wasEditing) {
    if (wasEditing) {
      setEmployees((current) =>
        current.map((employee) => (employee._id === savedEmployee._id ? savedEmployee : employee))
      )
    } else {
      setEmployees((current) => [savedEmployee, ...current])
    }
    setEditingEmployee(null)
  }

  function handleDeleted(id) {
    setEmployees((current) => current.filter((employee) => employee._id !== id))
  }

  const departments = [
    'All departments',
    ...new Set(employees.map((employee) => employee.department)),
  ]
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const visibleEmployees = employees.filter((employee) => {
    const matchesSearch = [employee.name, employee.email, employee.role, employee.department]
      .some((value) => value?.toLowerCase().includes(normalizedSearch))
    const matchesDepartment =
      departmentFilter === 'All departments' || employee.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">People operations</p>
          <h1>Employee directory</h1>
          <p className="page-subtitle">Keep your team information organized and easy to find.</p>
        </div>
        <div className="team-count">
          <strong>{employees.length}</strong>
          <span>team members</span>
        </div>
      </header>

      <section className="overview-grid" aria-label="Employee overview">
        <article className="overview-card overview-card-primary">
          <span>Total employees</span><strong>{employees.length}</strong><small>Across your organization</small>
        </article>
        <article className="overview-card">
          <span>Departments</span><strong>{Math.max(departments.length - 1, 0)}</strong><small>Active teams</small>
        </article>
        <article className="overview-card">
          <span>Showing now</span><strong>{visibleEmployees.length}</strong><small>Matching your view</small>
        </article>
      </section>

      <EmployeeForm
        editingEmployee={editingEmployee}
        onSaved={handleSaved}
        onCancelEdit={() => setEditingEmployee(null)}
      />

      {loading && <p>Loading employees…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <section className="directory-panel">
          <div className="directory-heading">
            <div>
              <h2>Team directory</h2>
              <p>Search, review, and manage employee records.</p>
            </div>
            <span className="result-count">
              {visibleEmployees.length} {visibleEmployees.length === 1 ? 'result' : 'results'}
            </span>
          </div>
          <div className="search-toolbar">
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, email, role..."
                aria-label="Search employees"
              />
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm('')} aria-label="Clear search">
                  ×
                </button>
              )}
            </label>
            <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)} aria-label="Filter by department">
              {departments.map((department) => <option key={department}>{department}</option>)}
            </select>
          </div>
          <EmployeeList
            employees={visibleEmployees}
            onDeleted={handleDeleted}
            onEdit={setEditingEmployee}
            hasFilters={Boolean(normalizedSearch || departmentFilter !== 'All departments')}
          />
        </section>
      )}
    </div>
  )
}

export default App
