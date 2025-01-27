import React, { useState } from 'react';
import pathalogylab from '../assets/pathalogylab.png';
import cancer1 from '../assets/cancer1.jpg';
import reproductivehealth from '../assets/reproductivehealth.jpg';
import bg1 from '../assets/bg1.jpg'; // This import is used for the background image

const MainContent = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const cards = [
    { id: 1, image: pathalogylab, title: "Pathology Test", description: "Discover what your body is telling you: Explore with Pathology Testing." },
    { id: 2, image: cancer1, title: "Cancer Screening", description: "Early detection, brighter future: Screen for cancer today.." },
    { id: 3, image: reproductivehealth, title: "Reproductive Health", description: "Empower your future with informed reproductive health choices.." },
    // { id: 4, image: dna, title: "Infectious Diseases", description: "Highly sensitive molecular testing in the infectious disease diagnosis." }
  ];

  return (
    <div className='container' style={{
      backgroundImage: `url(${bg1})`, // Setting the background image for the entire container
      backgroundSize: 'cover', // Cover ensures the background covers the entire container
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat' // Prevent the background from repeating
    }}>
      {cards.map((card, index) => (
        <div key={card.id} className={`card ${index === hoverIndex ? 'hovered' : ''}`}
             onMouseEnter={() => setHoverIndex(index)}
             onMouseLeave={() => setHoverIndex(null)}>
          <div className='card-image'>
            <img src={card.image} alt={card.title} />
          </div>
          <div className='card-content'>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
