import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calender';
import moment from 'moment';
import '../styles/scheduleBox.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Nav';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';

// Custom styled component for glass morphic effect
const GlassMorphicCard = styled(Paper)({
  cursor: 'pointer',
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

const BookedSession = ({ onLogout }) => {
  const [barberShopsData, setBarberShopsData] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [selectedBarberShopId, setSelectedBarberShopId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const fetchBarberShops = () => {
    return fetch('http://localhost:8080/api/getBarbers')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching barber shops:', error);
      });
  };

  const fetchAvailableSessions = (barberShopId, selectedDate) => {
    const apiUrl = `http://localhost:8080/api/${barberShopId}/availability?date=${selectedDate}`;
    return fetch(apiUrl)
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching available sessions:', error);
      });
  };

  useEffect(() => {
    // Fetch the list of barber shops
    fetchBarberShops().then((data) => {
      setBarberShopsData(data);
    });
  }, []);

  const handleBarberShopSelect = (barberShopId) => {
    setSelectedBarberShopId(barberShopId);
    setShowAlert(false); // Hide the alert if visible

    // Fetch available sessions for the selected date and barber shop
    fetchAvailableSessions(barberShopId, selectedDate).then((data) => {
      setApiResponse(data);
    });
  };

  const handleDateSelect = (selectedDate) => {
    setSelectedDate(selectedDate);

    if (selectedBarberShopId !== null) {
      // Fetch available sessions for the selected date and barber shop
      fetchAvailableSessions(selectedBarberShopId, selectedDate).then((data) => {
        setApiResponse(data);
      });
    }
  };

  const handleSessionBooking = (sessionId) => {
    setSelectedSessionId(sessionId);
    setShowAlert(true); // Show the alert
  };

  const confirmBooking = () => {
    // Retrieve the bearer token from localStorage
    const token = localStorage.getItem('token');

    // Make the API call to book the session
    const apiUrl = 'http://localhost:8080/api/book-session';
    const requestData = {
      sessionId: selectedSessionId,
      barbershopId: selectedBarberShopId,
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include the bearer token in the Authorization header
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          // Display success message
          alert('Session booked successfully');

          // After successful booking, fetch available sessions again
          fetchAvailableSessions(selectedBarberShopId, selectedDate).then((data) => {
            setApiResponse(data);
          });
        } else {
          throw new Error('Failed to book session');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Display error message
        alert('Failed to book session. Please try again.');
      });
  };

  const handleYesButtonClick = () => {
    confirmBooking();
    setShowAlert(false); // Hide the alert after booking
  };

  const handleNoButtonClick = () => {
    setSelectedSessionId(null); // Reset the selected session ID
    setShowAlert(false); // Hide the alert
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="d-flex">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-grow-1 bg-main-body overflow-auto px-5">
        <div className="mt-4 mx-5">
          <div className="common-heading text-center text-light common-title ">
            <h2 className="common-heading text-light">Book Schedule</h2>
            <hr className="w-25 mx-auto" />
          </div>

          {/* Render the list of barber shops if no barber shop is selected */}
          {selectedBarberShopId === null ? (
            <div className="">
              <Grid container spacing={2}>
                {barberShopsData.map((barberShop) => (
                  <Grid item xs={12} sm={6} md={4} key={barberShop.id}>
                    <GlassMorphicCard elevation={5} onClick={() => handleBarberShopSelect(barberShop.id)}>
                      <LightTypography variant="h5" gutterBottom>
                        {barberShop.name}
                      </LightTypography>
                      <LightTypography variant="body1" gutterBottom>
                        Address: {barberShop.address}
                      </LightTypography>
                      {/* Add more information about the barber shop here */}
                    </GlassMorphicCard>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            // Render the calendar and available sessions if a barber shop is selected
            <div>
              <Calendar onDateSelect={handleDateSelect} />
              <div className="container">
                <Grid container spacing={2}>
                  {apiResponse.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <GlassMorphicCard elevation={5} onClick={() => handleSessionBooking(item.id)}>
                        <LightTypography variant="h5" gutterBottom>
                          Date: {moment(item.date).format('DD/MM/YYYY')}
                        </LightTypography>
                        <LightTypography variant="body1" gutterBottom>
                          Time: {item.time}
                        </LightTypography>
                        <LightTypography variant="body1" gutterBottom>
                          Capacity: {item.capacity}
                        </LightTypography>
                        <LightTypography variant="body1">Price: {item.price}</LightTypography>
                      </GlassMorphicCard>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* "Are you sure?" alert */}
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-message">
            <p>Are you sure you want to book this session?</p>
            <button onClick={handleYesButtonClick}>Yes</button>
            <button onClick={handleNoButtonClick}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedSession;
