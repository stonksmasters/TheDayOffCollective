import React, { useEffect, useState } from 'react';
import ShippingForm from './ShippingForm';
import ReviewOrder from './ReviewOrder'; // Import the ReviewOrder component
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';

const Cart = ({ items, removeFromCart, resetCart }) => {
    const [isCartMinimized, setIsCartMinimized] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [checkoutStage, setCheckoutStage] = useState('viewCart'); // Manage checkout stage
    const [formData, setFormData] = useState(null);
    const wallet = useWallet();

    useEffect(() => {
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
        setFormData(formData);
        setCheckoutStage('reviewOrder'); // Move to review order stage
    };

    const handleSubmitForm = async () => {
        console.log('[Cart] Submitting form with data:', formData);
        // Submit the formData to your backend or another service
    };

    const handleCheckoutConfirmation = async () => {
        console.log('[Cart] Checkout confirmation initiated');
        if (wallet.connected && cartItems.length > 0) {
            const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            console.log(`[Cart] Total checkout amount: ${totalAmount} SOL`);

            try {
                const transactionSignature = await sendTransaction(wallet, totalAmount, cartItems);
                console.log(`[Cart] Transaction successful, signature: ${transactionSignature}`);
                
                await handleSubmitForm();
                resetCart();
                setCheckoutStage('viewCart'); // Reset to view cart stage after checkout
            } catch (error) {
                console.error('[Cart] Transaction failed:', error);
            }
        } else {
            console.log('[Cart] Checkout attempted with no wallet connected or empty cart');
        }
    };

    const handleCancel = () => {
        resetCart();
        setCheckoutStage('viewCart'); // Reset to view cart stage
    };

    const toggleCart = () => {
        setIsCartMinimized(!isCartMinimized);
    };

    return (
        <div className="cart">
            <button onClick={toggleCart}>
                {isCartMinimized ? `Expand Cart (${cartItems.length})` : 'Minimize Cart'}
            </button>
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
                    {checkoutStage === 'viewCart' && cartItems.length > 0 && (
                        <ShippingForm onFormSubmit={handleShippingSubmit} />
                    )}
                    {checkoutStage === 'reviewOrder' && (
                        <ReviewOrder items={cartItems} onConfirm={handleCheckoutConfirmation} onCancel={handleCancel} formData={formData} />
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
