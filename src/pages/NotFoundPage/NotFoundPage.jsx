// Import all dependencies
import React from "react";
import { Link } from "react-router-dom";

// Import Styles
import "./NotFoundPage.css";

// NotFoundPage Component
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1 className="error-code">404</h1>
      <h2>Page Not Found</h2>
      <p>
        This URL path does not exist, has been changed or removed. Please check
        the URL or return to the home page.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

// Export the NotFoundPage component
export default NotFoundPage;
