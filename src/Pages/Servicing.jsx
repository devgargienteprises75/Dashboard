import React, { useContext, useState } from 'react'
import TopBar from '../Components/TopBar'
import { TransportRegData } from '../Context/APIData'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import ServiceSummaryCards from '../Components/Servicing/ServiceSummaryCards'
import ServiceStatusChart from '../Components/Servicing/ServiceStatusChart'
import WarrantyChart from '../Components/Servicing/WarrantyChart'
import ServiceItemsTable from '../Components/Servicing/ServiceItemsTable'
import { ChevronUp } from 'lucide-react'

const Servicing = () => {
  const { servicingData, error, timePeriod } = useContext(TransportRegData)
  const [active, setActive] = useState(false)
  console.log(servicingData);
  

  // Map shared timePeriod value to keys used in serviceData
  const periodKeyMap = {
    today: 'today',
    yesterday: 'yesterday',
    last_week: 'lastWeek',
    last_month: 'lastMonth',
  }
  const serviceKey = periodKeyMap[timePeriod] || 'today'

  if (!servicingData) {
    return (
      <main className='w-[85%] bg-[#fff] absolute right-0 p-6'>
        {error && <Error error={error} />}
        <TopBar />
        <Loading />
      </main>
    )
  }

  const serviceData = servicingData.summary?.[serviceKey] || {}
  
  const totalReceipts = serviceData.totalReceipts || 0
  const resolved = serviceData.resolved || 0
  const pending = serviceData.pending || 0
  const warranty = serviceData.warranty || { yes: 0, no: 0 }
  const totalAmount = serviceData.totalAmount || 0
  const byStatus = serviceData.byStatus || {}
  const items = serviceData.items || []

  const periodLabel = timePeriod
    ? timePeriod.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/_/g, ' ')
    : 'selected period'

  return (
    <main className='w-[85%] bg-[#fff] absolute right-0 p-6 min-h-screen'>
      {error && <Error error={error} />}
      <TopBar />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Service & Repair</h1>
          <p className="text-sm text-gray-500">
            Service and repair summary for {periodLabel}.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <ServiceSummaryCards
        totalReceipts={totalReceipts}
        resolved={resolved}
        pending={pending}
        warranty={warranty}
        totalAmount={totalAmount}
      />

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mt-6 mb-6">
        <ServiceStatusChart byStatus={byStatus} totalReceipts={totalReceipts} />
        <WarrantyChart warranty={warranty} />
      </div>

      {/* Items Table */}
      <div className="mt-6">
        <ServiceItemsTable items={items} />
      </div>
    </main>
  )
}

export default Servicing