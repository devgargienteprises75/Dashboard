import React from 'react'

const Card = ({ title, value }) => {
  return (
    <div className='h-32 w-[15vw] flex flex-col items-center justify-center bg-white p-4 rounded-lg'>
      <h1 className='text-2xl font-semibold text-center uppercase mb-3'>{title}</h1>
      <h2 className='text-4xl font-bold '>{value ?? '—'}</h2>
    </div>
  )
}

export default Card