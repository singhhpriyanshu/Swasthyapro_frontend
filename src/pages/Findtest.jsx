import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import images
import BRCA from '../assets/BRCA.jpg';
import BRCA1and2 from '../assets/BRCA1and2.jpg';
import carrierscreening from '../assets/carrierscreening.jpeg';
import cerebralpalsy from '../assets/cerebralpalsy.jpg';
import cervical_cancer_ from '../assets/cervical_cancer_.jpg';
import cervical_cancer_main from '../assets/cervical_cancer_main.jpg';
import Cervical_Cancer_Screening from '../assets/Cervical_Cancer_Screening.jpg';

const FindTest = () => {
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

  const facilityImages = [
    BRCA,
    BRCA1and2,
    carrierscreening,
    cerebralpalsy,
    cervical_cancer_,
    cervical_cancer_main,
    Cervical_Cancer_Screening
  ];

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/getfacilityheader');
      if (response.data && response.data['facility list']) {
        setFacilities(response.data['facility list']);
      }
    } catch (error) {
      console.error("Failed to fetch facilities:", error);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/facility/${id}`);
  };

  return (
    <div className="p-0"> {/* Remove padding */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"> {/* Ensure full width */}
        {facilities.map((facility, index) => {
          const imageSrc = index < facilityImages.length
            ? facilityImages[index]
            : facilityImages[facilityImages.length - 1];

          return (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden 
                         transition-transform transform hover:scale-105 w-full" // Ensure each card takes full width of its cell
              onClick={() => handleCardClick(facility.facilityId)}
            >
              <img
                src={imageSrc}
                alt={facility.facilityName}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-lg font-bold text-center p-2">
                {facility.facilityName}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FindTest;
