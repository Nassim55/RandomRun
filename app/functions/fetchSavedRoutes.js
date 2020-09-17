import { AsyncStorage } from 'react-native';
import { setSavedRoutesResponse } from '../../store/actions';

const fetchSavedRoutes = async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await fetch(`http://127.0.0.1:8000/route/getsavedroutes`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const data = await response.json();
      dispatch(setSavedRoutesResponse(data.response));
    }
  } catch (err) { if (console) console.error(err) };
};


export default fetchSavedRoutes;