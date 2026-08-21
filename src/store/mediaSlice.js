// Import all dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import API helper functions
import {
  fetchTrending,
  fetchMediaById,
  fetchSearchMedia,
  fetchCategoryMedia,
} from "../api/api.js";

// Initial state for the media slice
const initialState = {
  trending: { movies: [], tv: [], status: "idle", error: null },
  details: { data: null, status: "idle", error: null },
  search: { results: [], page: 1, totalPages: 1, status: "idle", error: null },
  category: {
    results: [],
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
  },
};

// Aync thunk to fetch trending media
export const fetchTrendingMedia = createAsyncThunk(
  "media/fetchTrendingMedia",
  async (timeWindow = "day", { rejectWithValue }) => {
    try {
      const [movies, tvShows] = await Promise.all([
        fetchTrending("movie", timeWindow),
        fetchTrending("tv", timeWindow),
      ]);
      return { movies: movies.results, tvShows: tvShows.results };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Aync thunk to fetch media details by ID
export const fetchMediaDetails = createAsyncThunk(
  "media/fetchMediaDetails",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      return await fetchMediaById(id, type);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Aync thunk to fetch search results
export const fetchSearchResults = createAsyncThunk(
  "media/fetchSearchResults",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      return await fetchSearchMedia(query, page);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to fetch media by category
export const fetchCategoryMediaThunk = createAsyncThunk(
  "media/fetchCategoryMedia",
  async ({ type, category, page = 1 }, { rejectWithValue }) => {
    try {
      return await fetchCategoryMedia(type, category, page);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Media slice
const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.search = initialState.search;
    },
    clearDetails: (state) => {
      state.details = initialState.details;
    },
    clearCategory: (state) => {
      state.category = initialState.category;
    },
  },
  extraReducers: (builder) => {
    builder
      // Home Page - Trending Media
      .addCase(fetchTrendingMedia.pending, (state) => {
        state.trending.status = "loading";
        state.trending.error = null;
      })
      .addCase(fetchTrendingMedia.fulfilled, (state, action) => {
        state.trending.status = "succeeded";
        state.trending.movies = action.payload.movies;
        state.trending.tv = action.payload.tvShows;
        state.trending.error = null;
      })
      .addCase(fetchTrendingMedia.rejected, (state, action) => {
        state.trending.status = "failed";
        state.trending.error = action.payload;
      })

      // Media Details Page
      .addCase(fetchMediaDetails.pending, (state) => {
        state.details.status = "loading";
        state.details.error = null;
      })
      .addCase(fetchMediaDetails.fulfilled, (state, action) => {
        state.details.status = "succeeded";
        state.details.data = action.payload;
        state.details.error = null;
      })
      .addCase(fetchMediaDetails.rejected, (state, action) => {
        state.details.status = "failed";
        state.details.error = action.payload;
      })

      // Search Results Page
      .addCase(fetchSearchResults.pending, (state) => {
        state.search.status = "loading";
        state.search.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.search.status = "succeeded";
        state.search.results = action.payload.results;
        state.search.page = action.payload.page;
        state.search.totalPages = action.payload.total_pages;
        state.search.error = null;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.search.status = "failed";
        state.search.error = action.payload;
      })

      // Category Page
      .addCase(fetchCategoryMediaThunk.pending, (state) => {
        state.category.status = "loading";
        state.category.error = null;
      })
      .addCase(fetchCategoryMediaThunk.fulfilled, (state, action) => {
        state.category.status = "succeeded";
        state.category.results = action.payload.results;
        state.category.page = action.payload.page;
        state.category.totalPages = action.payload.total_pages;
        state.category.error = null;
      })
      .addCase(fetchCategoryMediaThunk.rejected, (state, action) => {
        state.category.status = "failed";
        state.category.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearSearch, clearDetails, clearCategory } = mediaSlice.actions;
export default mediaSlice.reducer;
