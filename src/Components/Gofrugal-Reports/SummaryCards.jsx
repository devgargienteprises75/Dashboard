import React from 'react'

const SummaryCards = ({
  totalBills,
  counterSaleCount,
  counterSaleAmount,
  discountedBillsCount,
  totalDiscount,
  blankBillNoCount,
}) => {
  return (
    <div className="crds grid grid-cols-4 gap-4 mb-6">
      <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
        <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Bills</span>
        <span className='text-3xl font-extrabold text-gray-900'>{totalBills}</span>
      </div>
      <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
        <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Counter Sale Bills</span>
        <span className='text-3xl font-extrabold text-gray-900'>{counterSaleCount}</span>
        <span className='text-xs text-gray-600'>Amount: ₹{counterSaleAmount.toLocaleString()}</span>
      </div>
      <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
        <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Discounted Bills</span>
        <span className='text-3xl font-extrabold text-gray-900'>{discountedBillsCount}</span>
        <span className='text-xs text-gray-600'>Total Discount: ₹{totalDiscount.toLocaleString()}</span>
      </div>
      <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
        <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Bills without Bill No.</span>
        <span className='text-3xl font-extrabold text-gray-900'>{blankBillNoCount}</span>
      </div>
    </div>
  )
}

export default SummaryCards

