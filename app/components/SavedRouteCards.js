import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SavedRouteCards = () => {
    const translationXRef = useRef(new Animated.Value(0));
    const translationYRef = useRef(new Animated.Value(0));
    
    console.log(translationXRef.current)
    console.log(translationYRef.current)

	const onGestureEvent = useCallback(
		Animated.event(
			[{
				nativeEvent: {
					translationX: translationXRef.current,
					translationY: translationYRef.current,
				},
			}],
			{ useNativeDriver: true },
		),
		[],
	);
    


    return (
        <PanGestureHandler
        onGestureEvent={onGestureEvent}
        >
            <Animated.View 
            style={[styles.savedRouteCards, {
                transform: [
                    { translateX: translationXRef.current },
                    { translateY: translationYRef.current },
                ]
            }]}
            >
                <Text>Hello</Text>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    savedRouteCards: {
        position: 'absolute',
        top: '2.5%',
        left: '2.5%',
        height: '50%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 15,
        opacity: 0.8,
    },
})

export default SavedRouteCards;