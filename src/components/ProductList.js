// src/components/ProductList.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
    return (
        <section className="featured-products">
            <h2 className="featured-products-title">Featured Items</h2>
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
            <div className="view-all-button-container">
                <Link to="/marketplace" className="button btn-view-all">View All Products</Link> {/* Button to navigate to the full marketplace */}
            </div>
        </section>
    );
};

export default ProductList;
