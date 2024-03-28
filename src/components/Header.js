// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Cart from './Cart'; // Assuming Cart is a component

const Header = ({ cartItems, removeFromCart, resetCart }) => {
    return (
        <>
            <header className="primary-header">
                <h1>Day Off Collective</h1>
            </header>
            <header className="secondary-header">
                {/* Other elements */}
                <div className="cart-button">
                    <Cart 
                      items={cartItems} 
                      removeFromCart={removeFromCart} 
                      resetCart={resetCart} 
                    />
                </div>
            </header>
        </>
    );
};

export default Header;
