import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);
  const navigate = useNavigate();
  const { facilityId } = useParams(); // Capture facilityId from URL

  useEffect(() => {
    fetchFacilities();
    if (facilityId) {
      setSelectedFacilityId(facilityId); // Set selected facility based on URL parameter
      fetchTests(facilityId);
    }
  }, [facilityId]);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/getfacilityheader');
      if (response.data && response.data['facility list']) {
        setFacilities(response.data['facility list']);
      }
    } catch (error) {
      console.error('Failed to fetch facilities:', error);
    }
  };

  const fetchTests = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/admin/getfacility/${id}`);
      if (response.data && response.data['facility list']) {
        setTests(response.data['facility list']);
      } else {
        console.log('No data found for facility');
        setTests([]);
      }
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleFacilitySelect = (id) => {
    setSelectedFacilityId(id); // Set the selected facility ID
    fetchTests(id);
    navigate(`/facility/${id}`); // Navigate to ensure URL is updated
  };

  const handleTestClick = (test) => {
    navigate('/tests/details', { state: { testDetails: test } });
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white-200">
      <div className="lg:w-1/4 w-full" style={{ minWidth: '300px', margin: '10px' }}>
        <p className="bg-green-600 text-white text-center py-2">Filters</p>
        <div className="overflow-auto p-4 bg-white rounded-lg shadow" style={{ maxHeight: 'calc(100vh - 50px)', margin: '10px' }}>
          <p className="text-lg font-bold mb-2">Facilities</p>
          {facilities.map((facility) => (
            <div
            key={facility.facilityId}
            className={`flex items-center p-2 mb-1 rounded cursor-pointer
                       hover:border-green-800 hover:bg-green-300 border-2 border-transparent ${facility.facilityId === selectedFacilityId ? 'bg-green-50 border-green-600' : ''}`}
            onClick={() => handleFacilitySelect(facility.facilityId)}
          >
            <label className="flex items-center w-full h-5">
              <input
                type="radio"
                name="facilitySelection"
                value={facility.facilityId}
                checked={selectedFacilityId === facility.facilityId}
                onChange={() => {}} // onChange is needed for accessibility but doesn't change state
                className="form-radio text-green-600 h-5 w-5 mr-2"
              />
              <h3 className="text-lg">{facility.facilityName}</h3>
            </label>
          </div>
          
            
          ))}
        </div>
      </div>

      <div className="lg:flex-grow w-full bg-white-200">
        <p className="bg-green-600 text-white text-center py-2" style={{ margin: '10px' }}>Search Results</p>
        <div className="overflow-auto p-4" style={{ maxHeight: 'calc(100vh - 50px)', margin: '10px' }}>
          {tests.map((test) => (
            <div
              key={test.test_id}
              className="bg-green-50 border border-green-300 rounded-lg p-4 mb-4 shadow-sm
                          hover:bg-green-300 transition-colors cursor-pointer"
              onClick={() => handleTestClick(test)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-green-800">{test.test_name}</h4>
                <p className="text-md text-green-800 font-bold">
                  ₹{test.price_for_test}
                </p>
                <button className="bg-green-600 text-white px-4 py-1 rounded shadow-md hover:bg-green-700">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facility;
