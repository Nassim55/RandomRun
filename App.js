import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, PermissionsAndroid, Button } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { lineString } from '@turf/helpers';

import RouteInfoCard from './app/components/RouteInfoCard';
import { useDispatch, useSelector } from 'react-redux';


import requestLocationPermission from './app/functions/requestLocationPermission';
import getUserLocation from'./app/functions/getUserLocation';
import fetchRandomPolygonCoords from'./app/functions/fetchRandomPolygonCoords';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

MapboxGL.setAccessToken(MAPBOX_API_KEY);
MapboxGL.setConnected(true);

const App = () => {
  // Creating dispatch to allow for updating redux state:
  const dispatch = useDispatch();
    
  // Requesting permission for user location, setting permission true or false in redux state:
  requestLocationPermission(dispatch);
  const isLocationPermissionGranted = useSelector(state => state.isLocationPermissionGranted);

  // Defining route characteristic from redux state:
  const originLongitude = useSelector(state => state.userLongitude);
  const originLatitude =  useSelector(state => state.userLatitude);
  const routeDistanceMeters = useSelector(state => state.routeDistanceMeters);

  // Fetch the coordinates for a random polygon from the back-end Python code:
  
  const randomRouteCoords = useSelector(state => state.randomPolygonCoords);
  console.log(randomRouteCoords.coordinates)

  // const generateCoordsString = (coordsLst) => {
  //   const coordsURLLst = [];
  //   for (let i = 0; i < coordsLst.length; i++) {
  //     coordsURLLst.push(coordsLst[i].join())
  //   };
  //   const coordsURLString = coordsURLLst.join(';');
  //   return coordsURLString;
  // };

  
  // const routeCoordsString = generateCoordsString(randomRouteCoords);
  

    //const [randomRouteCoords, setRandomRouteCoords] = useState({'coordinates': []});
    const [finalLineString, setFinalLineString] = useState({ "type": "LineString", "coordinates": [] });
    const [displayRouteDistance, setDisplayRouteDistance] = useState(0)



  // const fetchRouteCoords = async () => {
  //   try {
  //     const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordsString}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
  //     const data = await response.json();
  //     if (data.routes[0].distance > routeDistanceMeters) {
  //       try {
  //         const scaleResponse = await fetch(`http://127.0.0.1:5000/optimise`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             "mapboxRouteGeometry": data.routes[0].geometry.coordinates
  //           })
  //         });
  //         const scaledData = await scaleResponse.json();

  //         const recalculatePoints = scaledData.recalculatePoints
  //         try {
  //           const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${recalculatePoints}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
  //           const data = await response.json()
  //           try {
  //             const response = await fetch('http://127.0.0.1:5000/finilise', {
  //               method: 'POST',
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify({
  //                 "finilisedGapCoordinates": data.routes[0].geometry.coordinates
  //               })
  //             });
  //             const finiliseData = await response.json()
  //             setFinalLineString({ 'type': 'LineString', 'coordinates': finiliseData.coordinates })
  //             console.log(finiliseData.distanceMeters)
  //             setDisplayRouteDistance(finiliseData.distanceMeters)
  //           } catch (err) {
  //             if (console) {
  //               console.error(err)
  //             }
  //           }
  //         } catch (err) {
  //           if (console) {
  //             console.error(err)
  //           }
  //         }
  //       } catch (err) {
  //         if (console) {
  //           console.error(err);
  //         }
  //       };
  //     }
  //     else {
  //       setFinalLineString(data.routes[0].geometry)
  //       console.log(data.routes[0].distance)
  //       setDisplayRouteDistance(data.routes[0].distance)
  //     }
  //   } catch (err) {
  //     if (console) {
  //       console.error(err);
  //     }; 
  //   };
  // };


  
  //useEffect(() => {
  //  console.log('useEffect running');
    //fetchRandomPolygonCoords();
    //fetchRouteCoords();
  //}, [])

  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <MapboxGL.MapView style = {styles.map} >
          <MapboxGL.ShapeSource id="optimised" shape={finalLineString}>
            <MapboxGL.LineLayer id="optimisedLine" style={layerStyles.optimisedRouteLine} />
          </MapboxGL.ShapeSource>
          <MapboxGL.PointAnnotation id="origin-point" coordinate={[originLongitude, originLatitude]} />
        </MapboxGL.MapView>
        <RouteInfoCard displayRouteDistance={displayRouteDistance}/>
        <Button
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => {
              fetchRandomPolygonCoords( isLocationPermissionGranted, dispatch, originLongitude, originLatitude, routeDistanceMeters);
            }}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1,
  }
});

const layerStyles = {
  route: {
    lineColor: 'red',
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
  },
  randomRouteLine: {
    lineColor: 'blue',
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
  },
  optimisedRouteLine: {
    lineColor: 'green',
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 2,
    lineOpacity: 0.84,
  },
};


export default App;


/*

{
  "isLocationPermissionGranted": true,
  "randomPolygonCoordinates": {"coordinates": []},
  "randomPolygonCoords": {"coordinates": [[Array], [Array], [Array], [Array], [Array]]},
  "routeDistanceMeters": 2500,
  "userLatitude": 0,
  "userLongitude": 0
}

*/