import { configureStore } from '@reduxjs/toolkit';

// gestion de la liste des films
import cardReducer from './components/Card/cardSlice';
import modalReducer from './components/Card/modalSlice';


export const store = configureStore({
  reducer: {
    card: cardReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
