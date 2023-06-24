import { configureStore } from '@reduxjs/toolkit';

import cardModalReducer from './components/CardModal/modalSlice';
import formModalReducer from './components/FormModal/modalSlice';
import sessionReducer from './components/App/sessionSlice';
import searchReducer from './components/SearchResult/searchSlice';
import loadingReducer from './components/Loading/loadingSlice';
import libraryReducer from './components/LibraryModal/librarySlice';


export const store = configureStore({
  reducer: {
    cardModal: cardModalReducer,
    formModal: formModalReducer,
    session: sessionReducer,
    search: searchReducer,
    loading: loadingReducer,
    libraryModal: libraryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
