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
    // Calling Mapbox API for directions to the random latitude and longitude coordinates:
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordsString}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
    const data = await response.json();
    
    // Defining route characteristics from the returned Mapbox data:
    const originalMapboxRouteDistanceMeters = data.routes[0].distance;
    const originalMapboxRouteGeometry = data.routes[0].geometry;
    const originalMapboxRouteCoordinates = data.routes[0].geometry.coordinates;

    
    
    // If the route is greater than the desired distance run the optimser, else update the Redux state:
    if (originalMapboxRouteDistanceMeters > routeDistanceMeters) {
      const optimisedRoute = await optimiseMapboxRoute(originalMapboxRouteDistanceMeters, originalMapboxRouteCoordinates, dispatch);
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