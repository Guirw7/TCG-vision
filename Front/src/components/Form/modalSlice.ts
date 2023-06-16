import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
}

export const initialState: ModalState = {
  value: false,
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
  },
});

export default formModalSlice.reducer;
export const { openModal, closeModal } = formModalSlice.actions;