import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import products from "../assets/products.js";

import { CartContext } from './provider/CartProvider.js';

import MyCart from "./MyCart.js";
import DragItem from './DragItem.js';

const { width } = Dimensions.get("window");
const height = width * 0.5;

export default function Homepage() {
    const context = useContext(CartContext);

    const [loading, setLoading] = useState(true);
    const [myArray, setMyArray] = useState([]);


    useEffect(() => {
        setMyArray([...context?.myCartItems]);
    }, [context?.myCartItems])
    /*
        if (loading) {
            return (
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {products.map((product) => (
                            <TouchableOpacity key={product.id} onPress={() => context?.addToCart(product.id)}>
                                <View style={{ flexWrap: 'wrap' }}>
                                    <Image
                                        style={{ width: 100, height: 100, flexDirection: 'row' }}
                                        resizeMode="contain"
                                        source={{
                                            uri: product.product_image,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>))
                        }
                    </View>
                    <MyCart myCart={context?.myCartItems} />
                </View>
            )
        }*/
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
                                <DragItem product_id={product.id} key={product.id}
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
                        {<MyCart myCart={context?.myCartItems} />}
                        {/*context?.items.map((obj) => (<Text key={obj.id}>{obj.id} - {obj.value}</Text>))*/}
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
