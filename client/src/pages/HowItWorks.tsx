import React from 'react'

const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Comment ça marche</h1>
        <p className="text-gray-600 mb-6">
          Découvrez comment Lbzar Express fonctionne pour vous offrir une expérience optimale. 
          Suivez les étapes simples pour comprendre notre processus.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-4">1. Créer un compte</h2>
            <p className="text-gray-600">
              Commencez par créer un compte sur notre plateforme. Cela ne prend que quelques minutes.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-4">2. Commander</h2>
            <p className="text-gray-600">
              Choisissez les produits ou services que vous souhaitez commander et validez votre panier.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-4">3. Recevoir</h2>
            <p className="text-gray-600">
              Notre équipe de livraison vous livre vos commandes rapidement et efficacement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
