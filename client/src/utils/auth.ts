import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem('lbzar_token')
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        if (decoded.exp < Date.now() / 1000) {
          // Token expired
          localStorage.removeItem('lbzar_token')
          navigate('/login')
        }
      } catch (error) {
        localStorage.removeItem('lbzar_token')
        navigate('/login')
      }
    }
  }, [navigate])
  
  return {
    login: (token: string) => {
      localStorage.setItem('lbzar_token', token)
    },
    logout: () => {
      localStorage.removeItem('lbzar_token')
      navigate('/login')
    },
    getToken: () => localStorage.getItem('lbzar_token'),
    getRole: () => {
      const token = localStorage.getItem('lbzar_token')
      if (!token) return null
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        return decoded.role
      } catch (error) {
        return null
      }
    }
  }
}
