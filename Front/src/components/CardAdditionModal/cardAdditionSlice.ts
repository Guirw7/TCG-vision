import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  value: boolean;
  message: string;
}

export const initialState: ModalState = {
  value: false,
  message: '',
}

const cardAdditionSlice = createSlice({
  name: 'cardAddition',
  initialState,
  reducers: {
    openCardAdditionModal: (state) => {
      state.value = true;
    },
    closeCardAdditionModal: (state) => {
      state.value = false;
    },
    setCardAdditionModalMessage: (state, action) => {
      state.message = action.payload;
    },
}});

export const { openCardAdditionModal, closeCardAdditionModal, setCardAdditionModalMessage } = cardAdditionSlice.actions;
export default cardAdditionSlice.reducer;