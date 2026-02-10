
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const CerCharts = ({ cerData, timePeriod = 'today' }) => {

    if (!cerData || !cerData[timePeriod]) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[400px] flex items-center justify-center">
                <p className="text-gray-400">No data available for this period</p>
            </div>
        )
    }

    const data = cerData[timePeriod]

    // Sort data by count descending for better visualization
    const sortedData = [...data].sort((a, b) => b.count - a.count)

    const COLORS = ['#4366FF', '#FF9F43', '#00D084', '#FF6B9D', '#845ef7']

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Exit Reasons Distribution</h2>
            </div>

            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={sortedData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={150}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                            {sortedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CerCharts
