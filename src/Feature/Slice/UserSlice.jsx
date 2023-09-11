import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "data",
  initialState: {
    user: localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : false,
  },
  reducers: {
    DataUsers: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { DataUsers } = userSlice.actions;

export default userSlice.reducer;
