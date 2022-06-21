import React from 'react'
import RightChevron from '../../assets/right-chevron.svg'

const CurrentExchangeIcons = ({ sell, buy, currencies }) => {
  const renderIcon = (type: string) => {
    let icon: any
    currencies.map((item) => {
      if (item.currency === type) {
        icon = item.image
      } else {
        icon
      }
    })
    return icon
  }

  return (
    <div className="flex items-center">
      <img src={renderIcon(sell.currency)} className="rounded-full shadow-md" />
      <img src={RightChevron} className="mx-4" />
      <img src={renderIcon(buy.currency)} className="rounded-full shadow-md" />
    </div>
  )
}

export default CurrentExchangeIcons
