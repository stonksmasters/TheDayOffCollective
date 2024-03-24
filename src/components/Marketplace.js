// src/components/Marketplace.js
import React from 'react';
import ProductList from './ProductList';
import products from '../data/products'; // Import products from the data file

const Marketplace = ({ addToCart }) => {
    return (
        <div className="marketplace">
            <h1>Marketplace</h1>
            <ProductList products={products} addToCart={addToCart} />
        </div>
    );
};

export default Marketplace;
