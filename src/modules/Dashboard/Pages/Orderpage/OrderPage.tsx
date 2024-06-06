import DashboardLayout from 'DashboardLayout/DashboardLayout'
import OrderPlace from 'components/OrdersRecords/Index'
import React from 'react'

const OrderPage = () => {
  return (
    <DashboardLayout title='Orders Records'>
      <OrderPlace/>
    </DashboardLayout>
  )
}

export default OrderPage
