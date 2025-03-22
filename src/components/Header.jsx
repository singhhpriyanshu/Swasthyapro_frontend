import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from "../assets/hero_bg.png"; // Import the image

const Header = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((currentActiveIndex) => (currentActiveIndex + 1) % 3); // Assuming there are 3 items
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: "-48px" }} className="hero_area">
      <div className="hero_bg_box">
        <img src={heroBg} alt="Hero Background" /> {/* Use imported image */}
      </div>

      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="index.html">
              {/* <span>SwasthyaPro</span> */}
            </a>
          </nav>
        </div>
      </header>

      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {['Book Your Appointment Today', 'Your Health, Your Hands: Schedule Your Lab Test Now!', 'We Provide Best Healthcare'].map((title, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="detail-box">
                        <h1>{title}</h1>
                        <p>
                          {index === 0
                            ? "Take control of your health with our comprehensive lab tests — easy, fast, and convenient!"
                            : index === 1
                            ? "Stay on top of your schedule and make time for what matters. Choose a convenient date and time to get started—it's quick and easy!"
                            : "Explore comprehensive healthcare solutions tailored for you and your family. Discover more about what we offer."
                          }
                        </p>
                        <div className="btn-box">
                          {index === 0 && (
                            <button onClick={() => navigate("/find-test")} className="btn1">
                              Coming Soon
                            </button>
                          )}
                          {index === 1 && (
                            <button className="btn1">
                              Book Test
                            </button>
                          )}
                          {index !== 0 && index !== 1 && (
                            <a href="" className="btn1">
                              Read More
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ol className="carousel-indicators">
            {Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} data-target="#customCarousel1" data-slide-to={idx} className={idx === activeIndex ? 'active' : ''}></li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default Header;
