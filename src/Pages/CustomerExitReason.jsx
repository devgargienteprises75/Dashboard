import React, { useContext } from 'react'
import TopBar from '../Components/TopBar'
import { TransportRegData } from '../Context/APIData'
import CerCards from '../Components/Customer-exit/CerCards'
import CerCharts from '../Components/Customer-exit/CerCharts'

const CustomerExitReason = () => {

  const { cerData, timePeriod } = useContext(TransportRegData)

  return (
    <div className='w-[85%] bg-[#f1f1f1] absolute right-0 p-6 min-h-screen'>
      <TopBar />
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Customer Exit Analysis</h1>

        <CerCards cerData={cerData} timePeriod={timePeriod} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CerCharts cerData={cerData} timePeriod={timePeriod} />
        </div>
      </div>
    </div>
  )
}

export default CustomerExitReason