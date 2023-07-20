import React from 'react';
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="mx-5 container-fluid">
        <Link className="navbar-brand" to="/">Barber</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link nav-link-large me-4" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-large me-4" to="/bookschedule">Book Schedule</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-large me-4" to="/mybookings">User Info</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;
