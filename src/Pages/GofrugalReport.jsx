import React, { useContext } from 'react'
import TopBar from '../Components/TopBar'
import { TransportRegData } from '../Context/APIData'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const GofrugalReport = () => {

  const { gfgData, error, timePeriod } = useContext(TransportRegData)

  // Map shared timePeriod value to keys used in gfgData
  const periodKeyMap = {
    today: 'today',
    yesterday: 'yesterday',
    last_week: 'lastWeek',
    last_month: 'lastMonth',
  }
  const gfgKey = periodKeyMap[timePeriod] || 'today'

  if (!gfgData) {
    return (
      <main className='w-[85%] bg-[#fff] absolute right-0 p-6'>
        {error && <Error error={error} />}
        <TopBar />
        <Loading />
      </main>
    )
  }

  const periodData = gfgData[gfgKey] || {}
  const salesRegister = periodData.salesRegister || {}
  const salesReturn = periodData.salesReturn || {}

  const counterSaleBills = salesRegister.counterSaleBills || []
  const discountedBillNumbers = salesRegister.discountedBillNumbers || []
  const returnDetails = salesReturn.returnDetails || []

  const totalBills = salesRegister.totalBills || 0
  const counterSaleCount = salesRegister.counterSales || counterSaleBills.length || 0
  const counterSaleAmount = counterSaleBills.reduce((sum, b) => sum + (b.amount || 0), 0)
  const discountedBillsCount = salesRegister.discountedBills || discountedBillNumbers.length || 0
  const totalDiscount = salesRegister.totalDiscount || discountedBillNumbers.reduce((sum, b) => sum + (b.discountAmount || 0), 0)

  // Bills / returns where original bill no. is missing / unknown
  const blankBillNoReturns = returnDetails.filter(r => !r.soldBillNo || r.soldBillNo === 'Unknown')
  const blankBillNoCount = blankBillNoReturns.length

  const chartData = [
    { name: 'Total Bills', value: totalBills },
    { name: 'Counter Sale Bills', value: counterSaleCount },
    { name: 'Discounted Bills', value: discountedBillsCount },
    { name: 'Bills w/o No.', value: blankBillNoCount }
  ]

  const periodLabel = timePeriod ? timePeriod.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/_/g, ' ') : 'selected period'

  return (
    <main className='w-[85%] bg-[#fff] absolute right-0 p-6'>
      {error && <Error error={error} />}
      <TopBar />

      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gofrugal Sales Register Report</h1>
        <p className="text-sm text-gray-500 mt-1">
          Sales register summary for {periodLabel}.
        </p>
      </div>

      {/* Top summary cards */}
      <div className="crds grid grid-cols-4 gap-4 mb-6">
        <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Total Bills</span>
          <span className='text-3xl font-extrabold text-gray-900'>{totalBills}</span>
        </div>
        <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Counter Sale Bills</span>
          <span className='text-3xl font-extrabold text-gray-900'>{counterSaleCount}</span>
          <span className='text-xs text-gray-600'>Amount: ₹{counterSaleAmount.toLocaleString()}</span>
        </div>
        <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Discounted Bills</span>
          <span className='text-3xl font-extrabold text-gray-900'>{discountedBillsCount}</span>
          <span className='text-xs text-gray-600'>Total Discount: ₹{totalDiscount.toLocaleString()}</span>
        </div>
        <div className='h-32 bg-gradient-to-br from-orange-200 to-white p-4 rounded-2xl shadow-md flex flex-col justify-between'>
          <span className='text-xs font-semibold uppercase tracking-wide text-orange-700'>Bills without Bill No.</span>
          <span className='text-3xl font-extrabold text-gray-900'>{blankBillNoCount}</span>
        </div>
      </div>

      {/* Charts & detail panels */}
      <div className="grid grid-cols-3 gap-4">
        {/* Overview chart */}
        <div className="col-span-1 bg-gradient-to-br from-white to-orange-50 rounded-xl p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between mb-4">
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
                  fontSize={11}
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
                <Bar dataKey="value" fill="url(#colorGfgBar)" radius={[8, 8, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Counter sale bills table */}
        <div className="col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100 overflow-hidden">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Counter Sale Bills</h2>
          <div className="overflow-auto max-h-64 border border-gray-100 rounded-lg">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Bill No</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Customer</th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {counterSaleBills.length ? (
                  counterSaleBills.map((b, idx) => (
                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-800 whitespace-nowrap">{b.billNo || '—'}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{b.billDate || '—'}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{b.customerName || '—'}</td>
                      <td className="px-3 py-2 text-right text-gray-800 whitespace-nowrap">₹{(b.amount || 0).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-center text-gray-500">
                      No counter sale bills.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Discounted bills table */}
        <div className="col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100 overflow-hidden">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Discounted Bills</h2>
          <div className="overflow-auto max-h-64 border border-gray-100 rounded-lg">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Bill No</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Customer</th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-700">Discount</th>
                  <th className="px-3 py-2 text-right font-semibold text-gray-700">Bill Amount</th>
                </tr>
              </thead>
              <tbody>
                {discountedBillNumbers.length ? (
                  discountedBillNumbers.map((b, idx) => (
                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-800 whitespace-nowrap">{b.billNo || '—'}</td>
                      <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{b.customerName || '—'}</td>
                      <td className="px-3 py-2 text-right text-green-700 whitespace-nowrap">
                        ₹{(b.discountAmount || 0).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-800 whitespace-nowrap">
                        ₹{(b.billAmount || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-center text-gray-500">
                      No discounted bills.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GofrugalReport