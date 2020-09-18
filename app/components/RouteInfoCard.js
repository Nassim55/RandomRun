import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Button } from 'react-native-paper'

// Redux state store imports: 
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDistanceMeters, setMapImageUri } from '../../store/actions';

// Custom functions:
import fetchRouteCoords from '../functions/fetchRouteCoords';
import saveRoute from '../functions/saveRoute';
import setUserLongitudeAndLatitude from '../functions/setUserLongitudeAndLatitude';

const RouteInfoCard = (props) => {
    const dispatch = useDispatch();

    const finalLineString = useSelector(state => state.finalRouteLineString);


    

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
                        props.routeDistanceMeters,
                    );
                }}
                >   
                    
                    <Text style= {styles.generateButtonText}>Calculate Route</Text>
                    <SimpleLineIcons name='rocket' size={24} color='white'/>
                </TouchableOpacity>
            </View>
            <View style = {styles.containerRouteDetails}>
                <Text style = {styles.routeDistance}>
                    {(props.displayRouteDistance / 1000).toFixed(2)} KM
                </Text>
                {
                    finalLineString.coordinates.length > 0 ?
                    <Button
                    uppercase={false}
                    mode="outlined"
                    onPress={async () => {
                        const mapImageURI = await props.viewShotRef.current.capture();
                        saveRoute(props.displayRouteDistance, finalLineString.coordinates.toString(), mapImageURI);
                    }}
                    >
                        Save this route
                    </Button>
                    : 
                    null
                }
            </View>
        </View>
    );
}; 

const styles = StyleSheet.create({
    routeDetails: {
        position: 'absolute',
        bottom: '15%',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',

    },
    containerRouteDetails: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        opacity: 0.8,
        padding: '2.5%'

    },
    routeDistance: {
        fontWeight: '600'
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
        opacity: 0.8,
        overflow: 'hidden',
        marginBottom: '3%',
        paddingLeft: '2%',
    },
    inputDistance: {
        flex: 4,
    },
    generateButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F24E4E',
        elevation: 8,
        paddingRight: '3%',
        paddingLeft: '3%',
        opacity: 0.8
    },
    generateButtonText: {
        color: 'white',
        marginRight: 10
    }
});

export default RouteInfoCard;


/*

        
*/