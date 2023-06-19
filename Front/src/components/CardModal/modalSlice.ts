import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
  element: any | null;
}

export const initialState: ModalState = {
  value: false,
  element: null,
};

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
    setCardID : (state, action) => {
      state.element = action.payload;
    },
    clearCardID: (state) => {
      state.element = null;
    }
  },
});

export default cardModalSlice.reducer;
export const { openModal, closeModal, setCardID, clearCardID } = cardModalSlice.actions;