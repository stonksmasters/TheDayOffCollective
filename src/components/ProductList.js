// src/components/ProductList.js
import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="product-list">
            {products.map(product => (
                <ProductItem key={product.id} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
};

export default ProductList;
