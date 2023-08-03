import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { gameReducer, userReducer } from './slices'

const reducers = combineReducers({
  user: userReducer,
  game: gameReducer,
})

const persistConfig = {
  key: 'root',
  whitelist: ['user', 'game'],
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
