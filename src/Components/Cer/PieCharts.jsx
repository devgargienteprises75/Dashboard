import React, { useContext } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { TransportRegData } from '../../Context/APIData'

const COLORS = ['#FF9F43', '#4366FF', '#00D084', '#845ef7', '#FF6B9D']

const OverviewChart = ({ cerData }) => {
  const { timePeriod } = useContext(TransportRegData)

  const getFirstData = (arr) => { if (!arr) return null; if (!Array.isArray(arr)) return arr; for (const item of arr) if (item && typeof item === 'object' && Object.keys(item).length > 0) return item; return null }
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

  const data = dataObj
    ? Object.entries(dataObj)
        .filter(([k]) => !['pending', 'pending_details', 'last_updated'].includes(k))
        .map(([k, v]) => ({ name: k.replace(/_/g, ' '), value: toNumber(v) }))
        .slice(0, 5)
    : []

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Top Metrics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={100} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend align="center" verticalAlign="bottom" wrapperStyle={{ marginTop: 24 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

const ReasonsChart = ({ cerData }) => {
  const { timePeriod } = useContext(TransportRegData)

  const data = cerData && cerData[0]
    ? Object.entries(cerData[0])
        .filter(([k]) => !['pending', 'pending_details', 'last_updated'].includes(k))
        .map(([k, v]) => ({ name: k.replace(/_/g, ' '), value: v?.[timePeriod] || 0 }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)
    : []

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Reasons Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={100} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend align="center" verticalAlign="bottom" wrapperStyle={{ marginTop: 24 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export { OverviewChart, ReasonsChart }
