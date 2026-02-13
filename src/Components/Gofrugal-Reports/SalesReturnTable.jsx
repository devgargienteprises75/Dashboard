import React from 'react'

const SalesReturnTable = ({ returnDetails }) => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 overflow-hidden xl:col-span-2">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Sales Return Details</h2>
      <div className="overflow-auto max-h-[60vh] border border-gray-300 rounded-lg">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Sold Bill No</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Date</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Item</th>
              <th className="px-3 py-2 text-right font-semibold text-gray-700">Qty</th>
              <th className="px-3 py-2 text-right font-semibold text-gray-700">Value</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Reason</th>
            </tr>
          </thead>
          <tbody>
            {returnDetails.length ? (
              returnDetails.map((r, idx) => (
                <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-600 whitespace-nowrap">{r.soldBillNo || '—'}</td>
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-600 whitespace-nowrap">{r.returnDate || '—'}</td>
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-700 whitespace-nowrap">{r.itemName || '—'}</td>
                  <td className="px-3 py-2 text-right text-[0.9rem] font-semibold text-gray-800 whitespace-nowrap">{r.quantity ?? '—'}</td>
                  <td className="px-3 py-2 text-right text-[0.9rem] font-semibold text-gray-800 whitespace-nowrap">₹{(r.value || 0).toLocaleString()}</td>
                  <td className="px-3 py-2 text-[0.9rem] font-semibold text-gray-600 whitespace-nowrap">
                    {r.reason && r.reason.trim() ? r.reason : 'Reason is not provided'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-3 py-4 text-center text-gray-500">
                  No sales return data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalesReturnTable

