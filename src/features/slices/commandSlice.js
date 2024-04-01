// src/features/commands/commandSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from '../../Services/Api/ApiService';

// Thunk for fetching all commands
export const fetchAllCommands = createAsyncThunk(
  'commands/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const commands = await ApiService.getAllCommands();
      return commands;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  commands: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  statusFilter: 'All'
};

// Slice
const commandSlice = createSlice({
  name: 'commands',
  initialState,
  reducers: {
    setStatusFilter(state, action) {
        state.statusFilter = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCommands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCommands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commands = action.payload;
      })
      .addCase(fetchAllCommands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
export const { setStatusFilter } = commandSlice.actions;
export default commandSlice.reducer;
