import React from 'react';
import { assets } from '../assets/assets';
import Newlogo from '../assets/Newlogo.jpeg';
import './Footer.css'
import { NavLink, useNavigate } from 'react-router-dom';

 
const Footer = () => {
  return (
    <footer class="footer_section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-3 footer_col">
            <div class="footer_contact" id='contact'>
              <h4 style={{fontStyle:'italic'}}>Reach at..</h4>
              <div class="contact_link_box">
                <a href="">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  <span>Location</span>
                </a>
                <a href="">
                  <i class="fa fa-phone" aria-hidden="true"></i>
                  <span>Call +91 7827509029</span>
                </a>
                <a href="">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                  <span>Info@swasthyapro.com</span>
                </a>
              </div>
            </div>
            <div class="footer_social" id='media'>
              <a href="">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="">
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="https://www.linkedin.com/in/swasthya-pro-1aba51346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/swasthya_pro?igsh=OHc5bGh3ZjRmaWp4">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 footer_col">
            <div class="footer_detail">
              <h4>About</h4>
              <p>
              At SwasthyaPro, we are committed to enhancing the well-being of our community by providing seamless access to quality healthcare services. 
              Our platform simplifies the process of scheduling appointments with qualified doctors and arranging necessary medical tests, ensuring that you receive timely and efficient care.
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-2 mx-auto footer_col">
            {/* <div class="footer_link_box">
              <h4>Links</h4>
              <div class="footer_links">
                <a class="active" href="index.html">
                  Home
                </a>
                <a class="" href="about.html">
                  About
                </a>
                <a class="" href="departments.html">
                  Departments
                </a>
                <a class="" href="doctors.html">
                  Doctors
                </a>
                <a class="" href="contact.html">
                  Contact Us
                </a>
              </div>
            </div> */}
          </div>
          <div class="col-md-6 col-lg-4 mx-auto footer_col">
             <NavLink to="/">
                      <li className="py-1 text-sm">HOME</li>
                    </NavLink>
                    <NavLink to="/doctors">
                      <li className="py-1 text-sm">FIND DOCTORS</li>
                    </NavLink>
                    <NavLink to="/findtests">
                      <li className="py-1 text-sm">FIND TESTS</li>
                    </NavLink>
                    <NavLink to="/my-appointments">
                      <li className="py-1 text-sm">APPOINTMENTS</li>
                    </NavLink>
                    <NavLink to="/about">
                      <li className="py-1 text-sm">ABOUT</li>
                    </NavLink>
                    <NavLink to="/contact">
                      <li className="py-1 text-sm">CONTACT</li>
                    </NavLink>
          </div>
        </div>
 
        {/* Horizontal Line to Separate Content */}
        <hr style={{ marginTop: '100px', borderTop: '2px solid #ffffff' }} />
 
        <div class="footer-info">
          <p>
            &copy; <span id="displayYear"></span> 2025 SwasthyaPro. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;
