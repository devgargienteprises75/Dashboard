import React, { useContext } from 'react'
import { TransportRegData } from '../Context/APIData'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import Card from '../Components/Cer/Card'
import DailyPerformanceChart from '../Components/Cer/DailyPerformanceChart'
import TopCards from '../Components/Cer/TopCards'
import SalesmanChart from '../Components/Cer/SalesmanChart'
import FloorChart from '../Components/Cer/FloorChart'
import ReasonChart from '../Components/Cer/ReasonChart'
import TopBar from '../Components/TopBar'
const CustomerExitReason = () => {

  const { cerData, loading, error, timePeriod } = useContext(TransportRegData)
  console.log(cerData);
  

  // pick the first non-empty object from cerData (handles arrays where first item might be empty)
  const getFirstData = (arr) => {
    if (!arr) return null
    if (!Array.isArray(arr)) return arr
    for (const item of arr) {
      if (item && typeof item === 'object' && Object.keys(item).length > 0) return item
    }
    return null
  }
  const dataObj = getFirstData(cerData)

  // helper to convert nested/varied values into a safe number or null
  const toNumber = (v) => {
    if (v == null) return null
    if (typeof v === 'number') return v
    if (typeof v !== 'object') {
      const n = Number(v)
      return Number.isFinite(n) ? n : null
    }
    if (timePeriod && Object.prototype.hasOwnProperty.call(v, timePeriod)) return toNumber(v[timePeriod])
    const numbers = Object.values(v).flat(Infinity).filter(x => typeof x === 'number')
    return numbers.length ? numbers.reduce((a, b) => a + b, 0) : null
  }

  const getTopLabel = (obj, keywords = []) => {
    if (!obj) return '—'
    const key = Object.keys(obj).find(k => keywords.some(kw => k.toLowerCase().includes(kw)))
    if (!key) return '—'
    const val = obj[key]
    if (val && typeof val === 'object') {
      const entries = Object.entries(val).map(([name, v]) => [name, toNumber(v) || 0])
      entries.sort((a, b) => b[1] - a[1])
      return entries[0] ? entries[0][0].replace(/_/g, ' ') : key.replace(/_/g, ' ')
    }
    return key.replace(/_/g, ' ')
  }

  return (
    <div className='w-[85%] bg-[#fff] absolute right-0 p-6'>
      {error && <Error error={error}/>}
      <TopBar />
      {cerData ? (
        <>
          {/* Top summary cards — compute totals heuristically */}
          <TopCards summary={{
            totalExits: (toNumber(dataObj?.total_exits) ?? toNumber(dataObj?.customer_exits)) ?? '0',
          }} />

          <div className="charts grid grid-cols-3 h-[80vh] grid-rows-2 gap-4">
            <DailyPerformanceChart cerData={cerData} className="col-span-2" />
            <SalesmanChart cerData={cerData} className="col-span-2" />
            <FloorChart cerData={cerData} />
            <ReasonChart cerData={cerData} />
          </div>
        </>
      ) : <Loading />}

    </div>
  )
}

export default CustomerExitReason