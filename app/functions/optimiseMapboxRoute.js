import fetchRouteCoordsAfterOptimisation from './fetchRouteCoordsAfterOptimisation';

const optimiseMapboxRoute = async (originalMapboxRouteDistanceMeters, originalMapboxRouteCoordinates, dispatch) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/optimise`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "mapboxRouteGeometry": originalMapboxRouteCoordinates
                })
            }
        );

        const data = await response.json();
        
        const recalculatedPoints = data.recalculatePoints;

        await fetchRouteCoordsAfterOptimisation(recalculatedPoints, dispatch);

    } catch (err) { if (console) console.error(err) };
};

export default optimiseMapboxRoute;