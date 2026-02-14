import React from 'react'
import { Edit3, Users, TrendingUp } from 'lucide-react'

const cardClass =
  'rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-6'

const titleClass = 'text-sm font-semibold uppercase tracking-wide text-orange-700'
const valueClass = 'mt-2 text-4xl font-extrabold text-gray-900'
const subClass = 'mt-2 text-sm text-gray-700'

const ChangePriceSummaryCards = ({ totalChanges, priceChangeByUser }) => {
  const userCount = Object.keys(priceChangeByUser).length
  const avgPerUser = userCount > 0 ? Math.round(totalChanges / userCount) : 0

  return (
    <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Total Changes</h3>
          <div className='rounded-xl bg-orange-100 p-3'>
            <Edit3 className='h-6 w-6 text-orange-600' />
          </div>
        </div>
        <p className={valueClass}>{totalChanges}</p>
        <p className={subClass}>Price modifications</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Active Users</h3>
          <div className='rounded-xl bg-orange-100 p-3'>
            <Users className='h-6 w-6 text-orange-600' />
          </div>
        </div>
        <p className={valueClass}>{userCount}</p>
        <p className={subClass}>Users making changes</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Avg per User</h3>
          <div className='rounded-xl bg-orange-100 p-3'>
            <TrendingUp className='h-6 w-6 text-orange-600' />
          </div>
        </div>
        <p className={valueClass}>{avgPerUser}</p>
        <p className={subClass}>Changes per user</p>
      </div>
    </div>
  )
}

export default ChangePriceSummaryCards
