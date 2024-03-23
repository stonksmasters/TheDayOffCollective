// src/components/StorePage.js
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import products from '../data/products'; // Adjust the path as per your products data location

const StorePage = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(filter.toLowerCase()) || 
            product.description.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [filter]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="store-page">
            <h1>Store</h1>
            <input 
                type="text" 
                placeholder="Search products..." 
                value={filter} 
                onChange={handleFilterChange}
            />
            <ProductList products={filteredProducts} addToCart={() => {}} />
        </div>
    );
};

export default StorePage;
