// Import all dependencies
import React from "react";

// Import Styles
import "./Error.css";

// Error Component
const Error = ({ error, onRetry }) => {
  // Extract a clean string for the UI
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "An unexpected error occurred. Please try again."; // Fallback message if error is not a string or doesn't have a message property

  return (
    <div className="error-container">
      <p className="error-message">⚠️ {errorMessage}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

// Export the Error Component
export default Error;
