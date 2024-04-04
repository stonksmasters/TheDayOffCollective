import React from 'react';

const ApplicationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        // Don't prevent default to allow Netlify to capture the form submission
        const formData = new FormData(e.target);

        // If you need to handle the form data in React, do it here
        // Otherwise, this can be removed if Netlify is handling everything
        console.log('Form data:', formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Join Our Gaming Team</h2>
                <form name="apply-now" method="POST" data-netlify="true" onSubmit={handleSubmit} action="/">
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
