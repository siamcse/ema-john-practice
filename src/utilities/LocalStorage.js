const addToDb = (id) =>{
    let shoppingCart = {};
    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
        shoppingCart = JSON.parse(storedCart);
    }
    //add quantity
    const quantity = shoppingCart[id];
    if(quantity){
        shoppingCart[id] = quantity + 1;
    }
    else{
        shoppingCart[id] = 1;
    }
    
    localStorage.setItem('shopping-cart',JSON.stringify(shoppingCart));
}
const getStoredCart = () =>{
     let shoppingCart = {};
    const storedCart = localStorage.getItem('shopping-cart');
    if(storedCart){
        shoppingCart = JSON.parse(storedCart);
    }
    return shoppingCart;
}
export {addToDb, getStoredCart};