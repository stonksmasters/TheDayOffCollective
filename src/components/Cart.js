// src/components/Cart.js
import React, { useState } from 'react';
import ShippingForm from './ShippingForm';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';
import { resetCart } from '../App'

const Cart = ({ items, removeFromCart, resetCart }) => {
    const [showShippingForm, setShowShippingForm] = useState(true);
    const wallet = useWallet();

    const handleShippingSubmit = (data) => {
        console.log('Shipping Data:', data);
        setShowShippingForm(false); // Proceed to checkout view
    };

    const handleCancel = () => {
        resetCart(); // Reset the cart through the prop function
        setShowShippingForm(true); // Show the shipping form again for new transactions
    };

    const checkout = async () => {
        console.log("[Cart] Checkout initiated");
        if (wallet.connected && items.length > 0) {
            const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
            console.log(`[Cart] Total amount for checkout: ${totalAmount} SOL`);

            try {
                const transactionSignature = await sendTransaction(wallet, totalAmount, items);
                console.log(`[Cart] Transaction successful: ${transactionSignature}`);
                resetCart(); // Clear the cart after successful checkout
                setShowShippingForm(true); // Reset the view to initial state
            } catch (error) {
                console.error("[Cart] Transaction failed:", error);
            }
        } else {
            console.log("[Cart] Wallet not connected, cart is empty");
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
            {showShippingForm ? (
                <>
                    <ShippingForm onFormSubmit={handleShippingSubmit} />
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={checkout} disabled={!wallet.connected || items.length === 0}>
                        Confirm Checkout
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            )}
        </div>
    );
};

export default Cart;
