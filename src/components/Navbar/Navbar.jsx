// Import all dependencies
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Import Styles

// Navbar Component
const Navbar = () => {
  const location = useLocation();

  // Set 'active' className to the NavLink depending on the media type and regardless of the category selected
  const isMovieActive = location.pathname.startsWith("/category/movie");
  const isTVActive = location.pathname.startsWith("/category/tv");

  return (
    <nav className="navbar">
      <NavLink
        to="/category/movie/popular"
        className={`nav-link ${isMovieActive ? "active" : ""}`}
      >
        Movies
      </NavLink>
      <NavLink
        to="/category/tv/popular"
        className={`nav-link ${isTVActive ? "active" : ""}`}
      >
        TV Shows
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Search
      </NavLink>
      <NavLink
        to="/watchlist"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        Watchlist
      </NavLink>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;
