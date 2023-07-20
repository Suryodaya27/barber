// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import NavbarComponent from '../components/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const MyBookings = ({ onLogout }) => {
//   const [pastBookings, setPastBookings] = useState([]);
//   const [upcomingBookings, setUpcomingBookings] = useState([]);

//   useEffect(() => {
//     // Retrieve the bearer token from localStorage
//     const token = localStorage.getItem('token');

//     // Fetch user bookings from the API
//     fetch('http://localhost:8080/api/bookings', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Split bookings into past and upcoming based on the date
//         const today = moment().startOf('day');
//         const past = [];
//         const upcoming = [];

//         data.forEach((booking) => {
//           const bookingDate = moment(booking.session.date).startOf('day');

//           if (bookingDate.isBefore(today)) {
//             past.push(booking);
//           } else {
//             upcoming.push(booking);
//           }
//         });

//         setPastBookings(past);
//         setUpcomingBookings(upcoming);
//       })
//       .catch((error) => {
//         console.error('Error fetching bookings:', error);
//       });
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//   };


//   return (
//     <div className='bg-main-body'>
//       <NavbarComponent />
//       <div className="mt-5 mx-5">
//       <div className="common-heading text-center text-light common-title ">
//         <h2 className="common-heading text-light">My Bookings</h2>
//         <hr className="w-25 mx-auto" />
//       </div>

//         {upcomingBookings.length > 0 && (
//           <div className="mb-4">
//             <h4 className='text-white common-title'>Upcoming Bookings : </h4>
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//               {upcomingBookings.map((booking) => (
//                 <div className="col" key={booking.id}>
//                   <div className="card">
//                     <div className="card-body">
//                       <h5 className="card-title">Date: {moment(booking.session.date).format('DD/MM/YYYY')}</h5>
//                       <p className="card-text">Time: {booking.session.time}</p>
//                       <p className="card-text">Price: {booking.session.price}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {pastBookings.length > 0 && (
//           <div>
//             <h4 className='text-white common-title mt-5'>Past Bookings : </h4>
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//               {pastBookings.map((booking) => (
//                 <div className="col" key={booking.id}>
//                   <div className="card bg-light">
//                     <div className="card-body">
//                       <h5 className="card-title">Date: {moment(booking.session.date).format('DD/MM/YYYY')}</h5>
//                       <p className="card-text">Time: {booking.session.time}</p>
//                       <p className="card-text">Price: {booking.session.price}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {pastBookings.length === 0 && upcomingBookings.length === 0 && (
//           <p className=' text-white common-title'>No bookings found.</p>
//         )}

//         <button className='btn btn-primary my-5' onClick={handleLogout}>logout</button>
//       </div>
//     </div>
//   );
// };

// export default MyBookings;

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import NavbarComponent from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Nav';

const MyBookings = ({ onLogout }) => {
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  useEffect(() => {
    // Retrieve the bearer token from localStorage
    const token = localStorage.getItem('token');

    // Fetch user bookings from the API
    fetch('http://localhost:8080/api/bookings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 bg-main-body overflow-auto">
        <div className="mt-5 mx-5">
          <div className="common-heading text-center text-light common-title">
            <h2 className="common-heading text-light">My Bookings</h2>
            <hr className="w-25 mx-auto" />
          </div>

          {/* Rest of the component's content */}
          {/* ... */}

          {upcomingBookings.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white common-title">Upcoming Bookings :</h4>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {upcomingBookings.map((booking) => (
                  <div className="col" key={booking.id}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          Date: {moment(booking.session.date).format('DD/MM/YYYY')}
                        </h5>
                        <p className="card-text">Time: {booking.session.time}</p>
                        <p className="card-text">Price: {booking.session.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastBookings.length > 0 && (
            <div>
              <h4 className="text-white common-title mt-5">Past Bookings :</h4>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {pastBookings.map((booking) => (
                  <div className="col" key={booking.id}>
                    <div className="card bg-light">
                      <div className="card-body">
                        <h5 className="card-title">
                          Date: {moment(booking.session.date).format('DD/MM/YYYY')}
                        </h5>
                        <p className="card-text">Time: {booking.session.time}</p>
                        <p className="card-text">Price: {booking.session.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastBookings.length === 0 && upcomingBookings.length === 0 && (
            <p className="text-white common-title">No bookings found.</p>
          )}

          <button className="btn btn-primary my-5" onClick={handleLogout}>
            logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
