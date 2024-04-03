import React from 'react';


const ReviewOrder = ({ items, onConfirm, onCancel, formData }) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

    const handleConfirm = () => {
        console.log("Confirming order with shipping data:", formData);
        // Process the form data here (e.g., submit to the server)
        onConfirm(formData);
    };

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
            <button onClick={handleConfirm}>Confirm Purchase</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default ReviewOrder;