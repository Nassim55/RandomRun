import React, { useState }  from 'react';
import { StyleSheet, View, Dimensions  } from 'react-native';
import { NativeRouter, Route, Switch } from "react-router-native";

// Custom components:
import LoginPageView from './app/components/LoginPageView';
import AuthorisedUserView from './app/components/AuthorisedUserView';
import PrivateRoute from './app/routes/PrivateRoute';

const App = () => {
  console.log('App render');

  const [userAuthorised, setUserAuthorised] = useState(false);

  console.log(userAuthorised);
  
  return (
    <NativeRouter>
      <View style = {styles.page} >
        <Switch>
          <Route exact path='/' component={LoginPageView} />
          <PrivateRoute path='/usermap' exact={true} component={AuthorisedUserView} />
        </Switch>
      </View>
    </NativeRouter>

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