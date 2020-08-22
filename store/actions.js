import { 
    IS_LOCATION_PERMISSION_GRANTED,
    GET_USER_CURRENT_LOCATION,
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

export const getUserCurrentLocation = () => ({
    type: GET_USER_CURRENT_LOCATION
});

export const setRouteDistanceMeters = (props = 0) => ({
    type: SET_ROUTE_DISTANCE_METERS,
    userInputRouteDistanceMeters: props
});