import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type { Cart, CartWine } from '../../types/Cart'
import type { Favorite } from '../../types/Favorite'
import type { Wine } from '../../types/Wine'

export interface State {
  products: Wine[]
  loading: boolean
  favorites: Favorite[]
  cart: Cart
  recentlyViewed: Wine[]
}

const initialState: State = {
  products: [],
  loading: false,
  favorites: [],
  cart: {
    id: 0,
    userId: 0,
    cartItems: [],
  },
  recentlyViewed: [],
}

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Wine[]>) => {
      state.products = action.payload
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setFavorites: (state, action: PayloadAction<Favorite[]>) => {
      state.favorites = action.payload
    },

    addFavorite: (state, action: PayloadAction<Favorite>) => {
      state.favorites.push(action.payload)
    },

    removeFavorite: (state, action: PayloadAction<Favorite['wineId']>) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.wineId !== action.payload,
      )
    },

    setCartItems: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload
    },

    addToCart: (state, action: PayloadAction<CartWine>) => {
      state.cart.cartItems.push(action.payload)
    },

    removeFromCart: (state, action: PayloadAction<CartWine['wineId']>) => {
      state.cart.cartItems = state.cart.cartItems.filter(item => item.wineId !== action.payload)
    },

    removeAllFromCart: (state) => {
      state.cart.cartItems = []
    },

    setRecentlyViewed: (state, action: PayloadAction<Wine[]>) => {
      state.recentlyViewed = action.payload
    },

    addRecentlyViewed: (state, action: PayloadAction<Wine>) => {
      const existingIndex = state.recentlyViewed.findIndex(wine => wine.id === action.payload.id)
      if (existingIndex === -1) {
        state.recentlyViewed.push(action.payload)
      }
      else {
        state.recentlyViewed.splice(existingIndex, 1)
        state.recentlyViewed.push(action.payload)
      }
    },

    addAllFavorites: (state) => {
      const favoriteIds = state.favorites.map(favorite => favorite.wineId)
      favoriteIds.forEach((favoriteId) => {
        if (!state.cart.cartItems.some(item => item.wineId === favoriteId)) {
          state.cart.cartItems.push({
            wineId: favoriteId,
          })
        }
      })
    },
  },
})

export default productsSlice.reducer

export const {
  setProducts,
  setLoading,
  setFavorites,
  addFavorite,
  removeFavorite,
  setCartItems,
  addToCart,
  removeFromCart,
  removeAllFromCart,
  setRecentlyViewed,
  addRecentlyViewed,
  addAllFavorites,
} = productsSlice.actions
