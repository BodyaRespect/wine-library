import type { DeliveryStatus } from '@/types/DeliveryStatus'

import { accessToken } from '@/api/axiosClient'
import { useAppSelector } from '@/store/hooks'
import axios from 'axios'
import { useEffect, useState } from 'react'

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
    axios.get('http://api.winelibrary.wuaze.com/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
  }, [])

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
              .filter(image => image) as number[]

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
