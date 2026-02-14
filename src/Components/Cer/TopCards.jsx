import React from 'react'
import { Users } from 'lucide-react'

const TopCards = ({ summary = {} }) => {
  const { totalExits = '—' } = summary

  return (
    <div className='crds mb-6'>
      <div className='min-h-32 w-full rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-6 lg:p-7'>
        <div className='mb-4 flex items-center justify-between'>
          <h1 className='text-sm font-semibold uppercase tracking-wide text-orange-700 sm:text-base'>Total Exits</h1>
          <div className='rounded-xl bg-orange-100 p-3'>
            <Users className='h-6 w-6 text-orange-600' />
          </div>
        </div>
        <h2 className='text-4xl font-extrabold text-gray-900 sm:text-5xl'>{totalExits}</h2>
        <p className='mt-2 text-sm text-gray-700'>Customers exited in selected period</p>
      </div>
    </div>
  )
}

export default TopCards
