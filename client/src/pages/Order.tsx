import React, { useState } from 'react'

const Order: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    serviceType: '',
    orderDetails: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      alert('Veuillez entrer votre nom complet')
      return false
    }
    
    if (!formData.phoneNumber.trim()) {
      alert('Veuillez entrer votre numéro de téléphone')
      return false
    }
    
    if (!/^\d{8,15}$/.test(formData.phoneNumber)) {
      alert('Format de téléphone invalide (8-15 chiffres)')
      return false
    }
    
    if (!formData.address.trim()) {
      alert('Veuillez entrer votre adresse')
      return false
    }
    
    if (!formData.serviceType) {
      alert('Veuillez sélectionner un type de service')
      return false
    }
    
    if (!formData.orderDetails.trim()) {
      alert('Veuillez décrire votre commande')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setOrderId(null)
    
    try {
      // Simulate API call to /api/orders
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitStatus('success')
        setOrderId(data.orderId)
        // Auto-close confirmation after 3 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          setOrderId(null)
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Commander</h1>
        <p className="text-gray-600 mb-6">
          Placez votre commande en quelques clics. Notre système de commande est conçu pour être simple et intuitif.
        </p>
        
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium">Commande soumise avec succès!</p>
            <p className="text-sm">ID de commande: <span className="font-bold">{orderId}</span></p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            <p className="font-medium">Erreur lors de la soumission de la commande.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">
              Type de service
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Sélectionnez un type de service</option>
              <option value="fleuriste">Fleuriste</option>
              <option value="pharmacie">Pharmacie</option>
              <option value="boulangerie">Boulangerie</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="orderDetails" className="block text-sm font-medium text-gray-700 mb-1">
              Détails de la commande
            </label>
            <textarea
              id="orderDetails"
              name="orderDetails"
              rows={4}
              value={formData.orderDetails}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Soumettre la commande'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Order
