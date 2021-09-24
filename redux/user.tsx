import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: '',
  avatar: ''
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
    logOutUser: state => {
      state.id = ''
    }
  }
})

export const { updateUser, updateAvatar, updateUsername, updateEmail, logOutUser } = userSlice.actions

export const selectUser = (state: any) => state.user

export default userSlice.reducer