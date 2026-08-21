// Import all dependencies
import React from "react";
import { Link } from "react-router-dom";

// Import Components
import Navbar from "../Navbar/Navbar.jsx";

// Import Styles

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="title-logo">
        <h1>
          <Link to="/">BingeList</Link>
        </h1>
      </div>
      <Navbar />
    </header>
  );
};

// Export the Header component
export default Header;
