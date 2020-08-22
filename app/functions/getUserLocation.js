import Geolocation from '@react-native-community/geolocation';
import { setUserLocation } from '../../store/actions';
import requestLocationPermission from './requestLocationPermission';

const getUserLocation = async (isLocationPermissionGranted, dispatch) => {
    try {
        if (isLocationPermissionGranted === true) {
            Geolocation.getCurrentPosition(info => {
                dispatch(setUserLocation([info.coords.longitude, info.coords.latitude]));
            });
        } else {
            console.log('Location not granted');
        };
    } catch (err) {
        if (console) {
            console.error(err);
        };
    };
};

export default getUserLocation;