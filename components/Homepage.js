import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';

import products from "../assets/products.js";

import { CartContext } from './provider/CartProvider.js';

import MyCart from "./MyCart.js";
import DragItem from './DragItem.js';
import Animated from 'react-native-reanimated';

const { width } = Dimensions.get("window");
const height = width * 0.5;

export default function Homepage() {
    const context = useContext(CartContext);


    return (
        <View style={styles.container}>
            <View style={{ width, height: '100%', flex: 1 }}>
                <View style={styles.centerItem}>
                    <Text style={styles.upperText}>סליידר המחובר לעגלת קניות</Text>
                </View>

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
                    <View>
                        <Text style={{ textAlign: 'center' }}>{context.addedItem}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cart}>
                <Text onPress={() => context?.resetCart()} style={styles.cartText}>עגלת הקניות</Text>
                {<MyCart myCart={context.myCartItems} />}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    cart: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 50,
        flex: 1,
    },
    cartText: {
        backgroundColor: '#0f1634',
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
    },
    centerItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        backgroundColor: '#0f1634',
    },
    upperText: {
        color: '#fafafa',
        padding: 10,
    }
});
