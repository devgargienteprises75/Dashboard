import React from 'react'
import { FileText, HandCoins, BadgePercent, FileQuestion } from 'lucide-react'

const cardClass =
  'min-h-32 rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5'
const titleClass = 'text-xs font-semibold uppercase tracking-wide text-orange-700'
const valueClass = 'break-words text-3xl font-extrabold text-gray-900 sm:text-4xl'
const subClass = 'text-xs text-gray-700 sm:text-sm'

const SummaryCards = ({
  totalBills,
  counterSaleCount,
  counterSaleAmount,
  discountedBillsCount,
  totalDiscount,
}) => {
  return (
    <div className='crds mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <div className={cardClass}>
        <div className='mb-3 flex items-center justify-between'>
          <span className={titleClass}>Total Bills</span>
          <div className='rounded-xl bg-orange-100 p-2.5'>
            <FileText className='h-5 w-5 text-orange-600' />
          </div>
        </div>
        <div className='flex h-full flex-col gap-2'>
          <span className={valueClass}>{totalBills}</span>
          <span className={subClass}>All generated bills</span>
        </div>
      </div>

      <div className={cardClass}>
        <div className='mb-3 flex items-center justify-between'>
          <span className={titleClass}>Counter Sale Bills</span>
          <div className='rounded-xl bg-orange-100 p-2.5'>
            <HandCoins className='h-5 w-5 text-orange-600' />
          </div>
        </div>
        <div className='flex h-full flex-col gap-2'>
          <span className={valueClass}>{counterSaleCount}</span>
          <span className={subClass}>Amount: Rs. {counterSaleAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className={cardClass}>
        <div className='mb-3 flex items-center justify-between'>
          <span className={titleClass}>Discounted Bills</span>
          <div className='rounded-xl bg-orange-100 p-2.5'>
            <BadgePercent className='h-5 w-5 text-orange-600' />
          </div>
        </div>
        <div className='flex h-full flex-col gap-2'>
          <span className={valueClass}>{discountedBillsCount}</span>
          <span className={subClass}>Total Discount: Rs. {totalDiscount.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

export default SummaryCards
