import React, { useState, useEffect } from 'react';
import bookAppoinment from '../assets/bookAppoinment.mp4';
import videocall from '../assets/videocall.mp4';
import header_2_video from '../assets/header_2_video.mp4';
import './Banner2.css';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Book Doctor Appointment",
    description:
      "Find the best doctors near you for your specific health needs. Convenient scheduling and trusted professionals for every patient.",
    buttonText: "Book Appointment",
    buttonColor: "#9b5de5",
    videoSrc: bookAppoinment,
    textOnLeft: false, // Text on the left for this slide
  },
  {
    id: 2,
    title: "Book Lab Tests",
    description:
      "Get lab tests booked conveniently from the comfort of your home. Reliable diagnostics for accurate health insights.",
    buttonText: "Book Lab Test",
    buttonColor: "#2b9348",
    videoSrc: header_2_video,
    textOnLeft: false, // Text on the right for this slide
  },
  {
    id: 3,
    title: "Video Consultation",
    description:
      "Connect with healthcare professionals via video consultations. Safe, secure, and convenient consultations anytime, anywhere.",
    buttonText: "Start Consultation",
    buttonColor: "#17a2b8",
    videoSrc: videocall,
    textOnLeft: false, // Text on the left for this slide
  },
];

const Banner2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const carouselStyles = {
    container: {
      position: "relative",
      width: "100%",
      margin: "40px auto",
      overflow: "hidden",
      borderRadius: "15px",
      backgroundColor: "#f8f9fa",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    inner: {
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      transform: `translateX(-${currentSlide * 100}%)`
    },
    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: "100%",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "15px",
      backgroundColor: "#ffffff",
      boxSizing: "border-box",
    },
    textContainer: {
      flex: "1",
      padding: "20px",
    },
    title: (color) => ({
      color,
      marginBottom: "10px",
    }),
    description: {
      marginBottom: "20px",
      color: "#000"
    },
    button: (color) => ({
      backgroundColor: color,
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "16px",
    }),
    video: {
      flex: "1",
      width: "100%",
      maxHeight: "300px", // Keep video size consistent
    },
    controls: {
      position: "absolute",
      top: "50%",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      transform: "translateY(-50%)",
    },
    controlButton: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff",
      border: "none",
      padding: "10px",
      cursor: "pointer",
      borderRadius: "50%",
      fontSize: "20px",
    },
  };

  return (
    <div style={carouselStyles.container}>
      <div style={carouselStyles.inner}>
        {slides.map((slide) => (
          <div style={carouselStyles.item} key={slide.id}>
            {slide.textOnLeft && (
              <div style={carouselStyles.textContainer}>
                <h2 style={carouselStyles.title(slide.buttonColor)}>{slide.title}</h2>
                <p style={carouselStyles.description}>{slide.description}</p>
                <button
                  style={carouselStyles.button(slide.buttonColor)}
                  onClick={() => {
                    if (slide.buttonText === "Book Appointment") {
                      navigate("/doctors");
                    } else if (slide.buttonText === "Book Lab Test") {
                      navigate("/find-test");
                    }
                  }}
                >
                  {slide.buttonText}
                </button>
              </div>
            )}
            <video
              src={slide.videoSrc}
              autoPlay
              loop
              muted
              style={carouselStyles.video}
            ></video>
            {!slide.textOnLeft && (
              <div style={carouselStyles.textContainer}>
                <h2 style={carouselStyles.title(slide.buttonColor)}>{slide.title}</h2>
                <p style={carouselStyles.description}>{slide.description}</p>
                <button
                  style={carouselStyles.button(slide.buttonColor)}
                  onClick={() => {
                    if (slide.buttonText === "Book Appointment") {
                      navigate("/doctors");
                    } else if (slide.buttonText === "Book Lab Test") {
                      navigate("/find-test");
                    }
                  }}
                >
                  {slide.buttonText}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <div style={carouselStyles.controls}>
        <button style={carouselStyles.controlButton} onClick={handlePrev}>
          &#8249;
        </button>
        <button style={carouselStyles.controlButton} onClick={handleNext}>
          &#8250;
        </button>
      </div> */}
    </div>
  );
};

export default Banner2;
