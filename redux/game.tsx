import { createSlice } from '@reduxjs/toolkit'
import { LocationType } from '../types'

type GameState = {
  id: string
  map: string
  round: number
  currGuess: LocationType,
  guessedLocations: LocationType[]
  actualLocations: LocationType[]
  roundPoints: number
  totalPoints: number
  currView: 'Game' | 'Results' | 'FinalResults'
  compassHeading: number
  atStart: boolean
  guessMapSize: number
}

const initialState: GameState = {
  id: '',
  map: 'World',
  round: 1,
  currGuess: {lat: 0, lng: 0},
  guessedLocations: [],
  actualLocations: [],
  roundPoints: 0,
  totalPoints: 0,
  currView: 'Game',
  compassHeading: 0, 
  atStart: false,
  guessMapSize: 1
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
    },
    updateView: (state, action) => {
      state.currView = action.payload.currView
    },
    addGuess: (state, action) => {
      state.guessedLocations = [...state.guessedLocations, action.payload.guessedLocations]
    },
    newGame: (state, action) => {
      state.id = action.payload.id
      state.map = action.payload.map
      state.round = 1
      state.currGuess = {lat: 0, lng: 0},
      state.guessedLocations = []
      state.actualLocations = []
      state.roundPoints = 0
      state.totalPoints = 0
      state.currView = 'Game'
    },
    updateCompass: (state, action) => {
      state.compassHeading = action.payload.compassHeading
    },
    returnToStart: (state, action) => {
      state.atStart = action.payload.atStart
    },
    updateGuessMapSize: (state, action) => {
      state.guessMapSize = action.payload.guessMapSize
    },
  }
})

export const { 
  updateGame, 
  updateRound, 
  updateGuess, 
  nextRound, 
  updateView, 
  addGuess,
  newGame,
  updateCompass,
  returnToStart,
  updateGuessMapSize
} = gameSlice.actions

export const selectGame = (state: any) => state.game

export default gameSlice.reducer