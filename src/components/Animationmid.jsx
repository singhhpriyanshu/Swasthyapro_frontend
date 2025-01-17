import React from 'react';
// import Alllabtest from '../assets/Alllabtest.mp4';
import './Findtest.css' // Verify the path and file extension

const Animationmid = () => {
  return (
    <div className='animation' style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
      marginTop:'-100px',
    }}>
      <video
        src={Alllabtest}
        style={{
          fixed: true,
          position: 'absolute',
          width: '100%',
          height: '70%',
          top: '50%',
          left: '40%',
          transform: 'translate(-50%, -50%)',
          // objectFit: 'cover'
        }}
        autoPlay
        loop
        muted
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Animationmid;
