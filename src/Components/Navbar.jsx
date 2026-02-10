import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ isActive=false }) => {

  const className = `${isActive ? 'text-orange-400 bg-orange-50 border-l-4' : 'text-gray-600'} flex items-center gap-3 px-4 py-3 rounded-lg font-medium `

  return (
  <div className="fixed left-0 top-0 h-full w-[15%] bg-white border-r border-gray-300 p-6">
    <div className="flex items-center gap-2 mb-12">
        <h1 className='text-4xl font-bold text-gray-800'>Reports</h1>
    </div>

    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold text-gray-400 mb-4 uppercase">Menu</p>
        <nav className="space-y-2">
          <NavLink to="/" className={className}>
            
            Transport Register
          </NavLink >
          <NavLink to="/customerexitreason" className={className}>
          
            Customer Exit Reason
           
          </NavLink>
          <NavLink to="/gofrugalreport" className={className}>
          
            Gofrugal Reports
          </NavLink>
        </nav>
      </div>
    </div>
  </div>
  )
}

export default Navbar