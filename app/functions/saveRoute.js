

const saveRoute = async (routeDistance, routeCoordinates) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/route/saveroute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        account: 1,
        coordinates: routeCoordinates,
        distance: routeDistance,
      })
      });
      const data = await response.json();
  } catch (err) { if (console) console.error(err) };
};

export default saveRoute;