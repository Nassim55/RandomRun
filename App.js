import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { lineString } from '@turf/helpers';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

MapboxGL.setAccessToken(MAPBOX_API_KEY);
MapboxGL.setConnected(true);

const originCoordinates = [-1.55459, 55.0198];
const destinationCoordinates = [-1.5491, 53.8008];

const line = lineString([originCoordinates, destinationCoordinates]);



const App = () => {
  const [routeLineString, setRouteLineString] = useState({});

  const fetchRouteCoords = async() => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/-1.55459%2C55.0198%3B-1.5491%2C53.8008?alternatives=false&geometries=geojson&steps=true&access_token=pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw`);
    const data = await response.json();
    setRouteLineString(data.routes[0].geometry);
  };
  
  useEffect(() => {
    fetchRouteCoords();
  }, [])

  return (
    <View style = {styles.page}>
      <View style = {styles.container}>
        <MapboxGL.MapView style = {styles.map} >
          <MapboxGL.ShapeSource id="origin" shape={routeLineString}>
            <MapboxGL.LineLayer id="routeFill" style={layerStyles.route} />
          </MapboxGL.ShapeSource>
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
    lineWidth: 3,
    lineOpacity: 0.84,
  }
};


export default App;
