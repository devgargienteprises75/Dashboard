import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const ProductSalesChart = ({ data }) => {
  
  // Build data from context - Monthly comparison
  const chartData = data ? [
    { name: 'Bills Received', value: data[0]?.bills_received?.last_month || 0 },
    { name: 'MR Created', value: data[0]?.mr_created?.last_month || 0 },
    { name: 'Voucher Done', value: data[0]?.voucher_created?.last_month || 0 },
  ] : []

  const COLORS = ['#FF9F43', '#4366FF', '#00D084']

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Last Month Overview</h2>
      <div className='flex justify-center'>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" wrapperStyle={{ marginTop: 32 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const TrafficChart = ({ title = "Pending Tasks", data }) => {
  
  // Show pending items
  const chartData = data && data[0]?.pending ? [
    { name: 'Handover to Purchase', value: data[0]?.pending.handover_to_purchase || 0 },
    { name: 'MR Creation', value: data[0]?.pending.mr_creation || 0 },
    { name: 'Handover to Accounts', value: data[0]?.pending.handover_to_accounts || 0 },
    { name: 'Voucher Creation', value: data[0]?.pending.voucher_created || 0 }
  ] : []

  const COLORS = ['#FF9F43', '#4366FF', '#FF6B9D', '#845ef7']

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Pending Status</h2>
      <div className='flex justify-center'>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart className=''>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" wrapperStyle={{ marginTop: 32 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export { ProductSalesChart, TrafficChart }
