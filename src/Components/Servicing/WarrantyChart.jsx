import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const WarrantyChart = ({ warranty }) => {
  const data = [
    { name: 'Under Warranty', value: warranty.yes, color: '#10B981' },
    { name: 'Out of Warranty', value: warranty.no, color: '#EF4444' }
  ]

  const hasData = warranty.yes > 0 || warranty.no > 0

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 sm:p-6 shadow-lg border border-purple-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Warranty Status</h2>
      {hasData ? (
        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
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
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={48}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-72 sm:h-80 text-gray-500 text-sm">
          No warranty data available.
        </div>
      )}
    </div>
  )
}

export default WarrantyChart
