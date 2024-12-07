import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <ul>
          {currentUser ? (
            <>
              {/* Display Logout and Profile buttons if the user is logged in */}
              <li>
                <button onClick={logout} className="logout-btn">Logout</button>
              </li>
              <li>
                <Link to="/profile" className="profile-btn">My Profile</Link>
              </li>
            </>
          ) : (
            // Show Log In button if the user is not logged in
            <li>
              <Link to="/login" className="login-btn">Log In</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="header-content">
        <h4>Try up to one month free</h4>
        <img
          src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/logo.png?raw=true"
          alt="Logo"
          className="logo"
        />
        <div className="header-text-1">Watch thousands of TV shows and movies.</div>
        <div className="header-text-2">
          HBO Max™, SHOWTIME®, CINEMAX® and STARZ® available as add-ons.
        </div>
        <Link to="/subscriptions" className="btn btn-cta">
          Start Your Free Trial
        </Link>
        <div className="legal-text">
          Free trial for new & eligible returning subscribers only.
        </div>
      </div>
    </header>
  );
};

export default Navbar;
