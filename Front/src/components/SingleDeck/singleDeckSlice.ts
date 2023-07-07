import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  value: null,
};

const singleDeckSlice = createSlice({
  name: 'SingleDeck',
  initialState,
  reducers: {
    setSingleDeck : (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
    clearSingleDeck : (state) => {
      state.value = null;
    } 

  },
});

export default singleDeckSlice.reducer;
export const { setSingleDeck, clearSingleDeck } = singleDeckSlice.actions;