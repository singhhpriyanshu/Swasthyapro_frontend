import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [tests, setTests] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFacilities();
    if (id) {
      fetchTests(id);
    }
  }, [id]);

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

  const fetchTests = async (facilityId) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/getfacility/${facilityId}`);
      if (response.data && response.data['facility list']) {
        setTests(response.data['facility list']);
      } else {
        console.log("No data found for facility");
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3 bg-white p-4">
        {facilities.map((facility, index) => (
          <div key={index} className="p-2 hover:bg-gray-200 cursor-pointer"
               onClick={() => navigate(`/facility/${facility.facilityId}`)}>
            <h3 className="text-lg">{facility.facilityName}</h3>
          </div>
        ))}
      </div>
      <div className="w-2/3 p-4">
        {tests.length > 0 ? (
          tests.map((test, index) => (
            <div key={index} className="mb-4 p-4 shadow cursor-pointer"
                 onClick={() => navigate(`/tests/${test.test_id}`)}> {/* Navigate to test details */}
              <h4 className="text-xl font-bold">{test.test_name}</h4>
              <p>{test.test_details}</p>
              <p>Preparation: {test.test_preparation_details}</p>
              <p>TAT: {test.test_TAT}</p>
              <p>Price: {test.price_for_test}</p>
            </div>
          ))
        ) : (
          <p>No test data available.</p>
        )}
      </div>
    </div>
  );
};

export default Facility;
