// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Videos from './components/Videos'; // Import the Videos component
import products from './data/products';
import './App.css';

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);

    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const toggleCart = () => {
        setCartVisible(prevVisible => !prevVisible);
    };

    return (
        <div className="App">
            <Header />
            <button 
                className="toggle-cart-button" 
                onClick={toggleCart}
                style={{
                    position: 'fixed',
                    zIndex: 105,  // Ensure the button is above the cart
                    top: '10px',
                    right: cartVisible ? '330px' : '10px', // Adjust position based on cart visibility
                }}
            >
                {cartVisible ? 'Hide Cart' : 'Show Cart'}
            </button>
            {cartVisible && <Cart items={cartItems} removeFromCart={removeFromCart} />}
            <HeroSection />
            <ProductList products={products} addToCart={addToCart} />
            <Videos /> {/* Add the Videos component to the render */}
            <Footer />
        </div>
    );
}

export default App;
