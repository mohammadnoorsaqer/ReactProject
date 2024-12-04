import React from "react";
import Navbar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer.Jsx";
import '../src/App.css'
import MainSection from "./Components/MainSection/MainSection";
const App = () => {
  return (
    <div>
      <Navbar />
      <MainSection />
      <Footer />
    </div>
  );
};

export default App;
