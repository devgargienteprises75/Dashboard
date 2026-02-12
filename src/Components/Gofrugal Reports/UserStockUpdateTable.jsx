import React from 'react'
import { User } from 'lucide-react'

const UserStockUpdateTable = ({ byUser, totalUpdates }) => {
  const userEntries = Object.entries(byUser).sort((a, b) => b[1] - a[1])
  const hasData = userEntries.length > 0

  return (
    <div className="col-span-1 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-gray-900">Top Contributors</h2>
      </div>
      
      {hasData ? (
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Updates
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Share
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {userEntries.map(([userName, updates], index) => {
                const percentage = ((updates / totalUpdates) * 100).toFixed(1)
                
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-gray-900">
                      #{index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {userName}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700 font-semibold">
                      {updates}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {percentage}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
          No user data available for stock updates.
        </div>
      )}
    </div>
  )
}

export default UserStockUpdateTable