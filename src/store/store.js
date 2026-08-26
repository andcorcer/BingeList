// Import all dependencies
import { configureStore } from "@reduxjs/toolkit";

// Import Reducers
import mediaReducer from "./mediaSlice.js";
import watchlistReducer from "./watchlistSlice.js";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    media: mediaReducer,
    watchlist: watchlistReducer,
  },
});
