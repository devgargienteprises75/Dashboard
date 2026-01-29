import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const AppLayout = () => {
  return (
    <main className='p-4 w-full flex'>
          <Navbar />
          <Outlet />
    </main>
  )
}

export default AppLayout