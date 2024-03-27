// src/components/AboutUs.js
import React from 'react';

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-hero">
                <h1>The Day Off Collective</h1>
                <p>Dedicated to bridging the digital and physical realms through art, gaming, and community-driven experiences.</p>
            </div>
            <div className="roadmap">
                <h2>Our Roadmap</h2>
                <ul className="roadmap-list">
                    <li>
                        <h3>Free To Play Gaming Website</h3>
                        <p>Launching an immersive gaming platform that's free for all to enjoy and earn.</p>
                    </li>
                    <li>
                        <h3>NFT Collections and Comics</h3>
                        <p>A series of unique digital collectibles with rewards and community benefits.</p>
                        <ul>
                            <li>Vol. 1 Genesis Degen Dragons</li>
                            <li>Vol. 2 ...</li>
                            <li>Vol. 3 ...</li>
                        </ul>
                    </li>
                    <li>
                        <h3>IRL Goods & Merchandise</h3>
                        <p>High-quality goods featuring art from our NFT projects you know and love.</p>
                    </li>
                    <li>
                        <h3>Holder Rewards</h3>
                        <p>Exclusive points system for NFT holders, redeemable across all our platforms.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AboutUs;
