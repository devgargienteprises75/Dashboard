import React from 'react'

const DiscountedBillsTable = ({ discountedBillNumbers }) => {
  return (
    <div className="col-span-2 h-full row-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 overflow-hidden">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Discounted Bills</h2>
      <div className="overflow-auto max-h-64 border border-gray-300 rounded-lg">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Bill No</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Customer</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Reason</th>
              <th className="px-3 py-2 text-right font-semibold text-gray-700">Discount</th>
              <th className="px-3 py-2 text-right font-semibold text-gray-700">Bill Amount</th>
            </tr>
          </thead>
          <tbody>
            {discountedBillNumbers.length ? (
              discountedBillNumbers.map((b, idx) => (
                <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-800 whitespace-nowrap">{b.billNo || '—'}</td>
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-600 whitespace-nowrap">{b.customerName || '—'}</td>
                  <td className="px-3 py-2 text-gray-600 whitespace-nowrap">

                    {b.reason || b.discountReason || b.remarks || b.remark || 'Reason is not provided'}
                  </td>
                  <td className="px-3 py-2 text-right text-[0.9rem] font-semibold text-green-700 whitespace-nowrap">
                    ₹{(b.discountAmount || 0).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right text-[0.9rem] font-semibold text-gray-800 whitespace-nowrap">
                    ₹{(b.billAmount || 0).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-gray-500">
                  No discounted bills.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DiscountedBillsTable

