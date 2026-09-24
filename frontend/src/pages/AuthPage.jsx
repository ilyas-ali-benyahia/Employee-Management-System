import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await (isRegister ? register(form) : login({ email: form.email, password: form.password }))
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">People operations</p>
        <h1>{isRegister ? 'Create your workspace account' : 'Welcome back'}</h1>
        <p className="auth-subtitle">{isRegister ? 'Start managing your employee directory securely.' : 'Sign in to continue to your employee directory.'}</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && <input placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />}
          <input type="email" placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input type="password" placeholder="Password (at least 6 characters)" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} minLength="6" required />
          {error && <p className="form-error">{error}</p>}
          {isRegister && error && requestErrorIsDuplicate(error) && (
            <Link className="auth-duplicate-link" to="/login">Sign in with this email instead</Link>
          )}
          <button type="submit" disabled={submitting}>{submitting ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}</button>
        </form>
        <p className="auth-switch">{isRegister ? 'Already have an account?' : 'New to the directory?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create an account'}</Link></p>
      </section>
    </main>
  )
}

function requestErrorIsDuplicate(message) {
  return message.toLowerCase().includes('already exists')
}