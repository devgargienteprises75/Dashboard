import React, { useContext, useState } from 'react'
import { TransportRegData } from '../Context/TransportReg'
import Card from '../Components/Card';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import TopBar from '../Components/TopBar';
import RevenueChart from '../Components/DailyPerformanceChart';
import DailyPerformanceChart from '../Components/DailyPerformanceChart';
import PendingTasks from '../Components/PendingTasks';
import { ProductSalesChart, TrafficChart } from '../Components/PieCharts';
import Modal from '../Components/Modal';

const TransportRegister = () => {

    const { data, loading, error, timePeriod } = useContext(TransportRegData);

  return (
    <div className='w-[85%] bg-[#f1f1f1] absolute right-0 p-6'>
      {error && <Error error={error} />}
        <TopBar />
        {data ? (
          <div className="cards flex justify-between mb-4">
            <Card title="Bill Received" value={data && data[0]?.bills_received?.[timePeriod]}/>
            <Card title="Handover to Purchase" value={data && data[0]?.handover_to_purchase?.[timePeriod]}/>
            <Card title="MR generate" value={data && data[0]?.mr_created?.[timePeriod]}/>
            <Card title="Handover to Accounts" value={data && data[0]?.handover_to_accounts?.[timePeriod]}/>
            <Card title="Voucher Created" value={data && data[0]?.voucher_created?.[timePeriod]}/>
          </div>
        ) : <Loading />}
      <div className="charts grid grid-cols-3 h-[80vh] grid-rows-2 gap-4">
        <DailyPerformanceChart data={data} className="col-span-2"/>
        <PendingTasks data={data} className="row-span-2"/>
        <ProductSalesChart data={data}/>
        <TrafficChart data={data}/>
      </div>
    </div>
  )
}

export default TransportRegister;