import { createSlice } from '@reduxjs/toolkit'
import { LocationType, MapType } from '@types'

type MapMaker = {
  locations: LocationType[]
  selectedMarkerIdx: number
  showPreviewMap: boolean
  mapDetails?: MapType
  lastSave?: Date
  changes: ChangesType
}

type ChangesType = {
  additions: number
  modifications: number
  deletions: number
}

const initialState: MapMaker = {
  locations: [],
  selectedMarkerIdx: -1,
  showPreviewMap: false,
  changes: { additions: 0, modifications: 0, deletions: 0 },
}

export const mapMakerSlice = createSlice({
  name: 'map-maker',
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload
    },
    setSelectedMarkerIdx: (state, action) => {
      state.selectedMarkerIdx = action.payload
    },
    setShowPreviewMap: (state, action) => {
      state.showPreviewMap = action.payload
    },
    setMapDetails: (state, action) => {
      state.mapDetails = action.payload
    },
    setLastSave: (state, action) => {
      state.lastSave = action.payload
    },
    setChanges: (state, action) => {
      switch (action.payload) {
        case 'add':
          state.changes = { ...state.changes, additions: state.changes.additions + 1 }
          return
        case 'update':
          state.changes = { ...state.changes, modifications: state.changes.modifications + 1 }
          return
        case 'remove':
          state.changes = { ...state.changes, deletions: state.changes.deletions + 1 }
          return
      }
    },
    updateLocation: (state, action) => {
      const { updatedValues, index } = action.payload

      const updatingLocation = state.locations[index]
      state.locations[index] = { ...updatingLocation, ...updatedValues }
    },
  },
})

export const {
  setLocations,
  setSelectedMarkerIdx,
  setShowPreviewMap,
  setMapDetails,
  setLastSave,
  setChanges,
  updateLocation,
} = mapMakerSlice.actions

export default mapMakerSlice.reducer
