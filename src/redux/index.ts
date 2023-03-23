import { applyMiddleware, createStore, Store, AnyAction } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import {Action} from 'redux';
import rootReducer from './reduces'
import rootSaga from './sagas'

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
    const store = configureStore({
      reducer: rootReducer,
      middleware: [sagaMiddleware], 
      devTools: true,
    }
  )

  sagaMiddleware.run(rootSaga)

  return store
}


export const wrapper = createWrapper(makeStore, { debug: true })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export default store
export * from './actions'
export * from './types'