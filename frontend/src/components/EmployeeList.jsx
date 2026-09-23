const API_URL = 'http://localhost:5500/api/employees'

// ============================================================
// PART 1 — the backend connection.
// The only function here that talks to the server: deletes one
// employee by id.
// ============================================================
async function deleteEmployeeFromDB(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Could not delete employee')
  }
}

// ============================================================
// PART 2 — the component. It only knows how to:
//  1. show the list it was given (as a prop)
//  2. call the function above when "Delete" is clicked
//  3. tell App.jsx "this employee was deleted" or "edit this one"
// ============================================================
export function EmployeeList({ employees, onDeleted, onEdit, hasFilters }) {
  async function handleDelete(id) {
    const confirmed = window.confirm('Delete this employee?')
    if (!confirmed) return

    await deleteEmployeeFromDB(id)
    onDeleted(id) // tell App.jsx to remove it from the list on screen too
  }

  if (employees.length === 0) {
    return <div className="empty-state"><strong>{hasFilters ? 'No matching employees' : 'Your directory is empty'}</strong><span>{hasFilters ? 'Try a different search or department filter.' : 'Add your first employee using the form above.'}</span></div>
  }

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td data-label="Name"><strong>{employee.name}</strong></td>
            <td data-label="Email">{employee.email}</td>
            <td data-label="Department"><span className="department-pill">{employee.department}</span></td>
            <td data-label="Role">{employee.role}</td>
            <td className="row-actions">
              <button className="edit-button" onClick={() => onEdit(employee)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
