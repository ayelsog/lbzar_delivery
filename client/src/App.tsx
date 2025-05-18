import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import HowItWorks from './pages/HowItWorks'
import Order from './pages/Order'
import LoginAdmin from './pages/LoginAdmin'
import LoginLivreur from './pages/LoginLivreur'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Fixed Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 2
                <span className="ml-2 text-xl font-bold text-green-600">Lbzar</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Accueil
                </Link>
                <Link to="/services" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Services
                </Link>
                <Link to="/how-it-works" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Comment ça marche
                </Link>
                <Link to="/order" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Commande
                </Link>
                <Link to="/login-admin" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
                <Link to="/login-livreur" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                  Livreur
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/order" element={<Order />} />
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/login-livreur" element={<LoginLivreur />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="ml-2 text-gray-700">Lbzar Express</span>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Lbzar. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
