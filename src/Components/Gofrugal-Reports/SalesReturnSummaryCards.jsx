import React from 'react'
import { RotateCcw, Boxes, IndianRupee } from 'lucide-react'

const cardClass =
  'min-h-32 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5'

const SalesReturnSummaryCards = ({ totalReturns, totalReturnQty, totalReturnValue }) => {
  return (
    <div className='crds mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <div className={cardClass}>
        <div className='mb-3 flex items-center justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Returns</span>
          <div className='rounded-xl bg-orange-100 p-2.5'>
            <RotateCcw className='h-5 w-5 text-orange-600' />
          </div>
        </div>
        <span className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>{totalReturns}</span>
      </div>

      <div className={cardClass}>
        <div className='mb-3 flex items-center justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Quantity</span>
          <div className='rounded-xl bg-orange-100 p-2.5'>
            <Boxes className='h-5 w-5 text-orange-600' />
          </div>
        </div>
        <span className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>{totalReturnQty}</span>
      </div>

      <div className={cardClass}>
        <div className='mb-3 flex items-center justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Value</span>
          <div className='rounded-xl bg-orange-100 p-2.5'>
            <IndianRupee className='h-5 w-5 text-orange-600' />
          </div>
        </div>
        <span className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>Rs. {totalReturnValue.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default SalesReturnSummaryCards
