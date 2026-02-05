import React, { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import Modal from './Modal'

const PendingTasks = ({ transportRegData, className }) => {

  const [taskId, setTaskId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  if (!transportRegData || !transportRegData[0]?.pending_details) {
    return (
      <div className={`bg-gradient-to-br from-white to-yellow-50 rounded-xl p-8 shadow-lg border border-yellow-800 ${className}`}>
        <div className='flex items-center gap-3 mb-6'>
          <svg className='w-7 h-7 text-yellow-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>Pending Tasks</h2>
        </div>
        <div className='flex items-center justify-center h-[550px] text-gray-500 text-sm'>
          <div className='text-center'>
            <svg className='w-16 h-16 mx-auto mb-4 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <p className='font-medium'>No pending tasks</p>
          </div>
        </div>
      </div>
    )
  }

  const pending_details = transportRegData[0].pending_details
  const allPendingItems = Object.entries(pending_details || {}).flatMap(([category, items]) => {
    if (category === 'po_creation' || !Array.isArray(items) || items.length === 0) return []
    return items.map((item, idx) => ({
      id: `${category}:- ${idx+1}`,
      category: category.replace('_', ' ').toUpperCase(),
      description: item,
      raw: item,
      status: item?.status ?? 'Pending'
    }))
  })

  return (
    <div className={`bg-gradient-to-br from-white to-yellow-50 rounded-xl p-8 shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-yellow-100 rounded-lg'>
            <AlertCircle size={24} className='text-yellow-600' />
          </div>
          <div>
            <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>Pending Tasks</h2>
            <p className='text-sm text-gray-600 font-medium'>{allPendingItems.length} items require attention</p>
          </div>
        </div>
      </div>
      
      {allPendingItems.length === 0 ? (
        <p className='text-gray-500 text-center py-8'>No pending tasks</p>
      ) : (
        <div className='pending-detail space-y-3 max-h-[68vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-300 scrollbar-track-yellow-50'>
          {allPendingItems.map((item) => (
            <div 
            key={item.id} 
            onClick={() => (setTaskId(item.id), setIsModalOpen(true))}
            className='flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-white rounded-xl border border-yellow-200 hover:border-yellow-300 cursor-pointer w-full hover:shadow-md transition-all duration-200 transform hover:scale-[1.01]'
            >
              <div className='w-3 h-3 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0 shadow-lg'></div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-bold text-gray-900 mb-1'>{item.category}</p>
                <p className='text-xs text-gray-600 line-clamp-2'>{typeof item.description === 'string' ? item.description : item.description?.party_name ?? JSON.stringify(item.description)}</p>
              </div>
              <span className='text-xs font-bold text-yellow-700 bg-yellow-100 px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm'>
                {item.status}
              </span>
            </div>
          ))}
            <Modal transportRegData={transportRegData} taskId={taskId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  )
}

export default PendingTasks
