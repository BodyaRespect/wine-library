import axios from 'axios'
import Cookies from 'js-cookie'

import type { CommentData } from '../types/Comment'
import type { CommentForm } from '../types/CommentForm'
import type { ProfileData } from '../types/ProfileData'
import type { WineRating } from '../types/WineRating'

export const accessToken = () => Cookies.get('accessToken') || ''

export const fetchWines = () => {
  return axios.get('https://cuber.me/wines?size=55')
}

export const fetchFavorites = () => {
  return axios.get('https://cuber.me/favorite', {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchCartItems = () => {
  return axios.get('https://cuber.me/cart', {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const addToCartServer = (wineId: number) => {
  return axios.post('https://cuber.me/cart', {
    wineId: wineId,
    quantity: 1,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const removeFromCartServer = (wineId: number) => {
  return axios.delete(`https://cuber.me/cart/items/${wineId}`, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const addToFavorite = (wineId: number) => {
  return axios.post(`https://cuber.me/favorite/${wineId}`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const deleteFromFavorite = (wineId: number) => {
  return axios.delete(`https://cuber.me/favorite/${wineId}`, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchCities = () => {
  return axios.get('https://cuber.me/cities')
}

export const fetchPostOffices = (city: string) => {
  return axios.get(`https://cuber.me/cities/shipping-address?city=${city}`)
}

export const placeOrder = (orderDetails: any) => {
  return axios.post('https://cuber.me/orders', orderDetails, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchOrders = () => {
  return axios.get('https://cuber.me/orders', {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const sendVerification = (phoneNumber: string) => {
  return axios.post('https://cuber.me/verification/send', { phoneNumber }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const verifyCode = (orderId: number, phoneNumber: string, code: string) => {
  return axios.post('https://cuber.me/verification/verify', { orderId, phoneNumber, code })
}

export const createPayment = (orderId: number) => {
  return axios.post(`https://cuber.me/payments/create/${orderId}`)
}

export const fetchWineData = (id: number) => {
  return axios.get(`https://cuber.me/wines/${id}`)
}

export const fetchWineRatings = (id: number) => {
  return axios.get<WineRating>(`https://cuber.me/wines/${id}/ratings`)
}

export const sendUserQuery = (userQuery: string) => {
  return axios.post('https://cuber.me/selection', {
    userQuery: userQuery,
  })
}

export const addFavoritesToCart = () => {
  return axios.post('https://cuber.me/cart/add-favorites', {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const fetchComments = (id: string | null) => {
  return axios.get<CommentData[]>(`https://cuber.me/wines/${id}/comments`)
}

export const postComment = (id: string | null, formState: CommentForm) => {
  return axios.post(`https://cuber.me/wines/${id}/comments`, {
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
  return axios.post(`https://cuber.me/wines/${id}/ratings`, {
    rating: rating,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const likeComment = (commentId: number) => {
  return axios.post(`https://cuber.me/wines/comments/${commentId}/like`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const dislikeComment = (commentId: number) => {
  return axios.post(`https://cuber.me/wines/comments/${commentId}/dislike`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const getProfileInfo = (token: string) => {
  return axios.get<ProfileData>('https://cuber.me/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const updatePasswordServer = (currentPassword: string, password: string, repeatedPassword: string) => {
  return axios.put('https://cuber.me/users/update-password', {
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
  return axios.patch('https://cuber.me/users/me/update/first-name', {
    firstName,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}

export const updateLastNameServer = (lastName: string) => {
  return axios.patch('https://cuber.me/users/me/update/last-name', {
    lastName,
  }, {
    headers: {
      Authorization: `Bearer ${accessToken()}`,
    },
  })
}
