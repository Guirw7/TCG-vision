import { configureStore } from '@reduxjs/toolkit';

import cardModalReducer from './components/CardModal/modalSlice';
import formModalReducer from './components/FormModal/modalSlice';
import sessionReducer from './components/App/sessionSlice';


export const store = configureStore({
  reducer: {
    cardModal: cardModalReducer,
    formModal: formModalReducer,
    session: sessionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
