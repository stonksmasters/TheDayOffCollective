import React, { useEffect, useState } from 'react';
import ShippingForm from './ShippingForm';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';

const Cart = ({ items, removeFromCart, resetCart }) => {
    const [isCartMinimized, setIsCartMinimized] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [showShippingForm, setShowShippingForm] = useState(true);
    const [isReadyForCheckout, setIsReadyForCheckout] = useState(false);
    const [formData, setFormData] = useState(null); // To store shipping form data
    const wallet = useWallet();

    useEffect(() => {
        console.log('[Cart] Cart items updated:', items);
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

    const handleShippingSubmit = (data) => {
        console.log('[Cart] Shipping Data submitted:', data);
        setFormData(data); // Store form data for later submission
        setShowShippingForm(false);
        setIsReadyForCheckout(true);
    };

    const handleSubmitForm = () => {
        // Logic to submit form data goes here
        console.log('[Cart] Submitting form with data:', formData);
        // Submit form data to your backend or desired endpoint
    };

    const handleCheckoutConfirmation = async () => {
        console.log('[Cart] Checkout confirmation initiated');
        if (wallet.connected && cartItems.length > 0) {
            const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            console.log(`[Cart] Total checkout amount: ${totalAmount} SOL`);

            try {
                console.log('[Cart] Attempting to send transaction');
                const transactionSignature = await sendTransaction(wallet, totalAmount, cartItems, handleSubmitForm);
                console.log(`[Cart] Transaction successful, signature: ${transactionSignature}`);
                resetCart();
                setShowShippingForm(true);
                setIsReadyForCheckout(false);
            } catch (error) {
                console.error('[Cart] Transaction failed:', error);
            }
        } else {
            console.log('[Cart] Checkout attempted with no wallet connected or empty cart');
        }
    };

    const handleCancel = () => {
        console.log('[Cart] Checkout cancelled and cart reset');
        resetCart();
        setShowShippingForm(true);
        setIsReadyForCheckout(false);
    };

    const toggleCart = () => {
        setIsCartMinimized(!isCartMinimized);
        console.log('[Cart] Cart view toggled:', isCartMinimized ? 'Minimized' : 'Expanded');
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
