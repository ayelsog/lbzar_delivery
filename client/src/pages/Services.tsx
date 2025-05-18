import React, { useState } from 'react'

const Services: React.FC = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null)

  const handlePopupClose = (category: string) => {
    setActivePopup(null)
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Nos Services</h1>
        <p className="text-gray-600 mb-6">
          Lbzar Express propose une gamme complète de services pour répondre à vos besoins. 
          Que vous soyez un professionnel ou un particulier, nous avons la solution idéale pour vous.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fleuristes Block */}
          <div 
            className="bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors duration-200 rounded-lg p-6 shadow-md"
            onClick={() => setActivePopup('fleuristes')}
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Fleuristes</h2>
            <p className="text-gray-700">
              Découvrez nos magnifiques compositions florales pour tous les occasions. 
              Des fleurs fraîches à la livraison rapide, pour embellir votre quotidien.
            </p>
          </div>
          
          {/* Pharmacies Block */}
          <div 
            className="bg-green-50 hover:bg-green-100 cursor-pointer transition-colors duration-200 rounded-lg p-6 shadow-md"
            onClick={() => setActivePopup('pharmacies')}
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">Pharmacies</h2>
            <p className="text-gray-700">
              Accédez à une sélection de produits pharmaceutiques de qualité. 
              Des médicaments essentiels à des soins de première ligne, disponibles en quelques clics.
            </p>
          </div>
          
          {/* Boulangeries Block */}
          <div 
            className="bg-yellow-50 hover:bg-yellow-100 cursor-pointer transition-colors duration-200 rounded-lg p-6 shadow-md"
            onClick={() => setActivePopup('boulangeries')}
          >
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Boulangeries</h2>
            <p className="text-gray-700">
              Découvrez nos pains, viennoiseries et gâteaux faits maison. 
              Des produits locaux à la livraison express, pour un goût authentique.
            </p>
          </div>
        </div>
        
        {/* Fleuristes Popup */}
        {activePopup === 'fleuristes' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-blue-800">Fleuristes</h2>
                    <button 
                      onClick={() => handlePopupClose('fleuristes')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l6 6" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-700">
                    Découvrez nos magnifiques compositions florales pour tous les occasions. 
                    Des fleurs fraîches à la livraison rapide, pour embellir votre quotidien.
                  </p>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <a 
                    href="https://example.com/fleuristes" 
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Pharmacies Popup */}
        {activePopup === 'pharmacies' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-green-800">Pharmacies</h2>
                    <button 
                      onClick={() => handlePopupClose('pharmacies')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l6 6" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-700">
                    Accédez à une sélection de produits pharmaceutiques de qualité. 
                    Des médicaments essentiels à des soins de première ligne, disponibles en quelques clics.
                  </p>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <a 
                    href="https://example.com/pharmacies" 
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Boulangeries Popup */}
        {activePopup === 'boulangeries' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-yellow-800">Boulangeries</h2>
                    <button 
                      onClick={() => handlePopupClose('boulangeries')}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l6 6" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-700">
                    Découvrez nos pains, viennoiseries et gâteaux faits maison. 
                    Des produits locaux à la livraison express, pour un goût authentique.
                  </p>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <a 
                    href="https://example.com/boulangeries" 
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                  >
                    En savoir plus
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
