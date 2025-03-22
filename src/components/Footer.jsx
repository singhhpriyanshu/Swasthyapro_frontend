import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-5">
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h4 className="text-xl font-semibold italic mb-4">Reach at..</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt /> <span>Location</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone /> <span>Call +91 7827509029</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope /> <span>Info@swasthyapro.com</span>
            </li>
          </ul>
          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-xl hover:text-green-500"><FaFacebookF /></a>
            <a href="#" className="text-xl hover:text-green-400"><FaTwitter /></a>
            <a href="https://www.linkedin.com/in/swasthya-pro-1aba51346" className="text-xl hover:text-blue-600"><FaLinkedinIn /></a>
            <a href="https://www.instagram.com/swasthya_pro" className="text-xl hover:text-pink-500"><FaInstagram /></a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4">About</h4>
          <p className="text-gray-300">
            At SwasthyaPro, we enhance community well-being by providing seamless access to quality healthcare services. 
            Book appointments and medical tests effortlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><NavLink to="/" className="hover:text-blue-400">HOME</NavLink></li>
            <li><NavLink to="/findtests" className="hover:text-blue-400">FIND TESTS</NavLink></li>
            <li><NavLink to="/about" className="hover:text-blue-400">ABOUT</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-blue-400">CONTACT</NavLink></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Policies</h4>
          <ul className="space-y-2">
            <li><NavLink to="/termsandconditions" className="hover:text-blue-400">TERMS AND CONDITIONS</NavLink></li>
            <li><NavLink to="/compliance" className="hover:text-blue-400">COMPLIANCE POLICY</NavLink></li>
            <li><NavLink to="/intellectualpropertypolicy" className="hover:text-blue-400">INTELLECTUAL PROPERTY POLICY</NavLink></li>
            <li><NavLink to="/paymentpolicy" className="hover:text-blue-400">PAYMENT POLICY</NavLink></li>
            <li><NavLink to="/privacypolicy" className="hover:text-blue-400">PRIVACY POLICY</NavLink></li>
            <li><NavLink to="/refundpolicy" className="hover:text-blue-400">REFUND POLICY</NavLink></li>
            <li><NavLink to="/securitypolicy" className="hover:text-blue-400">SECURITY POLICY</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <hr className="border-green-700 my-6" />
      <div className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} SwasthyaPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
