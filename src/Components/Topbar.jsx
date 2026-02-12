import React, { act, useContext, useState } from 'react'
import { TransportRegData } from '../Context/APIData'
import { ChevronDown } from 'lucide-react'

const TopBar = () => {

  const { data, loading, error, timePeriod, setTimePeriod } = useContext(TransportRegData)
  const [active, setActive] = useState(false)

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between mb-6 bg-[#fff] py-4 px-6 rounded-lg shadow-xs">
      <div>
        <h1 className="text-5xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <div className="relative">
        <select
          name=""
          id="time-period"
          value={timePeriod}
          onChange={(e) => {
            setTimePeriod(e.target.value)
          }}
          onClick={() => {
            active ? setActive(false) : setActive(true)
          }}
          className='border-2 text-md font-semibold border-gray-600 py-2 pl-4 pr-10 rounded-lg appearance-none bg-white cursor-pointer'
        >
          <option value="today" className=''>Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last_week">Last Week</option>
          <option value="last_month">Last Month</option>
        </select>
        <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer pointer-events-none w-5 h-5 text-gray-600 ${active ? 'transform rotate-180' : 'transform rotate-0'} duration-200`} />
      </div>
    </div>
  )
}

export default TopBar