import React from 'react'
import { TrendingUp, TrendingDown, Edit3 } from 'lucide-react'

const ChangePriceSummaryCards = ({ totalChanges, priceIncreases, priceDecreases }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* Total Changes */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Total Changes</h3>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Edit3 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-blue-600">{totalChanges}</p>
        <p className="text-sm text-gray-500 mt-2">Price modifications</p>
      </div>

      {/* Price Increases */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-lg border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Price Increases</h3>
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-green-600">{priceIncreases}</p>
        <p className="text-sm text-gray-500 mt-2">Items with higher prices</p>
      </div>

      {/* Price Decreases */}
      <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 shadow-lg border border-red-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Price Decreases</h3>
          <div className="p-3 bg-red-100 rounded-lg">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-red-600">{priceDecreases}</p>
        <p className="text-sm text-gray-500 mt-2">Items with lower prices</p>
      </div>
    </div>
  )
}

export default ChangePriceSummaryCards