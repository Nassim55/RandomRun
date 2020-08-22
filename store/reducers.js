// State is being modified in our reducers file
import { 
    IS_LOCATION_PERMISSION_GRANTED,
    SET_USER_LOCATION,
    SET_ROUTE_DISTANCE_METERS
} from './actionTypes';

const initialState = {
    isLocationPermissionGranted: false,
    userLongitude: 0,
    userLatitude: 0,
    routeDistanceMeters: 0,
};

// We now describe how our state will be modified when either addition or subtraction is called:
export const reducer = (state = initialState, action) => {
    switch (action.type)  {
        case IS_LOCATION_PERMISSION_GRANTED:
            return {
                ...state,
                isLocationPermissionGranted: action.isLocationPermissionGranted
            }
        case SET_USER_LOCATION:
            return {
                ...state,
                userLongitude: action.userLongitude,
                userLatitude: action.userLatitude
            }
        case SET_ROUTE_DISTANCE_METERS:
            console.log(state)
            return {
                ...state,
                routeDistanceMeters: action.userInputRouteDistanceMeters
            }
        default:
            return state;
    }
};