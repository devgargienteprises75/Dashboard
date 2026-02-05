import React from 'react'

const TopCards = ({ summary = {} }) => {
  const { totalExits = '—', topReason = '—', topSalesman = '—', topFloor = '—' } = summary

  return (
    <div className="crds flex items-center justify-between mb-6">
      <div className='h-40 w-[30vw] flex flex-col justify-center gap-3 bg-gradient-to-br from-orange-200 to-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]'>
        <div className='flex items-center gap-2 mb-1'>
          <svg className='w-8 h-8 text-white/90' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
          </svg>
          <h1 className='text-2xl font-bold text-white uppercase tracking-wider'>Total Exits</h1>
        </div>
        <h2 className='text-6xl font-extrabold text-white tracking-tight drop-shadow-lg'>{totalExits}</h2>
      </div>
    </div>
  )
}

export default TopCards
