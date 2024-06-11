import React from 'react'
import DashboardLayout from 'DashboardLayout/DashboardLayout'
import MessageTable from './components/UserMessageTable/MessageTable'

const FeedBack = () => {
  return (
    <DashboardLayout title='Feedback'>
        <MessageTable/>
         <h1>Hellow Feedback Page</h1>
    </DashboardLayout>
  )
}

export default FeedBack
