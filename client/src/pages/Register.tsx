import React, { useState } from 'react'
import { useAuth } from '../utils/auth'
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'

const Register: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }
    
    try {
      // Simulate API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Simulate successful registration
        login('fake-token-here')
        window.location.href = '/login'
      } else {
        setError(data.error || 'Erreur lors de l\'inscription')
      }
    } catch (err) {
      setError('Erreur serveur')
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">S'inscrire</h2>
          <p className="mt-2 text-sm text-gray-600">
            Créez un compte pour accéder à votre espace
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Email"
                required
              />
            </div>
            <div className="mt-1">
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div className="mt-1">
              <label htmlFor="confirm-password" className="sr-only">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              S'inscrire
            </button>
          </div>
          
          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}
        </form>
        
        <div className="mt-10">
          <p className="text-center text-sm text-gray-600">
            Vous avez déjà un compte?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
