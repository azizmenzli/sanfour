import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../Services/Api/ApiService';

// Async thunk to fetch vendeurs data
export const fetchVendeurs = createAsyncThunk('vendeurs/fetchVendeurs', async () => {
  const response = await ApiService.getVendeurCommands();
  return response;
});

const vendeursSlice = createSlice({
  name: 'vendeurs',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendeurs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVendeurs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchVendeurs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default vendeursSlice.reducer;
