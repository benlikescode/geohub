import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '@types'

const initialState: UserType = {
  id: '',
  name: '',
  email: '',
  avatar: { emoji: '1f3b1', color: '#fecaca' },
  guessMapSize: 1,
  location: '',
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
      state.avatar = action.payload.avatar || ''
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
    updateLocation: (state, action) => {
      state.location = action.payload.location
    },
    logOutUser: (state) => {
      state.id = ''
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
  updateLocation,
  logOutUser,
} = userSlice.actions

export const selectUser = (state: any) => state.user as UserType

export default userSlice.reducer
