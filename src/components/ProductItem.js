// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ product, addToCart, onProductClick }) => {
    const handleAddToCart = (e) => {
        e.stopPropagation();
        console.log(`[ProductItem] Adding '${product.name}' to cart.`);
        addToCart(product);
    };

    // Ensure there is an images array and it has at least one item
    const imageSrc = product.images && product.images.length > 0 ? product.images[0] : 'default-image-path.jpg';

    return (
        <div className="product-item" onClick={() => onProductClick(product)}>
            <img src={imageSrc} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} Sol</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductItem;
