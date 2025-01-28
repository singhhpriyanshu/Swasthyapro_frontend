import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FindTest = () => {
  const [facilities, setFacilities] = useState([]);
  const navigate = useNavigate();

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
    <div className="flex flex-wrap justify-center items-center p-4 gap-4 bg-[#74c69d]">
      {facilities.map((facility, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-4 w-64 cursor-pointer"
             onClick={() => handleCardClick(facility.facilityId)}>
          <h3 className="text-lg font-bold text-center">{facility.facilityName}</h3>
        </div>
      ))}
    </div>
  );
};

export default FindTest;
