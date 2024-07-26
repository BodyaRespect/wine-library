import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { DeliveryStatus } from '../../types/DeliveryStatus'

interface Props {
  customer: string
  address: string
  id: string
  date: string
  price: number
  status: DeliveryStatus
  icon: string
  orderItems: string[]
  wineIds: number[]
}

export const HistoryItem: React.FC<Props> = ({ customer, address, id, date, price, status, icon, orderItems, wineIds }) => {
  const [isWinesVisible, setIsWinesVisible] = useState(false)
  const navigate = useNavigate()

  const toggleWinesVisibility = () => {
    setIsWinesVisible(!isWinesVisible)
  }

  return (
    <div className="history__item">
      <div className="history__item-info">
        <div className="history__item-info-customer">{customer}</div>
        <div className="history__item-info-address">{address}</div>
        <div className="history__item-info-id">
          ID:
          {' '}
          {id}
        </div>
      </div>

      <div className="history__item-order">
        <div className="history__item-order-container">
          <div className="history__item-order-date">{date}</div>
          <div className="history__item-order-price">
            {price}
            $
          </div>
        </div>

        <div className="history__item-ship-container">
          <div
            className={`history__item-ship-${isWinesVisible ? 'less' : 'more'}`}
            onClick={toggleWinesVisibility}
          >
          </div>

          <div className="history__item-ship-status" style={icon === 'post' ? { color: '#872031' } : {}}>
            <div className={`history__item-ship-status-${icon}`}></div>
            {status}
          </div>
        </div>
      </div>

      <div className={`history__item-wines ${isWinesVisible ? 'visible' : ''}`}>
        {orderItems.map((wineImage, index) => (
          <img
            alt="Wine"
            key={index}
            onClick={() => navigate(`/wine-library/productdetails/${wineIds[index]}`)}
            src={wineImage}
          />
        ))}
      </div>
    </div>
  )
}
