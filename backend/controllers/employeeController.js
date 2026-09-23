import Employee from '../models/Employee.js'

// Each function here is a controller - it runs when a request reaches a specific route
// Each one receives 3 things: (req, res), and try/catch to handle errors

// GET /api/employees -> return the list of all employees
export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 }) // newest first
    res.status(200).json(employees)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message })
  }
}

// GET /api/employees/:id -> return a single employee
export async function getEmployeeById(req, res) {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.status(200).json(employee)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message })
  }
}

// POST /api/employees -> create a new employee
export async function createEmployee(req, res) {
  try {
    const newEmployee = await Employee.create(req.body)
    res.status(201).json(newEmployee) // 201 = a new resource was created
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee', error: error.message })
  }
}

// PUT /api/employees/:id -> update an existing employee
export async function updateEmployee(req, res) {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // new: true = return the updated version, not the old one
    )
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.status(200).json(updatedEmployee)
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee', error: error.message })
  }
}

// DELETE /api/employees/:id -> remove an employee
export async function deleteEmployee(req, res) {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id)
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.status(200).json({ message: 'Employee deleted successfully', id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message })
  }
}
