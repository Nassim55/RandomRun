// State is being modified in our reducers file
import { 
    IS_LOCATION_PERMISSION_GRANTED,
    SET_USER_LOCATION,
    SET_ROUTE_DISTANCE_METERS,
    SET_RANDOM_POLYGON_COORDINATES,
    SET_FINAL_ROUTE_LINESTRING,
    SET_CALCULATED_ROUTE_DISTANCE_METERS,
    SET_MOST_NORTH_EASTERN_COORDINATES,
    SET_MOST_SOUTH_WESTERN_COORDINATES
} from './actionTypes';

const initialState = {
    isLocationPermissionGranted: false,
    userLongitude: 0,
    userLatitude: 0,
    userLongitudeAndLatitude: [0, 0],
    routeDistanceMeters: 0,
    randomPolygonCoords: { 'coordinates': [] },
    finalRouteLineString: { 'type': 'LineString', 'coordinates': [] },
    calculatedRouteDistance: 0,
    mostNorthEasternCoordinates: null,
    mostSouthWesternCoordinates: null
};

// We now describe how our state will be modified when either addition or subtraction is called:
export const reducer = (state = initialState, action) => {
    switch (action.type)  {
        case IS_LOCATION_PERMISSION_GRANTED:
            //console.log('IS_LOCATION_PERMISSION_GRANTED')
            return {
                ...state,
                isLocationPermissionGranted: action.isLocationPermissionGranted
            };
        case SET_USER_LOCATION:
            //console.log('SET_USER_LOCATION')
            return {
                ...state,
                userLongitude: action.userLongitude,
                userLatitude: action.userLatitude,
                userLongitudeAndLatitude: action.userLongitudeAndLatitude
            };
        case SET_ROUTE_DISTANCE_METERS:
            //console.log('SET_ROUTE_DISTANCE_METERS')
            console.log(state)
            return {
                ...state,
                routeDistanceMeters: action.userInputRouteDistanceMeters
            };
        case SET_RANDOM_POLYGON_COORDINATES:
            //console.log('SET_RANDOM_POLYGON_COORDINATES')
            return { 
                ...state,
                randomPolygonCoords: action.randomPolygonCoords
            };
        case SET_FINAL_ROUTE_LINESTRING:
            //console.log('SET_FINAL_ROUTE_LINESTRING')
            return {
                ...state,
                finalRouteLineString: action.finalRouteLineString
            };
        case SET_CALCULATED_ROUTE_DISTANCE_METERS:
            //console.log('SET_CALCULATED_ROUTE_DISTANCE_METERS')
            return {
                ...state,
                calculatedRouteDistance: action.calculatedRouteDistance
            };
        case SET_MOST_NORTH_EASTERN_COORDINATES:
            return {
                ...state,
                mostNorthEasternCoordinates: action.mostNorthEasternCoordinates
            };
        case SET_MOST_SOUTH_WESTERN_COORDINATES:
            return {
                ...state,
                mostSouthWesternCoordinates: action.mostSouthWesternCoordinates
            };
        default:
            return state;
    }
};