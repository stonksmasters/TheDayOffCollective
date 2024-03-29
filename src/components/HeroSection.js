// src/components/HeroSection.js
import React, { useState, useEffect } from 'react';
import "../App.css"

const images = [
  '/images/Nft1.png',
  '/images/Nft2.jpg',
  '/images/Nft3.png',
  '/images/Friend.jpg',
  '/images/Kota.png',
  '/images/Friend2.jpg'
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className="hero-section" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      <div className="hero-content">
        <h1>Welcome to the Day Off Market</h1>
        <p>We craft a Web3 experience that celebrates relaxation and rejuvenation, ensuring you savor every moment of your downtime. Our mission is to inspire a refreshed mindset, equipping you to tackle challenges with renewed vigor each week.</p>
      </div>
    </div>
  );
};

export default HeroSection;
