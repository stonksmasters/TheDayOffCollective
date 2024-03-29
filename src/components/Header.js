// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Cart from './Cart'; // Assuming Cart is a component

const Header = ({ cartItems, removeFromCart }) => {
    return (
        <>
            <header className="primary-header">
                <h1>Day Off Collective</h1>
            </header>
            <header className="secondary-header">
                <div className="wallet-button">
                    <WalletMultiButton />
                </div>
                <nav className="nav-links">
                    
                        <Link to="/">Home</Link>
                        <Link to="/marketplace">Marketplace</Link>
                        <Link to="/comics">Comics</Link>
                        <Link to="/recipes">Recipes</Link>
                    
                </nav>
                <div className="cart-button">
                    <Cart items={cartItems} removeFromCart={removeFromCart} />
                </div>
            </header>
        </>
    );
};

export default Header;
