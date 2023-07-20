import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import BookSchedule from './pages/BookSchedule';
import MyBookings from './pages/Userinfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Home onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
        />
        <Route path="/home" element={token ? <Home onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/bookschedule" element={token ? <BookSchedule onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/mybookings" element={token ? <MyBookings onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
