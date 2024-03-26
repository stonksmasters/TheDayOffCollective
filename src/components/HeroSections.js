// src/components/HeroSections.js
import React, { useState, useEffect } from 'react';

const HeroSections = ({ images, interval = 5000, title, text }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div
            className="hero-section"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
            <div className="hero-content">
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default HeroSections;
