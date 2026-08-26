// Import all dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Import Actions
import { fetchTrendingMedia } from "../../store/mediaSlice.js";

// Import Components
import MediaGrid from "../../components/MediaGrid/MediaGrid.jsx";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loading/Loading.jsx";

// Import Styles
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, tv, status, error } = useSelector(
    (state) => state.media.trending,
  );
  const [timeframe, setTimeFrame] = useState("day"); // Default time frame is "day"

  // Fetch trending media on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTrendingMedia(timeframe));
    }
  }, [status, dispatch, timeframe]);

  // Handle time frame change
  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
    dispatch(fetchTrendingMedia(newTimeFrame));
  };

  // Display error component if there is an error
  if (error) {
    return (
      <Error
        error={error}
        onRetry={() => dispatch(fetchTrendingMedia(timeframe))}
      />
    );
  }

  // Display loading component if the data is still loading
  if (status === "loading") {
    return <Loading />;
  }

  // We call the error and the loading component directly instead of passing isLoading and error props to MediaGrid because we have one for each media type (TV shows and movies)

  const featuredItem = movies?.[0] || tv?.[0]; // Display the first trending item as the featured hero banner

  return (
    <div className="home-page">
      {/* Featured Hero Banner */}
      {featuredItem && status === "succeeded" && (
        <section className="hero-banner">
          <div
            className="hero-backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredItem.backdrop_path})`,
            }}
          >
            <div className="hero-overlay">
              <div className="hero-content">
                <span className="hero-badge">Trending #1</span>
                <h1>{featuredItem.title || featuredItem.name}</h1>{" "}
                {/* Display title for movies and name for TV shows */}
                <p className="hero-overview">{featuredItem.overview}</p>
                <div className="hero-actions">
                  <Link
                    to={`/media/${featuredItem.media_type || "movie"}/${featuredItem.id}`}
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Grid Section */}
      <section className="trending-section">
        <select
          value={timeframe}
          onChange={({ target }) => handleTimeFrameChange(target.value)}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
        </select>
        <h2>Trending {timeframe === "day" ? "Today" : "This Week"}</h2>
        {/* Shows the corresponding timeframe for the trending media */}
        <h3>Movies</h3>
        <MediaGrid items={movies} type="movie" />
        <h3>TV Shows</h3>
        <MediaGrid items={tv} type="tv" />
      </section>
    </div>
  );
};

// Export the HomePage component
export default HomePage;
