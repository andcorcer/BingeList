// Import all dependencies
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Import Actions
import { clearWatchlist } from "../../store/watchlistSlice";

// Import Components
import MediaGrid from "../../components/MediaGrid/MediaGrid";

// Import Styles

// WatchlistPage Component
const WatchlistPage = () => {
  const dispatch = useDispatch();

  const {
    items = [],
    status = "idle",
    error = null,
  } = useSelector((state) => state.watchlist || {});

  
  // Checks if the page is loading
  const isLoading = status === "loading";

  // Checks if the page has items
  const hasItems = items.length > 0;

  // Handle 'Clear All'
  const handleClearAll = () => {
    window.confirm("Are you sure you want to clear your entire watchlist?") && dispatch(clearWatchlist());
  }

  // Custom JSX passed neatly into MediaGrid
  const emptyWatchlist = (
    <div className="watchlist-empty">
      <div className="empty-icon">🔖</div>
      <h2>Your Watchlist is Empty</h2>
      <p>Keep an eye on movies and TV shows you want to watch by adding them to your list.</p>
      <Link to="/search" className="btn browse-btn">
        Browse Content
      </Link>
    </div>
  );

  return (
    <div className="watchlist-page">
      <header className="watchlist-header">
        <div className="watchlist-header-content">
          <h1 className="watchlist-title">My Watchlist</h1>
            {/* paragraph element that displays the amount of titles saved (and maintains pluralization) or displays a message if there isn't any */}
            <p className="watchlist-count">
              {hasItems ? `${items.length} ${items.length === 1 ? "title" : "titles"} saved` : "No titles saved"}
            </p>
        </div>

        {/* Clear Items Button (only renders if watchlist has any items) */}
        {hasItems && (
          <button
            type="button"
            className="btn clear-btn"
            onClick={handleClearAll}
            disabled={isLoading}
          >
            Clear All
          </button>
        )}
      </header>

      {/* Main Grid */}
        <MediaGrid
          items={items}
          isLoading={isLoading}
          error={error}
          emptyContent={emptyWatchlist}
        />
    </div>
  );
};

// Export the WatchlistPage component
export default WatchlistPage;