import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import Swal from 'sweetalert2'
import 'aos/dist/aos.css'; 
import { addToDb, getStoredCart } from '../../utilities/LocalStorage';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    useEffect(()=>{
        const storedCart = getStoredCart();
        let savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    },[products])
    const handleAddToCart = (selectedProduct) =>{
        let newCart = [];
        const exists = cart.find(product=>product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart,selectedProduct]
        }
        else{
            const rest = cart.filter(product => product.id!==selectedProduct.id);
            exists.quantity += 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
        Swal.fire(
  'Good job!',
  'You added this product to Cart!',
  'success'
)
    }
    const handleDeleteToCart = (removeId) =>{
        toast('Removing from cart.');
        const storedCart = getStoredCart();
        for(const id in storedCart){
            if(id === removeId){
                delete storedCart[id];
            }
        }
        localStorage.setItem('shopping-cart',JSON.stringify(storedCart));
        const leftOver = cart.filter(product => product.id !== removeId);
        setCart(leftOver);
        console.log(storedCart);
    }
    AOS.init();
    return (
        <div className='shop-container' >
            <div className="product-container">
                {
                    products.map(product => <Product 
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}>
                    </Product>)
                }
            </div>
            <div className="cart-container" data-aos="fade-left">
                <Cart cart={cart} handleDeleteToCart={handleDeleteToCart}></Cart>
                <ToastContainer/>
            </div>
        </div>
    );
};

export default Shop;