// Import all dependencies
import { Route , createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'

// Import Components


// Import Styles
import './App.css'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={} />
    )
  )

  return (
   <RouterProvider router={router} />
  );
}

export default App
