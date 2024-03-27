// src/components/ComingSoon.js
import React from 'react';
import HeroSections from './HeroSections'; // Assuming you want to use the HeroSections for the background

const comingSoonImages = ['/images/coming-soon1.jpg', '/images/coming-soon2.jpg']; // Example images for the coming soon background

const ComingSoon = ({ sectionTitle }) => {
    return (
        <div>
            <HeroSections
                images={comingSoonImages}
                title={`Coming Soon: ${sectionTitle}`}
                text="We're working hard to bring you this content. Stay tuned!"
            />
            <div className="coming-soon-content">
                <p>Our team is working diligently to launch this section. Check back soon for updates!</p>
            </div>
        </div>
    );
};

export default ComingSoon;
