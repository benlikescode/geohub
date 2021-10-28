import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { 
  persistStore, 
  persistReducer,
  FLUSH, 
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user'
import gameReducer from './game'
import gameNewReducer from './gameNew'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducers = combineReducers({
  user: userReducer,
  game: gameReducer,
  gameNew: gameNewReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch