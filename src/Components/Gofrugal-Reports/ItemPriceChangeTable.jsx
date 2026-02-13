import React, { useState } from 'react'
import { Package, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const ItemPriceChangeTable = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Filter items based on search and type
  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.outletName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || 
                       (filterType === 'increase' && item.changeType === 'Increase') ||
                       (filterType === 'decrease' && item.changeType === 'Decrease') ||
                       (filterType === 'no-change' && item.changeType === 'No Change')
    
    return matchesSearch && matchesType
  })

  const getChangeIcon = (changeType) => {
    if (changeType === 'Increase') return <TrendingUp className="w-4 h-4 text-green-600" />
    if (changeType === 'Decrease') return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getChangeColor = (changeType) => {
    if (changeType === 'Increase') return 'text-green-600'
    if (changeType === 'Decrease') return 'text-red-600'
    return 'text-gray-600'
  }

  const hasData = items && items.length > 0

  return (
    <div className="col-span-3 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">Item-wise Price Changes</h2>
          <span className="ml-2 px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {filteredItems.length} items
          </span>
        </div>
      </div>

      {hasData ? (
        <>
          {/* Filters */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Search by item name or outlet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Changes</option>
              <option value="increase">Increases Only</option>
              <option value="decrease">Decreases Only</option>
              <option value="no-change">No Change</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-auto max-h-[500px]">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Outlet
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Old MRP
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    New MRP
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Old SP
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    New SP
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Difference
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {item.itemName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.outletName}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">
                      ₹{item.oldMRP.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-700">
                      ₹{item.newMRP.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                      ₹{item.oldSelling.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                      ₹{item.newSelling.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {getChangeIcon(item.changeType)}
                        <span className={`text-xs font-medium ${getChangeColor(item.changeType)}`}>
                          {item.changeType}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <span className={`font-semibold ${getChangeColor(item.changeType)}`}>
                        {item.difference >= 0 ? '+' : ''}₹{item.difference}
                      </span>
                      <div className={`text-xs ${getChangeColor(item.changeType)}`}>
                        ({item.differencePercentage}%)
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No items found matching your filters.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
          No item price change data available.
        </div>
      )}
    </div>
  )
}

export default ItemPriceChangeTable