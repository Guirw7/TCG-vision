import { createSlice } from '@reduxjs/toolkit';

export interface SearchProps {
  value: null | string;
}

export const initialState: SearchProps = {
  value: null,
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
      state.value = null;
    },
  },
});

export default searchSlice.reducer;
export const { setSearch, clearSearch } = searchSlice.actions;