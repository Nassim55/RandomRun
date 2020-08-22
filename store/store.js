// Store is where the state will be managed
import { createStore } from 'redux';
import { routeDistanceReducer } from './reducers';

// With a state store we want to do two things, we want to update the state and read from the state.
// So we want to set and get.
export const store = createStore(routeDistanceReducer);