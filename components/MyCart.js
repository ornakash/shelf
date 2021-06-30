import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'

import products from "../assets/products.js";

export default function MyCart(props) {
    const myItems = props.myCart;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [myItems]);

    const renderCartItems = () => (
        props.myCart.length > 0 ?
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

    if (loading) return <View style={styles.container}><ActivityIndicator size="small" color="red" /></View>
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
