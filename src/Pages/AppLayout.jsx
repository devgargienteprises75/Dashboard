import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const AppLayout = () => {
  return (
    <main className='min-h-screen w-full bg-gray-50 lg:pl-64'>
      <Navbar />
      <div className='w-full'>
        <Outlet />
      </div>
    </main>
  )
}

export default AppLayout
