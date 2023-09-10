import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameType } from '@types'

type InitialState = {
  gameData: GameType | null
  startTime: number | null // I believe this is the only old value im using as of 5/12/2023
  endTime: number | null
  currView: 'Game' | 'Result' | 'FinalResults'
  readyToSubmit: boolean
  mapName: string
}

const initialState: InitialState = {
  gameData: null,
  startTime: null,
  endTime: null,
  currView: 'Game',
  readyToSubmit: false,
  mapName: '',
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGameState: (state, action) => {
      state.gameData = action.payload.gameData || state.gameData
      state.startTime = action.payload.startTime || state.startTime
      state.endTime = action.payload.endTime || state.endTime
      state.currView = action.payload.currView || state.currView
      state.readyToSubmit = action.payload.readyToSubmit || state.readyToSubmit
    },
    updateGameData: (state, action) => {
      state.gameData = action.payload.gameData
    },
    updateStartTime: (state, action) => {
      state.startTime = action.payload.startTime
    },
    updateEndTime: (state, action) => {
      state.endTime = action.payload.endTime
    },
    updateCurrView: (state, action) => {
      state.currView = action.payload.currView
    },
    resetGame: (state) => {
      ;(state.gameData = null),
        (state.startTime = null),
        (state.endTime = null),
        (state.currView = 'Game'),
        (state.readyToSubmit = false)
    },
    setMapName: (state, action: PayloadAction<InitialState['mapName']>) => {
      state.mapName = action.payload
    },
  },
})

export const {
  updateGameState,
  updateGameData,
  updateStartTime,
  updateEndTime,
  updateCurrView,
  resetGame,
  setMapName,
} = gameSlice.actions

export const selectGame = (state: any) => state.game

export default gameSlice.reducer
