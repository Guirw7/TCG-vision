import { configureStore } from '@reduxjs/toolkit';

// gestion de la liste des films
import cardsReducer from './components/Cards/cardsSlice';
import cardReducer from './components/Card/cardSlice';


export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    card: cardReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
