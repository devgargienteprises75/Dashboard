import React, { useEffect } from 'react'
import { X } from 'lucide-react';

const Modal = ({ transportRegData, taskId, isOpen = false, onClose = () => {} }) => {

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen || !taskId) return null;
    
    const pending_details = transportRegData && transportRegData[0]?.pending_details
    const allPendingItems = []

    Object.entries(pending_details || {}).forEach(([category, items]) => {
        if (!Array.isArray(items) || items.length === 0) return
        items.forEach((item, idx) => {
            allPendingItems.push({
                id: `${category}:- ${idx+1}`,
                category: category.replace('_', ' ').toUpperCase(),
                description: item,
                raw: item
            })
        })
    })

    const currentTask = allPendingItems.find(task => task.id === taskId)
    
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />

      <div 
        className="relative h-auto bg-gray-50 flex flex-col gap-3 w-full max-w-2xl transform shadow-2xl p-6 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-gray-800'
          onClick={onClose}
          aria-label='Close'
        >
          <X />
        </button>

        {!currentTask ? (
          <div>
            <h3 className='text-lg font-semibold'>No task selected</h3>
          </div>
        ) : (
          <div>
            <h1 className='text-center text-xl font-bold mb-4'>{currentTask.category}</h1>
            <h2 className='text-lg'><b>Party Name - </b>{currentTask.description?.party_name ?? '-'}</h2>
            <h2 className='text-lg'><b>Amount - </b>{currentTask.description?.amount ?? '-'}</h2>
            <h2 className='text-lg'><b>Bill Date - </b>{currentTask.description?.bill_date ?? '-'}</h2>
            <h2 className='text-lg'><b>Reason - </b>{currentTask.description?.reason ?? '-'}</h2>
            <h2 className='text-lg'><b>Pending from - </b>{currentTask.description?.hours_pending ? Math.floor(currentTask.description.hours_pending / 24) + ' days' : '-'}</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal;