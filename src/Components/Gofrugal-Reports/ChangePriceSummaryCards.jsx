import React from 'react'
import { Edit3, Users, TrendingUp } from 'lucide-react'

const ChangePriceSummaryCards = ({ totalChanges, priceChangeByUser }) => {
  const userCount = Object.keys(priceChangeByUser).length
  const avgPerUser = userCount > 0 ? Math.round(totalChanges / userCount) : 0

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

      {/* Active Users */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Active Users</h3>
          <div className="p-3 bg-purple-100 rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-purple-600">{userCount}</p>
        <p className="text-sm text-gray-500 mt-2">Users making changes</p>
      </div>

      {/* Average per User */}
      <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 shadow-lg border border-cyan-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Avg per User</h3>
          <div className="p-3 bg-cyan-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-cyan-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-cyan-600">{avgPerUser}</p>
        <p className="text-sm text-gray-500 mt-2">Changes per user</p>
      </div>
    </div>
  )
}

export default ChangePriceSummaryCards