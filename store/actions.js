import { 
    IS_LOCATION_PERMISSION_GRANTED,
    SET_USER_LOCATION,
    SET_ROUTE_DISTANCE_METERS,
    SET_RANDOM_POLYGON_COORDINATES,
    SET_FINAL_ROUTE_LINESTRING,
    SET_CALCULATED_ROUTE_DISTANCE_METERS
} from './actionTypes';

// We now need to build 'action creators', theses are basically just
// functions that point to the action types...so that when the action 
// type is called, our reducers know how to modify the state.

// Defining the action type. All an action is, is a function that returns an object:
export const isLocationPermissionGranted = (isLocationPermissionGranted) => ({
    type: IS_LOCATION_PERMISSION_GRANTED,
    isLocationPermissionGranted: isLocationPermissionGranted
});

export const setUserLocation = (userLongitudeAndLatitude) => ({
    type: SET_USER_LOCATION,
    userLongitude: userLongitudeAndLatitude[0],
    userLatitude: userLongitudeAndLatitude[1],
    userLongitudeAndLatitude: userLongitudeAndLatitude
});

export const setRouteDistanceMeters = (userInputRouteDistanceMeters) => ({
    type: SET_ROUTE_DISTANCE_METERS,
    userInputRouteDistanceMeters: userInputRouteDistanceMeters
});

export const setRandomPolygonCoordinates = (randomPolygonCoords) => ({
    type: SET_RANDOM_POLYGON_COORDINATES,
    randomPolygonCoords: {'coordinates': randomPolygonCoords}
});

export const setFinalRouteLineString = (finalRouteLineString) => ({
    type: SET_FINAL_ROUTE_LINESTRING,
    finalRouteLineString: finalRouteLineString
});

export const setCalculateRouteDistance = (calculatedRouteDistance) => ({
    type: SET_CALCULATED_ROUTE_DISTANCE_METERS,
    calculatedRouteDistance: calculatedRouteDistance
}); 