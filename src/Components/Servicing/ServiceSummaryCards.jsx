import React from 'react'
import { FileText, CheckCircle, Clock, Shield, IndianRupee } from 'lucide-react'

const cardClass =
  'rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5 lg:p-6'
const titleClass = 'text-sm font-semibold uppercase tracking-wide text-orange-700'
const valueClass = 'break-words text-3xl font-extrabold text-gray-900 sm:text-4xl'
const subClass = 'mt-2 text-sm text-gray-700'

const ServiceSummaryCards = ({ totalReceipts, resolved, pending, warranty, totalAmount }) => {
  return (
    <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Total Receipts</h3>
          <div className='rounded-xl bg-orange-100 p-2.5 sm:p-3'>
            <FileText className='h-5 w-5 text-orange-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className={valueClass}>{totalReceipts}</p>
        <p className={subClass}>Service requests</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Resolved</h3>
          <div className='rounded-xl bg-orange-100 p-2.5 sm:p-3'>
            <CheckCircle className='h-5 w-5 text-orange-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className={valueClass}>{resolved}</p>
        <p className={subClass}>Completed repairs</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Pending</h3>
          <div className='rounded-xl bg-orange-100 p-2.5 sm:p-3'>
            <Clock className='h-5 w-5 text-orange-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className={valueClass}>{pending}</p>
        <p className={subClass}>Awaiting repair</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Warranty</h3>
          <div className='rounded-xl bg-orange-100 p-2.5 sm:p-3'>
            <Shield className='h-5 w-5 text-orange-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className={valueClass}>{warranty.yes}</p>
        <p className={subClass}>Under warranty · {warranty.no} out</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Total Amount</h3>
          <div className='rounded-xl bg-orange-100 p-2.5 sm:p-3'>
            <IndianRupee className='h-5 w-5 text-orange-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className={valueClass}>Rs. {Number(totalAmount || 0).toLocaleString()}</p>
        <p className={subClass}>Service charges</p>
      </div>
    </div>
  )
}

export default ServiceSummaryCards
