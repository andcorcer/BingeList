// Import all dependencies
import { createSlice } from "@reduxjs/toolkit";

// Function to load watchlist from localStorage
const loadWatchlistFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : []; // Return an empty array if no watchlist is found
  } catch (error) {
    console.error("Could not load watchlist from localStorage", error);
    return [];
  }
};

// Function to save watchlist to localStorage
const saveWatchlistToLocalStorage = (watchlist) => {
  try {
    localStorage.setItem("watchlist", JSON.stringify(watchlist)); // Saves the watchlist to localStorage as a JSON string
  } catch (error) {
    console.error("Could not save watchlist to localStorage", error);
  }
};

// Initial state for the watchlist slice
const initialState = {
  items: loadWatchlistFromLocalStorage(), // Load watchlist from localStorage if not saved yet initialize with an empty array
};

// Watchlist Slice
const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const newItem = action.payload;
      const exists = state.items.some(
        (item) =>
          item.id === newItem.id && item.media_type === newItem.media_type,
      ); // Makes sure that the item is not already in the watchlist by checking both id and media_type
      if (!exists) {
        state.items.push(newItem); // Add the item to the watchlist
        saveWatchlistToLocalStorage(state.items); // Save the updated watchlist to localStorage
      }
    },
    removeFromWatchlist: (state, action) => {
      const idToRemove = action.payload.id;
      const typeToRemove = action.payload.media_type;
      state.items = state.items.filter(
        (item) => !(item.id === idToRemove && item.media_type === typeToRemove),
      );
      saveWatchlistToLocalStorage(state.items);
    },
    clearWatchlist: (state) => {
      state.items = [];
      try {
        localStorage.removeItem("watchlist"); // Remove the watchlist from localStorage
      } catch (error) {
        console.error("Could not remove watchlist from localStorage", error);
      }
    },
  },
});

// Export actions and reducer
export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
