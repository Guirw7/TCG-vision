import { configureStore } from '@reduxjs/toolkit';

// gestion de la liste des films
import cardsReducer from './components/Cards/cardsSlice';


export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
