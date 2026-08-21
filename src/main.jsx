// Import all dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

// Import Components
import App from "./components/App/App.jsx";

// Import Store
import { store } from "./store/store.js";

// Import Styles
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
