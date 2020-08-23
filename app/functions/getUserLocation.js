import Geolocation from '@react-native-community/geolocation';
import { setUserLocation } from '../../store/actions';
import requestLocationPermission from './requestLocationPermission';

const getUserLocation = async (isLocationPermissionGranted, dispatch) => {
    try {
        if (isLocationPermissionGranted === true) {
            Geolocation.getCurrentPosition(position => {
                console.log(position)
                dispatch(setUserLocation([position.coords.longitude, position.coords.latitude]));
            }, 
            err => console.error(err),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0, }
            );
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