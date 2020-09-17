import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { Clock, spring, event, Value, cond, useCode, startClock, set, block, timing, Easing, eq, add } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useClock, useValue, usePanGestureHandler, translate, withOffset } from  "react-native-redash/lib/module/v1";


import Card from './Card';



const SavedRouteCards = () => {
    //const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

    // When the gesture starts again we want to start from the last position instead of resetting:
    //const translateX = withOffset(translation.x, state);
    //const translateY = withOffset(translation.y, state);


    return (
        <View style={styles.containerSavedRouteCards}>
            <Card position={1} />
            <Card position={0.5} />
            <Card position={0} />
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
    }
})

export default SavedRouteCards;




/*
            <PanGestureHandler {...gestureHandler} >
                <Animated.View style={[styles.savedRouteCards, { 
                    transform: [{ translateX }, { translateY }]
                }]} >
                    <Text>Hello</Text>
                </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler>
                <Animated.View 
                style={[styles.savedRouteCards2, {
                    transform: [
                        {scale: 0.9},
                        {translateY: 44},
                    ]
                }]}
                >
                    <Text>Hello</Text>
                </Animated.View>
            </PanGestureHandler>
*/