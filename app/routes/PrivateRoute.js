import React from 'react';
import { Route, Redirect } from 'react-router-native';

import isAuthenticated from '../authentication/isAuthenticated';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuth = isAuthenticated();
    console.log(isAuth)
    return <Route 
    {...rest}
    render={props => (
        true ? <Component {...props} /> : <Redirect to='/' />
    )}
    />
};

export default PrivateRoute;