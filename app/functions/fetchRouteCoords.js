import { 
  setFinalRouteLineString,
  setCalculateRouteDistance,
  setMostNorthEasternCoordinates,
  setMostSouthWesternCoordinates
} from '../../store/actions';
import setUserLongitudeAndLatitude from './setUserLongitudeAndLatitude';

const fetchRouteCoords = async ( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters) => {
  if (Number.isNaN(routeDistanceMeters) != true) {
    if (routeDistanceMeters > 0) {
        try {
            await setUserLongitudeAndLatitude(dispatch);
            if (isLocationPermissionGranted === true) {
                const response = await fetch(`http://127.0.0.1:5000/route?longitude=${originLongitude}&latitude=${originLatitude}&routeDistance=${routeDistanceMeters}`);
                const data = await response.json();

                dispatch(setFinalRouteLineString({ 'type': 'LineString', 'coordinates': data.coordinates }));
                dispatch(setCalculateRouteDistance(data.distanceMeters));

                dispatch(setMostNorthEasternCoordinates(data.mostNorthEastCoordinates));
                dispatch(setMostSouthWesternCoordinates(data.mostSouthWestCoordinates));
            }
        } catch (err) { if (console) console.error(err) };
    };
};
};

export default fetchRouteCoords;