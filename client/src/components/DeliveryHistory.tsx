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

const DeliveryHistory: React.FC = () => {
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
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Historique des Livraisons</h2>
      {deliveries.length === 0 ? (
        <p>Aucune livraison historique trouvée.</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DeliveryHistory
