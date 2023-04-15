import { createSlice } from "@reduxjs/toolkit";

const initialState = { userState: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.userState = action.payload;
    },
  },
});

export const { setUserState } = authSlice.actions;

export default authSlice.reducer;
