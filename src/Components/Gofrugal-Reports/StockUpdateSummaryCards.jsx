import React from 'react'
import { Package, Users, TrendingUp } from 'lucide-react'

const cardClass =
  'rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-200 to-white p-4 shadow-md sm:p-6'

const titleClass = 'text-sm font-semibold uppercase tracking-wide text-orange-700'
const valueClass = 'mt-2 text-4xl font-extrabold text-gray-900'
const subClass = 'mt-2 text-sm text-gray-700'

const StockUpdateSummaryCards = ({ totalUpdates, userCount }) => {
  return (
    <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Total Updates</h3>
          <div className='rounded-xl bg-orange-100 p-3'>
            <Package className='h-6 w-6 text-orange-600' />
          </div>
        </div>
        <p className={valueClass}>{totalUpdates}</p>
        <p className={subClass}>Stock modifications</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Active Users</h3>
          <div className='rounded-xl bg-orange-100 p-3'>
            <Users className='h-6 w-6 text-orange-600' />
          </div>
        </div>
        <p className={valueClass}>{userCount}</p>
        <p className={subClass}>Users updating stock</p>
      </div>

      <div className={cardClass}>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className={titleClass}>Avg per User</h3>
          <div className='rounded-xl bg-orange-100 p-3'>
            <TrendingUp className='h-6 w-6 text-orange-600' />
          </div>
        </div>
        <p className={valueClass}>{userCount > 0 ? Math.round(totalUpdates / userCount) : 0}</p>
        <p className={subClass}>Updates per user</p>
      </div>
    </div>
  )
}

export default StockUpdateSummaryCards
