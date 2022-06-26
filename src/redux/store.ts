import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'

import { createLogger } from 'redux-logger'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = () => combineReducers({})

const persistedReducer = persistReducer(persistConfig, rootReducer())

const middlewares: any = []

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true, diff: true })
  middlewares.push(logger)
}

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...middlewares),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export default store
