import React, { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native';

const CartContext = React.createContext();

function CartProvider(props) {
    const [myCartItems, setCartItems] = useState([]);
    const [addedItem, setAddedItem] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;


    const showAddedItem = () => {

        setAddedItem("המוצר התווסף לעגלת הקניות שלך");

        setTimeout(() => {
            setAddedItem('');
        }, 4000);
    }
    const addToCart = (product) => {
        const cartArray = myCartItems;
        if (!product) {
            console.error("CartProvider->id not a valid product", product);
            return;
        }
        const { id } = product;
        let cartProduct = cartArray.find(product => product.id === id);
        if (!cartProduct) {
            console.log('adding product to cart...')
            cartProduct = { ...product }
            cartProduct.count = 0;
            cartArray.push(cartProduct);
        }
        cartProduct.count++
        setCartItems([...cartArray]);
        console.log("🚀 ~ file: CartProvider.js ~ line 24 ~ setCartItems ~ array", myCartItems, cartArray)
    }
    const resetCart = () => {
        const cartArray = [];
        setCartItems([...cartArray]);
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
                addToCart,
                showAddedItem,
                addedItem,
                fadeAnim
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}
export { CartProvider, CartContext }