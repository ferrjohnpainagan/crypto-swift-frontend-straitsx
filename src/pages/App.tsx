import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Header from 'components/Header'
import Stepper from 'components/Stepper'

import BankLogin from './BankLogin'
import CashIn from './CashIn'
import Exchange from './Exchange'
import CashOut from './CashOut'
import Success from './Success'
import SuccessCashIn from './Success/SuccessCashIn'
import SuccessExchange from './Success/SuccessExchange'
import SuccessCashOut from './Success/SuccessCashOut'
import Wallet from './Wallet'
import BankRecipient from './BankRecipient'
import ErrorPage from './Error'
import Title from 'components/Title'

function App() {
  return (
    <div className="m-0 h-screen w-screen bg-defaultBg p-0">
      <Header />
      <div className="mt-14 flex justify-center">
        <Title />
        <div style={{ width: '50vw', height: '55vh' }}>
          <Routes>
            <Route path="/remit">
              <Route path="*" element={<ErrorPage />} />
              <Route path="bank-login" element={<BankLogin />} />
              <Route path="cash-in" element={<CashIn />} />
              <Route path="bank-recipient" element={<BankRecipient />} />
              <Route path="exchange" element={<Exchange />} />
              <Route path="cash-out" element={<CashOut />} />
              <Route path="success">
                <Route path="cash-in" element={<SuccessCashIn />} />
                <Route path="cash-out" element={<SuccessCashOut />} />
                <Route path="exchange" element={<SuccessExchange />} />
              </Route>
            </Route>
            <Route path="/wallet">
              <Route path="home" element={<Wallet />} />
            </Route>
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>

      <Stepper />
    </div>
  )
}

export default App
