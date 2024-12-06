import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import MainSection from "./Components/MainSection/MainSection.jsx";
import MovieDetails from "./Components/MovieDetails/MovieDetails.jsx";
import TVShowDetails from "./Components/TvShowDetails/TvShowDetails.jsx";
import "../src/App.css";
import Watchlist from "./Components/WatchList/WatchList.jsx";
import Register from './Components/Register'; // Adjust the path as needed
import Subscriptions from "./Components/Subscriptions/Subscriptions.jsx"; // Import Subscriptions

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainSection />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* MovieDetails route */}
        <Route path="/show/:id" element={<TVShowDetails />} /> {/* ShowDetails route */}
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
