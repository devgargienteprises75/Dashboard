import React, { useContext } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TransportRegData } from '../../Context/APIData'

const findCandidateKey = (obj, keywords=[]) => {
  if (!obj) return null
  const keys = Object.keys(obj)
  return keys.find(k => keywords.some(kw => k.toLowerCase().includes(kw)))
}

const SalesmanChart = ({ cerData = [], className = '' }) => {
  const { timePeriod } = useContext(TransportRegData)
  const getFirstData = (arr) => { if (!arr) return null; if (!Array.isArray(arr)) return arr; for (const item of arr) if (item && typeof item === 'object' && Object.keys(item).length > 0) return item; return null }
  const dataObj = getFirstData(cerData)
  const key = findCandidateKey(dataObj, ['salesman', 'sales', 'by_sales'])

  const salesSource = key && dataObj ? dataObj[key] : null
  const periodSalesmen = salesSource && timePeriod && salesSource[timePeriod]

  const getValue = (item) => {
    if (!item || typeof item !== 'object') return 0
    const raw = item.count ?? item.value ?? item.total ?? item.exits ?? item.customers
    return typeof raw === 'number' ? raw : Number(raw) || 0
  }

  const chartData = Array.isArray(periodSalesmen)
    ? periodSalesmen.map(item => ({
        name: item.name ?? item.salesman ?? item.sales_person ?? 'Unknown',
        value: getValue(item)
      }))
    : []

  const sorted = chartData.sort((a, b) => b.value - a.value).slice(0, 8)

  const periodLabel = timePeriod ? timePeriod.replace(/_/g, ' ') : 'selected period'

  if (!sorted.length) return (
    <div className={`bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-blue-100 ${className}`}>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>Exits by Salesman</h2>
        <span className='px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full'>{periodLabel}</span>
      </div>
      <div className='flex items-center justify-center min-h-56 sm:min-h-72 lg:min-h-[550px] text-gray-500 text-sm'>
        <div className='text-center'>
          <svg className='w-16 h-16 mx-auto mb-4 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
          </svg>
          <p className='font-medium'>No exits for {periodLabel}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-extrabold text-gray-900 tracking-tight'>Exits by Salesman</h2>
        <span className='px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide'>{periodLabel}</span>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ left: 20, right: 30, top: 10, bottom: 10 }}
          barCategoryGap="28%"
        >
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="#4366FF" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#6B8AFF" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
          <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} stroke="#D1D5DB" />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={180} 
            tick={{ fill: '#374151', fontSize: 13, fontWeight: 600 }} 
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
            cursor={{ fill: 'rgba(67, 102, 255, 0.08)' }}
          />
          <Bar 
            dataKey="value" 
            fill="url(#colorBar)" 
            radius={[0, 8, 8, 0]} 
            barSize={32}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesmanChart
