import React from 'react'

const RecentOrders = ({ data }) => {
  
  // Format data from context to match table structure
  const orders = data && data.length > 0 && data[0]?.recent_orders ? data[0].recent_orders : []

  if (orders.length === 0) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
        <h2 className='text-lg font-bold text-gray-900 mb-6'>Recent Orders</h2>
        <p className='text-gray-500 text-center py-8'>No recent orders data available</p>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-bold text-gray-900'>Recent Orders</h2>
        <button className='text-gray-400 hover:text-gray-600'>⋮</button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='text-left text-xs font-semibold text-gray-600 py-3 px-2'>Tracking no</th>
              <th className='text-left text-xs font-semibold text-gray-600 py-3 px-2'>Product Name</th>
              <th className='text-left text-xs font-semibold text-gray-600 py-3 px-2'>Price</th>
              <th className='text-left text-xs font-semibold text-gray-600 py-3 px-2'>Total Order</th>
              <th className='text-left text-xs font-semibold text-gray-600 py-3 px-2'>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order, idx) => (
              <tr key={idx} className='border-b border-gray-100 hover:bg-gray-50'>
                <td className='py-4 px-2 text-sm font-medium text-gray-900'>{order.id || order.tracking_no || idx + 1}</td>
                <td className='py-4 px-2'>
                  <div className='flex items-center gap-3'>
                    <span className='text-xl'>{order.image || '📦'}</span>
                    <span className='text-sm text-gray-900 font-medium'>{order.name || order.product_name || 'Product'}</span>
                  </div>
                </td>
                <td className='py-4 px-2 text-sm text-gray-700'>${order.price || 0}</td>
                <td className='py-4 px-2'>
                  <span className='bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full'>
                    {order.total_order || order.quantity || 0}
                  </span>
                </td>
                <td className='py-4 px-2 text-sm font-bold text-gray-900'>${order.total_amount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders
