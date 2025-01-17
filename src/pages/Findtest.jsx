import React, { useState, useEffect } from 'react';
import test1 from '../assets/test1.jpg';
import test2 from '../assets/test2.jpg';
import test3 from '../assets/test3.png';

const testData = [
  { name: 'GENETIC DISORDERS' },
  { name: 'Preimplantation Genetic Analysis ' },
  { name: 'Breast and Ovarian cancer' },
  { name: 'CERVICAL Cancer' },
  { name: 'Cystic Fibrosis' },
  { name: 'Duchenne muscular dystrophy' },
  { name: 'Brain Anomalies' },
  { name: 'Achondroplasia' },
  { name: 'Sperm DNA Fragmentation Test ' },
  { name: 'Y chromosome microdeletion ' },
  { name: 'Blood Test' },
  { name: 'Kidney Checkup' },
];

const FindTest = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const images = [
    { src: test1 },
    { src: test2 },
    { src: test3 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const getCardStyle = (index) => ({
    width: '150px',
    height: '130px',
    backgroundColor: hoverIndex === index ? 'seagreen' : '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: hoverIndex === index ? '0 10px 15px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: hoverIndex === index ? 'scale(1.1)' : 'scale(1)',
    overflow: 'hidden',
    // fontsize: '10px',
  });

  return (
    <div style={styles.pageContainer}>
      <div style={styles.banner}>
        <img
          src={images[currentImageIndex].src}
          alt={`Display Image ${currentImageIndex + 1}`}
          style={styles.bannerMedia}
        />
        <div style={styles.carouselControls}>
          <button onClick={handlePrev} style={styles.controlButton}>&#8249;</button>
          <button onClick={handleNext} style={styles.controlButton}>&#8250;</button>
        </div>
      </div>

      <div style={styles.testContainer}>
        {testData.map((test, index) => (
          <div
            key={index}
            style={getCardStyle(index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={styles.testInfo}>
              <h3>{test.name.toUpperCase()}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: '#74c69d',
  },
  banner: {
    position: 'relative',
    marginBottom: '30px',
    width: '100%',
    textAlign: 'center',
  },
  bannerMedia: {
    width: '100%',
    height: '450px',
    objectFit: 'contain',
    borderRadius: '20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 1.5s ease-in-out',
  },
  carouselControls: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    transform: 'translateY(-50%)',
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    border: 'none',
    padding: '20px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontSize: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.4s',
  },
  testContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '70px',
  },
  testInfo: {
    textAlign: 'center',
    color: '#333',
    animation: 'slideIn 0.4s ease',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes slideIn': {
    from: { transform: 'translateY(30px)' },
    to: { transform: 'translateY(0)' },
  },
};

export default FindTest;
