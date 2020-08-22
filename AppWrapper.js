import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store'
import App from './App';

const AppWrapper = () => {
    return(
        <Provider store={store}>
            <View style={styles.page}>
                <App />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    page: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    }
});

export default AppWrapper;
