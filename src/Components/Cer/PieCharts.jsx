import React, { useContext } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { TransportRegData } from '../../Context/APIData'

const COLORS = ['#FF9F43', '#4366FF', '#00D084', '#845ef7', '#FF6B9D']

const pickFirstNonEmptyPeriod = (value, preferred, candidates = []) => {
  if (!value || typeof value !== 'object') return preferred
  if (preferred && value[preferred]) {
    if (Array.isArray(value[preferred]) && value[preferred].length) return preferred
    if (typeof value[preferred] === 'object' && Object.keys(value[preferred]).length) return preferred
    if (typeof value[preferred] === 'number' && value[preferred] > 0) return preferred
  }
  for (const period of candidates) {
    if (value[period]) {
      if (Array.isArray(value[period]) && value[period].length) return period
      if (typeof value[period] === 'object' && Object.keys(value[period]).length) return period
      if (typeof value[period] === 'number' && value[period] > 0) return period
    }
  }
  return preferred
}

const OverviewChart = ({ cerData }) => {
  const { timePeriod } = useContext(TransportRegData)

  const getFirstData = (arr) => { if (!arr) return null; if (!Array.isArray(arr)) return arr; for (const item of arr) if (item && typeof item === 'object' && Object.keys(item).length > 0) return item; return null }
  const dataObj = getFirstData(cerData)

  const getCount = (source, type) => {
    if (!source) return 0
    const period = pickFirstNonEmptyPeriod(source, timePeriod, ['last_month', 'last_week', 'yesterday', 'today'])
    const periodData = source[period]

    if (type === 'array') return Array.isArray(periodData) ? periodData.length : 0
    if (type === 'object') return typeof periodData === 'object' && !Array.isArray(periodData) ? Object.keys(periodData).length : 0
    if (type === 'sum-object') {
      if (typeof periodData === 'object' && !Array.isArray(periodData)) {
        return Object.values(periodData).reduce((sum, v) => sum + (typeof v === 'number' ? v : 0), 0)
      }
      return 0
    }
    return typeof periodData === 'number' ? periodData : 0
  }

  const data = dataObj ? [
    { name: 'Total Exits', value: getCount(dataObj.total_exits, 'number') },
    { name: 'By Floor', value: getCount(dataObj.by_floor, 'sum-object') },
    { name: 'By Salesman', value: getCount(dataObj.by_sales_person, 'array') },
    { name: 'Exit Reasons', value: getCount(dataObj.exit_reasons, 'array') },
  ].filter(item => item.value > 0) : []

  if (!data.length) return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Top Metrics</h2>
      <div className='text-sm text-gray-500'>No data available</div>
    </div>
  )

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
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px'
            }}
            itemStyle={{ color: '#fff' }}
          />
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
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px'
            }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend align="center" verticalAlign="bottom" wrapperStyle={{ marginTop: 24 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export { OverviewChart, ReasonsChart }
