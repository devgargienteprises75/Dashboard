import React from 'react'
import { Star } from 'lucide-react'

const TopProducts = ({ data }) => {
  
  // Extract top products from context data
  const products = data && data.length > 0 && data[0]?.top_products ? data[0].top_products : []

  if (products.length === 0) {
    return (
      <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
        <h2 className='text-lg font-bold text-gray-900 mb-6'>Top Selling Products</h2>
        <p className='text-gray-500 text-center py-8'>No products data available</p>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-bold text-gray-900'>Top Selling Products</h2>
        <button className='text-gray-400 hover:text-gray-600'>⋮</button>
      </div>
      <div className='space-y-4'>
        {products.slice(0, 4).map((product, idx) => (
          <div key={idx} className='flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0'>
            <div className='text-4xl'>{product.image || '📦'}</div>
            <div className='flex-1'>
              <h3 className='text-sm font-semibold text-gray-900'>{product.name || product.product_name || 'Product'}</h3>
              <div className='flex items-center gap-2 mt-1'>
                <div className='flex gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(product.rating || 4) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className='text-xs text-gray-500'>{product.rating || 4}</span>
              </div>
              <p className='text-sm font-bold text-gray-900 mt-2'>${product.price || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopProducts
