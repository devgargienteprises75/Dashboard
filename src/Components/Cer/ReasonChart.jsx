import React, { useContext, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { TransportRegData } from '../../Context/APIData'
import ReasonModal from './ReasonModal'

const COLORS = ['#FF9F43', '#4366FF', '#00D084', '#845ef7', '#FF6B9D', '#FFC107']

const findCandidateKey = (obj, keywords=[]) => {
  if (!obj) return null
  const keys = Object.keys(obj)
  return keys.find(k => keywords.some(kw => k.toLowerCase().includes(kw)))
}

const tryGetReasonArray = (value, timePeriod) => {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, timePeriod)) {
    const v = value[timePeriod]
    return Array.isArray(v) ? v : []
  }
  // If it's an object like { "ReasonA": 5, "ReasonB": 3 }
  if (typeof value === 'object') return Object.entries(value).map(([name, countOrObj]) => ({ name, count: (typeof countOrObj === 'object' ? (countOrObj[timePeriod] ?? 0) : (countOrObj ?? 0)), raw: countOrObj }))
  return []
}

const ReasonChart = ({ cerData = [] }) => {
  const { timePeriod } = useContext(TransportRegData)
  const [selected, setSelected] = useState(null)
  const getFirstData = (arr) => { if (!arr) return null; if (!Array.isArray(arr)) return arr; for (const item of arr) if (item && typeof item === 'object' && Object.keys(item).length > 0) return item; return null }
  const dataObj = getFirstData(cerData)
  const key = findCandidateKey(dataObj, ['reason', 'reasons', 'exit_reason'])

  const reasonArray = key ? tryGetReasonArray(dataObj[key], timePeriod) : []

  const data = reasonArray.map(item => ({ name: item.name, value: item.count ?? item.count ?? 0, raw: item }))
  const sorted = data.sort((a, b) => b.value - a.value).slice(0, 6)

  const getDetailsFor = (reasonName) => {
    // Try to find details under possible keys or inline in the raw item
    const candidateKeys = Object.keys(dataObj || {}).filter(k => k.toLowerCase().includes('detail') || k.toLowerCase().includes('description') || k.toLowerCase().includes('list') || k.toLowerCase().includes('items'))

    // 1) If the reason entry itself has items/descriptions
    const inArr = reasonArray.find(r => r.name === reasonName) || {}
    if (Array.isArray(inArr.items) && inArr.items.length) return inArr.items
    if (Array.isArray(inArr.details) && inArr.details.length) return inArr.details
    if (Array.isArray(inArr.descriptions) && inArr.descriptions.length) return inArr.descriptions

    // 2) Look for top-level detail mapping
    for (const k of candidateKeys) {
      const candidate = dataObj[k]
      if (!candidate) continue
      // candidate may be an object keyed by reason name
      if (candidate[reasonName]) return Array.isArray(candidate[reasonName]) ? candidate[reasonName] : [candidate[reasonName]]
      // or candidate may be grouped by timePeriod
      if (candidate[timePeriod] && candidate[timePeriod][reasonName]) return Array.isArray(candidate[timePeriod][reasonName]) ? candidate[timePeriod][reasonName] : [candidate[timePeriod][reasonName]]
      // or candidate might be an array of objects { name, description }
      if (Array.isArray(candidate)) {
        const matched = candidate.filter(c => (c.name && c.name === reasonName) || (c.reason && c.reason === reasonName))
        if (matched.length) return matched.map(m => m.description ?? m.raw ?? m)
      }
    }

    return []
  }

  if (!sorted.length) return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Exit Reasons</h2>
      <div className='text-sm text-gray-500'>No data available</div>
    </div>
  )

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Exit Reasons</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={sorted} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" paddingAngle={4}>
            {sorted.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} onClick={() => setSelected(entry.name)} className='cursor-pointer' />
            ))}
          </Pie>
          <Tooltip />
          <Legend align="center" verticalAlign="bottom" wrapperStyle={{ marginTop: 12 }} />
        </PieChart>
      </ResponsiveContainer>

      <div className='mt-4 grid grid-cols-2 gap-2'>
        {sorted.map(r => (
          <button key={r.name} onClick={() => setSelected(r.name)} className='text-left p-3 bg-white rounded shadow-sm flex justify-between items-center'>
            <div className='font-medium'>{r.name}</div>
            <div className='text-sm text-gray-600'>{r.value}</div>
          </button>
        ))}
      </div>

      <ReasonModal isOpen={!!selected} onClose={() => setSelected(null)} reason={selected} details={selected ? getDetailsFor(selected) : []} />
    </div>
  )
}

export default ReasonChart
