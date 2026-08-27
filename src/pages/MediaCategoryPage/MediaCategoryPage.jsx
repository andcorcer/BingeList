// Import all dependencies
import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Actions
import { fetchCategoryMediaThunk } from "../../store/mediaSlice";

// Import Components
import MediaGrid from "../../components/MediaGrid/MediaGrid.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

// Import Styles
import "./MediaCategoryPage.css";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    results,
    totalPages = 1,
    status,
    error,
  } = useSelector((state) => state.media.category || {});

  // Save the page as a query and only return it if its a valid page number
  const rawPage = Number(searchParams.get("page"));
  const page =
    rawPage && rawPage >= 1 && Number.isInteger(rawPage) ? rawPage : 1;

  // Fetch media details when the component mounts or when mediaType or category or page change
  useEffect(() => {
    dispatch(fetchCategoryMediaThunk({ type: mediaType, category, page }));
  }, [dispatch, mediaType, category, page]);

  // Redirect out-of-bounds pages back to page 1 after API data successfully loads
  useEffect(() => {
    if (status === "succeeded" && totalPages > 0 && page > totalPages) {
      setSearchParams({ page: 1 });
    }
  }, [status, page, totalPages, setSearchParams]);

  // Handle changing the active category using tabs
  const handleCategoryChange = (newCategory) => {
    navigate(`/category/${mediaType}/${newCategory}`);
  };

  // Handle next/previous page clicks
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Resets the user to the top of the page
  };

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
          {mediaType === "movie" ? "Movies" : "TV Shows"} -{" "}
          {formatCategory(category)}
        </h2>

        {/* Category Selector */}
        <div className="category-selector">
          <select
            value={category}
            onChange={({ target }) => handleCategoryChange(target.value)}
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
        onRetry={() =>
          dispatch(fetchCategoryMediaThunk({ type: mediaType, category, page }))
        }
      />

      {/* Page Controls */}
      {/* Doesn't load the page controls if there's less than one, if it's still loading or if there was an error*/}
      {totalPages > 1 && !isLoading && !error && (
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

// Export the MediaCategoryPage component
export default MediaCategoryPage;
