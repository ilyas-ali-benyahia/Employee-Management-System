import { useEffect, useState } from 'react'
import { apiRequest } from '../services/apiClient'

// ============================================================
// PART 1 — the backend connection.
// These are the only two functions in this file that talk to
// the server directly: one to CREATE a new employee, one to
// UPDATE an existing one. Both just send data with fetch and
// give back whatever the backend actually saved.
// ============================================================
async function addEmployeeToDB(employee) {
  return apiRequest('/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
  })
}

async function updateEmployeeInDB(id, employee) {
  return apiRequest(`/employees/${id}`, {
    method: 'PUT',
    body: JSON.stringify(employee),
  })
}

// ============================================================
// PART 2 — the component.
// One single form handles BOTH "add" and "edit":
//  - if editingEmployee is null      → we are adding a new employee
//  - if editingEmployee is an object → we are editing that employee
// This is decided by whichever employee App.jsx passes in.
// ============================================================
export function EmployeeForm({ editingEmployee, onSaved, onCancelEdit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('Engineering')
  const [role, setRole] = useState('')
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const isEditing = Boolean(editingEmployee)

  // Whenever App.jsx asks us to edit a different employee (or to stop
  // editing, by passing null), we refill the form to match.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name)
      setEmail(editingEmployee.email)
      setDepartment(editingEmployee.department)
      setRole(editingEmployee.role)
    } else {
      setName('')
      setEmail('')
      setDepartment('Engineering')
      setRole('')
    }
    setError(null)
  }, [editingEmployee])
  /* eslint-enable react-hooks/set-state-in-effect */

  async function handleSubmit(event) {
    event.preventDefault() // stop the page from refreshing
    setSaving(true)
    setError(null)

    try {
      const employeeData = {
        name,
        email,
        department,
        role,
        location: 'Algiers',
        joined: new Date().toISOString().split('T')[0],
        status: 'Active',
      }

      const saved = isEditing
        ? await updateEmployeeInDB(editingEmployee._id, employeeData)
        : await addEmployeeToDB(employeeData)

      onSaved(saved, isEditing) // tell App.jsx what happened

      if (!isEditing) {
        setName('')
        setEmail('')
        setDepartment('Engineering')
        setRole('')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h2>{isEditing ? 'Edit employee' : 'Add employee'}</h2>

      {error && <p className="form-error">{error}</p>}

      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Full name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        required
      />
      <select value={department} onChange={(event) => setDepartment(event.target.value)}>
        <option>Engineering</option>
        <option>Design</option>
        <option>Marketing</option>
        <option>People</option>
        <option>Finance</option>
      </select>
      <input
        value={role}
        onChange={(event) => setRole(event.target.value)}
        placeholder="Job title"
        required
      />

      <div className="form-buttons">
        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Add employee'}
        </button>
        {isEditing && (
          <button type="button" className="cancel-button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
