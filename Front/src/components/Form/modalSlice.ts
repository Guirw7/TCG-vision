import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
  message: string | null;
}

export const initialState: ModalState = {
  value: false,
  message: null,
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
    setModalMessage: (state) => {
      state.message = '';
    },
  },
});

export const { openModal, closeModal } = formModalSlice.actions;
export default formModalSlice.reducer;