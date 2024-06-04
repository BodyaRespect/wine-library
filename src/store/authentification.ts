import type { PayloadAction } from '@reduxjs/toolkit'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AuthResponse } from '../types/AuthResponse'
import type { AuthState } from '../types/AuthState'
import type { LoginCredentials } from '../types/LoginCredentials'
import type { RegisterDetails } from '../types/RegisterDetails'

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    }
    catch (error) {
      return thunkAPI.rejectWithValue('Network Error')
    }
  },
)

export const register = createAsyncThunk<AuthResponse, RegisterDetails, { rejectValue: string }>(
  'auth/register',
  async (userDetails, thunkAPI) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    }
    catch (error) {
      return thunkAPI.rejectWithValue('Network Error')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.error = null
      })

      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload || 'Failed to login'
      })

      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
        state.error = null
      })

      .addCase(register.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload || 'Failed to register'
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
