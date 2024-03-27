// src/components/ProductList.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list-section">
            <h2 className="product-list-title">Featured Items</h2>
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
            <Link to="/marketplace" className="btn-view-all">View All Products</Link> {/* Button to navigate to the full marketplace */}
        </div>
    );
};

export default ProductList;
