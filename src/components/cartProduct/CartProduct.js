import React from 'react';
import './CartProduct.css'

const CartProduct = ({product,handleDeleteToCart}) => {
    return (
        <ol>
            <li className='item-info'>
                <p>{product.name}</p>
                <button onClick={()=>handleDeleteToCart(product.id)} className='close-btn'>X</button>
            </li>
        </ol>
    );
};

export default CartProduct;