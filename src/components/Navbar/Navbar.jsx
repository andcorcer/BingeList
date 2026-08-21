// Import all dependencies
import React from "react";
import { NavLink } from "react-router-dom";

// Import Styles

// Navbar Component
const Navbar = () => {
  // Get the class name for the link based on whether it is active or not to style accordingly
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <NavLink to="/media/movie" className={getLinkClass}>
        Movies
      </NavLink>
      <NavLink to="/media/tv" className={getLinkClass}>
        TV Shows
      </NavLink>
      <NavLink to="/search" className={getLinkClass}>
        Search
      </NavLink>
      <NavLink to="/watchlist" className={getLinkClass}>
        Watchlist
      </NavLink>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;
