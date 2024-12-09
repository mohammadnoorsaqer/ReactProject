import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext); // Access currentUser and logout from context

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

          {/* Only show "My Profile" if the user is logged in */}
          {currentUser && (
            <li>
              <Link to="/profile" className="navbar-link profile-link">
                My Profile
              </Link>
            </li>
          )}

          {/* Right Side Buttons (only show logout/login if logged in) */}
          {currentUser ? (
            <li className="logout-item">
              <button 
                onClick={logout} 
                className="navbar-button logout-button"
                aria-label="Logout"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="navbar-link login-link">
                Log In
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="navbar-header-content-pqr">
      <h1 style={{
  background: 'linear-gradient(to right, #1CE783, #0EB770)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  fontSize: '3rem',
  display: 'inline-block'
}}>
  Movix
</h1>
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
