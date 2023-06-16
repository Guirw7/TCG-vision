import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
}

export const initialState: ModalState = {
  value: false,
}

const cardModalSlice = createSlice({
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

export default cardModalSlice.reducer;
export const { openModal, closeModal } = cardModalSlice.actions;