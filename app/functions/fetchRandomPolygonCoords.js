import getUserLocation from'./getUserLocation';
import { setRandomPolygonCoordinates } from '../../store/actions';

const fetchRandomPolygonCoords = async (
        isLocationPermissionGranted,
        dispatch,
        originLongitude,
        originLatitude,
        routeDistanceMeters
        ) => {
    
    if (Number.isNaN(routeDistanceMeters) != true) {
        if (routeDistanceMeters > 0) {
            try {
                await getUserLocation(isLocationPermissionGranted, dispatch);
                if (isLocationPermissionGranted === true) {
                    const response = await fetch(`http://127.0.0.1:5000/route?longitude=${originLongitude}&latitude=${originLatitude}&routeDistance=${routeDistanceMeters}`);
                    const data = await response.json();
                    dispatch(setRandomPolygonCoordinates(data.coordinates))
                    
                    // Returns a URL string of coords for Mapbox API:
                    const coordsURLLst = [];
                    for (let i = 0; i < data.coordinates.length; i++) {
                        coordsURLLst.push(data.coordinates[i].join())
                    };
                    const coordsURLString = coordsURLLst.join(';');
                    console.log(coordsURLString)
                    return coordsURLString;
                }
            } catch (err) {
                if (console) {
                    console.error(err);
                };
            };
        };
    };
  };

  export default fetchRandomPolygonCoords;