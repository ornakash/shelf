import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Text, View, PanResponder, Animated, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import products from "../assets/products.js";

import MyCart from "./MyCart.js";

const { width } = Dimensions.get("window");
const height = width * 0.5;

export default function Homepage() {
    const [myCartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const resetCart = () => {
        setCartItems([]);
    }
    const addToCart = (product_id) => {
        let tempArray = [...myCartItems];

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
        setCartItems(tempArray);
    }

    const pan = useState(new Animated.ValueXY())[0];
    const panResponder = useState(
        PanResponder.create({
            onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
            onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: (e, gestureState) => {
                pan.setOffset({
                    y: pan.y._value
                });
            },

            onPanResponderMove: Animated.event(
                [
                    null,
                    { dy: pan.y }
                ],
                {
                    useNativeDriver: false,
                    listener: (evt, gestureState) => {

                    }
                }
            ),
            onPanResponderRelease: (evt, gestureState) => {
                pan.flattenOffset();
                if (gestureState.moveY > 710) {
                    Alert.alert("נוסף לעגלת הקניות");
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false
                    },
                    ).start();
                }
                else {
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false
                    },
                    ).start();
                }
            }
        })
    )[0];
    if (loading) return <View style={styles.container}><ActivityIndicator size="small" color="red" /></View>
    return (
        <View style={styles.container}>
            <View style={{ width, height: '100%' }}>
                <Text>ללא סליידר</Text>

                <View style={styles.notSlider}>
                    {products.map((product) => (
                        <TouchableOpacity key={product.id} onPress={() => addToCart(product.id)}>
                            <Text style={styles.notSliderText}>{product.product_name}</Text>
                            <Image
                                style={{ width: 100, height: 100 }}
                                resizeMode="contain"
                                source={{
                                    uri: product.product_image,
                                }}
                            />
                        </TouchableOpacity>
                    ))
                    }
                </View>

                <Text> סליידר (משיכת הפריטים לא עובדים באופן תקין)</Text>
                <View style={styles.slider}>
                    <ScrollView
                        horizontal
                        style={{ width }}
                        showsHorizontalScrollIndicator={false}>
                        {
                            products.map((product) => (
                                <Animated.View key={product.id}
                                    style={{
                                        transform: [{ translateY: pan.y }]
                                    }}
                                    {...panResponder.panHandlers}
                                >
                                    <Image
                                        style={{ width: width / 3, height, flex: 1 }}
                                        resizeMode="contain"
                                        source={{
                                            uri: product.product_image,
                                        }}
                                    />
                                </Animated.View>
                            ))
                        }
                    </ScrollView>
                </View>

            </View>
            <View style={styles.cart}>
                <Text style={styles.cartText} onPress={() => { resetCart() }}>עגלת הקניות - לחץ כאן לאיפוס העגלה</Text>

                <MyCart myCart={myCartItems} />
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
        bottom: 0,
        height: 100,
        width: '100%',
        borderRadius: 50,

    },
    cartText: {
        backgroundColor: 'red',
        textAlign: 'center',
        color: 'white',
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
    notSlider: {
        flex: .5, flexDirection: 'row', padding: 10,
        flexWrap: "wrap", justifyContent: 'center'
    },
    notSliderText: {
        textAlign: 'center'
    },
    slider: {
        flex: .5
    }
});
