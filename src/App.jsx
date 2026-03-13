import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import AppLayout from './Pages/AppLayout'
import CustomerExitReason from './Pages/CustomerExitReason'
import TransportRegister from './Pages/TransportRegister'
import GofrugalReport from './Pages/GofrugalReport'
import Servicing from './Pages/Servicing'
import ReactGa from 'react-ga4'

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

  const location = useLocation()

  useEffect(() => {
    ReactGa.send({
      hitType: 'pageview',
      page: location.pathname
    }, [location])
  })

  return (
    <main className='min-h-screen bg-[#f1f1f1]'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App;