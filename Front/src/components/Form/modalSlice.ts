import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
  message: string;
}

export const initialState: ModalState = {
  value: false,
  message: '',
}

const formModalSlice = createSlice({
  name: 'formModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.value = true;
    },
    closeModal: (state) => {
      state.value = false;
    },
    setModalSuccessMessage: (state) => {
      state.message = 'Votre compte a bien été créé';
    },
    setModalFailureMessage: (state) => {
      state.message = 'Une erreur est survenue, veuillez réessayer plus tard';
    },
    setModalEmptyMessage: (state) => {
      state.message = '';
    },
}});

export const { openModal, closeModal, setModalSuccessMessage, setModalFailureMessage, setModalEmptyMessage } = formModalSlice.actions;
export default formModalSlice.reducer;