// src/components/Marketplace.js
import React from 'react';
import ProductList from './ProductList';
import HeroSections from './HeroSections';
import products from '../data/products';

const marketplaceImages = ['/images/holo.gif', '/images/goon pin.jpg']; // Array of image URLs for the marketplace

const Marketplace = ({ addToCart }) => {
    return (
        <div>
            <HeroSections
    images={marketplaceImages}
    title="Welcome to the Marketplace"
    text="Explore our exclusive collection of products."
/>
            <ProductList products={products} addToCart={addToCart} />
        </div>
    );
};

export default Marketplace;