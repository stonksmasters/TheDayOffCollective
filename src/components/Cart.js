// src/components/Cart.js
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';

const Cart = ({ items, removeFromCart }) => {
    const wallet = useWallet();

    const checkout = async () => {
        console.log("[Cart] Checkout initiated");
        if (wallet.connected && items.length > 0) {
            const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
            console.log(`[Cart] Total amount for checkout: ${totalAmount} SOL`);

            try {
                const transactionSignature = await sendTransaction(wallet, totalAmount, items);
                console.log(`[Cart] Transaction successful: ${transactionSignature}`);
                // Assuming setCartItems is handled in App.js to clear the cart
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
                    <button onClick={() => {
                        console.log(`[Cart] Removing '${item.name}' from cart.`);
                        removeFromCart(item.id);
                    }}>Remove</button>
                </div>
            ))}
            <button onClick={checkout} disabled={!wallet.connected || items.length === 0}>
                Checkout
            </button>
        </div>
    );
};

export default Cart;
