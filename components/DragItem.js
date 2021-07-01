import React, { useContext, useEffect, useState, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

import { CartContext } from './provider/CartProvider.js';

export default function DragItem(props) {
    const context = useContext(CartContext);

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ],
                {
                    useNativeDriver: false,
                    listener: (evt, gestureState) => {

                    }
                }
            ),
            onPanResponderRelease: (evt, gestureState) => {
                //pan.flattenOffset();
                if (gestureState.moveY > 300) {

                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false
                    },
                    ).start();
                    context.addToCart(props.product_id);

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
    ).current;

    return (
        <Animated.View
            style={{
                transform: [{ translateY: pan.y }]
            }}
            {...panResponder.panHandlers}
        >
            {props.children}
        </Animated.View>
    );
}