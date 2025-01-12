import React from 'react';
import labtest from '../assets/labtest.mp4';
import '../../css/Banner.module.css';
import './Banner.css'
 
const Banner = () => {
  return (
    <section
      className="section-98 section-sm-110"
      style={{
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className='banner'>
      {/* Left Side: Paragraph */}
      <div className='leftside' style={{ flex: 1, padding: '20px' }}>
        <h2 style={{ color: '#000', fontWeight: '700', fontSize: 'xx-large', marginBottom: '15px' }}>
          The Importance of Genetic Testing
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
          Genetic testing can provide invaluable insights into your genetic makeup, helping you understand potential risks
          for hereditary diseases. It empowers individuals to take proactive steps in managing their health and making
          informed decisions about their lifestyle and treatment options. Whether it's identifying predispositions to
          specific conditions or planning for family health, genetic testing offers a personalized approach to healthcare.
        </p>
      </div>
 
      {/* Right Side: Video */}
      <div className='rightside' style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <video
          src={labtest}
          autoPlay
          loop
          muted
          style={{
            width: '70%',
            maxWidth: '1000px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        ></video>
      </div>
      </div>
    </section>
  );
};
 
export default Banner;