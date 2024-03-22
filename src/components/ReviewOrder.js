import React from 'react';
import './reviewOrder.css';
const ReviewOrder = ({ items, onConfirm, onCancel }) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="review-order">
            <h2>Review Your Order</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price} SOL
                    </li>
                ))}
            </ul>
            <p>Total: {totalAmount} SOL</p>
            <button onClick={onConfirm}>Confirm Purchase</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ReviewOrder;
