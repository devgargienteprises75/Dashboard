import React from 'react'

const Loading = () => {
  return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
        <p className="text-xl text-gray-700">Loading Dashboard...</p>
        </div>
    </div>
  )
}

export default Loading