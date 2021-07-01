import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder } from 'react-native';

import { CartContext } from './provider/CartProvider.js';

export default function DragItem(props) {
    const context = useContext(CartContext);

    useEffect(() => {
        console.log("State");
    }, []);

    const pan = React.useRef(new Animated.ValueXY());

    const setDropZoneValues = React.useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });

    const panResponder = React.useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderGrant: (evt, gestureState) => {
            pan.current.setOffset({ y: pan.current.y._value });
            pan.current.setValue({ y: 0 });
        },

        onPanResponderMove: Animated.event([null, {
            dy: pan.current.y
        }], {
            useNativeDriver: false,
        }),
        onPanResponderRelease: (e, gesture) => {
            if (gesture.moveY > 300) {
                //console.log(gesture);
                context?.addToCart(props.product_id);
            }
            Animated.spring(
                pan.current,
                { toValue: 0, useNativeDriver: false },

            ).start();
        }
    }), []);

    return (
        <Animated.View
            style={[pan.current.getLayout()]}
            {...panResponder.panHandlers}
        >
            {props.children}
        </Animated.View>
    );
}