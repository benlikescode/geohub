import { createSlice } from '@reduxjs/toolkit'

type MapMaker = {
  coverageOpacity: number
}

const initialState: MapMaker = {
  coverageOpacity: 1,
}

export const mapMakerSlice = createSlice({
  name: 'map-maker',
  initialState,
  reducers: {
    setCoverageOpacity: (state, action) => {
      state.coverageOpacity = action.payload
    },
  },
})

export const { setCoverageOpacity } = mapMakerSlice.actions

export default mapMakerSlice.reducer
