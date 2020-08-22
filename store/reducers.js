// State is being modified in our reducers file

import { SET_ROUTE_DISTANCE_METERS } from './actionTypes';

const initialState = {
    routeDistanceMeters: 0
};

// We now describe how our state will be modified when either addition or subtraction is called:
export const routeDistanceReducer = (state = initialState, action) => {
    switch (action.type)  {
        case SET_ROUTE_DISTANCE_METERS:
            console.log(state);
            return {...state, routeDistanceMeters: action.userInputRouteDistanceMeters}
        default:
            return state;
    }
};