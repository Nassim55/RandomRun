import { AsyncStorage } from 'react-native';

const deleteData = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (err) { if (console) console.error(err) };
};

export default deleteData;