import { 
    setFinalRouteLineString,
    setCalculateRouteDistance,
    setMostNorthEasternCoordinates,
    setMostSouthWesternCoordinates
} from '../../store/actions';

const fetchFinalRouteLineString = async (optimisedGapCoordinates, dispatch) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/finilise', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "finilisedGapCoordinates": optimisedGapCoordinates
                })
            }
        );
        const data = await response.json()

        dispatch(setFinalRouteLineString({ 'type': 'LineString', 'coordinates': data.coordinates }));
        dispatch(setCalculateRouteDistance(data.distanceMeters));

        dispatch(setMostNorthEasternCoordinates(data.mostNorthEastCoordinates))
        dispatch(setMostSouthWesternCoordinates(data.mostSouthWestCoordinates))

    } catch (err) { if (console) console.error(err) };
};


export default fetchFinalRouteLineString;