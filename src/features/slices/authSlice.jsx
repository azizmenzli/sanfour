import { createSlice } from '@reduxjs/toolkit';
import { setAuthInfo, clearAuthInfo, getAuthInfo } from '../../utils/storage';
import { jwtDecode } from 'jwt-decode';

// Define the initial state based on the current authentication information
const initialState = getAuthInfo().token
  ? { ...getAuthInfo(), isAuthenticated: true }
  : {
      id: null,
      email: null,
      role: null,
      token: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Handle login success by decoding the JWT token and updating the state
    loginSuccess(state, action) {
        const { token } = action.payload;
        const decoded = jwtDecode(token); // Decode the token to get user information
        // Adjust these fields based on your token's payload structure
        const { userId, email, role,name,ville,adress } = decoded;
        
        // Store authentication information in localStorage  
        setAuthInfo({ token, userId, email, role });
        // Update state with user information and authentication status
        state.token = token;
        state.id = userId;
        state.email = email;
        state.role = role;
        state.name=name;
        state.ville=ville;
        state.adress=adress;
        state.isAuthenticated = true;
    },
    // Handle logout by clearing authentication information from localStorage and state
    logout(state) {
      clearAuthInfo();
      state.id = null;
      state.email = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    // Additional reducers can be added here as needed
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
