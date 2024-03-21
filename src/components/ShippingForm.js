import React from 'react';

const ShippingForm = ({ onFormSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const shippingData = Object.fromEntries(formData.entries());
        onFormSubmit(shippingData); // Pass the shipping data back to the parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Name <input type="text" name="name" required /></label>
            </p>
            <p>
                <label>Email <input type="email" name="email" required /></label>
            </p>
            <p>
                <label>Address <textarea name="address" required /></label>
            </p>
            <p>
                <label>City <input type="text" name="city" required /></label>
            </p>
            <p>
                <label>State <input type="text" name="state" required /></label>
            </p>
            <p>
                <label>Zip Code <input type="text" name="zipcode" required /></label>
            </p>
            <p>
                <button type="submit">Proceed to Checkout</button>
            </p>
        </form>
    );
};

export default ShippingForm;
