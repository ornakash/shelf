import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'

import products from "../assets/products.js";

export default function MyCart(props) {

    useEffect(() => {
        console.log("MyCart.js rendered",
            { myCart: props.myCart });
    }, [props.myCart]);

    const renderCartItems = () => (
        props.myCart && props.myCart != undefined && props.myCart.length > 0 ?
            props.myCart.map((product, index) => (<View key={index} style={styles.cartItems}>
                <Text>{product.count == 1 ? '' : product.count}</Text>
                <Image
                    style={styles.cartImages}
                    resizeMode="contain"
                    source={{
                        uri: products[product.id].product_image,
                    }}
                /></View>)) : <Text>אין פריטים בעגלה</Text>
    )

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
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
