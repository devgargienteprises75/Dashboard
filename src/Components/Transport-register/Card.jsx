import React from 'react'

const Card = ({ title, value }) => {
  return (
    <div className='min-h-32 w-full rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-5'>
      <div className='flex h-full flex-col justify-between gap-2'>
        <h1 className='text-xs font-semibold uppercase tracking-wide text-orange-700 sm:text-sm'>{title}</h1>
        <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>{value ?? 0}</h2>
      </div>
    </div>
  )
}

export default Card
