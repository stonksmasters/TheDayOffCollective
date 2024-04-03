import React, { useEffect, useState } from 'react';
import ShippingForm from './ShippingForm';
import ReviewOrder from './ReviewOrder';
import { useWallet } from '@solana/wallet-adapter-react';
import { sendTransaction } from './solanaTransactions';

const Cart = ({ items, removeFromCart, resetCart }) => {
    const [isCartMinimized, setIsCartMinimized] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [checkoutStage, setCheckoutStage] = useState('viewCart');
    const [formData, setFormData] = useState(null);
    const [notification, setNotification] = useState('');
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
        if (!formData) {
            console.error('Form data is not available');
            return;
        }
    
        console.log('[Cart] Submitting form with data:', formData);
    
        // Fill the hidden form with the formData
        const formElement = document.querySelector('form[name="shipping"]');
        formData.forEach((value, key) => {
            // Find the input in the hidden form and set its value
            const input = formElement.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
            }
        });
    
        // Submit the hidden form
        formElement.submit();
    };
    
    const handleCheckoutConfirmation = async () => {
        console.log('[Cart] Checkout confirmation initiated');
        if (wallet.connected && cartItems.length > 0) {
            const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            try {
                setNotification('Processing your transaction...');
                const transactionSignature = await sendTransaction(wallet, totalAmount, cartItems, 3);
                console.log(`[Cart] Transaction successful, signature: ${transactionSignature}`);
                setNotification('Transaction successful! Please check your wallet.');
                await handleSubmitForm();
                resetCart();
                setCheckoutStage('viewCart');
            } catch (error) {
                console.error('[Cart] Transaction failed:', error);
                setNotification(`Transaction failed: ${error.message}. Please check your wallet or try again later.`);
            }
        } else {
            console.log('[Cart] Checkout attempted with no wallet connected or empty cart');
            setNotification('Checkout attempted with no wallet connected or empty cart');
        }
    };

    const handleCancel = () => {
        resetCart();
        setCheckoutStage('viewCart');
        setNotification('');
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
                    {notification && <div className="notification">{notification}</div>}
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <p>{item.name}</p>
                            <p>{item.price} SOL</p>
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