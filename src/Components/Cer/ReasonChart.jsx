import React, { useContext, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { TransportRegData } from '../../Context/APIData'
import ReasonModal from './ReasonModal'

const COLORS = ['#FF9F43', '#4366FF', '#00D084', '#845ef7', '#FF6B9D', '#FFC107']

const findCandidateKey = (obj, keywords = []) => {
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
  const key = findCandidateKey(dataObj, ['reason', 'reasons', 'exit_reason', 'exit_reasons'])
  const selectedSource = key ? dataObj[key] : null

  const reasonArray = key ? tryGetReasonArray(selectedSource, timePeriod) : []

  const getValue = (item) => {
    if (!item || typeof item !== 'object') return 0
    const raw = item.count ?? item.value ?? item.total ?? item.qty ?? item.number
    return typeof raw === 'number' ? raw : Number(raw) || 0
  }

  const data = reasonArray.map(item => ({ name: item.name ?? item.reason ?? item.exit_reason ?? item.type ?? 'Unknown', value: getValue(item), raw: item }))
  const sorted = data.sort((a, b) => b.value - a.value).slice(0, 6)
  const periodLabel = timePeriod ? timePeriod.replace(/_/g, ' ') : 'selected period'

  const getDetailsFor = (reasonName) => {
    // Helper to check if a detail item belongs to the current time period
    const isInCurrentPeriod = (detail) => {
      if (!timePeriod) return true
      // Check common period field names
      if (detail.period === timePeriod) return true
      if (detail.time_period === timePeriod) return true

      // Check if there's a date field and match it to period
      if (detail.date || detail.timestamp || detail.created_at) {
        const detailDate = new Date(detail.date || detail.timestamp || detail.created_at)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (timePeriod === 'today') {
          return detailDate.toDateString() === today.toDateString()
        } else if (timePeriod === 'yesterday') {
          return detailDate.toDateString() === yesterday.toDateString()
        } else if (timePeriod === 'last_week') {
          const weekAgo = new Date(today)
          weekAgo.setDate(weekAgo.getDate() - 7)
          return detailDate >= weekAgo && detailDate <= today
        } else if (timePeriod === 'last_month') {
          const monthAgo = new Date(today)
          monthAgo.setMonth(monthAgo.getMonth() - 1)
          return detailDate >= monthAgo && detailDate <= today
        }
      }

      // If no period info found, include it (fallback)
      return true
    }

    // FIXED: First check if there's an exit_details array at the top level
    if (dataObj?.exit_details && Array.isArray(dataObj.exit_details)) {
      const matched = dataObj.exit_details.filter(detail => {
        // Match by reason AND time period
        const reasonMatches = detail.reason === reasonName ||
          detail.exit_reason === reasonName ||
          detail.name === reasonName ||
          detail.type === reasonName

        return reasonMatches && isInCurrentPeriod(detail)
      })

      if (matched.length) {
        // Extract descriptions from matched details
        return matched.map(m => {
          if (m.description) return m.description
          if (m.detail) return m.detail
          if (m.details) return m.details
          if (m.comment) return m.comment
          if (m.notes) return m.notes
          // Return a formatted string of the object if no description field found
          return JSON.stringify(m, null, 2)
        })
      }
    }

    // Fallback: Try to find details under possible keys or inline in the raw item
    const candidateKeys = Object.keys(dataObj || {}).filter(k =>
      k.toLowerCase().includes('detail') ||
      k.toLowerCase().includes('description') ||
      k.toLowerCase().includes('list') ||
      k.toLowerCase().includes('items')
    )

    // 1) If the reason entry itself has items/descriptions
    const inArr = reasonArray.find(r => r.name === reasonName) || {}

    // Check direct properties
    if (Array.isArray(inArr.items) && inArr.items.length) return inArr.items
    if (Array.isArray(inArr.details) && inArr.details.length) return inArr.details
    if (Array.isArray(inArr.descriptions) && inArr.descriptions.length) return inArr.descriptions
    if (typeof inArr.description === 'string' && inArr.description) return [inArr.description]
    if (typeof inArr.detail === 'string' && inArr.detail) return [inArr.detail]

    // Check inside 'raw' which might hold the original object
    if (inArr.raw && typeof inArr.raw === 'object') {
      const r = inArr.raw;
      if (Array.isArray(r.items) && r.items.length) return r.items
      if (Array.isArray(r.details) && r.details.length) return r.details
      if (Array.isArray(r.descriptions) && r.descriptions.length) return r.descriptions
      if (typeof r.description === 'string' && r.description) return [r.description]
      if (typeof r.detail === 'string' && r.detail) return [r.detail]
    }

    // 2) Look for top-level detail mapping
    for (const k of candidateKeys) {
      const candidate = dataObj[k]
      if (!candidate) continue
      // candidate may be an object keyed by reason name
      if (candidate[reasonName]) {
        const val = candidate[reasonName];
        return Array.isArray(val) ? val : (typeof val === 'string' ? [val] : [JSON.stringify(val)])
      }
      // or candidate may be grouped by timePeriod
      if (candidate[timePeriod] && candidate[timePeriod][reasonName]) {
        const val = candidate[timePeriod][reasonName];
        return Array.isArray(val) ? val : (typeof val === 'string' ? [val] : [JSON.stringify(val)])
      }
      // or candidate might be an array of objects { name, description }
      if (Array.isArray(candidate)) {
        const matched = candidate.filter(c => (c.name && c.name === reasonName) || (c.reason && c.reason === reasonName))
        if (matched.length) return matched.map(m => m.description ?? m.detail ?? m.raw ?? JSON.stringify(m))
      }
    }

    return []
  }

  if (!sorted.length) return (
    <div className='bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg border border-purple-100'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>Exit Reasons</h2>
        <span className='px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full'>{periodLabel}</span>
      </div>
      <div className='flex items-center justify-center h-[200px] text-gray-500 text-sm'>
        <div className='text-center'>
          <svg className='w-12 h-12 mx-auto mb-3 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' />
          </svg>
          <p className='font-medium'>No exits for {periodLabel}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className='bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow duration-300'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>Exit Reasons</h2>
        <span className='px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full uppercase tracking-wide'>{periodLabel}</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={sorted}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            dataKey="value"
            paddingAngle={2}
            animationDuration={1000}
          >
            {sorted.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                onClick={() => setSelected(entry.name)}
                className='cursor-pointer hover:opacity-80 transition-opacity duration-200'
                stroke='#fff'
                strokeWidth={2}
              />
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
          <Legend
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{
              marginTop: 20,
              fontSize: '13px',
              fontWeight: 500
            }}
            iconType='circle'
          />
        </PieChart>
      </ResponsiveContainer>

      <ReasonModal isOpen={!!selected} onClose={() => setSelected(null)} reason={selected} details={selected ? getDetailsFor(selected) : []} />
    </div>
  )
}

export default ReasonChart