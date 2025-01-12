import React, { useState, useEffect } from 'react';
import cromosomes from '../assets/cromosomes.mp4';
import dnawork from '../assets/dnawork.mp4';

// Test Data
const testData = [
  {
    name: 'Brain Anomalies',
    subTests: [{ name: 'Ultrasound', minCost: 1500, maxCost: 5000 }],
  },
  {
    name: 'Congenital Heart Defects',
    subTests: [{ name: 'Fetal ECG', minCost: 2000, maxCost: 8000 }],
  },
  {
    name: 'Cystic Fibrosis',
    subTests: [
      { name: 'Carrier Screening', minCost: 2000, maxCost: 7000 },
      { name: 'Amniocentesis or CVs', minCost: 12000, maxCost: 20000 },
    ],
  },
  {
    name: 'Spinal Bifida',
    subTests: [
      { name: 'Alpha-Fetoprotein', minCost: 500, maxCost: 2000 },
      { name: 'Ultrasound', minCost: 1500, maxCost: 5000 },
    ],
  },
  {
    name: 'Trisomy (Down Syndrome)',
    subTests: [
      { name: 'NIPT', minCost: 8000, maxCost: 20000 },
      { name: 'Amniocentesis or CVs', minCost: 12000, maxCost: 20000 },
      { name: 'Ultrasound', minCost: 1500, maxCost: 5000 },
    ],
  },
  {
    name: 'Bloom Syndrome',
    subTests: [
      { name: 'Gene Mutation Analysis (Swab)', minCost: 20000, maxCost: 40000 },
      { name: 'Blood', minCost: 25000, maxCost: 50000 },
      { name: 'Chromosomal Breakage Test (Blood)', minCost: 15000, maxCost: 30000 },
      { name: 'Fibroblast Culture Test', minCost: 30000, maxCost: 60000 },
      { name: 'Whole Genome Sequencing', minCost: 150000, maxCost: 300000 },
      { name: 'Whole Exome Sequencing', minCost: 80000, maxCost: 150000 },
      { name: 'Panel Testing (Includes BLM Gene)', minCost: 50000, maxCost: 100000 },
    ],
  },
];

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  // Set the original price and calculate the discounted price
  const originalPrice = content.name === "Ultrasound" ? 5000 : content.minCost;
  const discount = content.name === "Ultrasound" ? 0.2 * originalPrice : 0;
  const discountedPrice = originalPrice - discount;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h3 style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>SubTest</h3>
      <h2>  {content.name}</h2>
      {/* {content.name === "Ultrasound" ? ( */}
      <div style={styles.modalText}>
        <p>Original Price: ₹{originalPrice}</p>
        <p>Discount: 20%</p>
        <p>Discounted Price: ₹{discountedPrice}</p>
      </div>
      {/* ) : ( */}
      <p style={styles.modalText}>Cost range: ₹{content.minCost} - ₹{content.maxCost}</p>
      {/* )} */}
      <button onClick={onClose} style={styles.closeButton}>Close</button>
    </div>
    </div >
  );
};

const FindTest = () => {
  const [selectedTest, setSelectedTest] = useState(testData[0]);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videos = [
    { src: cromosomes, title: 'DNA Test Video' },
    { src: dnawork, title: 'Cell Test Video' },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // Change video every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const openModal = (subTest) => {
    setModalContent(subTest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.banner}>
        <video
          src={videos[currentVideoIndex].src}
          autoPlay
          loop
          muted
          style={styles.bannerMedia}
        ></video>
        <div style={styles.carouselControls}>
          <button onClick={handlePrev} style={styles.controlButton}>&#8249;</button>
          <button onClick={handleNext} style={styles.controlButton}>&#8250;</button>
        </div>
        <h1 style={styles.bannerText}>{videos[currentVideoIndex].title}</h1>
      </div>

      <div style={styles.testSections}>
        <div style={styles.leftSide}>
          <h2 style={styles.majorTestsHeader}>Major Tests</h2>
          <ul style={styles.testList}>
            {testData.map((test, index) => (
              <li
                key={index}
                style={{
                  ...styles.testItem,
                  backgroundColor: test.name === selectedTest.name ? '#d4edda' : 'white',
                }}
                onClick={() => setSelectedTest(test)}
              >
                {test.name}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.rightSide}>
         <h2> Sub-Tests for {selectedTest.name}</h2>
        <ul style={styles.subTestList}>
          {selectedTest.subTests.map((subTest, index) => (
              <li
                key={index}
                style={styles.subTestItem}
                onClick={() => openModal(subTest)}
              >
<strong>{subTest.name}</strong>
                <p>Cost: ₹{subTest.minCost} - ₹{subTest.maxCost}</p>
              </li>
            ))}
      </ul>
    </div>
      </div >

  <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </div >
  );
};

// Style definitions
const styles = {
  // Add the styles from the original snippet here...
  pageContainer: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  banner: {
    position: 'relative',
    marginBottom: '30px',
    textAlign: 'center',
  },
  bannerMedia: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  },
  bannerText: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
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
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '50%',
    fontSize: '20px',
  },
  testSections: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100vh',
  },
  leftSide: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #ccc',
    overflowY: 'auto',
  },
  rightSide: {
    flex: 2,
    padding: '20px',
    backgroundColor: '#f8f9fa',
    overflowY: 'auto',
  },
  majorTestsHeader: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#178066',
  },
  subTestsHeader: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#178066',
  },
  testList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  testItem: {
    padding: '10px',
    margin: '5px 0',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  subTestList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  subTestItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '5px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    // maxWidth: '600px',
    height: '90%',
    borderRadius: '10px',
    overflow: 'auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default FindTest;
