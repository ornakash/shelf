import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'

import products from "../assets/products.js";

const CartContext = React.createContext();

export default function MyCart(props) {
    const context = useContext(CartContext);
    useEffect(() => {
        console.log("MyCart.js rendered",
            { myCart: props.myCart });
    }, [props.myCart]);

    const renderCartItems = () => (
        props.myCart && props.myCart != undefined && props.myCart.length > 0 ?
            props.myCart.map((product, index) => (<View key={index}>
                <View style={styles.countView}>
                    <Text style={styles.countText}>{product.count == 1 ? '1' : product.count}</Text>
                </View>
                <Image
                    style={styles.cartImages}
                    resizeMode="contain"
                    source={{
                        uri: products[product.id].product_image,
                    }}
                /></View>)) : <Text style={{ textAlign: 'center', padding: 2, alignItems: 'center' }}>העגלה ריקה כרגע. אנא הוסף פריטים</Text>
    )
    return (
        <View style={styles.cartItems}>
            {renderCartItems()}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerText: {
        textAlign: 'center'
    },
    cart: {
        position: 'absolute',
        bottom: 1,
        height: 100,
        width: '100%',
        borderRadius: 50,
    },
    cartText: {
        backgroundColor: '#0f1634',
        textAlign: 'center',
        color: 'red',
    },
    cartItems: {
        flexWrap: 'wrap',
        padding: 1,
        flexDirection: 'row',
        bottom: 0,
    },
    cartImages: {
        height: 75,
        width: 75,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    countView: {
        backgroundColor: '#0f1634',
        borderRadius: 50,
        width: '50%',
    },
    countText: {
        color: 'white',
        alignItems: 'center',
        textAlign: 'center'
    }
})
