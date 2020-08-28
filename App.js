import React, { useRef, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useDispatch, useSelector } from 'react-redux';

// Custom components:
import RouteInfoCard from './app/components/RouteInfoCard';

// Custom functions:
import setUserLongitudeAndLatitude from './app/functions/setUserLongitudeAndLatitude';

// API keys:
const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

// Connecting to the Mapbox API:
MapboxGL.setAccessToken(MAPBOX_API_KEY);
MapboxGL.setConnected(true);


const App = () => {
  console.log('app is rendering');

  // Creating dispatch to allow for updating redux store state:
  const dispatch = useDispatch();
    
  // Has user allowed location permission, true or false:
  const isLocationPermissionGranted = useSelector(state => state.isLocationPermissionGranted);

  // Getting input route characteristics from the user:
  const originLongitude = useSelector(state => state.userLongitude);
  const originLatitude =  useSelector(state => state.userLatitude);
  const routeDistanceMeters = useSelector(state => state.routeDistanceMeters);

  // Generated route characteristics that will be rendered to the user: 
  const finalLineString = useSelector(state => state.finalRouteLineString);
  const calculatedRouteDistance = useSelector(state => state.calculatedRouteDistance);



  const mostNorthEasternCoordinates = useSelector(state => state.mostNorthEasternCoordinates);
  const mostSouthWesternCoordinates = useSelector(state => state.mostSouthWesternCoordinates);

  // Set user location on initial render:
  useEffect(() => {
    setUserLongitudeAndLatitude(dispatch);
  }, []);

  


  const cameraBoundsConfig = {
    ne: mostNorthEasternCoordinates,
    sw: mostSouthWesternCoordinates,
    paddingRight: 50,
    paddingLeft: 50,
    paddingBottom: 250,
    paddingTop: 50
  }


  return (
    <View style = {styles.page}>
      <MapboxGL.MapView style = {styles.map}>
        <MapboxGL.Camera
        animationDuration={2000}
        animationMode={'flyTo'}
        {...((mostNorthEasternCoordinates === null || mostSouthWesternCoordinates === null) ? 
          {centerCoordinate: [originLongitude, originLatitude], zoomLevel: 13} : {bounds: cameraBoundsConfig}
        )}
        />
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
      displayRouteDistance={calculatedRouteDistance}
      />
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
    lineColor: '#F24E4E',
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 5,
    lineOpacity: 0.5,
  },
};


export default App;





  /*
  if (cameraRef.current) {
    console.log(cameraRef.current.flyTo)
    console.log(cameraRef.current.zoomTo)
    cameraRef.current.flyTo([-1.5545966666666666, 55.01994166666667], 2000);
    cameraRef.current.zoomTo(13, 2000);
  } else {
    console.log('hello')
  }
  */