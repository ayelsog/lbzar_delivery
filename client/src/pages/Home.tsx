import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Lbzar Express</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Experience the power of modern web development with our full-stack solution. 
        Built with React, Node.js, and MongoDB for a seamless user experience.
      </p>
      <div className="flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-indigo-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-xl font-semibold text-gray-800">Modern Architecture</h2>
          </div>
          <p className="text-gray-600">
            Our application follows best practices for scalability, maintainability, and performance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
