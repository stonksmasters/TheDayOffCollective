// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ product, addToCart }) => {
    return (
        <div className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductItem;
