import React from "react";
import NavbarComponent from "../components/Navbar";
import Sidebar from "../components/Nav";
import bgImage from '../img/image-bg.png';
import WhyChooseUs from '../pages/Choose';
import { Link } from "react-router-dom";

function Home({ onLogout }) {
  const handleLogout = () => {
    onLogout();
  };
  return (
    <div className="d-flex">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-grow-1 bg-main-body overflow-auto px-5">
        <section className="bg-main bg-color bg-main-body hero-section">
          <div className="container">
            <div className="row mb-5">
              <div className="d-flex flex-column align-items-start justify-content-center col-xl-6 xol-lg-6 col-md-12 col-12 text-md-start text-center">
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
