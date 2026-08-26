// Import all dependencies
import { Outlet } from "react-router-dom";

// Import Components
import Header from "../Header/Header.jsx";

// Import Styles
import "./Layout.css";

// Layout Component
const Layout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* This is where the nested routes will be rendered */}
      </main>
    </div>
  );
};

// Export the Layout component
export default Layout;
