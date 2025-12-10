import React from 'react'

function Footer() {
  return (
     <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-gray-700">
            <strong>Medical Disclaimer:</strong> This tool provides risk assessment only and is not a medical diagnosis. 
            Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
  )
}

export default Footer