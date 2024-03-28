import React, { useState } from 'react';

const ShippingForm = ({ onFormSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        discord: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submission attempted with data:', formData);
    
        if (onFormSubmit) {
            onFormSubmit(formData);
        }
    
        // Manually trigger the form submission to Netlify
        event.target.submit();
    };
    

    return (
        <form name="shipping" method="POST" data-netlify="true" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="shipping" />
            <p>
                <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} required /></label>
            </p>
            <p>
                <label>Email (Optional): <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
            </p>
            <p>
                <label>Discord Username (Optional): <input type="text" name="discord" value={formData.discord} onChange={handleChange} /></label>
            </p>
            <p>
                <label>Address: <textarea name="address" value={formData.address} onChange={handleChange} required /></label>
            </p>
            <p>
                <label>City: <input type="text" name="city" value={formData.city} onChange={handleChange} required /></label>
            </p>
            <p>
                <label>State: <input type="text" name="state" value={formData.state} onChange={handleChange} required /></label>
            </p>
            <p>
                <label>Zip Code: <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required /></label>
            </p>
            <p>
                <button type="submit">Proceed to Checkout</button>
            </p>
        </form>
    );
};

export default ShippingForm;
