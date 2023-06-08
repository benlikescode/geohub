import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MapType, UserType } from '@types'

type UserState = UserType & {
  recentlyPlayed: MapType[]
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  avatar: { emoji: '1f3b1', color: '#fecaca' },
  guessMapSize: 1,
  gameSettings: { canMove: true, canPan: true, canZoom: true, timeLimit: 0 },
  location: '',
  recentlyPlayed: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.bio = action.payload.bio
      state.isAdmin = action.payload.isAdmin
      state.email = action.payload.email || ''
      ;(state.avatar = action.payload.avatar || ''),
        (state.gameSettings = action.payload.gameSettings || initialState.gameSettings)
      state.distanceUnit = action.payload.distanceUnit
      state.mapsAPIKey = action.payload.mapsAPIKey
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload
    },
    updateUsername: (state, action) => {
      state.name = action.payload
    },
    updateBio: (state, action) => {
      state.bio = action.payload
    },
    updateEmail: (state, action) => {
      state.email = action.payload.email
    },
    updateGuessMapSize: (state, action) => {
      state.guessMapSize = action.payload.guessMapSize
    },
    updateGameSettings: (state, action) => {
      state.gameSettings = action.payload.gameSettings
    },
    updateLocation: (state, action) => {
      state.location = action.payload.location
    },
    updateRecentlyPlayed: (state, action) => {
      state.recentlyPlayed = action.payload.recentlyPlayed
    },
    updateDistanceUnit: (state, action) => {
      state.distanceUnit = action.payload
    },
    updateMapsAPIKey: (state, action) => {
      state.mapsAPIKey = action.payload
    },
    logOutUser: (state) => {
      state.id = ''
    },
    resetGameSettings: (state) => {
      state.gameSettings = initialState.gameSettings
    },
  },
})

export const {
  updateUser,
  updateAvatar,
  updateUsername,
  updateBio,
  updateEmail,
  updateGuessMapSize,
  updateGameSettings,
  updateLocation,
  updateRecentlyPlayed,
  updateDistanceUnit,
  updateMapsAPIKey,
  logOutUser,
  resetGameSettings,
} = userSlice.actions

export default userSlice.reducer
