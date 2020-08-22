import { 
    IS_LOCATION_PERMISSION_GRANTED,
    SET_USER_LOCATION,
    SET_ROUTE_DISTANCE_METERS
} from './actionTypes';

// We now need to build 'action creators', theses are basically just
// functions that point to the action types...so that when the action 
// type is called, our reducers know how to modify the state.

// Defining the action type. All an action is, is a function that returns an object:
export const isLocationPermissionGranted = (props) => ({
    type: IS_LOCATION_PERMISSION_GRANTED,
    isLocationPermissionGranted: props
});

export const setUserLocation = (props = [0, 0]) => ({
    type: SET_USER_LOCATION,
    userLongitude: props[0],
    userLatitude: props[1]
});

export const setRouteDistanceMeters = (props = 0) => ({
    type: SET_ROUTE_DISTANCE_METERS,
    userInputRouteDistanceMeters: props
});