import { configureStore } from '@reduxjs/toolkit';

import cardModalReducer from './components/Card/modalSlice';
import formModalReducer from './components/FormModal/modalSlice';


export const store = configureStore({
  reducer: {
    cardModal: cardModalReducer,
    formModal: formModalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
