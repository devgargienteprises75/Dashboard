import React, { useContext, useState } from 'react'
import { TransportRegData } from '../Context/APIData'
import Card from '../Components/Transport-register/Card';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import TopBar from '../Components/TopBar';
import DailyPerformanceChart from '../Components/Transport-register/DailyPerformanceChart';
import PendingTasks from '../Components/Transport-register/PendingTasks';
import { ProductSalesChart, TrafficChart } from '../Components/Transport-register/PieCharts';
import Modal from '../Components/Transport-register/Modal';

const TransportRegister = () => {

    const { transportRegData, loading, error, timePeriod } = useContext(TransportRegData);

  return (
    <div className='w-[85%] bg-[#f1f1f1] absolute right-0 p-6'>
      {error && <Error error={error} />}
        <TopBar />
        {transportRegData ? (
          <div className="crds flex justify-between mb-4">
            <Card title="Bill Received" value={transportRegData && transportRegData[0]?.bills_received?.[timePeriod]}/>
            <Card title="Handover to Purchase" value={transportRegData && transportRegData[0]?.handover_to_purchase?.[timePeriod]}/>
            <Card title="MR generate" value={transportRegData && transportRegData[0]?.mr_created?.[timePeriod]}/>
            <Card title="Handover to Accounts" value={transportRegData && transportRegData[0]?.handover_to_accounts?.[timePeriod]}/>
            <Card title="Voucher Created" value={transportRegData && transportRegData[0]?.voucher_created?.[timePeriod]}/>
          </div>
        ) : <Loading />}
      <div className="charts grid grid-cols-3 h-[80vh] grid-rows-2 gap-4">
        <DailyPerformanceChart transportRegData={transportRegData} className="col-span-2"/>
        <PendingTasks transportRegData={transportRegData} className="row-span-2"/>
        <ProductSalesChart transportRegData={transportRegData}/>
        <TrafficChart transportRegData={transportRegData}/>
      </div>
    </div>
  )
}

export default TransportRegister;