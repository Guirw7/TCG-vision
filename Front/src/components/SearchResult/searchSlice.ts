import { createSlice } from '@reduxjs/toolkit';

export interface SearchProps {
  value: null | string;
}

export const initialState: SearchProps = {
  value: null,
};

const searchSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    setSearch : (state, action) => {
      state.value = action.payload;
    },
    clearSearch : (state) => {
      state.value = null;
    },
  },
});

export default searchSlice.reducer;
export const { setSearch, clearSearch } = searchSlice.actions;