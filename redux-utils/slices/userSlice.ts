import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MapType, UserType } from '@types'

type UserState = UserType & {
  recentlyPlayed: MapType[]
  quotaModalDismissed: boolean
  useGoogleApi: boolean
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  avatar: { emoji: '1f3b1', color: '#fecaca' },
  guessMapSize: 2,
  gameSettings: { canMove: true, canPan: true, canZoom: true, timeLimit: 0 },
  recentlyPlayed: [],
  quotaModalDismissed: false,
  useGoogleApi: false,
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
      state.id = initialState.id
      state.name = initialState.name
      state.email = initialState.email
      state.avatar = initialState.avatar
      state.guessMapSize = initialState.guessMapSize
      state.gameSettings = initialState.gameSettings
      state.recentlyPlayed = initialState.recentlyPlayed
      state.bio = initialState.bio
      state.isAdmin = initialState.isAdmin
      state.distanceUnit = initialState.distanceUnit
      state.mapsAPIKey = initialState.mapsAPIKey
      state.quotaModalDismissed = initialState.quotaModalDismissed
    },
    resetGameSettings: (state) => {
      state.gameSettings = initialState.gameSettings
    },
    dismissQuotaModal: (state) => {
      state.quotaModalDismissed = true
    },
    toggleUseGoogleApi: (state) => {
      state.useGoogleApi = !state.useGoogleApi
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
  updateRecentlyPlayed,
  updateDistanceUnit,
  updateMapsAPIKey,
  logOutUser,
  resetGameSettings,
  dismissQuotaModal,
  toggleUseGoogleApi,
} = userSlice.actions

export default userSlice.reducer
