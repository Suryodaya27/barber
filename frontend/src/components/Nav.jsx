import React from 'react';
import { Link } from 'react-router-dom';

// Sample SVG icon components (replace these with your actual SVG code)
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"></path>
  </svg>
);

const BookScheduleIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-week" viewBox="0 0 16 16">
  <path d="M1.5 1a.5.5 0 0 1 .5.5V14h12V1.5a.5.5 0 0 1 1 0V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V1.5a.5.5 0 0 1 .5-.5zM15 0a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
  <path d="M1 4.5h14M2 8.5h5"/>
</svg>
);

const UserInfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>  </svg>
);

const Sidebar = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ height: '100vh' }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        <span className="fs-4">TrimTrends</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item my-2">
          <Link to="/" className="nav-link " aria-current="page">
            <HomeIcon /> {/* SVG Icon for Home */}
            Home
          </Link>
        </li>
        <li>
          <Link to="/bookschedule" className="nav-link text-white my-2">
            <BookScheduleIcon /> {/* SVG Icon for Book Schedule */}
            Book Schedule
          </Link>
        </li>
        <li>
          <Link to="/mybookings" className="nav-link text-white my-2">
            <UserInfoIcon /> {/* SVG Icon for User Info */}
            User Info
          </Link>
        </li>
      </ul>
      <hr />
      <button className="btn btn-primary" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Sidebar;
