import React, { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import Modal from './Modal'

const PendingTasks = ({ data, className }) => {

  const [taskId, setTaskId] = useState('')
  
  if (!data || !data[0]?.pending_details) {
    return (
      <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 ${className}`}>
        <h2 className='text-lg font-bold text-gray-900 mb-6'>Pending Tasks</h2>
        <p className='text-gray-500 text-center py-8'>No pending tasks</p>
      </div>
    )
  }

  const pending_details = data[0].pending_details
  const allPendingItems = []

  // Flatten all pending items
  Object.entries(pending_details).map(([ category, items]) => {
    return Array.isArray(items) && items.length > 0 &&
      items.map((item, idx) => {
        allPendingItems.push({
          id: `${category}:- ${idx+1}`,
          category: category.replace('_', ' ').toUpperCase(),
          description: typeof item === 'string'
            ? item
            : JSON.stringify(item)
        })
      })
  })

  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 ${className }`}>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <AlertCircle size={20} className='text-yellow-500' />
          <h2 className='text-lg font-bold text-gray-900'>Pending Tasks ({allPendingItems.length})</h2>
        </div>
      </div>
      
      {allPendingItems.length === 0 ? (
        <p className='text-gray-500 text-center py-8'>No pending tasks</p>
      ) : (
        <div className='pending-detail space-y-3 max-h-[70vh] overflow-y-auto'>
          {allPendingItems.map((item) => (
            <div 
            key={item.id} 
            onClick={() => console.log(item.id)}
            className='flex items-start gap-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200 w-full'
            >
            <Modal data={data} />

              <div className='w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0'></div>
              <div className='flex-1'>
                <p className='text-sm font-semibold text-gray-900'>{item.category}</p>
                <p className='text-xs text-gray-600 mt-1'>{item.description}</p>
              </div>
              <span className='text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded whitespace-nowrap'>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PendingTasks
