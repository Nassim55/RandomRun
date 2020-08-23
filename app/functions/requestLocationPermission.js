import { PermissionsAndroid } from 'react-native';
import { isLocationPermissionGranted } from '../../store/actions';

const requestLocationPermission = async (dispatch) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "Random Run Location Permission",
        message: "Random Run needs access to your location in order to generate a route",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      dispatch(isLocationPermissionGranted(true));
    } else {
      dispatch(isLocationPermissionGranted(false));
    };
  } catch (err) {
    if (console) {
      console.error(err);
    };
  };
};

export default requestLocationPermission;