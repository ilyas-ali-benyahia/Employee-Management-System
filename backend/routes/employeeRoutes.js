import express from 'express'
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js'

const router = express.Router()

// Each line here means: "When a request comes in this format, run this function"
router.get('/', getEmployees) // GET    /api/employees
router.get('/:id', getEmployeeById) // GET    /api/employees/:id
router.post('/', createEmployee) // POST   /api/employees
router.put('/:id', updateEmployee) // PUT    /api/employees/:id
router.delete('/:id', deleteEmployee) // DELETE /api/employees/:id

export default router
