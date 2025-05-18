import React from 'react'

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Lbzar Express</h1>
        <p className="text-gray-600 mb-6">
          Lbzar Express is a modern web application built with React, Node.js, and MongoDB. 
          It provides a robust solution for managing your business operations with a clean 
          user interface and powerful backend capabilities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">Responsive Design</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">Real-time Data</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">Secure Authentication</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">React.js</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">Node.js</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-600">MongoDB</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
