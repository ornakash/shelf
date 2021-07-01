import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';

import products from "../assets/products.js";

import { CartContext } from './provider/CartProvider.js';

import MyCart from "./MyCart.js";
import DragItem from './DragItem.js';

const { width } = Dimensions.get("window");
const height = width * 0.5;

export default function Homepage() {
    const context = useContext(CartContext);
    return (
        <View style={styles.container}>
            <View style={{ width, height: '100%' }}>
                <View style={styles.slider}>
                    <ScrollView
                        horizontal
                        style={{ width }}
                        showsHorizontalScrollIndicator={false}>
                        {
                            products.map((product) => (
                                <DragItem product={product} key={product.id}
                                >
                                    <Image
                                        style={{ width: width / 3, height, flex: 1 }}
                                        resizeMode="contain"
                                        source={{
                                            uri: product.product_image,
                                        }}
                                    />
                                </DragItem>
                            ))
                        }
                    </ScrollView>
                    <View style={styles.cart}>
                        <Text onPress={() => context.resetCart()} style={styles.cartText}>עגלת הקניות - לחץ כאן לאיפוס העגלה</Text>
                        {<MyCart myCart={context.myCartItems} />}
                    </View>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
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
        padding: 10,
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'stretch'
    },
    slider: {
        flex: .5
    }
});
