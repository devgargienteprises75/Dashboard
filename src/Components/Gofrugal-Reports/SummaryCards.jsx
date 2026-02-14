import React from 'react'

const SummaryCards = ({
  totalBills,
  counterSaleCount,
  counterSaleAmount,
  discountedBillsCount,
  totalDiscount,
  blankBillNoCount
}) => {
  return (
    <div className='crds mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <div className='min-h-32 w-full rounded-2xl bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5'>
        <div className='flex h-full flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Bills</span>
          <span className='break-words text-3xl font-extrabold text-gray-900 sm:text-4xl'>{totalBills}</span>
        </div>
      </div>

      <div className='min-h-32 rounded-2xl bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5'>
        <div className='flex h-full flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Counter Sale Bills</span>
          <span className='break-words text-3xl font-extrabold text-gray-900 sm:text-4xl'>{counterSaleCount}</span>
          <span className='text-xs text-gray-600 sm:text-sm'>Amount: ₹{counterSaleAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className='min-h-32 rounded-2xl bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5'>
        <div className='flex h-full flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Discounted Bills</span>
          <span className='break-words text-3xl font-extrabold text-gray-900 sm:text-4xl'>{discountedBillsCount}</span>
          <span className='text-xs text-gray-600 sm:text-sm'>Total Discount: ₹{totalDiscount.toLocaleString()}</span>
        </div>
      </div>

      <div className='min-h-32 rounded-2xl bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5'>
        <div className='flex h-full flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Bills without Bill No.</span>
          <span className='break-words text-3xl font-extrabold text-gray-900 sm:text-4xl'>{blankBillNoCount}</span>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards
