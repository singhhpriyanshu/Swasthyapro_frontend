import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import dna from '../assets/dna.jpg';  // Ensure you have this image in your assets directory

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [specializationFilter, setSpecializationFilter] = useState('');
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    useEffect(() => {
        const applyFilter = () => {
            let filteredDoctors = doctors;
            if (specializationFilter) {
                filteredDoctors = filteredDoctors.filter(doc => doc.specialization === specializationFilter);
            }
            if (nameFilter.trim()) {
                const lowerCaseFilter = nameFilter.toLowerCase().trim();
                filteredDoctors = filteredDoctors.filter(doc => doc.name.toLowerCase().includes(lowerCaseFilter));
            }
            setFilterDoc(filteredDoctors);
        };

        applyFilter();
    }, [doctors, specializationFilter, nameFilter]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row font-sans">
            <div className="flex-grow">
                <div className="bg-teal-100 p-4 flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search by doctor's name"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="flex-grow p-2 m-2 border border-teal-300 rounded"
                        style={{ flex: '1 1 50%' }}  // Ensures the input field takes half the space
                    />
                    <select
                        value={specializationFilter}
                        onChange={(e) => setSpecializationFilter(e.target.value)}
                        className="p-2 m-2 border border-teal-300 rounded"
                        style={{ flex: '1 1 50%' }}  // Ensures the dropdown takes half the space
                    >
                        <option value="">Select Specialization</option>
                        <option value="Oncologist">Oncologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="General Physician">General Physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                    </select>
                </div>
                <div className="mt-4">
                    <h1 className="text-xl font-bold text-teal-800 mb-4">Doctors</h1>
                    {filterDoc.length > 0 ? filterDoc.filter(doc=>doc.available).map((doc, index) => (
                        <div key={index} className="mb-4 border border-teal-300 rounded overflow-hidden bg-teal-50">
                            <div className="flex md:flex-row flex-col">
                                <div className="bg-teal-200 p-4 flex justify-center items-center">
                                    <img src={doc.image} alt={doc.name} className="w-24 h-24 rounded-full" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-teal-800">{doc.name}</h2>
                                    <p className="text-teal-600 font-serif">{doc.specialization}</p>
                                    <p className="text-teal-600 font-serif">{doc.degree}</p>
                                    <p className="text-teal-600">Experience: {doc.experience} years</p>
                                    <p className="text-teal-600">{doc.clinic_address}</p>
                                    <button onClick={() => navigate(`/appointment/${doc.id}`)} className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                                        Book Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-teal-600">No doctors found. Please adjust your filters.</p>}
                </div>
            </div>
            <div className="hidden md:block sticky top-20 w-80 p-4 bg-teal-200 h-screen">
                <h2 className="font-semibold text-lg text-teal-800 font-serif">Health Tips</h2>
                <img src={dna} alt="DNA" className="w-full h-auto mt-4" />
                <p className="mt-4 text-teal-600 font-serif">Get the latest updates on health and wellness delivered to your inbox!</p>
                <button className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded font-serif">
                    Subscribe Now
                </button>
            </div>
        </div>
    );
};

export default Doctors;
