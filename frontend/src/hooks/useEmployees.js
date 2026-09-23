import { useEffect, useMemo, useState } from 'react';
import {
  createEmployee as createEmployeeApi,
  deleteEmployee as deleteEmployeeApi,
  fetchEmployees,
  updateEmployee as updateEmployeeApi,
} from '../services/employeeApi';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Failed to load employees:', error);
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const metrics = useMemo(
    () => ({
      total: employees.length,
      active: employees.filter((employee) => employee.status === 'Active').length,
      onLeave: employees.filter((employee) => employee.status === 'On leave').length,
      departments: new Set(employees.map((employee) => employee.department)).size,
    }),
    [employees],
  );

  async function addEmployee(employee) {
    const saved = await createEmployeeApi(employee);
    setEmployees((current) => [saved, ...current]);
    return saved;
  }

  async function updateEmployee(employee) {
    const employeeId = employee.id || employee._id;
    const saved = await updateEmployeeApi(employeeId, employee);
    setEmployees((current) =>
      current.map((item) => ((item.id ?? item._id) === (saved.id ?? saved._id) ? saved : item)),
    );
    return saved;
  }

  async function deleteEmployee(id) {
    await deleteEmployeeApi(id);
    setEmployees((current) => current.filter((employee) => (employee.id ?? employee._id) !== id));
  }

  return { employees, metrics, loading, addEmployee, updateEmployee, deleteEmployee };
}
