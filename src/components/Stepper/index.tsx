import React from 'react'
import { useLocation } from 'react-router-dom'

const Stepper = () => {
  const location = useLocation()
  const currentPath = location.pathname.substring(1)
  const steps = ['bank-login', 'cash-in', 'exchange', 'cash-out', 'success']
  const getIndex = (step: string) => {
    let stepIndex
    steps.map((value, index) => {
      if (value.includes(step)) {
        stepIndex = index
      }
    })
    return stepIndex
  }

  const isBefore = (step: string) => {
    const currentPathIndex = getIndex(currentPath)
    const stepIndex = getIndex(step)

    return currentPathIndex > stepIndex
  }

  const styleStep = (step: string) => {
    switch (true) {
      case currentPath.includes(step):
        return 'active'
      case isBefore(step):
        return 'isBefore'
      default:
        return 'inactive'
    }
  }
  return (
    <div>
      <div className="mx-4 p-4">
        <div className="flex items-center">
          <div className="relative flex items-center">
            <div
              style={{ width: '30px', height: '30px' }}
              className={`text-md flex h-8 w-8 justify-center rounded-full border-2 ${
                styleStep('bank-login') === 'active'
                  ? 'border-gray1 bg-gray1'
                  : 'border-blue1 bg-blue1'
              } text-white`}
            >
              1
            </div>
            <div
              className={`text-md absolute top-0 -ml-10 mt-16 w-32 text-center font-roboto font-bold ${
                styleStep('bank-login') === 'active'
                  ? 'text-gray1'
                  : 'text-blue1'
              }`}
            >
              Log in to bank account
            </div>
          </div>
          <div
            className={`flex-auto border-t-8 border-b-2 ${
              styleStep('cash-in') === 'active' ||
              styleStep('cash-in') === 'isBefore'
                ? 'border-blue1'
                : 'border-gray2'
            } `}
          ></div>
          <div className={`relative flex items-center`}>
            <div
              style={{ width: '30px', height: '30px' }}
              className={`text-md flex h-8 w-8 justify-center rounded-full border-2 ${
                styleStep('cash-in') === 'active'
                  ? 'border-gray1 bg-gray1'
                  : styleStep('cash-in') === 'inactive'
                  ? 'border-gray3 bg-gray3'
                  : 'border-blue1 bg-blue1'
              } text-white`}
            >
              2
            </div>
            <div
              className={`text-md absolute top-0 -ml-10 mt-16 w-32 text-center font-roboto font-bold ${
                styleStep('cash-in') === 'active'
                  ? 'text-gray1'
                  : styleStep('cash-in') === 'inactive'
                  ? 'text-gray3'
                  : 'text-blue1'
              }`}
            >
              Cash-in
            </div>
          </div>
          <div
            className={`flex-auto border-t-8 border-b-2 ${
              styleStep('exchange') === 'active' ||
              styleStep('cash-in') === 'isBefore'
                ? 'border-blue1'
                : 'border-gray2'
            }`}
          ></div>
          <div className="relative flex items-center">
            <div
              style={{ width: '30px', height: '30px' }}
              className={`text-md flex h-8 w-8 justify-center rounded-full border-2 ${
                styleStep('exchange') === 'active'
                  ? 'border-gray1 bg-gray1'
                  : styleStep('exchange') === 'inactive'
                  ? 'border-gray3 bg-gray3'
                  : 'border-blue1 bg-blue1'
              } text-white`}
            >
              3
            </div>
            <div
              className={`text-md absolute top-0 -ml-10 mt-16 w-32 text-center font-roboto font-bold ${
                styleStep('exchange') === 'active'
                  ? 'text-gray1'
                  : styleStep('exchange') === 'inactive'
                  ? 'text-gray3'
                  : 'text-blue1'
              }`}
            >
              Exchange
            </div>
          </div>
          <div
            className={`flex-auto border-t-8 border-b-2 ${
              styleStep('cash-out') === 'active' ||
              styleStep('cash-out') === 'isBefore'
                ? 'border-blue1'
                : 'border-gray2'
            }`}
          ></div>
          <div className="relative flex items-center">
            <div
              style={{ width: '30px', height: '30px' }}
              className={`text-md flex h-8 w-8 justify-center rounded-full border-2 ${
                styleStep('cash-out') === 'active'
                  ? 'border-gray1 bg-gray1'
                  : styleStep('cash-out') === 'inactive'
                  ? 'border-gray3 bg-gray3'
                  : 'border-blue1 bg-blue1'
              } text-white`}
            >
              4
            </div>
            <div
              className={`text-md absolute top-0 -ml-10 mt-16 w-32 text-center font-roboto font-bold ${
                styleStep('cash-out') === 'active'
                  ? 'text-gray1'
                  : styleStep('cash-out') === 'inactive'
                  ? 'text-gray3'
                  : 'text-blue1'
              }`}
            >
              Cash-out
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stepper
