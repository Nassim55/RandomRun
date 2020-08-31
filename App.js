import React, { useState }  from 'react';
import { StyleSheet, View, Dimensions  } from 'react-native';

// Custom components:
import LoginPageView from './app/components/LoginPageView';
import AuthorisedUserView from './app/components/AuthorisedUserView';

const App = () => {
  console.log('App render');

  const [userAuthorised, setUserAuthorised] = useState(false);

  console.log(userAuthorised);
  
  return (
    <View 
    style = {styles.page}
    onTouchStart={() => setUserAuthorised(!userAuthorised)}
    >
      <LoginPageView />
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


// { userAuthorised ? <AuthorisedUserView /> : <LoginPageView /> }