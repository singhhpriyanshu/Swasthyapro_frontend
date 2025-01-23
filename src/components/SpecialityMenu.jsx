import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import './SpecialityMenu.css';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-4 py-16 text-[#262626]">
      <h2 style={{ fontSize: 'xxx-large', fontWeight: 'normal' }}>
        Doctor <span style={{ color: '#178066' }}>Speciality</span>
      </h2>
      {/* <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p> */}
      <div
        id="circle"
        className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll"
      >
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="speciality-item flex flex-col items-center text-xs cursor-pointer flex-shrink-0 transition-all duration-500"
            key={index}
          >
            <div
              className="speciality-circle rounded-full p-2 border border-gray-300 transition-all duration-500"
              style={{
                width: '150px',
                height: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                className="w-16 sm:w-24 mb-2"
                src={item.image}
                alt={item.speciality}
                style={{
                  width: '150px',
                  height: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </div>
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
