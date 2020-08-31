import React from 'react';
import { StyleSheet, View, Dimensions  } from 'react-native';

// Custom components:
import AuthorisedUserView from './app/components/AuthorisedUserView';

const App = () => {
  console.log('App render');
  
  return (
    <View style = {styles.page}>
      <AuthorisedUserView />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default App;