import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Header from 'components/Header'
import Stepper from 'components/Stepper'

import BankLogin from './BankLogin'
import CashIn from './CashIn'
import Exchange from './Exchange'
import CashOut from './CashOut'
import Success from './Success'

function App() {
  return (
    <div className="m-0 h-screen w-screen bg-defaultBg p-0">
      <Header />
      <Routes>
        <Route path="/bank-login" element={<BankLogin />} />
        <Route path="/cash-in" element={<CashIn />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/cash-out" element={<CashOut />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Stepper />
    </div>
  )
}

export default App
