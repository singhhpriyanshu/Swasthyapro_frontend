import React from 'react';
import labtest from '../assets/labtest.jpg';
import aboutus from '../assets/aboutus.jpeg';
import bg1 from '../assets/bg1.jpg'; // Background image

const About = () => {
  return (
    <div className="w-full flex flex-col">

      {/* Hero Section with Background Image */}
      <div className="h-screen w-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: `url(${bg1})`, marginTop: '-70px' }}>
        <div className="absolute inset-0 bg-green-800/60"></div>
        <div className="relative text-center">
          <h1 className="text-6xl font-bold text-white">About Us</h1>
          <p className="mt-4 text-xl text-white max-w-4xl mx-auto">
            Discover who we are and why we are committed to bringing you the best in healthcare services. SwasthyaPro is dedicated to making healthcare accessible and hassle-free for everyone across India.
          </p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6 text-sky-500">Welcome to SwasthyaPro</h2>
        <p className="text-black">
          From lab test bookings to doctor consultations, our platform connects you with trusted diagnostic labs and experienced doctors—all in just a few clicks. Whether you need a quick test or expert medical advice, SwasthyaPro ensures quality care at your convenience.
          <strong> Your health, our priority!</strong>
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4 text-sky-500">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img src={labtest} alt="Mission" className="w-full rounded shadow"/>
          <div>
            <p><strong>Mission:</strong> To provide affordable, convenient, and high-quality healthcare to every Indian, no matter where they are.</p>
            <p><strong>Vision:</strong> A future where everyone has easy access to diagnostic services and medical expertise at their fingertips.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 p-6 rounded shadow hover:bg-blue-400 transition-all text-white">
            <h3 className="font-bold mb-2">🖥️ User-Friendly Portal</h3>
            <p>Easily navigate and book appointments within minutes.</p>
          </div>
          <div className="bg-blue-500 p-6 rounded shadow hover:bg-blue-400 transition-all text-white">
            <h3 className="font-bold mb-2">👩‍⚕️ Verified Doctors</h3>
            <p>Only experienced, certified professionals.</p>
          </div>
          <div className="bg-blue-500 p-6 rounded shadow hover:bg-blue-400 transition-all text-white">
            <h3 className="font-bold mb-2">🧬 Comprehensive Lab Tests</h3>
            <p>Genetic, DNA, and pathology tests all in one place.</p>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-15 bg-blue-200 text-black" style={{marginBottom:10}}>
  <h2 className="text-3xl font-semibold mb-6 text-center" style={{marginTop:14}}>More Reasons to Choose SwasthyaPro</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <img src={aboutus} alt="Why Choose Us" className="rounded shadow md:order-2" style={{marginBottom:14}}/>
    <div className="space-y-4 md:order-1" style={{marginTop:80}}>
      <p><strong>💡 Convenience:</strong> Book tests & consultations in minutes.</p>
      <p><strong>📍 Nationwide Network:</strong> Trusted healthcare services across India.</p>
      <p><strong>🔬 Accurate & Reliable:</strong> Partnered with NABL-certified labs and experienced doctors.</p>
      <p><strong>📱 Easy-to-Use Platform:</strong> Seamless booking with just a few taps.</p>
    </div>
  </div>
</div>

      {/* Closing Statement */}
      {/* <div className="bg-green-600 text-center py-6 text-white-500">
        <p>Together, we aim to create a healthier, happier tomorrow. Experience SwasthyaPro today!</p>
      </div> */}

    </div>
  );
};

export default About;
