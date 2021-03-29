import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, product) => total + product.price, 0);
    let total = 0;
    for(let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
        debugger;
    }

    let shipping = 0;
    if(total > 149) {
        shipping = 0;
    }
    else if(total > 49) {
        shipping = 4.99;
    }
    else if(total > 0) {
        shipping = 12.99;
    }

    const tax = total * .1;
    const grandTotal = (total + tax + shipping).toFixed(2);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${formatNumber(total)}</p>
            <p>Tax + VAT: ${formatNumber(tax)}</p>
            <p><small>Shipping Cost: ${formatNumber(shipping)}</small></p>
            <p>Total Price: ${grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;