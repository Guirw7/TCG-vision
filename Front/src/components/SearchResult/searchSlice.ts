import { createSlice } from '@reduxjs/toolkit';

export interface SearchProps {
  value: string;
}

export const initialState: SearchProps = {
  value: 'kaiba',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch : (state, action) => {
      state.value = action.payload;
      console.log(state.value); 
    },
    clearSearch : (state) => {
      state.value = 'kaiba';
    },
  },
});

export default searchSlice.reducer;
export const { setSearch, clearSearch } = searchSlice.actions;