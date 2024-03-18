// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ product, addToCart }) => {
    const handleAddToCart = () => {
        console.log(`[ProductItem] Adding '${product.name}' to cart.`);
        addToCart(product);
    };

    return (
        <div className="product-item">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} Sol</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductItem;
