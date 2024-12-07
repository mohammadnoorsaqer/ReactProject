import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar/NavBar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import MainSection from "./Components/MainSection/MainSection.jsx";
import MovieDetails from "./Components/MovieDetails/MovieDetails.jsx";
import TVShowDetails from "./Components/TvShowDetails/TvShowDetails.jsx"; // Import the TVShowDetails component
import "../src/App.css";
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import UpdateProfilePicture from './UpdateProfilePicture';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/movie/:id" element={<MovieDetails />} />  {/* MovieDetails route */}
        <Route path="/tv-show/:id" element={<TVShowDetails />} /> {/* TVShowDetails route */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<EditProfile userId={1} />} />
        <Route path="/profile/update-picture" element={<UpdateProfilePicture userId={1} />} />
        {/* <Route path="/change-password" component={ChangePassword} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
