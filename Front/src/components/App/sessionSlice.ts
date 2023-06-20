import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fetchSessionStatus = createAsyncThunk(
  'session/fetchSessionStatus',
  async () => {
    // demander au back de faire une url pour savoir si l'utilisateur est connecté
    const response = await fetch(''); 
    const data = await response.json();
    return data;
  }
);

//interfaces


const initialState = {
  status: 'déconnecté',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessionStatus.pending, (state) => {
        state.status = 'chargement en cours';
      })
      .addCase(fetchSessionStatus.fulfilled, (state, action) => {
        state.status = 'connecté';
      })
      .addCase(fetchSessionStatus.rejected, (state) => {
        state.status = 'déconnecté';
      })
  },
});

export default sessionSlice.reducer;
