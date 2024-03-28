// src/components/ProductModal.js
import React, { useState } from 'react';
import App from '../App';
const ProductModal = ({ product, onClose, addToCart }) => {
    // Declare state hooks at the top level of the component
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Early return should come after the hook declarations
    if (!product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        onClose(); // Close the modal after adding to cart
    };

    const nextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="product-modal-overlay">
            <div className="product-modal">
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                <div className="product-modal-content">
                    {product.images && product.images.length > 0 && (
                        <div className="product-image-gallery">
                            <img src={product.images[selectedImageIndex]} alt={product.name} className="product-image" />
                            <button className="gallery-button prev" onClick={prevImage}>&lt;</button>
                            <button className="gallery-button next" onClick={nextImage}>&gt;</button>
                        </div>
                    )}
                    <div className="product-details">
                        <h2 className="product-title">{product.name}</h2>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">{product.price} SOL</p>
                        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
