import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, PanResponder, Animated, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");
const height = width * 0.5;

import { CartContext } from './provider/CartProvider.js';

export default function DragItem(props) {
    const context = useContext(CartContext);
    const pan = useState(new Animated.ValueXY())[0];

    useEffect(() => {
        console.log("Im rendering now");
    }, [])

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
                if (gestureState.moveY > 300) {
                    // Alert.alert("נוסף לעגלת הקניות " + props.product_id);
                    context?.addToCart(props.product_id);
                    //addToCart(props.product_id);
                    //console.log(props.context);
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


    return (
        <Animated.View
            style={{
                transform: [{ translateY: pan.y }]
            }}
            {...panResponder.panHandlers}
        >
            {props.children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({})
