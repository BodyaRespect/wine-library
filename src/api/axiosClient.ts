import axios from 'axios'
import Cookies from 'js-cookie'

import type { CommentData } from '../types/Comment'
import type { CommentForm } from '../types/CommentForm'
import type { ProfileData } from '../types/ProfileData'
import type { WineRating } from '../types/WineRating'

export const accessToken = () => Cookies.get('accessToken') || ''

export const fetchWines = () => {
  return axios.get('http://165.227.169.19:5173/wines?size=55')
}

export const fetchFavorites = () => {
  return axios.get('http://165.227.169.19:5173/favorite', {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchCartItems = () => {
  return axios.get('http://165.227.169.19:5173/cart', {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const addToCartServer = (wineId: number) => {
  return axios.post('http://165.227.169.19:5173/cart', {
    wineId: wineId,
    quantity: 1,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const removeFromCartServer = (wineId: number) => {
  return axios.delete(`http://165.227.169.19:5173/cart/items/${wineId}`, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const addToFavorite = (wineId: number) => {
  return axios.post(`http://165.227.169.19:5173/favorite/${wineId}`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const deleteFromFavorite = (wineId: number) => {
  return axios.delete(`http://165.227.169.19:5173/favorite/${wineId}`, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchCities = () => {
  return axios.get('http://165.227.169.19:5173/cities')
}

export const fetchPostOffices = (city: string) => {
  return axios.get(`http://165.227.169.19:5173/cities/shipping-address?city=${city}`)
}

export const placeOrder = (orderDetails: any) => {
  return axios.post('http://165.227.169.19:5173/orders', orderDetails, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchOrders = () => {
  return axios.get('http://165.227.169.19:5173/orders', {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const sendVerification = (phoneNumber: string) => {
  return axios.post('http://165.227.169.19:5173/verification/send', { phoneNumber }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const verifyCode = (orderId: number, phoneNumber: string, code: string) => {
  return axios.post('http://165.227.169.19:5173/verification/verify', { orderId, phoneNumber, code })
}

export const createPayment = (orderId: number) => {
  return axios.post(`http://165.227.169.19:5173/payments/create/${orderId}`)
}

export const fetchWineData = (id: number) => {
  return axios.get(`http://165.227.169.19:5173/wines/${id}`)
}

export const fetchWineRatings = (id: number) => {
  return axios.get<WineRating>(`http://165.227.169.19:5173/wines/${id}/ratings`)
}

export const sendUserQuery = (userQuery: string) => {
  return axios.post('http://165.227.169.19:5173/selection', {
    userQuery: userQuery,
  })
}

export const addFavoritesToCart = () => {
  return axios.post('http://165.227.169.19:5173/cart/add-favorites', {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchComments = (id: string | null) => {
  return axios.get<CommentData[]>(`http://165.227.169.19:5173/wines/${id}/comments`)
}

export const postComment = (id: string | null, formState: CommentForm) => {
  return axios.post(`http://165.227.169.19:5173/wines/${id}/comments`, {
    text: formState.commentText,
    advantages: formState.mainBenefits,
    disadvantages: formState.drawbacks,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const postRating = (id: string | null, rating: number) => {
  return axios.post(`http://165.227.169.19:5173/wines/${id}/ratings`, {
    rating: rating,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const likeComment = (commentId: number) => {
  return axios.post(`http://165.227.169.19:5173/wines/comments/${commentId}/like`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const dislikeComment = (commentId: number) => {
  return axios.post(`http://165.227.169.19:5173/wines/comments/${commentId}/dislike`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const getProfileInfo = (token: string) => {
  return axios.get<ProfileData>('http://165.227.169.19:5173/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updatePasswordServer = (currentPassword: string, password: string, repeatedPassword: string) => {
  return axios.put('http://165.227.169.19:5173/users/update-password', {
    currentPassword,
    password,
    repeatedPassword,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const updateNameServer = (firstName: string) => {
  return axios.patch('http://165.227.169.19:5173/users/me/update/first-name', {
    firstName,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const updateLastNameServer = (lastName: string) => {
  return axios.patch('http://165.227.169.19:5173/users/me/update/last-name', {
    lastName,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}
