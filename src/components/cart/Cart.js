import React from 'react';
import CartProduct from '../cartProduct/CartProduct';
import './Cart.css'

const Cart = ({cart, handleDeleteToCart}) => {
    let price = 0;
    let shipping = 0;
    let quantity = 0;
    for(const product of cart){
        price += product.price * product.quantity;
        shipping += product.shipping * product.quantity;
        quantity += product.quantity;
    }
    const tax = parseFloat((price * 0.1).toFixed(2));
    const grandTotal = price + shipping + tax;
    return (
        <div className='cart'>
            <h2 className='cart-title'>Order Summary</h2>
            <div className='cart-info'>
                <p>Selected Items: {quantity}</p>
                <p>Price: ${price}</p>
                <p>Shipping Charge: ${shipping}</p>
                <p>Tax: ${tax}</p>
                <h3>Grand Total: ${grandTotal}</h3>
            </div>
            <div>
                {
                    cart.map(product => <CartProduct product={product} 
                    handleDeleteToCart={handleDeleteToCart}
                    key={product.id}
                    ></CartProduct>)
                }
            </div>
        </div>
    );
};

export default Cart;