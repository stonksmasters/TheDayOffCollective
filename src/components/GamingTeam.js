import React, { useState } from 'react'; // Combine React imports
import ApplicationModal from './ApplicationModal';

const GamingTeam = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleApplyClick = () => {
        setModalOpen(true);
    };

    return (
        <div className="gaming-team">
            <section className="hero-section" style={{ backgroundImage: 'url(/images/Promo2.png)' }}>
                <div className="content-container">
                    <h1>Gaming Team</h1>
                    <p>Join our Overwatch squad and compete in thrilling online tournaments!</p>
                </div>
            </section>

            <section className="team-intro">
                <h2>About Our Team</h2>
                <p>We are a group of dedicated gamers focused on strategy, teamwork, and excellence in Overwatch. Our goal is to dominate the competitive scene and create a supportive community for our players.</p>
            </section>

            <button onClick={handleApplyClick}>Apply Now</button>
            <ApplicationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

            <section className="faq-section">
                <h2>FAQ</h2>
                <div>
                    <p>What are the requirements to join the team?</p>
                    <p>How often does the team practice?</p>
                    <p>What tournaments do we plan to participate in?</p>
                </div>
            </section>

            <section className="contact-section">
                <h2>Contact Us</h2>
                <p>Have questions or want to get in touch with the team managers? Contact us at <a href="mailto:team@email.com">team@email.com</a></p>
            </section>
        </div>
    );
};

export default GamingTeam;
