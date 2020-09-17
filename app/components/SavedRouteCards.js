import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { Clock, spring, event, Value, cond, useCode, startClock, set, block, timing, Easing, eq, add,interpolate, sub } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useClock, useValue, usePanGestureHandler, translate, withOffset, useTransition } from  "react-native-redash/lib/module/v1";


import Card from './Card';


const cards = [
    { index: 4},
    { index: 3},
    { index: 2},
    { index: 1},
    { index: 0},
]

const step = 1 / (cards.length - 1);

const SavedRouteCards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const aIndex = useTransition(currentIndex);

    return (
        <View style={styles.containerSavedRouteCards}>
            <View style={styles.darkenMap} />
            {cards.map(
                ({ index }) =>
                    currentIndex < index * step + step && (
                        <Card 
                        key={index}
                        position={sub(index * step, aIndex)}
                        onSwipe={() => setCurrentIndex(prev => prev + step)}
                        />
                )
            )}
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
    },
    darkenMap: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.5,
        height: '100%',
        width: '100%',
    }
})

export default SavedRouteCards;