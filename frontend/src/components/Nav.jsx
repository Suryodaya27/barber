import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
      };
  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height: '100vh' }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        <span className="fs-4">Barber</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link " aria-current="page">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
            Home
          </Link>
        </li>
        <li>
          <Link to="/bookschedule" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
            Book Schedule
          </Link>
        </li>
        <li>
          <Link to="/mybookings" className="nav-link text-white">
            <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
            User Info
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
