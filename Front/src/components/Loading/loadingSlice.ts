import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  value: true,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingOff : (state) => {
      state.value = false;
    },
    setLoadingOn : (state) => {
      state.value = true;
    } 

  },
});

export default loadingSlice.reducer;
export const { setLoadingOff, setLoadingOn } = loadingSlice.actions;
