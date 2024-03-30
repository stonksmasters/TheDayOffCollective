import React from 'react';

const handleSubmit = (event) => {
    event.preventDefault(); // Stop the form from submitting

    const formData = new FormData(event.target);
    console.log("Form data:", formData);

    // Perform the form submission here, for example, using fetch API
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));
};

const ShippingForm = () => {
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
