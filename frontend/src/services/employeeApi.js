import { API_BASE_URL } from '../config/api';

const ENDPOINT = `${API_BASE_URL}/employees`;

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

function normalize(employee) {
  if (!employee) return employee;

  const { _id, ...rest } = employee;
  return { id: _id, ...rest };
}

export async function fetchEmployees() {
  const response = await fetch(ENDPOINT);
  const data = await handleResponse(response);
  return data.map(normalize);
}

export async function createEmployee(employee) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });

  const saved = await handleResponse(response);
  return normalize(saved);
}

export async function updateEmployee(id, employee) {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });

  const saved = await handleResponse(response);
  return normalize(saved);
}

export async function deleteEmployee(id) {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
  });

  return handleResponse(response);
}
