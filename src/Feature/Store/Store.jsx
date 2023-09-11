import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Slice/LoginSlice";
import userData from "../Slice/UserSlice";

const store = configureStore({
  reducer: {
    counter: AuthSlice,
    data: userData,
  },
});

export default store;
