import React, { useState } from 'react';
import DnaAnimation from '../assets/DnaAnimation.mp4';
import Dna1 from '../assets/Dna1.jpg';
import spina from '../assets/spina.jpeg';
import oncologypic from '../assets/oncologypic.jpg';
import cancer1 from '../assets/cancer1.jpg';

const MainContent = () => {
  const [hoverIndex, setHoverIndex] = useState(null); // State to track hovered item

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    padding: '20px',
    width: '300px', // Set a fixed width for the card
    transition: 'transform 0.3s ease',
    transform: hoverIndex ? 'scale(1.03)' : 'scale(1)',
    zIndex: 2, // Ensure the cards are above the video
    position: 'relative' // Ensure proper stacking context
  };

  const imageContainerStyle = {
    height: '150px',
    width: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  const imageStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  };

  const textStyle = {
    textAlign: 'center'
  };

  const backgroundVideoStyle = {
    // position: 'fixed', // Ensure the video is fixed across the entire background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure video covers the entire viewport without distortion
    zIndex: 1  // Lower z-index to ensure it remains in the background
  };

  return (
    <div style={{ paddingTop: "50px", paddingBottom: "50px", position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <video style={backgroundVideoStyle}
             src={DnaAnimation}
             autoPlay
             loop
             muted>
        Your browser does not support the video tag.
      </video>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
        {/* Reproductive Health Card */}
        <div style={cardStyle} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}>
          <div style={imageContainerStyle}>
            <img src={cancer1} alt="Genetic Disorder" style={imageStyle} />
          </div>
          <div style={textStyle}>
            <h3>Genetic Disorder</h3>
            <p>Empowering your journey to parenthood with advanced reproductive health screenings and compassionate care.</p>
          </div>
        </div>

        {/* Genetic Gene Testing Card */}
        <div style={cardStyle} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}>
          <div style={imageContainerStyle}>
            <img src={cancer1} alt="cancer1" style={imageStyle} />
          </div>
          <div style={textStyle}>
            <h3>cancer1</h3>
            <p>Discover your heritage—comprehensive testing for inherited genetic disorders to protect and empower future generations.</p>
          </div>
        </div>

        <div style={cardStyle} onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}>
          <div style={imageContainerStyle}>
            <img src={oncologypic} alt="Oncology" style={imageStyle} />
          </div>
          <div style={textStyle}>
            <h3>Oncology</h3>
            <p>Discover your heritage—comprehensive testing for inherited genetic disorders to protect and empower future generations.</p>
          </div>
        </div>   
      </div>
    </div>
  );
};

export default MainContent;
