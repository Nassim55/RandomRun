import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { 
    Clock, 
    spring,
    event,
    Value,
    cond,
 } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const SavedRouteCards = (props) => {

    console.log(props)

    const translationX = useRef(new Value(0)).current;
    const translationY = useRef(new Value(0)).current;
    const scale = useRef(new Value(0.9)).current;
    const translateYCard2 = useRef(new Value(44)).current;

    const state = new Value(-1);



	const onGestureEvent = useCallback(
		event(
			[{
				nativeEvent: {
					translationX: translationX,
                    translationY: translationY,
                    state: state,
				},
			}],
			{ useNativeDriver: true },
		),
		[],
    );

    
    const interaction = (gestureTranslation, gestureState) => {
        const start = new Value(0);
        const dragging = new Value(0);
        const position = new Value(0);
      
        return cond(
          eq(gestureState, State.ACTIVE),
          [
            cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
            set(position, add(start, gestureTranslation)),
          ],
          [set(dragging, 0), position]
        );
      }





    const onHandlerStateChange = e => {
        
    }

    
    return (
        <View style={styles.containerSavedRouteCards}>
            <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
            >
                <Animated.View 
                style={[styles.savedRouteCards, {
                    transform: [
                        { translateX: translationX },
                        { translateY: translationY },
                    ]
                }]}
                >
                    <Text>Hello</Text>
                </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler
            onGestureEvent={onGestureEvent}
            >
                <Animated.View 
                style={[styles.savedRouteCards2, {
                    transform: [
                        {scale: scale},
                        {translateY: translateYCard2},
                    ]
                }]}
                >
                    <Text>Hello</Text>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    containerSavedRouteCards: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderWidth: 1,
    },
    savedRouteCards: {
        position: 'absolute',
        height: '60%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1
    },
    savedRouteCards2: {
        position: 'absolute',
        height: '60%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        zIndex: -1,
    },
})

export default SavedRouteCards;