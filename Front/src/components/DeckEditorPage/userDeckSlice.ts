import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DeckProps {
    value: number[];
  }
  
  export const initialState: DeckProps = {
    value: [],
  };

const deckSlice = createSlice({
    name: 'userDeck',
    initialState,
    reducers: {
      setUserDeck : (state, action) => {
        state.value = action.payload;
        console.log(state.value); 
      },
      clearUserDeck : (state) => {
        state.value = [];
      },
    },
  });

export default deckSlice.reducer;
export const { setUserDeck, clearUserDeck } = deckSlice.actions;