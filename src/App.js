import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Wallet from './components/Wallet';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductList from './components/ProductList';
import Videos from './components/Videos';
import PromoDeals from './components/PromoDeals';
import Marketplace from './components/Marketplace';
import ComingSoon from './components/ComingSoon';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import products from './data/products';
import './App.css';

const featuredProducts = products.slice(0, 3);

function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = useCallback((product) => {
        setCartItems(currentItems => [...currentItems, product]);
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems(currentItems => currentItems.filter(item => item.id !== productId));
    }, []);

    const resetCart = useCallback(() => {
        setCartItems([]);
    }, []);

    return (
        <Wallet>
            <div className="App">
                <Header 
                  cartItems={cartItems} 
                  removeFromCart={removeFromCart} 
                  resetCart={resetCart} 
                />
                <Routes>
                    <Route path="/" element={
                      <HomePage addToCart={addToCart} />
                    } />
                    {/* Other routes */}
                </Routes>
                <Footer />
            </div>
        </Wallet>
    );
}

const HomePage = ({ addToCart, removeFromCart, resetCart, cartItems }) => (
    <div>
        <HeroSection />
        <AboutUs />
        <ProductList products={featuredProducts} addToCart={addToCart} />
        <Videos />
        <PromoDeals />
    </div>
);

export default App;
