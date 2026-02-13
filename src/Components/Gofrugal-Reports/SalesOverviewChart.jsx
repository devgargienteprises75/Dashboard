import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const SalesOverviewChart = ({ chartData, periodLabel }) => {
  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-4 sm:p-6 shadow-lg border border-orange-100 xl:col-span-2">
      <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-gray-900">Sales Overview</h2>
        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full uppercase tracking-wide">
          {periodLabel}
        </span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
            <defs>
              <linearGradient id="colorGfgBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#FF8C5A" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="name"
              fontSize={13}
              tick={{ fill: '#374151', fontWeight: 500 }}
              stroke="#D1D5DB"
              height={60}
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
            <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
            <Bar dataKey="value" fill="url(#colorGfgBar)" radius={[8, 8, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesOverviewChart

