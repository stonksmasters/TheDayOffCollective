// src/components/Cart.js
import React, { useState } from 'react';
import ShippingForm from './ShippingForm';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';

const Cart = ({ items, removeFromCart, resetCart }) => {
    const [showShippingForm, setShowShippingForm] = useState(true);
    const [isReadyForCheckout, setIsReadyForCheckout] = useState(false); // New state to track checkout readiness
    const wallet = useWallet();

    const handleShippingSubmit = (data) => {
        console.log('Shipping Data:', data);
        setShowShippingForm(false); // Hide the shipping form
        setIsReadyForCheckout(true); // Set ready for checkout after form submission
    };

    const handleCancel = () => {
        resetCart();
        setShowShippingForm(true);
        setIsReadyForCheckout(false); // Reset checkout readiness on cancel
    };

    const checkout = async () => {
        console.log("[Cart] Checkout initiated");
        if (wallet.connected && items.length > 0) {
            const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
            console.log(`[Cart] Total amount for checkout: ${totalAmount} SOL`);

            try {
                const transactionSignature = await sendTransaction(wallet, totalAmount, items);
                console.log(`[Cart] Transaction successful: ${transactionSignature}`);
                resetCart();
                setShowShippingForm(true);
                setIsReadyForCheckout(false); // Reset checkout readiness after successful checkout
            } catch (error) {
                console.error("[Cart] Transaction failed:", error);
            }
        } else {
            console.log("[Cart] Wallet not connected or cart is empty");
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
            {showShippingForm && (
                <ShippingForm onFormSubmit={handleShippingSubmit} />
            )}
            {isReadyForCheckout && (
                <>
                    <button onClick={checkout} disabled={!wallet.connected}>
                        Confirm Checkout
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default Cart;
