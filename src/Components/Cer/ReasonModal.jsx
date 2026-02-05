import React, { useEffect } from 'react'
import { X } from 'lucide-react'

const ReasonModal = ({ isOpen = false, onClose = () => {}, reason = '', details = [] }) => {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />
      <div className='relative h-auto bg-gradient-to-br from-white to-purple-50 flex flex-col gap-4 w-full max-w-3xl transform shadow-2xl p-8 rounded-2xl border border-purple-200' onClick={(e) => e.stopPropagation()}>
        <button className='absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg' onClick={onClose} aria-label='Close'>
          <X size={24} />
        </button>
        
        <div className='flex items-center gap-3 mb-4 pb-4 border-b-2 border-purple-200'>
          <div className='p-3 bg-purple-100 rounded-xl'>
            <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </div>
          <div>
            <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>Exit Reason Details</h2>
            <p className='text-sm text-gray-600 font-medium mt-1'>{reason}</p>
          </div>
        </div>
        
        {(!details || details.length === 0) ? (
          <div className='flex items-center justify-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100'>
            <div className='text-center'>
              <svg className='w-12 h-12 mx-auto mb-3 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
              </svg>
              <p className='text-sm font-medium'>No details available</p>
            </div>
          </div>
        ) : (
          <ul className='space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-50'>
            {details.map((d, i) => (
              <li key={i} className='p-4 bg-white rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200'>
                <div className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-xs font-bold text-purple-600'>{i + 1}</span>
                  </div>
                  <p className='text-md text-black leading-relaxed flex-1'>{typeof d === 'string' ? d : JSON.stringify(d)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ReasonModal
