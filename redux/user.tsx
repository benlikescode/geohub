import { createSlice } from '@reduxjs/toolkit'
import { LocationType } from '../types'

type UserState = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  guessMapSize: number;
  location: {lat: number, lng: number} | null;
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  avatar: '',
  guessMapSize: 1,
  location: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email || ''
      state.avatar = action.payload.avatar || ''
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload.avatar
    },
    updateUsername: (state, action) => {
      state.name = action.payload.name
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
    logOutUser: state => {
      state.id = ''
    }
  }
})

export const { 
  updateUser, 
  updateAvatar, 
  updateUsername, 
  updateEmail,
  updateGuessMapSize, 
  updateLocation,
  logOutUser 
} = userSlice.actions

export const selectUser = (state: any) => state.user

export default userSlice.reducer