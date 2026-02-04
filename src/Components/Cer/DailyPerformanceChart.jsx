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

  return (
    <div className={`bg-white rounded-lg p-6 ${className} shadow-sm border border-gray-100`}>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Daily Performance</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" fontSize={14} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Value" fill="#FF6B35" width="20px" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyPerformanceChart
