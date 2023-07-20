// import React, { useState, useEffect } from 'react';
// import Calendar from '../components/Calender';
// import moment from 'moment';
// import NavbarComponent from '../components/Navbar';
// import '../styles/scheduleBox.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const BookedSession = () => {
//   const [apiResponse, setApiResponse] = useState([]);

//   const handleDateSelect = (selectedDate) => {
//     // Make the API call with the selected date
//     const apiUrl = `http://localhost:8080/api/availability?date=${selectedDate}`;

//     // Fetch the API response
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         // Update the API response state
//         setApiResponse(data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   useEffect(() => {
//     // Initial API call with today's date
//     const todayDate = moment().format('YYYY-MM-DD');
//     handleDateSelect(todayDate);
//   }, []);

//   const handleSessionBooking = (sessionId) => {
//     // Retrieve the bearer token from localStorage
//     const token = localStorage.getItem('token');
//     console.log(token);
//     console.log(sessionId)
//     // Make the API call to book the session
//     const apiUrl = 'http://localhost:8080/api/book-session';
//     const requestData = {
//       sessionId: sessionId,
//     };

//     fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // Include the bearer token in the Authorization header
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(requestData),
//     })
//       .then((response) => {
//         if (response.ok) {
//           // Display success message
//           alert('Session booked successfully');
//         } else {
//           throw new Error('Failed to book session');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         // Display error message
//         alert('Failed to book session. Please try again.');
//       });
//   };

//   return (
//     <div className='bg-main-body'>
//       <NavbarComponent />
//       <div className="mt-4 mx-5">
//       <div className="common-heading  text-center text-light common-title ">
//         <h2 className="common-heading text-light">Book Schedule</h2>
//         <hr className="w-25 mx-auto" />
//       </div>
//         <Calendar onDateSelect={handleDateSelect} />
//       </div>
//       <div className='container'>
//       <div className="row mt-4">
//         {apiResponse.map((item) => (
//           <div className="col-md-4 mb-4" key={item.id} onClick={() => handleSessionBooking(item.id)}>
//             <div className="card" style={{ cursor: 'pointer' }}>
//               <div className="card-body">
//                 <h5 className="card-title">Date: {moment(item.date).format('YYYY-MM-DD')}</h5>
//                 <p className="card-text">Time: {item.time}</p>
//                 <p className="card-text">Capacity: {item.capacity}</p>
//                 <p className="card-text">Price: {item.price}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default BookedSession;

import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calender';
import moment from 'moment';
import NavbarComponent from '../components/Navbar';
import '../styles/scheduleBox.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Nav';

const BookedSession = () => {
  const [apiResponse, setApiResponse] = useState([]);

  const handleDateSelect = (selectedDate) => {
    // Make the API call with the selected date
    const apiUrl = `http://localhost:8080/api/availability?date=${selectedDate}`;

    // Fetch the API response
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update the API response state
        setApiResponse(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Initial API call with today's date
    const todayDate = moment().format('YYYY-MM-DD');
    handleDateSelect(todayDate);
  }, []);

  const handleSessionBooking = (sessionId) => {
    // Retrieve the bearer token from localStorage
    const token = localStorage.getItem('token');

    // Make the API call to book the session
    const apiUrl = 'http://localhost:8080/api/book-session';
    const requestData = {
      sessionId: sessionId,
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

  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 bg-main-body overflow-auto">
        <div className="mt-4 mx-5">
          <div className="common-heading text-center text-light common-title ">
            <h2 className="common-heading text-light">Book Schedule</h2>
            <hr className="w-25 mx-auto" />
          </div>
          <Calendar onDateSelect={handleDateSelect} />
        </div>
        <div className="container">
          <div className="row mt-4">
            {apiResponse.map((item) => (
              <div
                className="col-md-4 mb-4"
                key={item.id}
                onClick={() => handleSessionBooking(item.id)}
              >
                <div className="card" style={{ cursor: 'pointer' }}>
                  <div className="card-body">
                    <h5 className="card-title">
                      Date: {moment(item.date).format('YYYY-MM-DD')}
                    </h5>
                    <p className="card-text">Time: {item.time}</p>
                    <p className="card-text">Capacity: {item.capacity}</p>
                    <p className="card-text">Price: {item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookedSession;
