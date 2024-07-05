// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // Additional setup options can go here
});

export default store;
