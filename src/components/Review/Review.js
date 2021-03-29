import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment')
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:3001/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, []);

    let thankyou;
    if(orderPlaced) {
        thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.key}
                        removeProduct = {removeProduct}
                        product={product}></ReviewItem>)
                }
                { thankyou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;