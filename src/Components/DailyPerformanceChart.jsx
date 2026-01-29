import React, { useContext } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TransportRegData } from '../Context/TransportReg';

const DailyPerformanceChart = ({ data = [], className }) => {

    const { timePeriod } = useContext(TransportRegData)
    
  // Convert your data to chart format
const chartData = data && data.length > 0 ?
  Object.entries(data).flatMap(([key, value]) => {
    return Object.entries(value)
    .filter(([fieldName]) => !['mr_status_done','pending', 'pending_details', 'last_updated'].includes(fieldName))
    .map((item) => ({
      name: item[0].charAt(0).toUpperCase() + item[0].split('_').join(" ").slice(1, 17) + (item[0].length > 17 ? '...' : ''),
      "Value": item[1]?.[timePeriod]
    }))
  }) : []

  return (
    <div className={`bg-white rounded-lg p-6 ${className} shadow-sm border border-gray-100`}>
      <h2 className='text-lg font-bold text-gray-900 mb-4'>Daily Performance</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" fontSize={16}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Value" fill="#FF6B35" width="20px" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DailyPerformanceChart
