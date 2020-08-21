import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { addition, subtraction } from '../../store/actions';

const RouteInfoCard = (props) => {
    const data = useSelector(state => state.counter)
    const dispatch = useDispatch();

    return (
        <View style={styles.routeDetails}>
            <Text>Generate your route:</Text> 
            <TextInput 
            style={styles.routeDistanceInput}
            placeholder='Enter a route distance in meters...'
            underlineColorAndroid={'transparent'} />
            <Button
            onPress={console.log('hello')}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button" />
            <Text onPress={() => dispatch(subtraction())}>Route Details</Text>
            <Text>Distance: {(props.displayRouteDistance / 1000).toFixed(2)}km</Text>
            <Text onPress={() => dispatch(addition())}>
                {data}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    routeDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',   
        position: 'absolute',
        alignSelf: 'center',
        bottom: '20%',
        width: '80%',
        height: '25%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        opacity: 0.8
    },
    routeDistanceInput: {

    }
});

export default RouteInfoCard;