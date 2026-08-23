// Import all dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Actions
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../store/watchlistSlice.js";

// Import Styles

// MediaCard Component
const MediaCard = ({ item, type }) => {
  // Give a default value to the type prop to avoid errors when it is not provided
  const dispatch = useDispatch(); // Get the dispatch function from Redux to dispatch actions

  // Save all the item's details
  const mediaType = item.media_type || type; // Use the media_type from the item if available, otherwise use the type prop
  const title = item.title || item.name; // Use the title from the item if available (for movies), otherwise use the name (for TV shows)
  const releaseDate = item.release_date || item.first_air_date; // Use the release_date from the item if available (for movies), otherwise use the first_air_date (for TV shows)
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  // Get the poster image URL or use a placeholder if not available
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}` // Use the TMDB image URL if the poster_path is available and specify the width as 500px while maintaining the aspect ratio 2:3
    : "https://via.placeholder.com/500x750?text=No+Image"; // Use a placeholder image if the poster_path is not available with the same aspect ratio as the TMDB images (2:3) and a text indicating that no image is available

  // Get the watchlist from the Redux store and check if the current item is in the watchlist
  const watchlist = useSelector((state) => state.watchlist.items);
  const isInWatchlist = watchlist.some(
    (watchlistItem) =>
      watchlistItem.id === item.id && watchlistItem.media_type === mediaType, // Checks if the current item is already in the watchlist by comparing both id and media_type
  );

  // Function to handle adding or removing the item from the watchlist
  const handleWatchlistToggle = (event) => {
    event.preventDefault(); // Prevent the default link behavior to avoid navigation when clicking the button
    event.stopPropagation(); // Stop the event from propagating to parent elements to prevent unwanted side effects

    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ id: item.id, media_type: mediaType })); // Dispatch the removeFromWatchlist action with the item's id and media_type
    } else {
      dispatch(
        addToWatchlist({
          id: item.id,
          media_type: mediaType,
          title,
          release_date: releaseDate,
          poster_path: item.poster_path,
          vote_average: item.vote_average,
        }),
      ); // Dispatch the addToWatchlist action with the item's details
    }
  };

  return (
    <div className="media-card">
      <div className="poster-container">
        {/* Link to the media details page that activates when clicking anywhere on the card */}
        <Link to={`/media/${mediaType}/${item.id}`} className="card-link">
          <img
            src={posterUrl}
            alt={title}
            className="poster-img"
            loading="lazy"
          />
          {/* Display the poster image with lazy loading to improve performance */}
        </Link>

        {/* Add a button to add or remove the item from the watchlist */}
        <button
          type="button"
          className={`watchlist-btn ${isInWatchlist ? "active" : ""}`}
          onClick={handleWatchlistToggle}
          aria-label={
            isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
          }
        >
          {isInWatchlist ? "★" : "☆"}{" "}
          {/* Display a filled star if the item is in the watchlist, otherwise display an empty star */}
        </button>
      </div>

      {/* Another Link element to the same path to ensure that clicking anywhere on the card (BUT THE BUTTON) navigates to the media details page */}
      <Link to={`/media/${mediaType}/${item.id}`} className="card-link">
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <div className="card-meta">
            <span className="rating">⭐ {rating}</span>
            <span className="year">{year}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Export the MediaCard component
export default MediaCard;
