import fetchRandomPolygonCoords from './fetchRandomPolygonCoords';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

const fetchRouteCoords = async (
    isLocationPermissionGranted,
    dispatch,
    originLongitude,
    originLatitude,
    routeDistanceMeters
    ) => {

    const routeCoordsString = await fetchRandomPolygonCoords( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters);
    console.log(routeCoordsString)
    
    // try {
    //   const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordsString}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
    //   const data = await response.json();
    //   if (data.routes[0].distance > routeDistanceMeters) {
    //     try {
    //       const scaleResponse = await fetch(`http://127.0.0.1:5000/optimise`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           "mapboxRouteGeometry": data.routes[0].geometry.coordinates
    //         })
    //       });
    //       const scaledData = await scaleResponse.json();

    //       const recalculatePoints = scaledData.recalculatePoints
    //       try {
    //         const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${recalculatePoints}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
    //         const data = await response.json()
    //         try {
    //           const response = await fetch('http://127.0.0.1:5000/finilise', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               "finilisedGapCoordinates": data.routes[0].geometry.coordinates
    //             })
    //           });
    //           const finiliseData = await response.json()
    //           setFinalLineString({ 'type': 'LineString', 'coordinates': finiliseData.coordinates })
    //           console.log(finiliseData.distanceMeters)
    //           setDisplayRouteDistance(finiliseData.distanceMeters)
    //         } catch (err) {
    //           if (console) {
    //             console.error(err)
    //           }
    //         }
    //       } catch (err) {
    //         if (console) {
    //           console.error(err)
    //         }
    //       }
    //     } catch (err) {
    //       if (console) {
    //         console.error(err);
    //       }
    //     };
    //   }
    //   else {
    //     setFinalLineString(data.routes[0].geometry)
    //     console.log(data.routes[0].distance)
    //     setDisplayRouteDistance(data.routes[0].distance)
    //   }
    // } catch (err) {
    //   if (console) {
    //     console.error(err);
    //   }; 
    // };
  };

  export default fetchRouteCoords;