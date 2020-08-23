import fetchRandomPolygonCoords from './fetchRandomPolygonCoords';
import optimiseMapboxRoute from './optimiseMapboxRoute';
import { setFinalRouteLineString, setCalculateRouteDistance } from '../../store/actions';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

const fetchRouteCoords = async ( 
  isLocationPermissionGranted,
  dispatch,
  originLongitude,
  originLatitude,
  routeDistanceMeters ) => {
  
  const routeCoordsString = await fetchRandomPolygonCoords( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters);
    
  try {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordsString}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
    const data = await response.json();
    const originalMapboxRouteDistanceMeters = data.routes[0].distance
    console.log(originalMapboxRouteDistanceMeters)

    if (originalMapboxRouteDistanceMeters > routeDistanceMeters) {
      console.log('running optimiser')
      const optimisedRoute = await optimiseMapboxRoute();
    } else {
      dispatch(setFinalRouteLineString(data.routes[0].geometry))
      dispatch(setCalculateRouteDistance(data.routes[0].distance))
    };

  } catch (err) {
    if (console) {
      console.error(err);
    };
  };
};

export default fetchRouteCoords;