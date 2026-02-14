import React, { useContext } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TransportRegData } from '../../Context/APIData';

const DailyPerformanceChart = ({ cerData = [], className = '' }) => {

  const { timePeriod } = useContext(TransportRegData)

  // pick first valid data object and convert to chart format (exclude unwanted fields)
  const getFirstData = (arr) => {
    if (!arr) return null
    if (!Array.isArray(arr)) return arr
    for (const item of arr) if (item && typeof item === 'object' && Object.keys(item).length > 0) return item
    return null
  }
  const dataObj = getFirstData(cerData)

  const toNumber = (v) => {
    if (v == null) return 0
    if (typeof v === 'number') return v
    if (typeof v !== 'object') {
      const n = Number(v)
      return Number.isFinite(n) ? n : 0
    }
    if (timePeriod && Object.prototype.hasOwnProperty.call(v, timePeriod)) return toNumber(v[timePeriod])
    const numbers = Object.values(v).flat(Infinity).filter(x => typeof x === 'number')
    return numbers.length ? numbers.reduce((a, b) => a + b, 0) : 0
  }

  const chartData = dataObj ?
    Object.entries(dataObj)
      .filter(([fieldName]) => !['pending', 'pending_details', 'last_updated'].includes(fieldName))
      .map(([k, v]) => ({
        name: k.charAt(0).toUpperCase() + k.split('_').join(' ').slice(1, 17) + (k.length > 17 ? '...' : ''),
        Value: toNumber(v)
      })) : []

  const periodLabel = timePeriod ? timePeriod.replace(/_/g, ' ') : 'selected period'

  if (!chartData.length) return (
    <div className={`max-h-96 bg-gradient-to-br from-white to-orange-50 rounded-xl p-4 sm:p-6 lg:p-8 ${className} shadow-lg border border-orange-100`}>
      <div className='flex items-start sm:items-center justify-between gap-3 mb-6'>
        <h2 className='text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight'>Daily Performance</h2>
        <span className='px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full uppercase tracking-wide'>{periodLabel}</span>
      </div>
      <div className='flex items-center justify-center h-[200px] text-gray-500 text-sm'>
        <div className='text-center'>
          <svg className='w-16 h-16 mx-auto mb-4 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
          </svg>
          <p className='font-medium'>No data available</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`max-h-96 bg-gradient-to-br from-white to-orange-50 rounded-xl p-4 sm:p-6 lg:p-8 ${className} shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300`}>
      <div className='flex items-start sm:items-center justify-between gap-3 mb-6'>
        <h2 className='text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight'>Daily Performance</h2>
        <span className='px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full uppercase tracking-wide'>{periodLabel}</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="colorDailyBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#FF8C5A" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis 
            dataKey="name" 
            fontSize={14} 
            tick={{ fill: '#374151', fontWeight: 600 }} 
            stroke="#D1D5DB"
            angle={0}
            textAnchor="middle"
            height={80}
            dy={10}
          />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} stroke="#D1D5DB" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none', 
              borderRadius: '8px', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600
            }}
            cursor={{ fill: 'rgba(255, 107, 53, 0.08)' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType='circle'
          />
          <Bar 
            dataKey="Value" 
            fill="url(#colorDailyBar)" 
            radius={[8, 8, 0, 0]} 
            barSize={45}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyPerformanceChart
