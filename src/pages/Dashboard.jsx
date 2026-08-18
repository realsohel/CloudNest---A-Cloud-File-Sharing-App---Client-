import { UserButton, UserProfile } from '@clerk/react'
import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'

const Dashboard = () => {
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="">
        Dashboard Content
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
