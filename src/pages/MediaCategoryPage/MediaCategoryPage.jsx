// Import all dependencies
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Actions
import { fetchCategoryMediaThunk } from "../../store/mediaSlice";

// Import Components
import MediaGrid from "../../components/MediaGrid/MediaGrid.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

// Import Styles

// Existing Categories
const CATEGORIES = {
  movie: [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Now Playing", value: "now_playing" },
  ],
  tv: [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "On The Air", value: "on_the_air" },
    { label: "Airing Today", value: "airing_today" },
  ],
};

// MediaCategoryPage Component
const MediaCategoryPage = () => {
  const { mediaType, category = "popular" } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { results, page, totalPages, status, error } = useSelector(
    (state) => state.media.category || {}
  );

  // Fetch media details when the component mounts or when mediaType, category or page change
  useEffect(() => {
    dispatch(fetchCategoryMediaThunk({ type: mediaType, category, page }));
  }, [dispatch, mediaType, category, page]);

  // Handle changing the active category using tabs
  const handleCategoryChange = (newCategory) => {
    navigate(`/category/${mediaType}/${newCategory}`);
  };

  // Handle next/previous page clicks
  const handlePageChange = (newPage) => {
    dispatch(fetchCategoryMediaThunk({ type: mediaType, category, page: newPage }));
  }

  // Format the returned category into readable text (e.g. "top_rated => Top Rated")
  const formatCategory = (category) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Array of the avaiable categories for a given media type
  const availableCategories = CATEGORIES[mediaType] || [];

  // Checks if the page is loading
  const isLoading = status === "loading";

return (
    <div className="category-page">
      <header className="category-header">
        <h2 className="category-title">
          {mediaType === "movie" ? "Movies" : "TV Shows"} - {formatCategory(category)}
        </h2>

        {/* Category Selector */}
        <div className="category-selector">
          <select
            value={category}
            onChange={({target}) => handleCategoryChange(target.value)}
            className="category-select"
          >
            {availableCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Grid */}
      <MediaGrid
        items={results}
        type={mediaType}
        isLoading={isLoading}
        error={error}
        emptyMessage={`No ${mediaType === "movie" ? "movies" : "TV shows"} found for the ${category} category.`}
        onRetry={() => dispatch(fetchCategoryMediaThunk({ type: mediaType, category }))}
      />

      {/* Page Controls */}
      {totalPages > 1 && (
        <div className="page-controls">
          {/* Disables the button if there aren't any previous pages or if the media is still loading */}
          <button
            type="button"
            className="btn back-btn"
            disabled={page === 1 || isLoading} 
            onClick={() => handlePageChange(page - 1)} 
          >
            Previous Page
          </button>

          {/* Counter of the current page */}
          <p className="page-number">
            Page {page} of {totalPages}
          </p>

          {/* Disables the button if there aren't any more pages or if the media is still loading */}
          <button
            type="button"
            className="btn back-btn"
            disabled={page === totalPages || isLoading}
            onClick={() => handlePageChange(page + 1)}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

// Export the MediaCategoryPage component
export default MediaCategoryPage;