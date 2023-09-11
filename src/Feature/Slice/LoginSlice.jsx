import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: localStorage.getItem("values")
      ? JSON.parse(localStorage.getItem("values"))
      : null,
  },
  reducers: {
    LoginUsers: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { LoginUsers } = counterSlice.actions;

export default counterSlice.reducer;
