import { 
  setFinalRouteLineString,
  setCalculateRouteDistance,
  setMostNorthEasternCoordinates,
  setMostSouthWesternCoordinates
} from '../../store/actions';
import setUserLongitudeAndLatitude from './setUserLongitudeAndLatitude';
import { AsyncStorage } from 'react-native';

const fetchRouteCoords = async ( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters) => {
  if (Number.isNaN(routeDistanceMeters) != true) {
    if (routeDistanceMeters > 0) {
        try {
            await setUserLongitudeAndLatitude(dispatch);
            if (isLocationPermissionGranted === true) {
              token = await AsyncStorage.getItem('token');
              if (token) {
                console.log(token)
                const response = await fetch(`http://127.0.0.1:8000/route/getroute?longitude=${originLongitude}&latitude=${originLatitude}&routeDistance=${routeDistanceMeters}`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Token ${token}`
                  }
                });
                const data = await response.json();

                dispatch(setFinalRouteLineString({ 'type': 'LineString', 'coordinates': data.coordinates }));
                dispatch(setCalculateRouteDistance(data.distanceMeters));

                dispatch(setMostNorthEasternCoordinates(data.mostNorthEastCoordinates));
                dispatch(setMostSouthWesternCoordinates(data.mostSouthWestCoordinates));
              } else {
                console.log('no token');
              }
            }
        } catch (err) { if (console) console.error(err) };
    };
};
};

export default fetchRouteCoords;