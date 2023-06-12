import { createSlice } from '@reduxjs/toolkit'

//interfaces
interface Card {
  modalIsOpen: boolean;
}

export const initialState: Card = { modalIsOpen: false };

const cardSlice: any = createSlice({
  name: 'card',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modalIsOpen = true;
    },
    closeModal: (state) => {
      state.modalIsOpen = false;
    },
  }
});


export const { openModal, closeModal } = cardSlice.actions;
export default cardSlice.reducer;
