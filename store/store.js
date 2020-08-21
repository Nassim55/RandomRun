// Store is where the state will be managed
import { createStore } from 'redux';
import { mainReducer } from './reducers';

export const store = createStore(mainReducer);