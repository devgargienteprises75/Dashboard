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
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      <div 
        className="relative h-auto bg-gradient-to-br from-white to-gray-50 flex flex-col gap-4 w-full max-w-2xl transform shadow-2xl p-8 rounded-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg'
          onClick={onClose}
          aria-label='Close'
        >
          <X size={24} />
        </button>

        {!currentTask ? (
          <div className='text-center py-8'>
            <h3 className='text-lg font-semibold text-gray-600'>No task selected</h3>
          </div>
        ) : (
          <div>
            <div className='flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200'>
              <div className='p-3 bg-yellow-100 rounded-xl'>
                <svg className='w-6 h-6 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
              <h1 className='text-2xl font-extrabold text-gray-900 tracking-tight'>{currentTask.category}</h1>
            </div>
            <div className='space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
              <div className='flex items-start gap-4 pb-3 border-b border-gray-100'>
                <span className='text-sm font-bold text-gray-500 w-32'>Party Name</span>
                <span className='text-base font-semibold text-gray-900 flex-1'>{currentTask.description?.party_name ?? '-'}</span>
              </div>
              <div className='flex items-start gap-4 pb-3 border-b border-gray-100'>
                <span className='text-sm font-bold text-gray-500 w-32'>Amount</span>
                <span className='text-base font-semibold text-green-600 flex-1'>{currentTask.description?.amount ? `₹${currentTask.description.amount}` : '-'}</span>
              </div>
              <div className='flex items-start gap-4 pb-3 border-b border-gray-100'>
                <span className='text-sm font-bold text-gray-500 w-32'>Bill Date</span>
                <span className='text-base font-semibold text-gray-900 flex-1'>{currentTask.description?.bill_date ?? '-'}</span>
              </div>
              <div className='flex items-start gap-4 pb-3 border-b border-gray-100'>
                <span className='text-sm font-bold text-gray-500 w-32'>Reason</span>
                <span className='text-base font-semibold text-gray-900 flex-1'>{currentTask.description?.reason ?? '-'}</span>
              </div>
              <div className='flex items-start gap-4'>
                <span className='text-sm font-bold text-gray-500 w-32'>Pending from</span>
                <span className='text-base font-semibold text-red-600 flex-1'>
                  {(() => {
                    // Calculate from bill_date if available
                    if (currentTask.description?.bill_date) {
                      try {
                        const billDate = new Date(currentTask.description.bill_date);
                        const today = new Date();
                        const diffTime = Math.abs(today - billDate);
                        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                        return `${diffDays} days`;
                      } catch (e) {
                        console.error('Error parsing date:', e);
                      }
                    }
                    // Fallback to hours_pending with smart detection
                    if (currentTask.description?.hours_pending) {
                      const value = currentTask.description.hours_pending;
                      // If value is less than 720 hours (30 days), assume it's already in days
                      if (value < 720) {
                        return `${Math.floor(value)} days`;
                      }
                      // Otherwise, assume it's in hours
                      return `${Math.floor(value / 24)} days`;
                    }
                    return '-';
                  })()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal;