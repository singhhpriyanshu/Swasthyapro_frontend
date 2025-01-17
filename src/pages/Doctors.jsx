import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    useEffect(() => {
        const applyFilter = () => {
            const filteredDoctors = speciality
                ? doctors.filter(doc => doc.specialization === speciality)
                : doctors;
            setFilterDoc(filteredDoctors);
        };

        applyFilter();
    }, [doctors, speciality]);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Doctors</h1>
            {filterDoc.map((doc, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: '20px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ flexBasis: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f4f4' }}>
                        <img src={doc.image} alt={doc.name} style={{ width: '80%', borderRadius: '50%' }} />
                    </div>
                    <div style={{ flexGrow: 1, padding: '20px' }}>
                        <h2 style={{ color: '#333', marginBottom: '10px' }}>{doc.name}</h2>
                        <p style={{ color: '#666', marginBottom: '5px' }}>{doc.specialization}</p>
                        <p style={{ color: '#666' }}>{doc.clinic_address}</p>
                        <button onClick={() => navigate(`/appointment/${doc.id}`)} style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                            Book Appointment
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Doctors;
