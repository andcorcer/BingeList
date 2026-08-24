// Import all dependencies
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Import Actions
import { fetchMediaDetails } from "../../store/mediaSlice";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../store/watchlistSlice";

// Import Components
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

// Import Styles
import "./DetailsPage.css";

// DetailsPage Component
const DetailsPage = () => {
  const { mediaType, id } = useParams(); // Get media_type and id from the URL parameters
  const dispatch = useDispatch();

  const { data, status, error } = useSelector((state) => state.media.details); // Get media details from the Redux store

  const watchlist = useSelector((state) => state.watchlist.items); // Get watchlist items from the Redux store

  useEffect(() => {
    dispatch(fetchMediaDetails({ type: mediaType, id }));
  }, [dispatch, mediaType, id]);

  if (status === "loading") {
    return <Loading />; // Show loading spinner while fetching data
  }

  if (error || status === "failed") {
    return (
      <Error
        message={error}
        onRetry={() => dispatch(fetchMediaDetails({ type: mediaType, id }))}
      />
    ); // Show error message if fetching data fails
  }

  if (!data) {
    return <p>No data available.</p>; // Show message if no data is available
  }

  const isInWatchlist = watchlist.some((item) => item.id === data.id && item.mediaType === mediaType); // Check if the media item by checking both its ID and media type since ID's aren't unique across media types

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(data));
    } else {
      dispatch(addToWatchlist(data));
    }
  };

  // Save all the item's details
  const title = data.title || data.name; // Use the title from the data if available (for movies), otherwise use the name (for TV shows)
  const releaseDate = data.release_date || data.first_air_date; // Use the release_date from the data if available (for movies), otherwise use the first_air_date (for TV shows)
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const rating = data.vote_average ? data.vote_average.toFixed(1) : "N/A";
  const genres = data.genres?.map((genre) => genre.name).join(", ") || "N/A";

  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const backdropUrl = data.backdrop_path
    ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
    : null;

  return (
    <div className="details-page">
      {/* Background Backdrop Header */}
      {backdropUrl && (
        <div
          className="details-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="details-backdrop-overlay" />
        </div>
      )}

      <div className="details-container">
        {/* Media Poster Column */}
        <div className="details-poster-wrapper">
          <img src={posterUrl} alt={title} className="details-poster" />
          <button
            type="button"
            className={`btn watchlist-btn-large ${isInWatchlist ? "active" : ""}`}
            onClick={handleWatchlistToggle}
          >
            {isInWatchlist ? "★ In Watchlist" : "☆ Add to Watchlist"}
          </button>
        </div>

        {/* Media Information Column */}
        <div className="details-info">
          <h1 className="details-title">
            {title} <span className="details-year">({year})</span>
          </h1>

          {data.tagline && <p className="details-tagline">"{data.tagline}"</p>}

          <div className="details-meta">
            <span className="badge rating">⭐ {rating}</span>
            <span className="badge type">{mediaType.toUpperCase()}</span>
            {data.runtime && (
              <span className="badge duration">{data.runtime} min</span>
            )}
            {data.number_of_seasons && (
              <span className="badge seasons">
                {data.number_of_seasons} Season
                {data.number_of_seasons > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="details-genres">
            <strong>Genres:</strong> {genres}
          </div>

          <div className="details-overview-section">
            <h3>Overview</h3>
            <p className="details-overview">
              {data.overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the DetailsPage component
export default DetailsPage;