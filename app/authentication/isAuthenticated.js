import { AsyncStorage } from 'react-native';

const isAuthenticated = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token === null) {
            return false;
        } else {
            return true;
        }
    } catch (err) { if (console) console.error(err) };
};

export default isAuthenticated;