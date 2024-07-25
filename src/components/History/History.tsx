import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import type { DeliveryStatus } from '../../types/DeliveryStatus'

import { fetchOrders } from '../../api/axiosClient'
import { useAppSelector } from '../../store/hooks'
import { HistoryItem } from '../HistoryItem'

interface Order {
  customer: string
  address: string
  id: string
  date: string
  price: number
  status: DeliveryStatus
  icon: string
  orderedItems: Array<{ wineId: number }>
}

export const History = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [accessToken, setAccessToken] = useState(Cookies.get('accessToken'))
  const wines = useAppSelector(state => state.products.products)

  const mapStatus = (status: string): DeliveryStatus => {
    switch (status) {
      case 'PENDING':
        return 'On the road'
      case 'DELIVERED':
        return 'In the post office'
      case 'COMPLETED':
        return 'Completed'
      default:
        return 'On the road'
    }
  }

  const mapIcon = (status: string): string => {
    switch (status) {
      case 'PENDING':
        return 'road'
      case 'DELIVERED':
        return 'post'
      case 'COMPLETED':
        return 'completed'
      default:
        return 'unknown'
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get('accessToken')
      if (newToken !== accessToken) {
        setAccessToken(newToken)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) {
      return
    }

    fetchOrders()
      .then((response) => {
        const fetchedOrders = response.data.map((order: any) => ({
          customer: `${order.firstName} ${order.lastName}`,
          address: `${order.shippingAddress}, ${order.city}`,
          id: order.id,
          date: new Date(order.orderDate).toLocaleDateString(),
          price: order.total,
          status: mapStatus(order.status),
          icon: mapIcon(order.status),
          orderedItems: order.orderItems,
        }))

        setOrders(fetchedOrders)
      })
      .catch(error => console.error('Error fetching orders:', error))
  }, [accessToken])

  if (!accessToken) {
    return (
      <div className="container">
        <div className="history">
          <div className="history__container">
            <div className="history__title">Order history</div>
            <p>Please log in to view your order history.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="history">
        <div className="history__container">
          <div className="history__title">Order history</div>
          {orders.map((order, index) => {
            const orderedWineImages = order.orderedItems
              .map(item => wines.find(wine => wine.id === item.wineId)?.imageUrl)
              .filter(image => image) as string[]
            const wineIds = order.orderedItems
              .map(item => wines.find(wine => wine.id === item.wineId)?.id)
              .filter(id => id) as number[]

            return (
              <HistoryItem
                address={order.address}
                customer={order.customer}
                date={order.date}
                icon={order.icon}
                id={order.id}
                key={index}
                orderItems={orderedWineImages}
                price={order.price}
                status={order.status}
                wineIds={wineIds}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
