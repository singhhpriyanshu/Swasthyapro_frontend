import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from "../assets/assets"; 
import labtest from '../assets/labtest.jpg';  // Ensure you have this image in your assets directory

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    const applyFilter = () => {
      let filteredDoctors = doctors;

      // ---- Filter by Specialization ----
      if (specializationFilter) {
        filteredDoctors = filteredDoctors.filter(
          (doc) => doc.specialization === specializationFilter
        );
      }

      // ---- Filter by Name ----
      if (nameFilter.trim()) {
        const lowerCaseFilter = nameFilter.toLowerCase().trim();
        filteredDoctors = filteredDoctors.filter((doc) =>
          doc.name.toLowerCase().includes(lowerCaseFilter)
        );
      }

      // ---- Filter by Location (Delhi only) ----
      if (locationFilter.trim()) {
        if (locationFilter.toLowerCase().trim() === 'delhi') {
          filteredDoctors = filteredDoctors.filter(
            (doc) => doc.state.toLowerCase() === 'delhi'
          );
        } else {
          filteredDoctors = [];
        }
      }

      filteredDoctors = filteredDoctors.filter((doc) => doc.available);
      setFilterDoc(filteredDoctors);
    };

    applyFilter();
  }, [doctors, specializationFilter, nameFilter, locationFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row font-sans">
      <div className="flex-grow">
        {/* SEARCH/FILTER BAR */}
        <div className="bg-green-100 p-4 flex flex-wrap items-center gap-2">
          {/* Name Filter */}
          <input
            type="text"
            placeholder="Search by doctor's name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="flex-grow p-2 border border-green-300 rounded"
            style={{ flex: '1 1 200px' }}
          />

          {/* Specialization Filter */}
          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="p-2 border border-green-300 rounded"
            style={{ flex: '1 1 200px' }}
          >
            <option value="">Select Specialization</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
          </select>

          {/* Location Filter */}
          <input
            type="text"
            placeholder="Search by location (Delhi only)"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="flex-grow p-2 border border-green-300 rounded"
            style={{ flex: '1 1 200px' }}
          />
        </div>

        {/* DOCTORS LIST */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-green-800 mb-4">Doctors</h1>
          {filterDoc.length > 0 ? (
            filterDoc.map((doc, index) => (
              <div
                key={index}
                className="mb-4 border border-green-300 rounded overflow-hidden bg-green-50"
              >
                <div className="flex md:flex-row flex-col">
                  {/* Doctor's Image */}
                  <div className="bg-green-200 p-4 flex justify-center items-center">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-24 h-24 rounded-full"
                    />
                  </div>

                  {/* Doctor's Info */}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-green-800">
                      {doc.name}
                      <img
                        className="inline-block w-5 h-5 ml-2"
                        src={assets.verified_icon}
                        alt="Verified"
                      />
                    </h2>
                    <p className="text-green-700 font-serif">
                      {doc.specialization}
                    </p>
                    <p className="text-green-700 font-serif">{doc.degree}</p>
                    <p className="text-green-700">
                      Experience: {doc.experience} years
                    </p>
                    <p className="text-green-700">{doc.state}</p>

                    <button
                      onClick={() => navigate(`/appointment/${doc.id}`)}
                      className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-green-700">
              No doctors found. Please adjust your filters.
            </p>
          )}
        </div>
      </div>

      {/* SIDE BAR (Health Tips) */}
      <div className="hidden md:block sticky top-20 w-80 p-4 bg-green-200 h-screen">
        <h2 className="font-semibold text-lg text-green-800 font-serif">
          Take Your Test
        </h2>
        <img src={labtest} alt="DNA" className="w-full h-auto mt-4" />
        <p className="mt-4 text-green-700 font-serif">
          Get your Test in any circumstances and book  test at lowest cost.
        </p>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded font-serif">
          Book Now
        </button>
      </div>
      
    </div>
  );
};

export default Doctors;
