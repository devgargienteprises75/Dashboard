import React, { useState } from 'react'
import { Wrench, Search } from 'lucide-react'

const ServiceItemsTable = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterWarranty, setFilterWarranty] = useState('all')

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiptNo?.toString().includes(searchTerm) ||
      item.contactNo?.toString().includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesWarranty = filterWarranty === 'all' || item.warranty === filterWarranty
    
    return matchesSearch && matchesStatus && matchesWarranty
  })

  const getStatusBadge = (status) => {
    const statusColors = {
      'PENDING': 'bg-orange-100 text-orange-800',
      'RESOLVED': 'bg-green-100 text-green-800',
      'IN PROGRESS': 'bg-blue-100 text-blue-800',
      'CANCELLED': 'bg-red-100 text-red-800',
      'ON HOLD': 'bg-purple-100 text-purple-800'
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  const getWarrantyBadge = (warranty) => {
    return warranty === 'YES' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const hasData = items && items.length > 0

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Wrench className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900 truncate">Service Receipts</h2>
          <span className="ml-2 px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {filteredItems.length} items
          </span>
        </div>
      </div>

      {hasData ? (
        <>
          {/* Filters */}
          <div className="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="relative lg:col-span-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, product, receipt no, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="RESOLVED">Resolved</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="ON HOLD">On Hold</option>
              </select>
              <select
                value={filterWarranty}
                onChange={(e) => setFilterWarranty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Warranty</option>
                <option value="YES">Under Warranty</option>
                <option value="NO">Out of Warranty</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Receipt No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Warranty
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-blue-600">
                      #{item.receiptNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.date}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {item.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.contactNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">
                      {item.product}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-sm">
                      <div className="truncate" title={item.issue}>
                        {item.issue}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWarrantyBadge(item.warranty)}`}>
                        {item.warranty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                      ₹{item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No service receipts found matching your filters.
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
          No service receipts available.
        </div>
      )}
    </div>
  )
}

export default ServiceItemsTable
