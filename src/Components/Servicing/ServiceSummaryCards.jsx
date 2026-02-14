import React from 'react'
import { FileText, CheckCircle, Clock, Shield, IndianRupee } from 'lucide-react'

const ServiceSummaryCards = ({ totalReceipts, resolved, pending, warranty, totalAmount }) => {
  return (
    <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      <div className='rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 shadow-lg sm:p-5 lg:p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-sm font-semibold uppercase text-gray-600'>Total Receipts</h3>
          <div className='rounded-lg bg-blue-100 p-2.5 sm:p-3'>
            <FileText className='h-5 w-5 text-blue-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className='break-words text-3xl font-bold text-blue-600 sm:text-4xl'>{totalReceipts}</p>
        <p className='mt-2 text-sm text-gray-500'>Service requests</p>
      </div>

      <div className='rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-4 shadow-lg sm:p-5 lg:p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-sm font-semibold uppercase text-gray-600'>Resolved</h3>
          <div className='rounded-lg bg-green-100 p-2.5 sm:p-3'>
            <CheckCircle className='h-5 w-5 text-green-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className='break-words text-3xl font-bold text-green-600 sm:text-4xl'>{resolved}</p>
        <p className='mt-2 text-sm text-gray-500'>Completed repairs</p>
      </div>

      <div className='rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 shadow-lg sm:p-5 lg:p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-sm font-semibold uppercase text-gray-600'>Pending</h3>
          <div className='rounded-lg bg-orange-100 p-2.5 sm:p-3'>
            <Clock className='h-5 w-5 text-orange-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className='break-words text-3xl font-bold text-orange-600 sm:text-4xl'>{pending}</p>
        <p className='mt-2 text-sm text-gray-500'>Awaiting repair</p>
      </div>

      <div className='rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-4 shadow-lg sm:p-5 lg:p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-sm font-semibold uppercase text-gray-600'>Warranty</h3>
          <div className='rounded-lg bg-purple-100 p-2.5 sm:p-3'>
            <Shield className='h-5 w-5 text-purple-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className='break-words text-3xl font-bold text-purple-600 sm:text-4xl'>{warranty.yes}</p>
        <p className='mt-2 text-sm text-gray-500'>Under warranty · {warranty.no} out</p>
      </div>

      <div className='rounded-xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-4 shadow-lg sm:p-5 lg:p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='text-sm font-semibold uppercase text-gray-600'>Total Amount</h3>
          <div className='rounded-lg bg-cyan-100 p-2.5 sm:p-3'>
            <IndianRupee className='h-5 w-5 text-cyan-600 sm:h-6 sm:w-6' />
          </div>
        </div>
        <p className='break-words text-3xl font-bold text-cyan-600 sm:text-4xl'>₹{totalAmount}</p>
        <p className='mt-2 text-sm text-gray-500'>Service charges</p>
      </div>
    </div>
  )
}

export default ServiceSummaryCards
