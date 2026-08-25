// Import all dependencies
import React from "react";

// Import Components
import MediaCard from "../MediaCard/MediaCard.jsx";
import Error from "../Error/Error.jsx";
import Loading from "../Loading/Loading.jsx";

// Import Styles

// MediaGrid Component
const MediaGrid = ({
  items = [],
  type,
  isLoading = false,
  error = null,
  emptyMessage = "No media items found.", // Optional message to display when the grid is empty
  emptyContent = null, // Optional JSX element to render when no items are found
  onRetry, // Optional callback function to retry fetching data when the grid is empty
}) => {
  // Display error component if there is an error
  if (error) {
    return <Error error={error} onRetry={onRetry} />;
  }

  // If the data is still loading, display the loading component
  if (isLoading) {
    return <Loading />;
  }

  // If no items are found, display a message indicating that the grid is empty
  if (!items || items.length === 0) {
    return (
      <div className="empty-grid">
        {emptyContent ? emptyContent : <p>{emptyMessage}</p>}
      </div>
    );
  }

  // If everything is fine, display the media grid with the media cards
  return (
    <div className="media-grid">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} type={type} />
      ))}
    </div>
  );
};

// Export the MediaGrid Component
export default MediaGrid;
