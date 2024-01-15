import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.value = action.payload;
    },
    loout: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.userInfo = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, loout } = authSlice.actions;

export default authSlice.reducer;
