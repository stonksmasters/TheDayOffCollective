// src/components/ApplicationModal.js
import React from 'react';

const ApplicationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // You might want to handle form submission here or leave it to Netlify
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Join Our Gaming Team</h2>
                <form name="apply-now" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                    <input type="hidden" name="form-name" value="apply-now" />
                    <label>
                        Name:
                        <input type="text" name="name" required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Gaming Experience:
                        <textarea name="experience" required></textarea>
                    </label>
                    <button type="submit">Submit Application</button>
                </form>
            </div>
        </div>
    );
};

export default ApplicationModal;
