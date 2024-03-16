// src/components/Cart.js
import React from 'react';

const Cart = ({ items, removeFromCart }) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart">
            <h2>Cart</h2>
            {items.map(item => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <p>Total: ${total}</p>
        </div>
    );
};

export default Cart;
