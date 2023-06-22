import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  status: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setStatus : (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export default sessionSlice.reducer;
export const { setStatus } = sessionSlice.actions;
