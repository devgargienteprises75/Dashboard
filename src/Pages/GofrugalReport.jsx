import React, { useContext } from 'react'
import TopBar from '../Components/TopBar'
import { TransportRegData } from '../Context/APIData'

const GofrugalReport = () => {

  const { gfgData, timePeriod} = useContext(TransportRegData)
  console.log(gfgData);
  
  return (
    <main className='w-[85%] bg-[#f1f1f1] absolute right-0 p-6 min-h-screen'>
      <TopBar />
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Gofrugal Report</h1>
      </div>
    </main>
  )
}

export default GofrugalReport