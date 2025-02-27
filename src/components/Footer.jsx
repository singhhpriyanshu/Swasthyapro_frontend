import React from 'react';
import { assets } from '../assets/assets';
import Newlogo from '../assets/Newlogo.jpeg';
import './Footer.css'
import { NavLink, useNavigate } from 'react-router-dom';

 
const Footer = () => {
  return (
    <footer class="footer_section">
      <div class="container-fluid" >
        <div class="row" style={{marginLeft:15}}>
          <div class="col-md-3 col-lg-3 footer_col">
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
              <div class="row">
          <div class="col-md-12 col-lg-12 footer_col">
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
        </div>
            </div>
          </div>
          <div class="col-md-3 col-lg-3 footer_col">
            <div class="footer_detail">
              <h4>About</h4>
              <p>
              At SwasthyaPro, we are committed to enhancing the well-being of our community by providing seamless access to quality healthcare services. 
              Our platform simplifies the process of scheduling appointments with qualified doctors and arranging necessary medical tests, ensuring that you receive timely and efficient care.
              </p>
            </div>
          </div>
          <div class="col-md-3 col-lg-3 footer_col">
            <div class=" col-md-13 col-lg-13 footer_link_box" style={{marginLeft:80}}>
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <NavLink to="/">
                    HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/findtests">
                    FIND TESTS
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about">
                    ABOUT
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact">
                    CONTACT
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-3 col-lg-3 footer_col">
            <div class="footer_link_box">
              <h4>Policies</h4>
              <ul>
                <li>
                  <NavLink to="/termsandconditions">
                    TERMS AND CONDITIONS
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/compliance">
                    COMPLIANCE POLICY
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/intellectualpropertypolicy">
                    INTELLECTUAL PROPERTY POLICY
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/paymentpolicy">
                    PAYMENT POLICY
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacypolicy">
                    PRIVACY POLICY
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/refundpolicy">
                    REFUND POLICY
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/securitypolicy">
                    SECURITY POLICY
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
       
        <hr style={{ marginTop: '50px', borderTop: '2px solid #ffffff' }} />
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