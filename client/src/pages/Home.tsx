import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Bienvenue chez Lbzar Express</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Expérimentez la puissance de la technologie moderne avec notre solution full-stack. 
        Construite avec React, Node.js et MongoDB pour une expérience utilisateur fluide.
      </p>
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-green-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-xl font-semibold text-gray-800">Architecture moderne</h2>
          </div>
          <p className="text-gray-600">
            Notre application suit les meilleures pratiques pour la scalabilité, la maintenabilité et les performances.
          </p>
        </div>
      </div>
      
      {/* WhatsApp Button - Middle Section */}
      <div className="mt-12">
        <a 
          href="https://wa.me/1234567890" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Contacter par WhatsApp
        </a>
      </div>
    </div>
  )
}

export default Home
