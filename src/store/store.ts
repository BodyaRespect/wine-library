import type { Action, ThunkAction } from '@reduxjs/toolkit'

import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/authentification'
import productsSlice from './reducers/products'
import profileSlice from './reducers/profile'
import viewportSlice from './reducers/viewport'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsSlice,
    viewport: viewportSlice,
    profile: profileSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
