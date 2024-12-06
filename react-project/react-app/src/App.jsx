import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import MainSection from "./Components/MainSection/MainSection.jsx";
import MovieDetails from "./Components/MovieDetails/MovieDetails.jsx";
import TVShowDetails from "./Components/TvShowDetails/TvShowDetails.jsx"; // Import the TVShowDetails component
import "../src/App.css";
import Watchlist from "./Components/WatchList/WatchList.jsx";
import Register from './Components/Register'; // Adjust the path based on where the Register component is located




const App = () => {
  return (
    <Router>
      <Navbar />
      {/* <Register /> */}
      <Routes>
      <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainSection />} />
        <Route path="/movie/:id" element={<MovieDetails />} />  {/* MovieDetails route */}
        <Route path="/show/:id" element={<TVShowDetails />} />  {/* ShowDetails route */}
        <Route path="/watchlist" element={<Watchlist />} />


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
