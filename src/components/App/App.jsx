// Import all dependencies
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import Components
import Layout from "../Layout/Layout.jsx";

// Import Pages
import HomePage from "../../pages/HomePage/HomePage.jsx";
import DetailsPage from "../../pages/DetailsPage/DetailsPage.jsx";
import SearchPage from "../../pages/SearchPage/SearchPage.jsx";
import MediaCategoryPage from "../../pages/MediaCategoryPage/MediaCategoryPage.jsx";
import WatchlistPage from "../../pages/WatchlistPage/WatchlistPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

// Import Styles
import "./App.css";

// Create the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path="/category/:mediaType/:category"
        element={<MediaCategoryPage />}
      />
      <Route path="/media/:mediaType/:id" element={<DetailsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

// App Component
function App() {
  return <RouterProvider router={router} />;
}

// Export the App component
export default App;