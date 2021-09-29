import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user'
import gameReducer from './game'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  user: userReducer,
  game: gameReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch