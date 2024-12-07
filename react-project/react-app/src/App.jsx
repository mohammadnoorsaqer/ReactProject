import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import MainSection from "./Components/MainSection/MainSection.jsx";
import MovieDetails from "./Components/MovieDetails/MovieDetails.jsx";
import TVShowDetails from "./Components/TvShowDetails/TvShowDetails.jsx";
import Watchlist from "./Components/WatchList/WatchList.jsx";
import Subscriptions from "./Components/Subscriptions/Subscriptions.jsx";
import Login from './Components/login/Login.jsx';
import Register from './Components/login/Register.jsx';
import { AuthProvider } from './Components/context/authContext';
// import "./App.css";

// Create a Layout component to wrap main content
const Layout = () => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
         <MainSection />
        <Footer />
      </AuthProvider>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

// ProtectedRoute component to protect routes that need authentication
const ProtectedRoute = ({ children }) => {
  // Note: You'll need to implement AuthContext for actual authentication
  const isAuthenticated = true; // Replace with actual authentication check

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;


  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/main",
      element: <MainSection />,
    },
    {
      path: "/movie/:id",
      element: <MovieDetails />,
    },
    {
      path: "/show/:id",
      element: <TVShowDetails />,
    },
    {
      path: "/watchlist",
      element: <Watchlist />,
    },
    {
      path: "/subscriptions",
      
      element: <Subscriptions />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <div>Page not found</div>,
    },
  ]);

  return( <AuthProvider> 
  <RouterProvider router={router} />
</AuthProvider>
  );
}

export default App;
