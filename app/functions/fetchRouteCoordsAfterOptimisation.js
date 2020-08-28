import fetchFinalRouteLineString from './fetchFinalRouteLineString';

const MAPBOX_API_KEY = 'pk.eyJ1IjoibmFzc2ltY2hlbm91ZiIsImEiOiJja2R1NjE2amMzYnl4MzByb3c5YmxlMGY5In0.cBj3YeAh0UMxinxOfhDLIw';

const fetchRouteCoordsAfterOptimisation = async (recalculatedPoints, dispatch) => {
    try {
        const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${recalculatedPoints}?alternatives=false&geometries=geojson&steps=true&continue_straight=false&access_token=${MAPBOX_API_KEY}`);
        const data = await response.json()

        const optimisedGapCoordinates = data.routes[0].geometry.coordinates;

        await fetchFinalRouteLineString(optimisedGapCoordinates, dispatch);

    } catch (err) { if (console) console.error(err) };
};

export default fetchRouteCoordsAfterOptimisation;