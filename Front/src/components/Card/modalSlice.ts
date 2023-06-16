import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
}

export const initialState: ModalState = {
  value: false,
}

const modalSlice = createSlice({
  name: 'cardModal',
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

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;