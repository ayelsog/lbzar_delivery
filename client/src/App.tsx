import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import DeliveryList from './components/DeliveryList'
import DeliveryHistory from './components/DeliveryHistory'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DeliveryList />} />
          <Route path="/history" element={<DeliveryHistory />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
