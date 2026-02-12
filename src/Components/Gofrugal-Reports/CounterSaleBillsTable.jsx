import React from 'react'

const CounterSaleBillsTable = ({ counterSaleBills, getBillMobile, billsWithoutMobile }) => {
  return (
    <div className="col-span-1 h-full row-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">Counter Sale Bills</h2>
        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          Bills without mobile no.: {billsWithoutMobile}
        </span>
      </div>
      <div className="overflow-auto h-[95%] border border-gray-300 rounded-lg">
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
                <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-800 whitespace-nowrap">{b.billNo || '—'}</td>
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-600 whitespace-nowrap">{b.billDate || '—'}</td>
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-600 whitespace-nowrap">{b.customerName || '—'}</td>
                  <td className="px-3 py-2 text-right text-[0.9rem] font-semibold text-gray-800 whitespace-nowrap">₹{(b.amount || 0).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
                  No counter sale bills.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CounterSaleBillsTable

