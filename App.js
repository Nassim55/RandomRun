import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useDispatch, useSelector } from 'react-redux';

// Custom components:
import RouteInfoCard from './app/components/RouteInfoCard';

// Custom functions:
import requestLocationPermission from './app/functions/requestLocationPermission';

// API keys:
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
      <MapboxGL.MapView style = {styles.map} >
        <MapboxGL.ShapeSource id="optimised" shape={finalLineString}>
          <MapboxGL.LineLayer id="optimisedLine" style={layerStyles.optimisedRouteLine} />
        </MapboxGL.ShapeSource>
        <MapboxGL.PointAnnotation id="origin-point" coordinate={[originLongitude, originLatitude]} />
      </MapboxGL.MapView>
      <RouteInfoCard 
      isLocationPermissionGranted={isLocationPermissionGranted}
      originLongitude={originLongitude}
      originLatitude={originLatitude}
      routeDistanceMeters={routeDistanceMeters}
      displayRouteDistance={calcuatedRouteDistance}/>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,

  },
  map: {
    width: '100%',
    height: '100%'
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


