import React, { useState, useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { Courier, Delivery } from '../types'
import { fetchCouriers, addCourier, updateCourier, deleteCourier, fetchDeliveries } from '../api'

const Delivery: React.FC = () => {
  const { getRole } = useAuth()
  const [couriers, setCouriers] = useState<Courier[]>([])
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [newCourier, setNewCourier] = useState<Omit<Courier, 'id'>>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    location: '',
    status: 'active'
  })
  const [editingCourier, setEditingCourier] = useState<Courier | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (getRole() !== 'admin') {
      window.location.href = '/login-admin'
    }
  }, [getRole])

  useEffect(() => {
    const loadCouriers = async () => {
      try {
        const data = await fetchCouriers()
        setCouriers(data)
      } catch (error) {
        console.error('Error loading couriers:', error)
      }
    }
    
    loadCouriers()
  }, [])

  useEffect(() => {
    const loadDeliveries = async () => {
      try {
        const data = await fetchDeliveries()
        setDeliveries(data)
      } catch (error) {
        console.error('Error loading deliveries:', error)
      }
    }
    
    loadDeliveries()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }

  const filteredCouriers = couriers.filter(courier => {
    const matchesSearch = 
      courier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courier.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courier.phone.includes(searchTerm)
    
    const matchesStatus = 
      statusFilter === 'all' || 
      courier.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewCourier({
      ...newCourier,
      [name]: value
    })
  }

  const handleEdit = (courier: Courier) => {
    setEditingCourier(courier)
    setNewCourier({
      name: courier.name,
      surname: courier.surname,
      email: courier.email,
      phone: courier.phone,
      location: courier.location,
      status: courier.status
    })
  }

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce livreur ?')) {
      try {
        setIsSubmitting(true)
        await deleteCourier(id)
        setCouriers(couriers.filter(courier => courier.id !== id))
        setSubmitStatus('success')
        setTimeout(() => setSubmit, 'idle', 3000)
      } catch (error) {
        console.error('Error deleting courier:', error)
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      if (editingCourier) {
        // Update existing courier
        await updateCourier(editingCourier.id, {
          ...newCourier,
          id: editingCourier.id
        })
        setCouriers(couriers.map(courier => 
          courier.id === editingCourier.id ? { ...courier, ...newCourier } : courier
        ))
      } else {
        // Create new courier
        const response = await addCourier(newCourier)
        setCouriers([...couriers, { ...newCourier, id: response.id }])
      }
      
      setSubmitStatus('success')
      setNewCourier({
        name: '',
        surname: '',
        email: '',
        phone: '',
        location: '',
        status: 'active'
      })
      setEditingCourier(null)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('Error submitting courier:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des Livraisons</h1>
        <p className="text-gray-600 mb-6">
          Gérez tous les livreurs et les livraisons depuis cette interface. Vous pouvez ajouter, modifier, supprimer des livreurs et suivre les livraisons assignées.
        </p>
        
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium">Livreur soumis avec succès!</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            <p className="font-medium">Erreur lors de la soumission du livreur.</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <div className="flex-1 mb-4 md:mb-0">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Rechercher un livreur
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nom, prénom, email, téléphone"
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtre par statut
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusFilter}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Liste des livreurs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCouriers.length > 0 ? (
                    filteredCouriers.map(courier => (
                      <tr key={courier.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{courier.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{courier.surname}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{courier.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{courier.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            courier.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {courier.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(courier)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.268v-6.27l6.744-6.744z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(courier.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        Aucun livreur trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un nouveau livreur</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCourier.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={newCourier.surname}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newCourier.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={newCourier.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Localisation
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={newCourier.location}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={newCourier.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Envoi en cours...' : editingCourier ? 'Mettre à jour' : 'Soumettre'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Delivery
