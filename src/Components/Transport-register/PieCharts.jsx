import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const ProductSalesChart = ({ transportRegData }) => {
  
  // Build data from context - Monthly comparison
  const chartData = transportRegData ? [
    { name: 'Bills Received', value: transportRegData[0]?.bills_received?.last_month || 0 },
    { name: 'MR Created', value: transportRegData[0]?.mr_created?.last_month || 0 },
    { name: 'Voucher Done', value: transportRegData[0]?.voucher_created?.last_month || 0 },
  ] : []

  const COLORS = ['#FF9F43', '#4366FF', '#00D084']

  return (
    <div className='bg-gradient-to-br from-white to-green-50 rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300'>
      <div className='flex items-center gap-2 mb-4'>
        <svg className='w-6 h-6 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
        </svg>
        <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>Last Month Overview</h2>
      </div>
      <div className='flex justify-center'>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke='#fff'
                  strokeWidth={2}
                  className='hover:opacity-80 transition-opacity duration-200'
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
            />
            <Legend 
              align="center" 
              verticalAlign="bottom" 
              wrapperStyle={{ marginTop: 32, fontSize: '13px', fontWeight: 500 }} 
              iconType='circle'
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const TrafficChart = ({ title = "Pending Tasks", transportRegData }) => {
  
  // Show pending items
  const chartData = transportRegData && transportRegData[0]?.pending ? [
    { name: 'Handover to Purchase', value: transportRegData[0]?.pending.handover_to_purchase || 0 },
    { name: 'MR Creation', value: transportRegData[0]?.pending.mr_creation || 0 },
    { name: 'Handover to Accounts', value: transportRegData[0]?.pending.handover_to_accounts || 0 },
    { name: 'Voucher Creation', value: transportRegData[0]?.pending.voucher_created || 0 }
  ] : []

  const COLORS = ['#FF9F43', '#4366FF', '#FF6B9D', '#845ef7']

  return (
    <div className='bg-gradient-to-br from-white to-pink-50 rounded-xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow duration-300'>
      <div className='flex items-center gap-2 mb-4'>
        <svg className='w-6 h-6 text-pink-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
        <h2 className='text-xl font-extrabold text-gray-900 tracking-tight'>Pending Status</h2>
      </div>
      <div className='flex justify-center'>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke='#fff'
                  strokeWidth={2}
                  className='hover:opacity-80 transition-opacity duration-200'
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
            />
            <Legend 
              align="center" 
              verticalAlign="bottom" 
              wrapperStyle={{ marginTop: 32, fontSize: '13px', fontWeight: 500 }} 
              iconType='circle'
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export { ProductSalesChart, TrafficChart }
