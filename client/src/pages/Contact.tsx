import React from 'react'

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions or need assistance? Our team is here to help!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              We'd love to hear from you! Whether you have questions, feedback, or need support, 
              our team is here to help. Please fill out the form below and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Office</h2>
            <p className="text-gray-600 mb-4">
              Lbzar Express is based in San Francisco, California. We're a small team of passionate developers 
              dedicated to creating amazing web applications.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Address</h3>
                <p className="text-gray-600">123 Main Street, San Francisco, CA 94105</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">support@lbzar.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
