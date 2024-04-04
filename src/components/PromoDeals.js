// src/components/PromoDeals.js
import React, { useState, useEffect } from 'react';
import "../App.css"; // Assuming your styles are here

const promoImages = [
  '/images/deal2.jpg',
  '/images/deal.png',
  '/images/Promo2.png'

  // Add more images as needed
];

const PromoDeals = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % promoImages.length);
    }, 3000); // Rotate images every 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="promo-deals-section" style={{ backgroundImage: `url(${promoImages[currentImageIndex]})` }}>
      <div className="promo-deals-content">
        <h2>Brought to you by Brawndo</h2>
      </div>
    </div>
  );
};


export default PromoDeals;
