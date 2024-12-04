// resources/js/components/Navbar.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import "./NavBar.css";


const Navbar = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
          <Link href="/login" className="login-btn">Log In</Link>  {/* Link to Login page */}
          </li>
        </ul>
      </nav>
      <div className="header-content">
        <h4>Try up to one month free</h4>
        <img
          src="https://github.com/bradtraversy/hulu-webpage-clone/blob/main/img/logo.png?raw=true"
          alt="Hulu"
          className="logo"
        />
        <div className="header-text-1">Watch thousands of TV shows and movies.</div>
        <div className="header-text-2">
          HBO Max™, SHOWTIME®, CINEMAX® and STARZ® available as add-ons.
        </div>
        <button className="btn btn-cta">Start Your Free Trial</button>
        <div className="legal-text">
          Free trial for new & eligible returning subscribers only.
        </div>
      </div>
    </header>
  );
};

export default Navbar;