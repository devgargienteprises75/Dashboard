import React from 'react'

const Error = ({ error }) => {

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className='text-2xl font-bold text-red-600 mb-4'>Error</h2>
            <p>{error?.message || error}</p>
            <p>Make sure N8N server is on.</p>
        </div>
    </div>
  )
}

export default Error