// Import all dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import Reducers
import mediaReducer from "./mediaSlice.js";

export const store = configureStore({
  reducer: {
    media: mediaReducer,
  },
});
