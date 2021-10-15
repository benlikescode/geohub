import { createSlice } from '@reduxjs/toolkit'
import { GameType } from '../types'

const initialState: GameType = {
  id: '',
  map: '',
  round: 1,
  currGuess: {lat: 0, lng: 0},
  guessedLocations: [],
  actualLocations: [],
  roundTimes: [],
  roundPoints: 0,
  totalPoints: 0,
  currView: 'Game',
  compassHeading: 0, 
  atStart: false,
  gameSettings: {timeLimit: 61, canMove: true, canPan: true, canZoom: true},
  roundResults: []
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action) => {
      state.id = action.payload.id
      state.map = action.payload.map
      state.round = action.payload.round 
      state.currGuess = action.payload.currGuess
      state.guessedLocations = action.payload.guessedLocations
      state.actualLocations = action.payload.actualLocations
      state.roundPoints = action.payload.roundPoints
      state.totalPoints = action.payload.totalPoints 
      state.currView = action.payload.currView
    },
    updateRound: (state, action) => {
      state.round = action.payload.round
      state.guessedLocations = action.payload.guessedLocations
      state.actualLocations = action.payload.actualLocations
      state.roundPoints = action.payload.roundPoints
      state.currView = action.payload.currView
    },
    updateGuess: (state, action) => {
      state.currGuess = action.payload.currGuess
    },
    nextRound: (state, action) => {
      state.round = action.payload.round 
      state.currView = action.payload.currView
      state.totalPoints = action.payload.totalPoints
      state.currGuess = {lat: 0, lng: 0}
    },
    updateView: (state, action) => {
      state.currView = action.payload.currView
    },
    addGuess: (state, action) => {
      state.guessedLocations = [...state.guessedLocations, action.payload.guessedLocations]
    },
    resetGame: (state, action) => {
      state.id = action.payload.id
      state.map = action.payload.map
      state.round = 1
      state.currGuess = {lat: 0, lng: 0}
      state.guessedLocations = []
      state.actualLocations = []
      state.roundTimes = []
      state.roundPoints = 0
      state.totalPoints = 0
      state.currView = 'Game'
      state.gameSettings = {timeLimit: 61, canMove: true, canPan: true, canZoom: true}
    },
    updateCompass: (state, action) => {
      state.compassHeading = action.payload.compassHeading
    },
    returnToStart: (state, action) => {
      state.atStart = action.payload.atStart
    },
    updateGameSettings: (state, action) => {
      state.gameSettings = action.payload.gameSettings
      state.map = action.payload.map || state.map
    },
    updateRoundTimes: (state, action) => {
      state.roundTimes = [...state.roundTimes, action.payload.roundTimes]
    },
    updateRoundResults: (state, action) => {
      state.roundResults = [...state.roundResults, action.payload.newResult]
    },
    updateActualLocations: (state, action) => {
      state.actualLocations = [...state.actualLocations, action.payload.actualLocation]
    }
  }
})

export const { 
  updateGame, 
  updateRound, 
  updateGuess, 
  nextRound, 
  updateView, 
  addGuess,
  resetGame,
  updateCompass,
  returnToStart,
  updateGameSettings,
  updateRoundTimes,
  updateRoundResults,
  updateActualLocations
} = gameSlice.actions

export const selectGame = (state: any) => state.game

export default gameSlice.reducer