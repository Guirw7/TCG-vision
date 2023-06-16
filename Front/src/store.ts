import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './components/Card/modalSlice';


export const store = configureStore({
  reducer: {
    cardModal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
