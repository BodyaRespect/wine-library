import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface State {
  viewportWidth: number
}

const initialState: State = {
  viewportWidth: window.innerWidth,
}

const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    setViewportWidth: (state, action: PayloadAction<number>) => {
      state.viewportWidth = action.payload
    },
  },
})

export default viewportSlice.reducer
export const { actions } = viewportSlice
