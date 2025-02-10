import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../css/services.css";
import "../../css/aos.css";
import "../../css/bootservices.css";
import "../../css/responsiveservice.css";
import Cancer from "../assets/Cancer.png";
import reproductive from "../assets/reproductive.png";
import geneticdisorder from "../assets/geneticdisorder.png";
import pathalogy from "../assets/pathalogy.png";
import dr from "../assets/dr.png";
import neuro from "../assets/neuroscience_9619636.png";
import "./Services.css";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200 }); // Adjust duration globally if needed
  }, []);

  return (
    <section class="services-area bg-color pt-100 pb-70" style={{ backgroundColor: "ghostwhite", marginTop: "5px", marginBottom: "95px" }}>
      <div class="container">
        <div id="services" data-aos="fade-up" data-aos-duration="1200" class="section-title aos-init aos-animate">
          {/* <span class="top-title" style={{marginLeft: "423px",color: "black",fontSize: "xx-large",fontWeight: 400}}>Our Services</span> */}
          <h2 style={{ fontSize: "xxx-large", fontWeight: "normal" }}> Our <span style={{ color: "#2E8B57" }}>Services</span></h2>
          {/* <p style={{marginLeft:'300px'}}>Your pathway to health and healing—modern solutions for every ailment, tailored to keep you thriving.</p> */}
        </div>

        <div id="cards" class="row">
          <div data-aos="fade-up" data-aos-duration="1400" class="col-lg-4 col-sm-6 aos-init aos-animate">
            <div class="single-services">
              <img src={dr} alt="" style={{ width: "80px", height: "80px", marginLeft: "106px", marginBottom: "25px", margin: "auto" }} />
              <h3 style={{ fontSize: "22px", fontWeight: "300" }}>Doctor Consultation</h3>
              <p>Expert advice at your fingertips—consult with top doctors to guide your path to optimal health.</p>
              <a onClick={() => navigate("/doctors")} class="read-more">
                Check Now
              </a>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-duration="1600" class="col-lg-4 col-sm-6 aos-init aos-animate">
            <div class="single-services">
              <img src={neuro} alt="" style={{ width: "80px", height: "80px", marginLeft: "106px", marginBottom: "25px", margin: "auto" }} />
              <h3 style={{ fontSize: "22px", fontWeight: "300" }}>Neurology</h3>
              <p>Unlocking the mysteries of the mind—expert care for your brain and nervous system.</p>
              <a onClick={() => navigate("/find-test")} class="read-more">
                Check Now
              </a>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-duration="1800" class="col-lg-4 col-sm-6 aos-init aos-animate">
            <div class="single-services">
              <img src={geneticdisorder} alt="" style={{ width: "80px", height: "80px", marginLeft: "106px", marginBottom: "25px", margin: "auto" }} />
              <h3 style={{ fontSize: "22px", fontWeight: "300" }}>Genetic Disorders</h3>
              <p>Discover your heritage with comprehensive tests for genetic disorders, protecting generations.</p>
              <a onClick={() => navigate("/find-test")} class="read-more">
                Check Now
              </a>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-duration="2000" class="col-lg-4 col-sm-6 aos-init aos-animate">
            <div class="single-services">
              <img src={reproductive} alt="" style={{ width: "80px", height: "80px", marginLeft: "106px", marginBottom: "25px", margin: "auto" }} />
              <h3 style={{ fontSize: "22px", fontWeight: "300" }}>Reproductive Health</h3>
              <p>Empowering your journey to parenthood with advanced reproductive screenings and compassionate care.</p>
              <a onClick={() => navigate("/find-test")} class="read-more">
                Check Now
              </a>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-duration="2200" class="col-lg-4 col-sm-6 aos-init aos-animate">
            <div class="single-services">
              <img src={Cancer} alt="" style={{ width: "80px", height: "80px", marginLeft: "106px", marginBottom: "25px", margin: "auto" }} />
              <h3 style={{ fontSize: "22px", fontWeight: "300" }}>Cancer Screening</h3>
              <p>Stay one step ahead—early detection through precise cancer screening saves lives.</p>
              <a onClick={() => navigate("/find-test")} class="read-more">
                Check Now
              </a>
            </div>
          </div>

          <div data-aos="fade-up" data-aos-duration="2400" class="col-lg-4 col-sm-6 aos-init aos-animate">
            <div class="single-services">
              <img src={pathalogy} alt="" style={{ width: "80px", height: "80px", marginLeft: "106px", marginBottom: "25px", margin: "auto" }} />
              <h3 style={{ fontSize: "22px", fontWeight: "300" }}>Pathology Test</h3>
              <p>Unlock the secrets of your health with accurate and precise pathology. take Steps</p>
              <a onClick={() => navigate("/find-test")} class="read-more">
                Check Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
