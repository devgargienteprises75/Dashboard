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
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />
      <div className='relative h-auto bg-gray-50 flex flex-col gap-3 w-full max-w-2xl transform shadow-2xl p-6 rounded-lg' onClick={(e) => e.stopPropagation()}>
        <button className='absolute right-4 top-4 cursor-pointer text-gray-600 hover:text-gray-800' onClick={onClose} aria-label='Close'>
          <X />
        </button>
        <h2 className='text-xl font-bold mb-2'>Details for: {reason}</h2>
        {(!details || details.length === 0) ? (
          <div className='text-sm text-gray-500'>No details available</div>
        ) : (
          <ul className='space-y-2 max-h-96 overflow-auto'>
            {details.map((d, i) => (
              <li key={i} className='p-3 bg-white rounded shadow-sm'>
                {typeof d === 'string' ? d : JSON.stringify(d)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ReasonModal
