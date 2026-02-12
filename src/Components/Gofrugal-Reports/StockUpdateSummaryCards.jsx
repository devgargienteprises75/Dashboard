import React from 'react'
import { Package, Users, TrendingUp } from 'lucide-react'

const StockUpdateSummaryCards = ({ totalUpdates, userCount }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {/* Total Updates */}
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 shadow-lg border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Total Updates</h3>
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Package className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-indigo-600">{totalUpdates}</p>
        <p className="text-sm text-gray-500 mt-2">Stock modifications</p>
      </div>

      {/* Active Users */}
      <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 shadow-lg border border-cyan-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Active Users</h3>
          <div className="p-3 bg-cyan-100 rounded-lg">
            <Users className="w-6 h-6 text-cyan-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-cyan-600">{userCount}</p>
        <p className="text-sm text-gray-500 mt-2">Users updating stock</p>
      </div>

      {/* Average per User */}
      <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 shadow-lg border border-emerald-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Avg per User</h3>
          <div className="p-3 bg-emerald-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-emerald-600">
          {userCount > 0 ? Math.round(totalUpdates / userCount) : 0}
        </p>
        <p className="text-sm text-gray-500 mt-2">Updates per user</p>
      </div>
    </div>
  )
}

export default StockUpdateSummaryCards