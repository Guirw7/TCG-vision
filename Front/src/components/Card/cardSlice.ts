import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCard = createAsyncThunk(
  'card/fetchCard',
  async () => {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=dragonCanonXYZ&language=fr`);
    const data = await response.json();
    return data;
  }
);

/*---Interfaces---


-----------------*/

export const initialState: any = {};

const cardSlice: any = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
    .addCase(fetchCard.pending, (state: any) => {
      state.status = 'chargement en cours';
      state.entities = [];
    })
    .addCase(fetchCard.fulfilled, (state: any, action: any) => {
      state.status = 'chargement terminé';
      state.entities = action.payload;
    })
    .addCase(fetchCard.rejected, (state: any) => {
      state.status = 'erreur lors du chargement';
      state.entities = [];
    })
  }
});

export default cardSlice.reducer;
