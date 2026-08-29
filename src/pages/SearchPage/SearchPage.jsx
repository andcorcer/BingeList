// Import all dependencies
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Actions
import { fetchSearchResults } from "../../store/mediaSlice";

// Import Components
import MediaGrid from "../../components/MediaGrid/MediaGrid";

// Import Styles
import "./SearchPage.css";

// Existing Filter Tabs
const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
];

// SearchPage Component
const SearchPage = () => {
  // Setting up SearchParams for a search query 'query', a type query 'type' and a page query 'page'
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const typeParam = searchParams.get("type") || "all";
  const pageParam = Number(searchParams.get("page")) || 1;
  // Set input local state
  const [inputValue, setInputValue] = useState(queryParam);

  const dispatch = useDispatch();

  // Import the search state from the media slice
  const { results, totalPages, status, error } = useSelector(
    (state) => state.media.search || {},
  ); // Fallback empty object

  // Save the page as a query and only return it if its a valid page number
  const rawPage = Number(searchParams.get("page"));
  const page =
    rawPage && rawPage >= 1 && Number.isInteger(rawPage) ? rawPage : 1;

  // Update input state and trigger search with an empty string if the user enters something like a whitespace so that it doesn't use an API call unecessarily
  useEffect(() => {
    setInputValue(queryParam);
    if (queryParam.trim()) {
      // Trim method removes all whitespace to check if the user entered a 'valid' value so that we can make the search
      dispatch(
        fetchSearchResults({
          query: queryParam,
          type: typeParam,
          page: pageParam,
        }),
      );
    }
  }, [dispatch, queryParam, typeParam, pageParam]);

  // Redirect out-of-bounds pages back to page 1 after API data successfully loads
  useEffect(() => {
    if (status === "succeeded" && totalPages > 0 && page > totalPages) {
      setSearchParams({ page: 1 });
    }
  }, [status, page, totalPages, setSearchParams]);

  // Handle submission function changes the URL search query using setSearchParams
  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ query: trimmed, type: typeParam, page: "1" }); // Resets the page to the first one when searching
    } else {
      setSearchParams({ type: typeParam });
    }
  };

  // Handle filter changes so that the type query updates whether the user has typed in the input or not (changing the filter also leads to a search so that search results are dynamic)
  const handleFilterChange = (newType) => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setSearchParams({ query: trimmed, type: newType, page: "1" }); // Resets the page to the first one when searching
    } else {
      setSearchParams({ type: newType });
    }
  };

  // Handle next/previous page clicks
  const handlePageChange = (newPage) => {
    setSearchParams({ query: queryParam, type: typeParam, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Resets the user to the top of the page
  };

  // Declare variable containing boolean if the status is loading to pass to MediaGrid component
  const isLoading = status === "loading";

  return (
    <div className="search-page">
      <header className="search-header">
        <h1 className="search-title">Search</h1>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Search for movies or TV shows..."
            value={inputValue}
            onChange={({ target }) => setInputValue(target.value)}
          />
          <button type="submit" className="btn search-btn">
            Search
          </button>
        </form>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {FILTER_OPTIONS.map((tab) => (
            // Updates the className so that the 'active' filter renders differently and returns a boolean for the aria-pressed ttribute so screen readers know if a button is pressed
            <button
              key={tab.value}
              type="button"
              className={`tab-btn ${typeParam === tab.value ? "active" : ""}`}
              aria-pressed={typeParam === tab.value}
              onClick={() => handleFilterChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Results Display */}
      {queryParam ? (
        <MediaGrid
          items={results}
          type={typeParam}
          isLoading={isLoading}
          error={error}
          emptyMessage={`No ${
            typeParam === "all"
              ? "results"
              : typeParam === "movie"
                ? "movies"
                : "TV shows"
          } found for the search: "${queryParam}".`}
          onRetry={() =>
            dispatch(
              fetchSearchResults({
                query: queryParam,
                type: typeParam,
                page: pageParam,
              }),
            )
          }
        />
      ) : (
        <div className="search-prompt">
          <p>Type a movie or TV show title to start searching.</p>
        </div>
      )}

      {/* Page Controls */}
      {/* Doesn't load the page controls if there's less than one, if it's still loading or if there was an error*/}
      {queryParam && totalPages > 1 && !isLoading && !error && (
        <div className="page-controls">
          {/* Disables the button if there aren't any previous pages or if the media is still loading */}
          <button
            type="button"
            className="btn back-btn"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous Page
          </button>

          {/* Counter of the current page */}
          <p className="page-number">
            Page {page} of {totalPages}
          </p>

          {/* Disables the button if there aren't any more pages */}
          <button
            type="button"
            className="btn back-btn"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

// Export the SearchPage component
export default SearchPage;
