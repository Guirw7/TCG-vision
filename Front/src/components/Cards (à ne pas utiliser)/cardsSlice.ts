import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const fetchCards = createAsyncThunk(
  'cards/fetchData',
  async () => {
    const response = await fetch('');
    const data = await response.json();
    return data;
  }
);

//interfaces


const initialState = {};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        // state.status = 'chargement en cours';
        // state.entities = [];
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        // state.status = 'chargement terminé';
        // state.entities = action.payload;
      })
      .addCase(fetchCards.rejected, (state) => {
        // state.status = 'erreur lors du chargement';
        // state.entities = [];
      })
  },
});

export default cardsSlice.reducer;
