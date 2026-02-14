import React from 'react'
import { FileText, CheckCircle, Clock, Shield, IndianRupee } from 'lucide-react'

const ServiceSummaryCards = ({ totalReceipts, resolved, pending, warranty, totalAmount }) => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {/* Total Receipts */}
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Total Receipts</h3>
          <div className="p-3 bg-blue-100 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-blue-600">{totalReceipts}</p>
        <p className="text-sm text-gray-500 mt-2">Service requests</p>
      </div>

      {/* Resolved */}
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 shadow-lg border border-green-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Resolved</h3>
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-green-600">{resolved}</p>
        <p className="text-sm text-gray-500 mt-2">Completed repairs</p>
      </div>

      {/* Pending */}
      <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 shadow-lg border border-orange-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Pending</h3>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-orange-600">{pending}</p>
        <p className="text-sm text-gray-500 mt-2">Awaiting repair</p>
      </div>

      {/* Under Warranty */}
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Warranty</h3>
          <div className="p-3 bg-purple-100 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-purple-600">{warranty.yes}</p>
        <p className="text-sm text-gray-500 mt-2">
          Under warranty · {warranty.no} out
        </p>
      </div>

      {/* Total Amount */}
      <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 shadow-lg border border-cyan-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">Total Amount</h3>
          <div className="p-3 bg-cyan-100 rounded-lg">
            <IndianRupee className="w-6 h-6 text-cyan-600" />
          </div>
        </div>
        <p className="text-4xl font-bold text-cyan-600">₹{totalAmount}</p>
        <p className="text-sm text-gray-500 mt-2">Service charges</p>
      </div>
    </div>
  )
}

export default ServiceSummaryCards