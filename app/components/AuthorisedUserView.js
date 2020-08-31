import React from 'react';
import { StyleSheet, View  } from 'react-native';
import { useSelector } from 'react-redux';

// Custom components:
import MapboxMap from './MapboxMap';
import RouteInfoCard from './RouteInfoCard';
import UserInfoMenu from './UserInfoMenu';

const AuthorisedUserView = (props) => {
  console.log('AuthorisedUserView render');

  // Has user allowed location permission, true or false:
  const isLocationPermissionGranted = useSelector(state => state.isLocationPermissionGranted);

  // Getting input route characteristics from the user:
  const originLongitude = useSelector(state => state.userLongitude);
  const originLatitude =  useSelector(state => state.userLatitude);
  const routeDistanceMeters = useSelector(state => state.routeDistanceMeters);

  // Generated route characteristics that will be rendered to the user: 
  const calculatedRouteDistance = useSelector(state => state.calculatedRouteDistance);

  return (
      <View style = {styles.pageContent}>
          <MapboxMap
          originLongitude={originLongitude}
          originLatitude={originLatitude}
          />
          <RouteInfoCard 
          isLocationPermissionGranted={isLocationPermissionGranted}
          originLongitude={originLongitude}
          originLatitude={originLatitude}
          routeDistanceMeters={routeDistanceMeters}
          displayRouteDistance={calculatedRouteDistance}
          />
          <UserInfoMenu />
    </View>
  );
};

const styles = StyleSheet.create({
    pageContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
  });

export default AuthorisedUserView;