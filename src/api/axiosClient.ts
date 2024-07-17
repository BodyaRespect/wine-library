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
