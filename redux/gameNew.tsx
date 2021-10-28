import { createSlice } from '@reduxjs/toolkit'
import { GameType } from '../types'
import Game from '../backend/models/game'
import { ObjectId } from 'mongodb'

const initialState: GameType = {
  id: '',
  mapId: '',
  userId: '',
  rounds: [],
  guesses: [],
  gameSettings: {timeLimit: 61, canMove: true, canPan: true, canZoom: true},
  round: 1,
  totalPoints: 0,
  totalDistance: 0,
  currView: 'Game',
}

export const gameNewSlice = createSlice({
  name: 'gameNew',
  initialState,
  reducers: { 
    setGame: (state, action) => {
      state.id = action.payload.id
      state.mapId = action.payload.mapId
      state.userId = action.payload.userId
      state.gameSettings = action.payload.gameSettings
      state.rounds = action.payload.rounds
      state.guesses = action.payload.guesses
      state.round = action.payload.round
      state.totalPoints = action.payload.totalPoints
      state.totalDistance = action.payload.totalDistance
    },
    updateId: (state, action) => {
      state.id = action.payload.id
    },
    nextRound: (state, action) => {
      state.round = action.payload.round 
      state.currView = action.payload.currView
      state.totalPoints = action.payload.totalPoints  
    },
    updateView: (state, action) => {
      state.currView = action.payload.currView
    },    
    resetGame: (state, action) => {
      state.id = ''
      state.mapId = ''
      state.round = 1
      state.totalPoints = 0
      state.currView = 'Game'
    },  
    addGuess: (state, action) => {
      state.guesses = [...state.guesses, action.payload.newGuess]
      state.currView = 'Result'
    },
    clearPrevGame: (state) => {
      state.totalPoints = 0
      state.totalDistance = 0
      state.currView = 'Game'
      state.round = 1
    }
  }
})

export const { 
  setGame,
  updateId,
  nextRound, 
  updateView, 
  resetGame,
  addGuess,
  clearPrevGame
} = gameNewSlice.actions

export const selectGameNew = (state: any) => state.gameNew

export default gameNewSlice.reducer