import { AsyncStorage } from 'react-native';
import { setUserAuthenticated } from '../../store/actions';

const deleteData = async (dispatch) => {
    try {
        await AsyncStorage.removeItem('token');
        dispatch(setUserAuthenticated(false));
    } catch (err) { if (console) console.error(err) };
};

export default deleteData;