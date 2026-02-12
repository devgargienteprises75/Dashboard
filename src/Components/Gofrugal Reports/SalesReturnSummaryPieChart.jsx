import React from 'react'

const SalesReturnSummaryPieChart = ({ totalReturns, totalReturnQty, totalReturnValue }) => {
  const hasData = totalReturns > 0 || totalReturnQty > 0 || totalReturnValue > 0

  return (
    <div className="col-span-1 bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-lg border border-red-100">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Sales Return Summary</h2>
      {hasData ? (
        <div className="space-y-4">
          {/* Returns Count */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
            <p className="text-sm text-gray-600 mb-1">Total Returns</p>
            <p className="text-3xl font-bold text-orange-600">{totalReturns}</p>
          </div>
          
          {/* Quantity */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
            <p className="text-sm text-gray-600 mb-1">Total Quantity</p>
            <p className="text-3xl font-bold text-orange-600">{totalReturnQty.toLocaleString()}</p>
          </div>
          
          {/* Value */}
          <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-400">
            <p className="text-sm text-gray-600 mb-1">Total Value</p>
            <p className="text-3xl font-bold text-yellow-600">₹{totalReturnValue.toLocaleString()}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
          No sales return summary data.
        </div>
      )}
    </div>
  )
}

export default SalesReturnSummaryPieChart