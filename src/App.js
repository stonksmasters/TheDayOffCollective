// src/App.js
import React, { useState } from 'react';
import Wallet from './components/Wallet';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList';
import Videos from './components/Videos';
import Cart from './components/Cart';
import Footer from './components/Footer';
import products from './data/products';
import './App.css';

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
        <Wallet>
            <div className="App">
                <Header />
                <HeroSection />
                <ProductList products={products} addToCart={addToCart} />
                <Videos />
                <Cart 
                  items={cartItems} 
                  removeFromCart={removeFromCart} 
                />
                <Footer />
            </div>
        </Wallet>
    );
}

export default App;
