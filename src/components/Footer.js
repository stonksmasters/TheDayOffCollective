// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Art & Pins Store. All rights reserved.</p>
            <div>
                <a href="/terms">Terms of Service</a> | 
                <a href="/privacy">Privacy Policy</a>
            </div>
            <div>
                Follow us on 
                <a href="http://facebook.com"> Facebook</a>,
                <a href="http://twitter.com"> Twitter</a>, and
                <a href="http://instagram.com"> Instagram</a>
            </div>
        </footer>
    );
};

export default Footer;