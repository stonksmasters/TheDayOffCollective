import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import ProductModal from './ProductModal'; // Assuming you have a ProductModal component

const ProductList = ({ products, addToCart }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleClose = () => {
        setSelectedProduct(null); // Reset selectedProduct to close the modal
    };

    return (
        <section className="featured-products">
            <h2 className="featured-products-title">Featured Items</h2>
            <div className="product-list">
                {products.map(product => (
                    <ProductItem key={product.id} product={product} addToCart={addToCart} onProductClick={setSelectedProduct} />
                ))}
            </div>
            {selectedProduct && (
                <ProductModal product={selectedProduct} addToCart={addToCart} onClose={handleClose} />
            )}

            <div className="view-all-button-container">
                <Link to="/marketplace" className="button btn-view-all">View All Products</Link>
            </div>
        </section>
    );
};

export default ProductList;
