import { useEffect, useState } from 'react'
import { apiRequest } from '../services/apiClient'
import { AuthContext, TOKEN_KEY } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      queueMicrotask(() => setCheckingAuth(false))
      return
    }

    apiRequest('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setCheckingAuth(false))
  }, [])

  async function authenticate(path, credentials) {
    const data = await apiRequest(path, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, checkingAuth, login: (data) => authenticate('/auth/login', data), register: (data) => authenticate('/auth/register', data), logout }}>
      {children}
    </AuthContext.Provider>
  )
}

