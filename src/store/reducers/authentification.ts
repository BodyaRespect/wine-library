import type { PayloadAction } from '@reduxjs/toolkit'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import type { AuthResponse } from '../../types/AuthResponse'
import type { AuthState } from '../../types/AuthState'
import type { LoginCredentials } from '../../types/LoginCredentials'
import type { RegisterDetails } from '../../types/RegisterDetails'

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
}

export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://api.winelibrary.wuaze.com/auth/sign-in', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message || 'Failed to login')
      }
      return thunkAPI.rejectWithValue('Network Error')
    }
  },
)

export const register = createAsyncThunk<AuthResponse, RegisterDetails, { rejectValue: string }>(
  'auth/register',
  async (userDetails, thunkAPI) => {
    try {
      const response = await axios.post('http://api.winelibrary.wuaze.com/auth/register', userDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Registration error')
      }

      return response.data
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message || 'Network error')
      }
      else {
        return thunkAPI.rejectWithValue('Unknown error')
      }
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
