import axios from 'axios'
import Cookies from 'js-cookie'

export const accessToken = Cookies.get('accessToken')

export const fetchWines = () => {
  return axios.get('https://api.winelibrary.wuaze.com/wines?size=50')
}

export const fetchFavorites = () => {
  return axios.get('https://api.winelibrary.wuaze.com/favorite', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const fetchCartItems = () => {
  return axios.get('https://api.winelibrary.wuaze.com/cart', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addToCartServer = (wineId: number) => {
  return axios.post('https://api.winelibrary.wuaze.com/cart', {
    wineId: wineId,
    quantity: 1,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const removeFromCartServer = (wineId: number) => {
  return axios.delete(`https://api.winelibrary.wuaze.com/cart/items/${wineId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addToFavorite = (wineId: number) => {
  return axios.post(`https://api.winelibrary.wuaze.com/favorite/${wineId}`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const deleteFromFavorite = (wineId: number) => {
  return axios.delete(`https://api.winelibrary.wuaze.com/favorite/${wineId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const fetchCities = () => {
  return axios.get('https://api.winelibrary.wuaze.com/cities')
}

export const fetchPostOffices = (city: string) => {
  return axios.get(`https://api.winelibrary.wuaze.com/cities/shipping-address?city=${city}`)
}

export const placeOrder = (orderDetails: any) => {
  return axios.post('https://api.winelibrary.wuaze.com/orders', orderDetails, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const fetchOrders = () => {
  return axios.get('https://api.winelibrary.wuaze.com/orders', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const sendVerification = (phoneNumber: string) => {
  return axios.post('https://api.winelibrary.wuaze.com/verification/send', { phoneNumber }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const verifyCode = (orderId: number, phoneNumber: string, code: string) => {
  return axios.post('https://api.winelibrary.wuaze.com/verification/verify', { orderId, phoneNumber, code })
}

export const createPayment = (orderId: number) => {
  return axios.post(`https://api.winelibrary.wuaze.com/payments/create/${orderId}`)
}

export const fetchWineData = (id: number) => {
  return axios.get(`https://api.winelibrary.wuaze.com/wines/${id}`)
}

export const fetchWineRatings = (id: number) => {
  return axios.get(`https://api.winelibrary.wuaze.com/wines/${id}/ratings`)
}

export const sendUserQuery = (userQuery: string) => {
  return axios.post('https://api.winelibrary.wuaze.com/selection', {
    userQuery: userQuery,
  })
}

export const addFavoritesToCart = () => {
  return axios.post('https://api.winelibrary.wuaze.com/cart/add-favorites', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
