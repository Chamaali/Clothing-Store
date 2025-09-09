import React from 'react'
import AdminNavBar from '../../components/admin navigation/AdminNavBar'
import OrdersCard from '../../components/AdminDashBoard/OrdersCard'

function OdersDetails() {
  return (
    <div>
      <AdminNavBar />
      <div className='sm:px-10 max-sm:px-4 lg:px-20'>
        <div className='grid lg:grid-cols-2 gap-8 mt-[12vh] 2xl:grid-cols-3'>
          <OrdersCard />
          <OrdersCard />
          <OrdersCard />
          <OrdersCard />
          <OrdersCard />
          <OrdersCard />
        </div>
      </div>
      
    </div>
  )
}

export default OdersDetails