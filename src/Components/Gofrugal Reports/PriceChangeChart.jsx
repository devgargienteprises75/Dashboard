import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'

const PriceChangeChart = ({ totalChanges, priceIncreases, priceDecreases }) => {
  const data = [
    { name: 'Total Changes', value: totalChanges, color: '#3B82F6' },
    { name: 'Price Increases', value: priceIncreases, color: '#10B981' },
    { name: 'Price Decreases', value: priceDecreases, color: '#EF4444' },
  ]

  const hasData = totalChanges > 0

  return (
    <div className="col-span-1 bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-lg border border-purple-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Price Change Overview</h2>
      {hasData ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#374151', fontSize: 11 }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#374151', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
          No price change data available.
        </div>
      )}
    </div>
  )
}

export default PriceChangeChart