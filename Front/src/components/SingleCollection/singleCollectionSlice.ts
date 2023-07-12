import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  value: null,
};

const singleCollectionSlice = createSlice({
  name: 'SingleCollection',
  initialState,
  reducers: {
    setSingleCollection : (state, action) => {
      state.value = action.payload;
      // console.log(state.value);
    },
    clearSingleCollection : (state) => {
      state.value = null;
    } 

  },
});

export default singleCollectionSlice.reducer;
export const { setSingleCollection, clearSingleCollection } = singleCollectionSlice.actions;