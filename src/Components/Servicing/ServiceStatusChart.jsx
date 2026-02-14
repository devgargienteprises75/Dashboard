import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = {
  'PENDING': '#F59E0B',
  'RESOLVED': '#10B981',
  'IN PROGRESS': '#3B82F6',
  'CANCELLED': '#EF4444',
  'ON HOLD': '#6366F1'
}

const ServiceStatusChart = ({ byStatus, totalReceipts }) => {
  const data = Object.entries(byStatus).map(([status, count]) => ({
    name: status,
    value: count,
    color: COLORS[status] || '#6B7280'
  }))

  const hasData = data.length > 0

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg border border-blue-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Status Breakdown</h2>
      {hasData ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-80 text-gray-500 text-sm">
          No status data available.
        </div>
      )}
    </div>
  )
}

export default ServiceStatusChart