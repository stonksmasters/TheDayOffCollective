import React from 'react';

const ShippingForm = ({ onFormSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        onFormSubmit(formData); // Pass the form data back to the Cart component
    };
    return (
        <form name="shipping" method="POST" data-netlify="true" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="shipping" />
            <p>
                <label>Name: <input type="text" name="name" required /></label>
            </p>
            <p>
                <label>Email (Optional): <input type="email" name="email" /></label>
            </p>
            <p>
                <label>Discord Username (Optional): <input type="text" name="discord" /></label>
            </p>
            <p>
                <label>Address: <textarea name="address" required /></label>
            </p>
            <p>
                <label>City: <input type="text" name="city" required /></label>
            </p>
            <p>
                <label>State: <input type="text" name="state" required /></label>
            </p>
            <p>
                <label>Zip Code: <input type="text" name="zipcode" required /></label>
            </p>
            <p>
                <button type="submit">Proceed to Checkout</button>
            </p>
        </form>
    );
};

export default ShippingForm;
