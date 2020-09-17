import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { mix, mixColor, usePanGestureHandler, withSpring } from 'react-native-redash/lib/module/v1';
import Animated, { add } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width: wWidth } = Dimensions.get('window');
const width = wWidth * 0.75;
const height = width * (425 / 294);



const Card = (props) => {
    const backgroundColor = mixColor(props.position, '#fbd2d2', '#f8a6a6');
    const translateYCardOffset = mix(props.position, 0 , -55);
    const scale = mix(props.position, 1, 0.9);

    const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

    // When the gesture starts again we want to start from the last position instead of resetting:
    const translateX = withSpring({ 
        value: translation.x,
        velocity: velocity.x,
        state,
        snapPoints: [-width, 0, width],
        onSnap: ([x]) => x !== 0 && props.onSwipe(),
    });
    const translateY = add(
        translateYCardOffset,
        withSpring({ value: translation.y, velocity: velocity.y, state, snapPoints: [0]})
    )

    return (
        <PanGestureHandler {...gestureHandler} >
            <Animated.View style={[styles.card, {
                width,
                height,
                backgroundColor,
                transform: [
                    { scale },
                    { translateX },
                    { translateY },
                ]
            }]} >

            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        height: '60%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 24,
    }
})

export default Card;