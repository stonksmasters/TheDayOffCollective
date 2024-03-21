// src/components/Cart.js
import React, { useState } from 'react';
import ShippingForm from './ShippingForm';
import ReviewOrder from './ReviewOrder';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';

const Cart = ({ items, removeFromCart, resetCart }) => {
    const [showShippingForm, setShowShippingForm] = useState(true);
    const [showReview, setShowReview] = useState(false);
    const [shippingData, setShippingData] = useState(null);
    const wallet = useWallet();

    const handleShippingSubmit = (data) => {
        setShippingData(data);
        setShowShippingForm(false);
        setShowReview(true);
    };

    const handleReviewConfirm = async () => {
        setShowReview(false);
        await checkout();
    };

    const checkout = async () => {
        if (wallet.connected && items.length > 0 && shippingData) {
            const totalAmount = items.reduce((acc, item) => acc + item.price, 0);

            try {
                const transactionSignature = await sendTransaction(wallet, totalAmount, items);
                console.log(`[Cart] Transaction successful: ${transactionSignature}`);
                resetCart();  // Reset the cart in the parent component
                setShowShippingForm(true); // Reset the local state to show the shipping form again
            } catch (error) {
                console.error("[Cart] Transaction failed:", error);
            }
        } else {
            console.log("[Cart] Wallet not connected, cart is empty, or shipping data is missing");
        }
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
            {items.map(item => (
                <div key={item.id} className="cart-item">
                    <p>{item.name}</p>
                    <p>{item.price} Sol</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
            {showShippingForm && <ShippingForm onFormSubmit={handleShippingSubmit} />}
            {showReview && <ReviewOrder items={items} onConfirm={handleReviewConfirm} onCancel={() => setShowReview(false)} />}
        </div>
    );
};

export default Cart;
