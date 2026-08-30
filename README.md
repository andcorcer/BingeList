# Media Explorer

A responsive React and Redux web application built with Vite for browsing movies and TV shows. Using the TMDB API, this app has dynamic categorization, search functionality, a client-side persistent watchlist, and up to date routes.

---

## Features

- **Home Page**: Displays trending movies and TV shows filtered by 'daily' and 'weekly' dynamic categories
- **Category Browsing**: Browse for movies and TV shows using the avaiable categories such as 'popular', 'top-rated', 'upcoming' and 'airing'
- **Search Integration**: Search functionality that supports all media types or filter by 'movies' or 'TV shows' with term tracking via queries. 
- **Watchlist Management**: Add or remove media to/from a local watchlist with an empty state and empty action.
- **Details Access**: Able to view complete datails upon clicking a given title in a unique page
- **Dynamic Pagination**: Full URL query parameter synchronization by using queries with smooth scroll-to-top transition upon changing pages and automatic out-of-bounds boundary handling.
- **Responsive Dark UI**: Fully accessible,  design built with modern CSS custom properties and box-sizing normalization.

## Project Structure

```text
src/
├── components/
│   ├── App/
│   ├── Error/
│   ├── Header/
│   ├── Layout/
│   ├── Loading/
│   ├── MediaCard/
│   ├── MediaGrid/
│   └── Navbar/
├── pages/
│   ├── DetailsPage/
│   ├── HomePage/
│   ├── MediaCategoryPage/
│   ├── NotFoundPage/
│   ├── SearchPage/
│   └── WatchlistPage/
├── store/
│   ├── mediaSlice.js
│   ├── watchlistSlice.js
│   └── store.js
├── utilities/
│   └── tmdbApi.js
├── index.css
└── main.jsx