import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCard = createAsyncThunk(
  'card/fetchCard',
  async (cardID) => {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardID}&language=fr`);
    const data = await response.json();
    const treatedData = data.data[0];
    return treatedData;
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
      state.entities = ['erreur'];
    })
  }
});

export default cardSlice.reducer;
