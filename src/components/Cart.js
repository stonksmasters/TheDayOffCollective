import React, { useEffect, useState } from 'react';
import ShippingForm from './ShippingForm';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';

const Cart = ({ items, removeFromCart, resetCart }) => {
    const [isCartMinimized, setIsCartMinimized] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [showShippingForm, setShowShippingForm] = useState(true);
    const [isReadyForCheckout, setIsReadyForCheckout] = useState(false);
    const wallet = useWallet();

    useEffect(() => {
        console.log('Cart items updated:', items);
        setCartItems(mergeItemsWithQuantities(items));
    }, [items]);

    const mergeItemsWithQuantities = (items) => {
        const itemMap = {};
        items.forEach(item => {
            if (itemMap[item.id]) {
                itemMap[item.id].quantity += 1;
            } else {
                itemMap[item.id] = { ...item, quantity: 1 };
            }
        });
        return Object.values(itemMap);
    };

    const handleShippingSubmit = (formData) => {
        console.log('Shipping Data:', formData);
        setShowShippingForm(false);
        setIsReadyForCheckout(true);
        // Store formData for later submission
    };

    const handleCheckoutConfirmation = async () => {
        console.log("[Cart] Final Checkout initiated");

        if (wallet.connected && cartItems.length > 0) {
            const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            console.log(`[Cart] Total amount for checkout: ${totalAmount} SOL`);

            try {
                const transactionSignature = await sendTransaction(wallet, totalAmount, cartItems);
                console.log(`[Cart] Transaction successful: ${transactionSignature}`);
                resetCart();
                setShowShippingForm(true);
                setIsReadyForCheckout(false);

                // Here, you would actually submit the stored form data from `handleShippingSubmit`
            } catch (error) {
                console.error("[Cart] Transaction failed:", error);
            }
        } else {
            console.log("[Cart] Wallet not connected or cart is empty");
        }
    };

    const handleCancel = () => {
        console.log('Canceling cart and resetting');
        resetCart();
        setShowShippingForm(true);
        setIsReadyForCheckout(false);
    };

    const toggleCart = () => {
        console.log('Toggling cart view');
        setIsCartMinimized(!isCartMinimized);
    };

    return (
        <div className="cart">
            <button onClick={toggleCart}>{isCartMinimized ? `Expand Cart (${cartItems.reduce((acc, item) => acc + item.quantity, 0)})` : 'Minimize Cart'}</button>
            {!isCartMinimized && (
                <>
                    <h2>Cart</h2>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <p>{item.name}</p>
                            <p>{item.price} Sol</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    {showShippingForm && <ShippingForm onFormSubmit={handleShippingSubmit} />}
                    {isReadyForCheckout && (
                        <>
                            <button onClick={handleCheckoutConfirmation} disabled={!wallet.connected}>
                                Confirm Checkout
                            </button>
                            <button onClick={handleCancel}>Cancel</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;