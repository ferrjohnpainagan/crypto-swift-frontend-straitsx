import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Header from 'components/Header'
import BankLogin from './BankLogin'

function App() {
  return (
    <div className="m-0 h-screen w-screen bg-defaultBg p-0">
      <Header />
      <Routes>
        <Route path="/bank-login" element={<BankLogin />} />
      </Routes>
    </div>
  )
}

export default App
