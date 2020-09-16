import React from 'react';
import { StyleSheet, View, Text  } from 'react-native';
import { useSelector } from 'react-redux';

// Custom components:
import MapboxMap from './MapboxMap';
import RouteInfoCard from './RouteInfoCard';
import UserInfoMenu from './UserInfoMenu';
import SavedRouteCards from './SavedRouteCards';


const AuthorisedUserView = (props) => {
  // Has user allowed location permission, true or false:
  const isLocationPermissionGranted = useSelector(state => state.isLocationPermissionGranted);

  // Getting input route characteristics from the user:
  const originLongitude = useSelector(state => state.userLongitude);
  const originLatitude =  useSelector(state => state.userLatitude);
  const routeDistanceMeters = useSelector(state => state.routeDistanceMeters);

  // Generated route characteristics that will be rendered to the user: 
  const calculatedRouteDistance = useSelector(state => state.calculatedRouteDistance);

  // Getting state to determine if UI components should be rendered:
  const isRouteCardsShown = useSelector(state => state.isRouteCardsShown);
  

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
          {
            isRouteCardsShown ?
            <SavedRouteCards />
            :
            null
          }
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
    link: {
      position: 'absolute'
    }
  });

export default AuthorisedUserView;