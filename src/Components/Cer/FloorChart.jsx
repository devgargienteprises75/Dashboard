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

  const chartData = key && dataObj && dataObj[key] ?
    Object.entries(dataObj[key]).map(([name, v]) => ({ name, value: toNumber(v) }))
    : []

  const sorted = chartData.sort((a, b) => b.value - a.value).slice(0, 8)

  if (!sorted.length) return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Exits by Floor</h2>
      <div className='text-sm text-gray-500'>No data available</div>
    </div>
  )

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Exits by Floor</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={140} />
          <Tooltip />
          <Bar dataKey="value" fill="#FF9F43" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default FloorChart
