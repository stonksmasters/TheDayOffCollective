// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Wallet from './components/Wallet'; // Import Wallet component
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList';
import Videos from './components/Videos';
import Marketplace from './components/Marketplace';
import Comics from './components/Comics';
import Recipes from './components/Recipes';

import Footer from './components/Footer';
import products from './data/products';
import './App.css';


// Define the featured products, for example, the first three products
const featuredProducts = products.slice(0, 3);

const HomePage = ({ addToCart }) => (
    <div>
        <HeroSection />
        <ProductList products={featuredProducts} addToCart={addToCart} />
        <Videos />
    </div>
);


function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        console.log(`[App] Adding product to cart: ${product.name}`);
        setCartItems(currentItems => [...currentItems, product]);
    };

    const removeFromCart = (productId) => {
        console.log(`[App] Removing product from cart: ID ${productId}`);
        setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
    };

    return (
        <Wallet> {/* Wrap the components that require wallet functionality */}
            <div className="App">
                <Header cartItems={cartItems} removeFromCart={removeFromCart} />
                <Routes>
                    <Route path="/" element={<HomePage addToCart={addToCart} />} />
                    <Route path="/marketplace" element={<Marketplace addToCart={addToCart} />} />
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/recipes" element={<Recipes />} />
                </Routes>
                <Footer />
            </div>
        </Wallet>
    );
}

export default App;
