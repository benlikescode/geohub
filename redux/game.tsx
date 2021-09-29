import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  map: '',
  round: 1,
  guessedLocation: '',
  actualLocation: '',
  roundResult: '',
  finalResults: '',
  locations: [],
  currView: 'Game'
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action) => {
      state.id = action.payload.id
      state.map = action.payload.map
      state.round = action.payload.round 
      state.guessedLocation = action.payload.guessedLocation
      state.actualLocation = action.payload.actualLocation
      state.roundResult = action.payload.roundResult
      state.finalResults = action.payload.finalResults 
      state.locations = action.payload.locations
      state.currView = action.payload.currView
    },
    updateRound: (state, action) => {
      state.round = action.payload.round
      state.guessedLocation = action.payload.guessedLocation
      state.actualLocation = action.payload.actualLocation
      state.roundResult = action.payload.roundResult
      state.currView = action.payload.currView
    },
    updateGuess: (state, action) => {
      state.guessedLocation = action.payload.guessedLocation
    },
    nextRound: (state, action) => {
      state.round = action.payload.round 
      state.currView = action.payload.currView
    },
    updateView: (state, action) => {
      state.currView = action.payload.currView
    }
  }
})

export const { updateGame, updateRound, updateGuess, nextRound, updateView } = gameSlice.actions

export const selectGame = (state: any) => state.game

export default gameSlice.reducer