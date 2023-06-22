import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//interfaces
export interface UserProps {
  status : boolean,
};

const initialState: UserProps = {
  status: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setStatus : (state, action: PayloadAction<UserProps['status']>) => {
      state.status = action.payload;
    },
  },
});

export default sessionSlice.reducer;
export const { setStatus } = sessionSlice.actions;
