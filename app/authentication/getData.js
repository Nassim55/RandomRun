import { AsyncStorage } from 'react-native';

const getData = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        return token
    } catch (err) { if (console) console.error(err) };
};

export default getData;