import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
  message: string;
};

export const initialState: ModalState = {
  value: false,
  message: '',
};

const libraryModalSlice = createSlice({
  name: 'libraryModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.value = true;
    },
    closeModal: (state) => {
      state.value = false;
    },
    setModalMessage: (state, action) => {
      state.message = action.payload;
    },
}});

export const { openModal, closeModal, setModalMessage } = libraryModalSlice.actions;
export default libraryModalSlice.reducer;