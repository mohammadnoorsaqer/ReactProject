import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <header className="navbar-header-xyz">
  <nav className="navbar">
  <ul className="navbar-links">
    {/* Left Side Links */}
    <li>
      <Link to="/" className="navbar-link">Home</Link>
    </li>
    <li>
      <Link to="/watchlist" className="navbar-link">Watchlist</Link>
    </li>
    <li>
          <Link 
            to="/profile" 
            className="navbar-link profile-link"
          >
            My Profile
          </Link>
        </li>
    
    {/* Right Side Buttons (only show logout/profile if logged in) */}
    {currentUser ? (
      <>
      <li className="logout-item">
  <button 
    onClick={logout} 
    className="navbar-button logout-button"
    aria-label="Logout"
  >
    Logout
  </button>
</li>


      
      </>
    ) : (
      <li>
        <Link 
          to="/login" 
          className="navbar-link login-link"
        >
          Log In
        </Link>
      </li>
    )}
  </ul>
</nav>


      <div className="navbar-header-content-pqr">
        <img
          src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/logo.png?raw=true"
          alt="Hulu Logo"
          className="navbar-logo-xyz"
          loading="lazy"
        />
        <h1 className="navbar-header-text-1-lmn">
          Watch thousands of TV shows and movies.
        </h1>
        <p className="navbar-header-text-2-ghi">
          HBO Max™, SHOWTIME®, CINEMAX® and STARZ® available as add-ons.
        </p>
        <Link 
          to="/subscriptions" 
          className="navbar-btn-cta-vbn"
        >
          Start Your Free Trial
        </Link>
        <p className="navbar-legal-text-efg">
          Free trial for new & eligible returning subscribers only.
        </p>
      </div>
    </header>
  );
};

export default Navbar;