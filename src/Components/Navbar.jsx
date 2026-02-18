import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const getClassName = ({ isActive }) =>
    `${isActive ? 'text-orange-500 bg-orange-50 border-orange-400 border-l-10' : 'text-gray-600 hover:bg-gray-100'}  border px-3 py-2 lg:px-4 lg:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors`

  return (
    <aside className="w-full border-b border-gray-300 bg-white px-4 py-4 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
      <div className="mb-4 lg:mb-12">
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800'>Reports</h1>
      </div>

      <div className="space-y-4 lg:space-y-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-3 lg:mb-4 uppercase">Menu</p>
          <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
            <NavLink to="/" className={getClassName}>
              Transport Register
            </NavLink>
            <NavLink to="/customerexitreason" className={getClassName}>
              Customer Exit Reason
            </NavLink>
            <NavLink to="/gofrugalreports" className={getClassName}>
              Gofrugal Reports
            </NavLink>
            <NavLink to="/servicing" className={getClassName}>
              Servicing
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Navbar
