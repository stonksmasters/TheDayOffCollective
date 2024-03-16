// src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <h1>The Day Off Collective</h1>
            <nav>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/store">Store</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
