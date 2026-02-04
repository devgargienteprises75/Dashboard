import React from 'react'

const TopCards = ({ summary = {} }) => {
  const { totalExits = '—', topReason = '—', topSalesman = '—', topFloor = '—' } = summary

  return (
    <div className="crds flex items-center justify-between mb-4">
      <div className='h-32 w-[25vw] flex items-center justify-center gap-4 bg-white p-4 rounded-lg'>
        <h1 className='text-5xl font-semibold uppercase'>Total Exits - </h1>
        <h2 className='text-5xl font-bold '>{totalExits}</h2>
      </div>
    </div>
  )
}

export default TopCards
