import React, { useState, useEffect } from 'react'
import { useAuth } from '../utils/auth'
import { Order } from '../types'
import { fetchOrders, addOrder, updateOrder, deleteOrder } from '../api'

const Admin: React.FC = () => {
  const { getRole } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({
    customerName: '',
    phoneNumber: '',
    address: '',
    serviceType: '',
    status: 'New',
    courier: ''
  })
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
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
    const loadOrders = async () => {
      try {
        const data = await fetchOrders()
        setOrders(data)
      } catch (error) {
        console.error('Error loading orders:', error)
      }
    }
    
    loadOrders()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.includes(searchTerm) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      statusFilter === 'all' || 
      order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewOrder({
      ...newOrder,
      [name]: value
    })
  }

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
    setNewOrder({
      customerName: order.customerName,
      phoneNumber: order.phoneNumber,
      address: order.address,
      serviceType: order.serviceType,
      status: order.status,
      courier: order.courier || ''
    })
  }

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
      try {
        setIsSubmitting(true)
        await deleteOrder(id)
        setOrders(orders.filter(order => order.id !== id))
        setSubmitStatus('success')
        setTimeout(() => setSubmitStatus('idle'), 3000)
      } catch (error) {
        console.error('Error deleting order:', error)
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
      if (editingOrder) {
        // Update existing order
        await updateOrder(editingOrder.id, {
          ...newOrder,
          id: editingOrder.id
        })
        setOrders(orders.map(order => 
          order.id === editingOrder.id ? { ...order, ...newOrder } : order
        ))
      } else {
        // Create new order
        const response = await addOrder(newOrder)
        setOrders([...orders, { ...newOrder, id: response.id }])
      }
      
      setSubmitStatus('success')
      setNewOrder({
        customerName: '',
        phoneNumber: '',
        address: '',
        serviceType: '',
        status: 'New',
        courier: ''
      })
      setEditingOrder(null)
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tableau de bord Admin</h1>
        <p className="text-gray-600 mb-6">
          Gérez toutes les commandes et les livraisons depuis cette interface. Vous pouvez ajouter, modifier, supprimer des commandes et assigner des livraisons à des livreurs.
        </p>
        
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium">Commande soumise avec succès!</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            <p className="font-medium">Erreur lors de la soumission de la commande.</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <div className="flex-1 mb-4 md:mb-0">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Rechercher une commande
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Nom, téléphone, adresse, type de service"
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
              <option value="New">Nouveau</option>
              <option value="In Preparation">En préparation</option>
              <option value="On the Way">En route</option>
              <option value="Delivered">Livré</option>
              <option value="Failed">Échec</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Liste des commandes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type de service</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livreur</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.phoneNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.address}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.serviceType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'New' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : order.status === 'In Preparation' 
                                ? 'bg-blue-100 text-blue-800' 
                                : order.status === 'On the Way' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'Delivered' 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.courier || 'Non assigné'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(order)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.268v-6.27l6.744-6.744z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
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
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        Aucune commande trouvée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter une nouvelle commande</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom du client
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={newOrder.customerName}
                onChange={handleInputChange}
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
                value={newOrder.phoneNumber}
                onChange={handleInputChange}
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
                value={newOrder.address}
                onChange={handleInputChange}
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
                value={newOrder.serviceType}
                onChange={handleInputChange}
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
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={newOrder.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="New">Nouveau</option>
                <option value="In Preparation">En préparation</option>
                <option value="On the Way">En route</option>
                <option value="Delivered">Livré</option>
                <option value="Failed">Échec</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="courier" className="block text-sm font-medium text-gray-700 mb-1">
                Livreur
              </label>
              <select
                id="courier"
                name="courier"
                value={newOrder.courier}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Sélectionnez un livreur</option>
                <option value="livreur1">Livreur 1</option>
                <option value="livreur2">Livreur 2</option>
                <option value="livreur3">Livreur 3</option>
              </select>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Envoi en cours...' : editingOrder ? 'Mettre à jour' : 'Soumettre'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Admin
