import React from 'react'

const SalesReturnSummaryCards = ({ totalReturns, totalReturnQty, totalReturnValue }) => {
  return (
    <div className="crds grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-4">
      <div className='h-28 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
        <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Returns</span>
        <span className='text-3xl font-extrabold text-gray-900'>{totalReturns}</span>
      </div>
      <div className='h-28 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
        <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Quantity</span>
        <span className='text-3xl font-extrabold text-gray-900'>{totalReturnQty}</span>
      </div>
      <div className='h-28 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
        <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Value</span>
        <span className='text-3xl font-extrabold text-gray-900'>₹{totalReturnValue.toLocaleString()}</span>
      </div>
    </div>
  )
}

export default SalesReturnSummaryCards;

