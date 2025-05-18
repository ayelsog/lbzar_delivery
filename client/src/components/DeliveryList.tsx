import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/auth'

interface Delivery {
  _id: string
  customer: {
    name: string
    address: string
    phone: string
  }
  status: 'en cours' | 'livrée' | 'annulée'
  assignedTo: string
  createdAt: Date
}

const DeliveryList: React.FC = () => {
  const { getToken, getRole } = useAuth()
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  
  useEffect(() => {
    const fetchDeliveries = async () => {
      const token = getToken()
      if (!token) return
      
      const response = await fetch('/api/delivery/assigned', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setDeliveries(data)
      }
    }
    
    fetchDeliveries()
  }, [])
  
  const updateStatus = async (id: string, newStatus: 'livrée' | 'annulée') => {
    const response = await fetch(`/api/delivery/${id}/status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    
    if (response.ok) {
      const updatedDeliveries = deliveries.map(delivery => 
        delivery._id === id ? { ...delivery, status: newStatus } : delivery
      )
      setDeliveries(updatedDeliveries)
    }
  }
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Commandes Assignées</h2>
      {deliveries.length === 0 ? (
        <p>Aucune commande assignée pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {deliveries.map(delivery => (
            <div key={delivery._id} className="border p-4 rounded">
              <h3 className="font-bold">{delivery.customer.name}</h3>
              <p>{delivery.customer.address}</p>
              <p>{delivery.customer.phone}</p>
              <p className="text-sm text-gray-500">Commande créée le {delivery.createdAt.toLocaleDateString()}</p>
              <div className="mt-2">
                <span className={`inline-block px-2 py-1 rounded text-xs ${
                  delivery.status === 'livrée' 
                    ? 'bg-green-100 text-green-800' 
                    : delivery.status === 'annulée' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {delivery.status}
                </span>
              </div>
              <div className="mt-2 flex space-x-2">
                {delivery.status !== 'livrée' && (
                  <button 
                    onClick={() => updateStatus(delivery._id, 'livrée')}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Marquer comme livrée
                  </button>
                )}
                {delivery.status !== 'annulée' && (
                  <button 
                    onClick={() => updateStatus(delivery._id, 'annulée')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DeliveryList
