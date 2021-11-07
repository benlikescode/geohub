import { createSlice } from '@reduxjs/toolkit'
import { Game } from '../backend/models'

type GameState = {
  gameData: Game | null;
  startTime: Date | null;
  endTime: Date | null;
  currView: 'Game' | 'Result' | 'FinalResults';
  readyToSubmit: boolean;
}

const initialState: GameState = {
  gameData: null,
  startTime: null,
  endTime: null,
  currView: 'Game',
  readyToSubmit: false
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

  }
})

export const { 
  updateGameState,
  updateGameData,
  updateStartTime,
  updateEndTime,
  updateCurrView
} = gameSlice.actions

export const selectGame = (state: any) => state.game

export default gameSlice.reducer