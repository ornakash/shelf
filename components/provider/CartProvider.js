import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet } from 'react-native'

const CartContext = React.createContext();

function CartProvider(props) {
    const [myCartItems, setCartItems] = useState([]);
    useEffect(() => {
        console.log("CartProvider re-rendered.");
    }, [myCartItems])

    return (
        <CartContext.Provider
            value={{
                myCartItems,
                setCartItems
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

const styles = StyleSheet.create({
    cart: {
        position: 'absolute',
        bottom: 1,
        height: 100,
        width: '100%',
        borderRadius: 50,

    },
    cartText: {
        backgroundColor: 'red',
        textAlign: 'center',
        color: 'white',
    },
    cartItems: {
        flexWrap: 'wrap',
        padding: 1,
    },
    cartImages: {
        height: 45,
        width: 45,
        flexWrap: 'wrap'
    }
})

export { CartProvider, CartContext }