import { configureStore } from '@reduxjs/toolkit';

import cardModalReducer from './components/CardModal/modalSlice';
import formModalReducer from './components/FormModal/modalSlice';
import sessionReducer from './components/App/sessionSlice';
import searchReducer from './components/SearchResult/searchSlice';
import loadingReducer from './components/Loading/loadingSlice';
import libraryReducer from './components/LibraryModal/librarySlice';
import cardAdditionReducer from './components/CardAdditionModal/cardAdditionSlice';
import deckReducer from './components/DeckEditorPage/userDeckSlice';


export const store = configureStore({
  reducer: {
    cardModal: cardModalReducer,
    formModal: formModalReducer,
    cardAdditionModal: cardAdditionReducer,
    session: sessionReducer,
    search: searchReducer,
    loading: loadingReducer,
    libraryModal: libraryReducer,
    userDeck: deckReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
