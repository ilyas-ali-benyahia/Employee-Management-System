import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function ProtectedRoute() {
  const { user, checkingAuth } = useAuth()
  const location = useLocation()

  if (checkingAuth) return <div className="auth-loading">Checking your session...</div>
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}