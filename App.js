import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, PermissionsAndroid, Button } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { lineString } from '@turf/helpers';
import { useDispatch, useSelector } from 'react-redux';

// Custom components:
import RouteInfoCard from './app/components/RouteInfoCard';

// Custom functions:
import requestLocationPermission from './app/functions/requestLocationPermission';
import fetchRouteCoords from './app/functions/fetchRouteCoords';


const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

// Connecting to the Mapbox API:
MapboxGL.setAccessToken(MAPBOX_API_KEY);
MapboxGL.setConnected(true);

const App = () => {
  // Creating dispatch to allow for updating redux store state:
  const dispatch = useDispatch();
    
  // Requesting permission for user location, setting permission true or false in redux state:
  requestLocationPermission(dispatch);
  const isLocationPermissionGranted = useSelector(state => state.isLocationPermissionGranted);

  // Getting route characteristic from redux state:
  const originLongitude = useSelector(state => state.userLongitude);
  const originLatitude =  useSelector(state => state.userLatitude);
  const routeDistanceMeters = useSelector(state => state.routeDistanceMeters);

  // Route characteristics that will be rendered to the user: 
  const finalLineString = useSelector(state => state.finalRouteLineString);
  const calcuatedRouteDistance = useSelector(state => state.calcuatedRouteDistance);

  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <MapboxGL.MapView style = {styles.map} >
          <MapboxGL.ShapeSource id="optimised" shape={finalLineString}>
            <MapboxGL.LineLayer id="optimisedLine" style={layerStyles.optimisedRouteLine} />
          </MapboxGL.ShapeSource>
          <MapboxGL.PointAnnotation id="origin-point" coordinate={[originLongitude, originLatitude]} />
        </MapboxGL.MapView>
        <RouteInfoCard displayRouteDistance={calcuatedRouteDistance}/>
        <Button
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => {
              fetchRouteCoords( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters)
            }}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1,
  }
});

const layerStyles = {
  route: {
    lineColor: 'red',
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
  },
  randomRouteLine: {
    lineColor: 'blue',
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
  },
  optimisedRouteLine: {
    lineColor: 'green',
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
  },
};


export default App;


