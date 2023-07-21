import React, { useState, useEffect } from 'react';
import moment from 'moment';
import NavbarComponent from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Nav';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';

// Custom styled component for glass morphic effect
const GlassMorphicCard = styled(Paper)({
  padding: '20px',
  borderRadius: '10px',
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.15)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  color: 'rgba(255, 255, 255, 0.8)',
  transition: 'background 0.3s, color 0.3s',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    color: 'rgba(255, 255, 255, 1)',
  },
});

// Custom styled component for lighter text
const LightTypography = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
});

const MyBookings = ({ onLogout }) => {
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Retrieve the bearer token from localStorage
        const token = localStorage.getItem('token');

        // Fetch user bookings from the API
        const response = await fetch('http://localhost:8080/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();

        // Split bookings into past and upcoming based on the date
        const today = moment().startOf('day');
        const past = [];
        const upcoming = [];

        data.forEach((booking) => {
          const bookingDate = moment(booking.session.date).startOf('day');

          if (bookingDate.isBefore(today)) {
            past.push(booking);
          } else {
            upcoming.push(booking);
          }
        });

        setPastBookings(past);
        setUpcomingBookings(upcoming);
        setLoading(false);
      } catch (error) {
        setError('Error fetching bookings. Please try again.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  const handleCancelSession = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = `http://localhost:8080/api/cancel/${bookingId}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel session');
      }

      // Display success message
      alert('Session has been canceled successfully');

      // Remove the canceled booking from the state
      const updatedUpcomingBookings = upcomingBookings.filter((booking) => booking.id !== bookingId);
      setUpcomingBookings(updatedUpcomingBookings);
    } catch (error) {
      console.error('Error:', error);
      // Display error message
      alert('Failed to cancel session. Please try again.');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-grow-1 bg-main-body overflow-auto pb-5">
        <div className="mt-5 mx-5">
          <div className="common-heading text-center text-light common-title">
            <h2 className="common-heading text-light">My Bookings</h2>
            <hr className="w-25 mx-auto" />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-white common-title">{error}</p>
          ) : (
            <>
              {upcomingBookings.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-white common-title">Upcoming Bookings :</h4>
                  <Grid container spacing={2}>
                    {upcomingBookings.map((booking) => (
                      <Grid item xs={12} sm={6} md={4} key={booking.id}>
                        <GlassMorphicCard elevation={5}>
                          <LightTypography variant="h5" gutterBottom>
                            Date: {moment(booking.session.date).format('DD/MM/YYYY')}
                          </LightTypography>
                          <LightTypography variant="body1" gutterBottom>
                            Time: {booking.session.time}
                          </LightTypography>
                          {/* <LightTypography variant="body1">Price: {booking.session.price}</LightTypography> */}
                          <LightTypography variant="body1" gutterBottom>Name: {booking.barberShop.name}</LightTypography>
                          <LightTypography variant="body1" gutterBottom>Address: {booking.barberShop.address} , {booking.barberShop.city} , {booking.barberShop.zipCode}</LightTypography>
                          <button className='btn btn-primary mt-2' onClick={() => handleCancelSession(booking.id)}>Cancel Session</button>
                        </GlassMorphicCard>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}

              {pastBookings.length > 0 && (
                <div>
                  <h4 className="text-white common-title mt-5">Past Bookings :</h4>
                  <Grid container spacing={2}>
                    {pastBookings.map((booking) => (
                      <Grid item xs={12} sm={6} md={4} key={booking.id}>
                        <GlassMorphicCard elevation={5}>
                          <LightTypography variant="h5" gutterBottom>
                            Date: {moment(booking.session.date).format('DD/MM/YYYY')}
                          </LightTypography>
                          <LightTypography variant="body1" gutterBottom>
                            Time: {booking.session.time}
                          </LightTypography>
                          {/* <LightTypography variant="body1">Price: {booking.session.price}</LightTypography> */}
                          <LightTypography variant="body1" gutterBottom>Name: {booking.barberShop.name}</LightTypography>
                          <LightTypography variant="body1" gutterBottom>Address: {booking.barberShop.address} , {booking.barberShop.city} , {booking.barberShop.zipCode}</LightTypography>
                          {/* <button className='btn btn-primary mt-2' onClick={() => handleCancelSession(booking.id)}>Cancel Session</button> */}
                        </GlassMorphicCard>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}

              {pastBookings.length === 0 && upcomingBookings.length === 0 && (
                <p className="text-white common-title">No bookings found.</p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
