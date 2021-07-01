import React, { useState, useEffect, useReducer } from 'react'
const CartContext = React.createContext();

function CartProvider(props) {
    const [myCartItems, setCartItems] = useState([]);


    const addToCart = (product,) => {
        // const cartArray = [...myCartItems];
        const cartArray = myCartItems
        if (!product) {
            console.error("CartProvider->id not a valid product", product);
            return
        }
        const { id } = product
        let cartProduct = cartArray.find(product => product.id === id)
        if (!cartProduct) {
            console.log('adding product to cart...')
            cartProduct = { ...product }
            cartProduct.count = 0;
            cartArray.push(cartProduct);
        }
        cartProduct.count++
        setCartItems([...cartArray]);
        console.log("🚀 ~ file: CartProvider.js ~ line 26 ~ setCartItems ~ array", myCartItems, cartArray)
    }
    const resetCart = () => {
        setCartItems([]);
    }

    useEffect(() => {
        console.log("CartProvider re-rendered with values: ", myCartItems);
    }, [myCartItems])

    return (
        <CartContext.Provider
            value={{
                myCartItems,
                setCartItems,
                resetCart,
                addToCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}
export { CartProvider, CartContext }