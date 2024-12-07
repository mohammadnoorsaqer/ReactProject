import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <header className="navbar-header-xyz">
      <nav className="navbar-nav-abc">
        <ul>
          {currentUser ? (
            <>
              {/* Display Logout and Profile buttons if the user is logged in */}
              <li>
                <button onClick={logout} className="navbar-logout-btn-qwe">Logout</button>
              </li>
              <li>
                <Link to="/profile" className="navbar-profile-btn-asd">My Profile</Link>
              </li>
            </>
          ) : (
            // Show Log In button if the user is not logged in
            <li>
              <Link to="/login" className="navbar-login-btn-zxc">Log In</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="navbar-header-content-pqr">
        <img
          src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/logo.png?raw=true"
          alt="Logo"
          className="navbar-logo-xyz"
        />
        <div className="navbar-header-text-1-lmn">Watch thousands of TV shows and movies.</div>
        <div className="navbar-header-text-2-ghi">
          HBO Max™, SHOWTIME®, CINEMAX® and STARZ® available as add-ons.
        </div>
        <Link to="/subscriptions" className="navbar-btn-cta-vbn">
          Start Your Free Trial
        </Link>
        <div className="navbar-legal-text-efg">
          Free trial for new & eligible returning subscribers only.
        </div>
      </div>
    </header>
  );
};

export default Navbar;
