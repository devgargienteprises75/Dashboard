import React, { useContext } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TransportRegData } from '../../Context/APIData'

const findCandidateKey = (obj, keywords=[]) => {
  if (!obj) return null
  const keys = Object.keys(obj)
  return keys.find(k => keywords.some(kw => k.toLowerCase().includes(kw)))
}

const FloorChart = ({ cerData = [] }) => {
  const { timePeriod } = useContext(TransportRegData)
  const getFirstData = (arr) => { if (!arr) return null; if (!Array.isArray(arr)) return arr; for (const item of arr) if (item && typeof item === 'object' && Object.keys(item).length > 0) return item; return null }
  const dataObj = getFirstData(cerData)
  const key = findCandidateKey(dataObj, ['floor'])

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

  const floorSource = key && dataObj ? dataObj[key] : null
  const periodFloors = floorSource && timePeriod && floorSource[timePeriod]

  const chartData = periodFloors && typeof periodFloors === 'object'
    ? Object.entries(periodFloors).map(([name, v]) => ({ name, value: toNumber(v) }))
    : []

  const sorted = chartData.sort((a, b) => b.value - a.value).slice(0, 8)
  const periodLabel = timePeriod ? timePeriod.replace(/_/g, ' ') : 'selected period'

  if (!sorted.length) return (
    <div className='bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-lg border border-amber-100'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>Exits by Floor</h2>
        <span className='px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full'>{periodLabel}</span>
      </div>
      <div className='flex items-center justify-center h-[200px] text-gray-500 text-sm'>
        <div className='text-center'>
          <svg className='w-12 h-12 mx-auto mb-3 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
          </svg>
          <p className='font-medium'>No exits for {periodLabel}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className='bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-shadow duration-300'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>Exits by Floor</h2>
        <span className='px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full uppercase tracking-wide'>{periodLabel}</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="colorFloorBar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#FFB366" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
          <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} stroke="#D1D5DB" />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={140} 
            tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} 
            stroke="#D1D5DB"
          />
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
            cursor={{ fill: 'rgba(255, 159, 67, 0.08)' }}
          />
          <Bar 
            dataKey="value" 
            fill="url(#colorFloorBar)" 
            radius={[0, 8, 8, 0]} 
            barSize={28}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FloorChart
