import { AsyncStorage } from 'react-native';

const saveData = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (err) { if (console) console.error(err) };
};

export default saveData;