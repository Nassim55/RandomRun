import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';

// Redux state store imports: 
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDistanceMeters } from '../../store/actions';

// Custom functions:
import fetchRouteCoords from '../functions/fetchRouteCoords';

const RouteInfoCard = (props) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.routeDetails}>
            <View style = {styles.inputAndButtonContainer}>
                <TextInput
                style = {styles.inputDistance}
                placeholder = 'Enter distance in meters...'
                underlineColorAndroid = {'transparent'}
                onChangeText = {text => { if (isNaN(text) === false) dispatch(setRouteDistanceMeters(parseFloat(text)))}}
                />
                <TouchableOpacity 
                style = {styles.generateButton}
                onPress={() => {
                    fetchRouteCoords( 
                        props.isLocationPermissionGranted, 
                        dispatch,
                        props.originLongitude,
                        props.originLatitude,
                        props.routeDistanceMeters)
                }}
                >
                    <Text style= {styles.generateButtonText}>Generate Route</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.containerRouteDetails}>
                <Text>Distance: {(props.displayRouteDistance / 1000).toFixed(2)}km</Text>
            </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    routeDetails: {
        position: 'absolute',
        bottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',

    },
    containerRouteDetails: {
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
        opacity: 0.9,
        padding: '5%'

    },

    inputAndButtonContainer: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        opacity: 0.9,
        overflow: 'hidden',
        marginBottom: '5%',
        paddingLeft: '2%',
    },
    inputDistance: {
        flex: 2,
    },
    generateButton: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F24E4E',
        elevation: 8,
        paddingRight: '2%',
        paddingLeft: '2%',
    },
    generateButtonText: {
        color: 'white'
    }
});

export default RouteInfoCard;


/*

        
*/