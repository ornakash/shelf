import React, { useState, useEffect, useReducer } from 'react'

const CartContext = React.createContext();

function CartProvider(props) {
    const [myCartItems, setCartItems] = useState([]);

    const addToCart = (product_id) => {
        console.log("Added " + product_id + " to cart");
        const tempArray = [...myCartItems];
        const found = tempArray.some(product => product.id === product_id);
        if (!found) tempArray.push({ id: product_id, count: 1 });
        else {
            for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i].id == product_id) {
                    tempArray[i].count = tempArray[i].count + 1;
                    break;
                }
            }
        }
        console.log(myCartItems);
        setCartItems(tempArray);
    }
    const resetCart = () => {
        setCartItems([]);
    }

    useEffect(() => {
        console.log("CartProvider re-rendered with values: ");
        console.log(myCartItems);
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