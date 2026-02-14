import React, { useContext } from 'react'
import { TransportRegData } from '../Context/APIData'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import DailyPerformanceChart from '../Components/Cer/DailyPerformanceChart'
import TopCards from '../Components/Cer/TopCards'
import SalesmanChart from '../Components/Cer/SalesmanChart'
import FloorChart from '../Components/Cer/FloorChart'
import ReasonChart from '../Components/Cer/ReasonChart'
import TopBar from '../Components/TopBar'

const CustomerExitReason = () => {
  const { cerData, error, timePeriod } = useContext(TransportRegData)

  const getFirstData = (arr) => {
    if (!arr) return null
    if (!Array.isArray(arr)) return arr
    for (const item of arr) {
      if (item && typeof item === 'object' && Object.keys(item).length > 0) return item
    }
    return null
  }

  const dataObj = getFirstData(cerData)

  const toNumber = (value) => {
    if (value == null) return null
    if (typeof value === 'number') return value
    if (typeof value !== 'object') {
      const n = Number(value)
      return Number.isFinite(n) ? n : null
    }
    if (timePeriod && Object.prototype.hasOwnProperty.call(value, timePeriod)) {
      return toNumber(value[timePeriod])
    }
    const numbers = Object.values(value).flat(Infinity).filter((x) => typeof x === 'number')
    return numbers.length ? numbers.reduce((a, b) => a + b, 0) : null
  }

  return (
    <div className='w-full bg-[#fff] p-3 sm:p-4 lg:p-6'>
      {error && <Error error={error} />}
      <TopBar />
      {cerData ? (
        <>
          <TopCards
            summary={{
              totalExits: (toNumber(dataObj?.total_exits) ?? toNumber(dataObj?.customer_exits)) ?? '0'
            }}
          />

          <div className='charts grid grid-cols-1 gap-4 xl:grid-cols-3'>
            <DailyPerformanceChart cerData={cerData} className='xl:col-span-2' />
            <SalesmanChart cerData={cerData} className='xl:row-span-2' />
            <FloorChart cerData={cerData} />
            <ReasonChart cerData={cerData} />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default CustomerExitReason
