import { createSlice } from '@reduxjs/toolkit';

export interface RefreshReduxState {
  value: boolean;
}

export const initialState: RefreshReduxState = {
  value: false,
};

const refreshReduxSlice = createSlice({
  name: 'refreshRedux',
  initialState,
  reducers: {
    onRefreshRedux: (state) => {
      state.value = true;
    },
    offRefreshRedux: (state) => {
      state.value = false;
    },
  },
});

export default refreshReduxSlice.reducer;
export const { onRefreshRedux, offRefreshRedux } = refreshReduxSlice.actions;