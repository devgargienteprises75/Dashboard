import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#e68032', '#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

const PriceChangeChart = ({ byUser }) => {
  const data = Object.entries(byUser).map(([name, value]) => ({
    name,
    value
  }))

  const hasData = data.length > 0

  return (
    <div className="col-span-1 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg border border-blue-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Price Changes by User</h2>
      {hasData ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" tick={{ fill: '#374151', fontSize: 12 }} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fill: '#374151', fontSize: 12 }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={30}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-80 text-gray-500 text-sm">
          No price change data available.
        </div>
      )}
    </div>
  )
}

export default PriceChangeChart