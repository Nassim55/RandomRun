import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { lineString } from '@turf/helpers';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

MapboxGL.setAccessToken(MAPBOX_API_KEY);
MapboxGL.setConnected(true);

const App = () => {
  const [randomRouteCoords, setRandomRouteCoords] = useState({'coordinates': []});
  const [randomRouteCoordsLineString, setRandomRouteCoordsLineString] = useState({ "type": "LineString", "coordinates": [] });
  const [routeLineString, setRouteLineString] = useState({ "type": "LineString", "coordinates": [] });
  const [optimisedRouteLineString, setOptimisedRouteLineString] = useState({ "type": "LineString", "coordinates": [] });
  const [finalLineString, setFinalLineString] = useState({ "type": "LineString", "coordinates": [] });

  const originLongitude = -1.55459;
  const originLatitude = 55.0198;
  const routeDistanceMeters = 5000;
  
  const fetchRandomCoords = async () => {
    try{
      const response = await fetch(`http://127.0.0.1:5000/route?longitude=${originLongitude}&latitude=${originLatitude}&routeDistance=${routeDistanceMeters}`);
      const data = await response.json();
      setRandomRouteCoords(data.coordinates);
      setRandomRouteCoordsLineString(lineString(data.coordinates))
    } catch (err) {
      if (console) {
        console.error(err);
      };
    };
  };

  const generateCoordsString = (coordsLst) => {
    const coordsURLLst = [];
    for (let i = 0; i < coordsLst.length; i++) {
      coordsURLLst.push(coordsLst[i].join())
    };
    const coordsURLString = coordsURLLst.join(';');
    return coordsURLString;
  };

  const routeCoordsString = generateCoordsString(randomRouteCoords);



  const fetchRouteCoords = async () => {
    try {
      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${routeCoordsString}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
      const data = await response.json();
      setRouteLineString(data.routes[0].geometry);
      if (data.routes[0].distance > routeDistanceMeters) {
        try {
          const scaleResponse = await fetch(`http://127.0.0.1:5000/optimise`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "mapboxRouteGeometry": data.routes[0].geometry.coordinates
            })
          });
          const scaledData = await scaleResponse.json();
          setOptimisedRouteLineString({ 'type': 'LineString', 'coordinates': scaledData.coordinates });
          const recalculatePoints = scaledData.recalculatePoints
          try {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${recalculatePoints}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
            const data = await response.json()
            try {
              const response = await fetch('http://127.0.0.1:5000/finilise', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "finilisedGapCoordinates": data.routes[0].geometry.coordinates
                })
              });
              const finiliseData = await response.json()
              setFinalLineString({ 'type': 'LineString', 'coordinates': finiliseData.coordinates })
              console.log(finiliseData.distanceMeters)
            } catch (err) {
              if (console) {
                console.error(err)
              }
            }
          } catch (err) {
            if (console) {
              console.error(err)
            }
          }
        } catch (err) {
          if (console) {
            console.error(err);
          }
        };
      }
      else {
        setFinalLineString(data.routes[0].geometry)
        console.log(data.routes[0].distance)
      }
    } catch (err) {
      if (console) {
        console.error(err);
      }; 
    };
  };


  
  useEffect(() => {
    fetchRouteCoords();
    fetchRandomCoords();
  }, [])

  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <MapboxGL.MapView style = {styles.map} >
          <MapboxGL.ShapeSource id="optimised" shape={finalLineString}>
            <MapboxGL.LineLayer id="optimisedLine" style={layerStyles.optimisedRouteLine} />
          </MapboxGL.ShapeSource>
          <MapboxGL.PointAnnotation id="origin-point" coordinate={[-1.55459, 55.0198]} />
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1,
  },
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
          <MapboxGL.ShapeSource id="origin" shape={routeLineString}>
            <MapboxGL.LineLayer id="routeFill" style={layerStyles.route} />
          </MapboxGL.ShapeSource>
          <MapboxGL.ShapeSource id="optimised" shape={finalLineString}>
            <MapboxGL.LineLayer id="optimisedLine" style={layerStyles.optimisedRouteLine} />
          </MapboxGL.ShapeSource>

*/