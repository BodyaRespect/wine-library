import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

interface ProfileState {
  email: string
  firstName: string
  lastName: string
}

const initialState: ProfileState = {
  email: '',
  firstName: '',
  lastName: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload
    },
  },
})

export const { setEmail, setFirstName, setLastName } = profileSlice.actions

export default profileSlice.reducer
