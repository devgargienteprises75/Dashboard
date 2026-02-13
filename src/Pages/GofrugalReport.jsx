import React, { useContext, useState } from 'react'
import TopBar from '../Components/Topbar'
import { TransportRegData } from '../Context/APIData'
import Error from '../Components/Error'
import Loading from '../Components/Loading'
import SummaryCards from '../Components/Gofrugal-Reports/SummaryCards'
import SalesOverviewChart from '../Components/Gofrugal-Reports/SalesOverviewChart'
import CounterSaleBillsTable from '../Components/Gofrugal-Reports/CounterSaleBillsTable'
import DiscountedBillsTable from '../Components/Gofrugal-Reports/DiscountedBillsTable'
import SalesReturnSummaryPieChart from '../Components/Gofrugal-Reports/SalesReturnSummaryPieChart'
import SalesReturnTable from '../Components/Gofrugal-Reports/SalesReturnTable'
import SalesReturnSummaryCards from '../Components/Gofrugal-Reports/SalesReturnSummaryCards'
import ChangePriceSummaryCards from '../Components/Gofrugal-Reports/ChangePriceSummaryCards'
import PriceChangeChart from '../Components/Gofrugal-Reports/PriceChangeChart'
import UserPriceChangeTable from '../Components/Gofrugal-Reports/UserPriceChangeTable'
import StockUpdateSummaryCards from '../Components/Gofrugal-Reports/StockUpdateSummaryCards'
import StockUpdateChart from '../Components/Gofrugal-Reports/StockUpdateChart'
import UserStockUpdateTable from '../Components/Gofrugal-Reports/UserStockUpdateTable'
import { ChevronUp } from 'lucide-react'
import ItemPriceChangeTable from '../Components/Gofrugal-Reports/ItemPriceChangeTable'

const SalesRegister = () => {

  const { gfgData, error, timePeriod } = useContext(TransportRegData)
  const [selectedPeriod, setSelectedPeriod] = useState('Sales Register')
  const [active, setActive] = useState(false)
  console.log(gfgData);
  
  // Map shared timePeriod value to keys used in gfgData
  const periodKeyMap = {
    today: 'today',
    yesterday: 'yesterday',
    last_week: 'lastWeek',
    last_month: 'lastMonth',
  }
  const gfgKey = periodKeyMap[timePeriod] || 'today'

  if (!gfgData) {
    return (
      <main className='w-full bg-[#fff] p-3 sm:p-4 lg:p-6'>
        {error && <Error error={error} />}
        <TopBar />
        <Loading />
      </main>
    )
  }

  const periodData = gfgData[gfgKey] || {}
  const salesRegister = periodData.salesRegister || {}
  const salesReturn = periodData.salesReturn || {}
  const changeSellingPrice = periodData.changeSellingPrice || {}
  const stockUpdate = periodData.stockUpdate || {}

  const counterSaleBills = salesRegister.counterSaleBills || []
  const discountedBillNumbers = salesRegister.discountedBillNumbers || []
  const returnDetails = salesReturn.returnDetails || []

  const totalReturns = salesReturn.totalReturns || returnDetails.length || 0
  const totalReturnQty =
    salesReturn.totalQuantity ||
    returnDetails.reduce((sum, r) => sum + (Number(r.quantity) || 0), 0)
  const totalReturnValue =
    salesReturn.totalValue ||
    returnDetails.reduce((sum, r) => sum + (Number(r.value) || 0), 0)

  const totalBills = salesRegister.totalBills || 0
  const counterSaleCount = salesRegister.counterSales || counterSaleBills.length || 0
  const counterSaleAmount = counterSaleBills.reduce((sum, b) => sum + (b.amount || 0), 0)
  const discountedBillsCount = salesRegister.discountedBills || discountedBillNumbers.length || 0
  const totalDiscount = salesRegister.totalDiscount || discountedBillNumbers.reduce((sum, b) => sum + (b.discountAmount || 0), 0)

  // Change Selling Price Data
  const totalChanges = changeSellingPrice.totalChanges || 0
  const priceChangeByUser = changeSellingPrice.byUser || {}
  const priceChangeItems = changeSellingPrice.items || []

  // Stock Update Data  
  const totalStockUpdates = stockUpdate.totalUpdates || 0
  const stockUpdateByUser = stockUpdate.byUser || {}
  const userCount = Object.keys(stockUpdateByUser).length

  // Helper to read mobile/contact field from a bill in a flexible way
  const getBillMobile = (b = {}) =>
    b.mobileNo ||
    b.mobile ||
    b.contactNo ||
    b.contact ||
    b.phone ||
    b.phoneNumber ||
    ''

  const billsWithoutMobile = counterSaleBills.filter((b) => !getBillMobile(b)).length

  // Bills / returns where original bill no. is missing / unknown
  const blankBillNoReturns = returnDetails.filter(r => !r.soldBillNo || r.soldBillNo === 'Unknown')
  const blankBillNoCount = blankBillNoReturns.length

  const chartData = [
    { name: 'Total Bills', value: totalBills },
    { name: 'Counter Sale Bills', value: counterSaleCount },
    { name: 'Discounted Bills', value: discountedBillsCount }
  ]

  const periodLabel = timePeriod ? timePeriod.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/_/g, ' ') : 'selected period'

  const handleTimePeriodChange = (e) => {
    console.log(e.target.value);
    setSelectedPeriod(e.target.value)
  }

  return (
    <main className='w-full bg-[#fff] p-3 sm:p-4 lg:p-6 min-h-screen'>
      {error && <Error error={error} />}
      <TopBar />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedPeriod}
          </h1>
          <p className="text-sm text-gray-500">
            {selectedPeriod === 'Sales Register' && 'Sales register'}
            {selectedPeriod === 'Sales Return' && 'Sales return'}
            {selectedPeriod === 'Change Selling Price' && 'Price change'}
            {selectedPeriod === 'Stock Update' && 'Stock update'}
            {' '}summary for {periodLabel}.
          </p>
        </div>

        <div className="relative inline-block w-full lg:w-auto">
          <select 
            value={selectedPeriod} 
            onChange={handleTimePeriodChange} 
            onClick={() => {
              active ? setActive(false) : setActive(true)
            }}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 cursor-pointer font-medium text-gray-700 hover:bg-gray-50 lg:w-auto"
          >
            <option value="Sales Register">Sales Register</option>
            <option value="Sales Return">Sales Return</option>
            <option value="Change Selling Price">Change Selling Price</option>
            <option value="Stock Update">Stock Update</option>
          </select>
          <ChevronUp className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5 text-gray-600 ${active ? 'transform rotate-0' : 'transform rotate-180'} duration-200`} />
        </div>
      </div>

      {/* Sales Register Dashboard */}
      {selectedPeriod === 'Sales Register' && (
        <>
          <SummaryCards
            totalBills={totalBills}
            counterSaleCount={counterSaleCount}
            counterSaleAmount={counterSaleAmount}
            discountedBillsCount={discountedBillsCount}
            totalDiscount={totalDiscount}
            blankBillNoCount={blankBillNoCount}
          />

          <div className="grid grid-cols-1 gap-4 mt-6 mb-6 xl:grid-cols-3">
            <SalesOverviewChart chartData={chartData} periodLabel={periodLabel} />
            <CounterSaleBillsTable
              counterSaleBills={counterSaleBills}
              getBillMobile={getBillMobile}
              billsWithoutMobile={billsWithoutMobile}
            />
            <DiscountedBillsTable discountedBillNumbers={discountedBillNumbers} />
          </div>
        </>
      )}

      {/* Sales Return Dashboard */}
      {selectedPeriod === 'Sales Return' && (
        <>
          <SalesReturnSummaryCards
            totalReturns={totalReturns}
            totalReturnQty={totalReturnQty}
            totalReturnValue={totalReturnValue}
          />
          <div className="">
            <SalesReturnTable returnDetails={returnDetails} />
          </div>
        </>
      )}

      {/* Change Selling Price Dashboard */}
      {selectedPeriod === 'Change Selling Price' && (
        <>
          <ChangePriceSummaryCards
            totalChanges={totalChanges}
            priceChangeByUser={priceChangeByUser}
          />
          <div className="grid grid-cols-1 gap-4 mt-6 mb-6 xl:grid-cols-3">
            <PriceChangeChart byUser={priceChangeByUser} />
            <UserPriceChangeTable 
              byUser={priceChangeByUser}
              totalChanges={totalChanges}
            />
          </div>
          
          {/* Item-wise Price Change Table */}
          <div className="mt-6">
            <ItemPriceChangeTable items={priceChangeItems} />
          </div>
        </>
      )}

      {/* Stock Update Dashboard */}
      {selectedPeriod === 'Stock Update' && (
        <>
          <StockUpdateSummaryCards
            totalUpdates={totalStockUpdates}
            userCount={userCount}
          />
          <div className="grid grid-cols-1 gap-4 mt-6 mb-6 xl:grid-cols-3">
            <StockUpdateChart byUser={stockUpdateByUser} />
            <UserStockUpdateTable 
              byUser={stockUpdateByUser}
              totalUpdates={totalStockUpdates}
            />
          </div>
        </>
      )}
    </main>
  )
}

export default SalesRegister
