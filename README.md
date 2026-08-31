# BingeList

[**Live Demo »**](https://bingelist-app.netlify.app) &nbsp;·&nbsp; [**Bug Report**](https://github.com/andcorcer/BingeList/issues) &nbsp;·&nbsp; [**New Features**](https://github.com/andcorcer/BingeList/issues)

A responsive React and Redux web application built with Vite for browsing movies and TV shows. Using the TMDB API, this app has dynamic categorization, search functionality, a client-side persistent watchlist, and up to date routes.

---

## Features

- **Home Page**: Displays trending movies and TV shows filtered by 'daily' and 'weekly' dynamic categories
- **Category Browsing**: Browse for movies and TV shows using the avaiable categories such as 'popular', 'top-rated', 'upcoming' and 'airing'
- **Search Integration**: Search functionality that supports all media types or filter by 'movies' or 'TV shows' with term tracking via queries.
- **Watchlist Management**: Add or remove media to/from a local watchlist with an empty state and empty action.
- **Details Access**: Able to view complete datails upon clicking a given title in a unique page
- **Dynamic Pagination**: Full URL query parameter synchronization by using queries with smooth scroll-to-top transition upon changing pages and automatic out-of-bounds boundary handling.
- **Responsive Dark UI**: Fully accessible, design built with modern CSS custom properties and box-sizing normalization.

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
```

## Application Routes

| Path                             | Component               | Description                                                    |
| :------------------------------- | :---------------------- | :------------------------------------------------------------- |
| `/`                              | `<HomePage />`          | Displays trending movies, TV shows, and a featured hero banner |
| `/category/:mediaType/:category` | `<MediaCategoryPage />` | Category grid listing                                          |
| `/media/:mediaType/:id`          | `<DetailsPage />`       | Detailed view of any specific movie or TV show                 |
| `/search`                        | `<SearchPage />`        | Search page supporting term queries and media type filtering   |
| `/watchlist`                     | `<WatchlistPage />`     | User's saved watchlist                                         |
| `*`                              | `<NotFoundPage />`      | Fallback page for handling invalid or outdated URLs            |

## State Management

The application uses Redux Toolkit to manage global state across two slices (`media` and `watchlist`):

```js
state = {
  media: {
    trending: {
      movies: [],
      tv: [],
      status: "idle", // "idle" | "loading" | "succeeded" | "failed"
      error: null,
    },
    details: {
      data: null,
      status: "idle",
      error: null,
    },
    search: {
      results: [],
      totalPages: 1,
      status: "idle",
      error: null,
    },
    category: {
      results: [],
      totalPages: 1,
      status: "idle",
      error: null,
    },
  },
  watchlist: {
    items: [],
  },
};
```

## Getting Started

### Prerequisites
```text
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn**
- **TMDB API Access Token**: Obtain a free API key from [The Movie Database](https://www.themoviedb.org/)
```

---

### Local Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/andcorcer/BingeList.git
   cd bingelist
   ```

2. **Install Dependencies**:
    ```bash
    npm install 
    ```
    ```text
    or 
    ```
    ```bash
    yarn install 
    ```

3. **Configure Environment Variable**
    Create a .env file in the root directory and store your access token 
    ```text 
    VITE_TMDB_READ_TOKEN=your_access_token_here
    ```

4. **Start the Development Server**
    ```bash 
    npm run dev
     ```
    ```text 
    or 
    ```
    ```bash
     yarn dev 
    ```
### Deployment (Netlify)

1. **Add your Environment Variable**
  ```text
  VITE_TMDB_READ_TOKEN=your_access_token_here
  ```
2. **Project configuration**
  ```text
  -Build command: bash npm run build
  -Publish directory: dist
  ```
