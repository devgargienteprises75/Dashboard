import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Pages/AppLayout'
import CustomerExitReason from './Pages/CustomerExitReason'
import TransportRegister from './Pages/TransportRegister'
import GofrugalReport from './Pages/GofrugalReport'
import Servicing from './Pages/Servicing'

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <TransportRegister />
        },
        {
          path: "/customerexitreason",
          element: <CustomerExitReason />
        },
        {
          path: "/gofrugalreports",
          element: <GofrugalReport />
        },
        {
          path: "/servicing",
          element: <Servicing />
        }
      ]
    }
  ])

  return (
    <main className='min-h-screen bg-[#f1f1f1]'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App;