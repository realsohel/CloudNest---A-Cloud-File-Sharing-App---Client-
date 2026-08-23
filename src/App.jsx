import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Landing from './pages/Landing'
import PublicFileView from './pages/PublicFileView'
import Subscription from './pages/Subscription'
import Uploads from './pages/Uploads'
import Dashboard from './pages/Dashboard'
import MyFiles from './pages/MyFiles'
import Transaction from './pages/Transaction'
import ProtectedLayout from './layout/ProtectedLayout'
import { RedirectToSignIn } from '@clerk/react'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path="/" element={<Landing />} />

      <Route element={<ProtectedLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-files" element={<MyFiles />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/uploads" element={<Uploads />} />
      
      </Route>

      <Route path='/file/:fileId' element={<PublicFileView/>}/>
      <Route path='/*' element={<RedirectToSignIn/>}/>

    </Routes>
  )
}

export default App
