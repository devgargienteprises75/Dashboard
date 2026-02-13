import React from 'react'

const Card = ({ title, value }) => {
  return (
    <div className='min-h-28 w-full flex flex-col items-center justify-center bg-white p-4 rounded-lg'>
      <h1 className='text-lg sm:text-xl md:text-2xl font-semibold text-center uppercase mb-2 sm:mb-3'>{title}</h1>
      <h2 className='text-3xl sm:text-4xl font-bold '>{value ?? '-'}</h2>
    </div>
  )
}

export default Card
