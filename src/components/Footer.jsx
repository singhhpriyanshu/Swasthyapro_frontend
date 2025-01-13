import React from 'react';
import { assets } from '../assets/assets';
import Newlogo from '../assets/Newlogo.jpeg';
import './Footer.css'
 
const Footer = () => {
  return (
    <footer class="footer_section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-3 footer_col">
            <div class="footer_contact" id='contact'>
              <h4>Reach at..</h4>
              <div class="contact_link_box">
                <a href="">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                  <span>Location</span>
                </a>
                <a href="">
                  <i class="fa fa-phone" aria-hidden="true"></i>
                  <span>Call +01 1234567890</span>
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
              <a href="">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 footer_col">
            <div class="footer_detail">
              <h4>About</h4>
              <p>
                Beatae provident nobis mollitia magnam voluptatum, unde dicta facilis minima veniam
                corporis laudantium alias tenetur eveniet illum reprehenderit fugit a delectus
                officiis blanditiis ea.
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-2 mx-auto footer_col">
            <div class="footer_link_box">
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
            </div>
          </div>
          <div class="col-md-6 col-lg-3 footer_col ">
            <h4>Newsletter</h4>
            <form action="#">
              <input type="email" placeholder="Enter email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
 
        {/* Horizontal Line to Separate Content */}
        <hr style={{ marginTop: '100px', borderTop: '2px solid #ffffff' }} />
 
        <div class="footer-info">
          <p>
            &copy; <span id="displayYear"></span> All Rights Reserved By https://themewagon.com/"ThemeWagon
          </p>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;
