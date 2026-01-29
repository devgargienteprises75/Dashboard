import React from 'react'
import { TrendingUp } from 'lucide-react'

const StatsCard = ({ title, value, icon: Icon, metricKey, data }) => {
  // Extract the value from the data structure
  let displayValue = 0
  let trend = "+0%"
  
  if (metricKey && data && data[metricKey]) {
    displayValue = data[metricKey].today || 0
    const lastWeek = data[metricKey].last_week || 0
    const diff = displayValue - lastWeek
    const percentage = lastWeek > 0 ? ((diff / lastWeek) * 100).toFixed(0) : 0
    trend = `${percentage > 0 ? '+' : ''}${percentage}%`
  } else if (typeof value === 'object') {
    displayValue = value?.today || 0
  } else {
    displayValue = value || 0
  }
  
  const trendColor = parseInt(trend) >= 0 ? 'text-green-500' : 'text-red-500'
  
  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex-1'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <p className='text-gray-600 text-sm font-medium'>{title}</p>
          <h3 className='text-3xl font-bold text-gray-900 mt-2'>{displayValue}</h3>
        </div>
        {Icon && <div className='text-orange-500 bg-orange-50 p-3 rounded-lg'><Icon size={24} /></div>}
      </div>
      <div className='flex items-center gap-2 text-sm'>
        <TrendingUp size={16} className={trendColor} />
        <span className={`${trendColor} font-medium`}>{trend}</span>
        <span className='text-gray-500'>than last week</span>
      </div>
    </div>
  )
}

export default StatsCard
