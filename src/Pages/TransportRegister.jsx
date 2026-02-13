import React, { useContext, useState } from 'react'
import { TransportRegData } from '../Context/APIData'
import Card from '../Components/Transport-register/Card';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import TopBar from '../Components/Topbar';
import DailyPerformanceChart from '../Components/Transport-register/DailyPerformanceChart';
import PendingTasks from '../Components/Transport-register/PendingTasks';
import { ProductSalesChart, TrafficChart } from '../Components/Transport-register/PieCharts';
import Modal from '../Components/Transport-register/Modal';

const TransportRegister = () => {

    const { transportRegData, loading, error, timePeriod } = useContext(TransportRegData);

  return (
    <div className='w-full bg-[#fff] p-3 sm:p-4 lg:p-6'>
      {error && <Error error={error} />}
        <TopBar />
        {transportRegData ? (
          <div className="crds mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Card title="Bill Received" value={transportRegData && transportRegData[0]?.bills_received?.[timePeriod]} index={0}/>
            <Card title="Handover to Purchase" value={transportRegData && transportRegData[0]?.handover_to_purchase?.[timePeriod]} index={1}/>
            <Card title="MR generate" value={transportRegData && transportRegData[0]?.mr_created?.[timePeriod]} index={2}/>
            <Card title="Handover to Accounts" value={transportRegData && transportRegData[0]?.handover_to_accounts?.[timePeriod]} index={3}/>
            <Card title="Voucher Created" value={transportRegData && transportRegData[0]?.voucher_created?.[timePeriod]} index={4}/>
          </div>
        ) : <Loading />}
      <div className="charts grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DailyPerformanceChart transportRegData={transportRegData} className="xl:col-span-2"/>
        <PendingTasks transportRegData={transportRegData} className="xl:row-span-2"/>
        <ProductSalesChart transportRegData={transportRegData}/>
        <TrafficChart transportRegData={transportRegData}/>
      </div>
    </div>
  )
}

export default TransportRegister;
