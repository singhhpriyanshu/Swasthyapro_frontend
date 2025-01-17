import React, { useState } from 'react';
import cancer1 from '../assets/cancer1.jpg';
import reproductivehealth from '../assets/reproductivehealth.jpg';
import dna from '../assets/dna.jpg';
import bg1 from '../assets/bg1.jpg';
import './Maincontent.css'; 
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
 
  // const bgimg = {
  //   // position: 'fixed', // Ensure the video is fixed across the entire background
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'cover', // Ensure video covers the entire viewport without distortion
  //   zIndex: 1  // Lower z-index to ensure it remains in the background
  // };
 
  return (
    <div className='container' style={{ paddingTop: "40px", paddingBottom: "70px", position: 'relative', height: '100vh', overflow: 'hidden' }}>
      
      <img id='img1' src={bg1} alt="bg1" />
 
      <div id='card' style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%',}} >
        {/* Reproductive Health Card */}
        <div id='card1' style={cardStyle} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}>
          <div style={imageContainerStyle}>
            <img src={dna} alt="Genetic Disorder" style={imageStyle} />
          </div>
          <div style={textStyle}>
            <h3>Genetic Disorder</h3>
            <p>Discover your heritage—comprehensive testing for inherited genetic disorders to protect and empower future generations.</p>
          </div>
        </div>
 
        {/* Genetic Gene Testing Card */}
        <div id='card2' style={cardStyle} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}>
          <div style={imageContainerStyle}>
            <img src={cancer1} alt="Spina" style={imageStyle} />
          </div>
          <div style={textStyle}>
            <h3>Cancer Screening</h3>
            <p>Cancer screening involves checking for cancer before there are any symptoms of the disease.</p>
          </div>
        </div>
 
        <div id='card3' style={cardStyle} onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}>
          <div style={imageContainerStyle}>
            <img src={reproductivehealth} alt="Oncology" style={imageStyle} />
          </div>
          <div style={textStyle}>
            <h3>Oncology</h3>
            <p>Oncology is the branch of medicine dedicated to the study, diagnosis, treatment, and prevention of cancer.</p>
          </div>
        </div>   
      </div>
    </div>
  );
};
 
export default MainContent;