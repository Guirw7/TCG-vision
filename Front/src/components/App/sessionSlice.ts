import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//interfaces
export interface UserProps {
  token : string,
  id : null | number,
  username: string
};

const initialState: UserProps = {
  token: '',
  id: null,
  username: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    storeToken : (state, action: PayloadAction<UserProps['token']>) => {
      state.token = action.payload;
    },
    storeID : (state, action: PayloadAction<UserProps['id']>) => {
      state.id = action.payload;
    },
    storeUsername : (state, action: PayloadAction<UserProps['username']>) => {
      state.username = action.payload;
    }
  },
});

export default sessionSlice.reducer;
export const { storeToken, storeID, storeUsername } = sessionSlice.actions;
