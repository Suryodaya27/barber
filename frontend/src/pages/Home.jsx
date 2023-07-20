// import React from "react";
// import NavbarComponent from "../components/Navbar";
// import Sidebar from "../components/Nav";
// import bgImage from '../img/image-bg.png'
// import WhyChooseUs from '../pages/Choose'
// function Home() {
//   return (
//     <>
//     <NavbarComponent/>
//     <main className="bg-main-body">
//       <section className="bg-main bg-color bg-main-body hero-section">
//         <div className="container">
//           <div className="row mb-5">
//             <div className="d-flex flex-column align-items-start justify-content-center col-xl-6 xol-lg-6 col-md-12 col-12 text-md-start text-center">
//               <h1 className="text-capitalize fw-bolder text-white">
//                 We Collect High Quality Leads
//               </h1>
//               <p className="mt-3 mb-5 para-width text-light-grey">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
//                 ipsum suspendisse ultrices gravi.
//               </p>

//               <div className="text-center w-100 text-md-start">
//                 <button
//                   className="btn btn-primary px-5 py-2"
//                   data-bs-offset="0,5"
//                   data-bs-placement="top"
//                   data-bs-title="Get Best Services"
//                   data-bs-toggle="tooltip"
//                 >
//                   Contact Us
//                 </button>
//               </div>
//             </div>

//             <div className="d-lg-block d-none col-xl-6 xol-lg-6 col-md-12 col-12 hero-image--section">
//               <div className="text-md-end text-center mb-5 mt-3">
//                 {/* <video autoPlay className="hero-video--section" loop muted src="./images/hero.mp4">
//                         Your browser does not support the video tag.
//                     </video> */}
//                 <img
//                   className="hero-video--section"
//                   src={bgImage}
//                   alt="Hero Banner"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <WhyChooseUs/>
//     </main>
//     </>
//   );
// }

// export default Home;


import React from "react";
import NavbarComponent from "../components/Navbar";
import Sidebar from "../components/Nav";
import bgImage from '../img/image-bg.png';
import WhyChooseUs from '../pages/Choose';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 bg-main-body overflow-auto">
        <section className="bg-main bg-color bg-main-body hero-section">
          <div className="container">
            <div className="row mb-5">
              <div className="ml-3 d-flex flex-column align-items-start justify-content-center col-xl-6 xol-lg-6 col-md-12 col-12 text-md-start text-center">
                <h1 className="text-capitalize fw-bolder text-white">
                Look Your Best, Feel Your Best
                </h1>
                <p className="mt-3 mb-5 para-width text-light-grey">
                Expert Styling and Grooming Services for the Modern Gentleman.
                </p>

                <div className="text-center w-100 text-md-start">
                  <button
                    className="btn btn-primary px-5 py-2"
                    data-bs-offset="0,5"
                    data-bs-placement="top"
                    data-bs-title="Get Best Services"
                    data-bs-toggle="tooltip"
                  ><Link to="/bookschedule" className="text-white">
                    Book Now
                    </Link>
                  </button>
                </div>
              </div>

              <div className="d-lg-block d-none col-xl-6 xol-lg-6 col-md-12 col-12 hero-image--section">
                <div className="text-md-end text-center mb-5 mt-3">
                  <img
                    className="hero-video--section"
                    src={bgImage}
                    alt="Hero Banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUs />
      </main>
    </div>
  );
}

export default Home;
