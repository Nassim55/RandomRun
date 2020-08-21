// State is being modified in our reducers file

import { ADDITION, SUBTRACTION } from './actionTypes';

const initialState = {
    counter: 0
};

// We now describe how our state will be modified when either addition or subtraction is called:
export const mainReducer = (state = initialState, action) => {
    switch (action.type)  {
        case ADDITION:
            return {...state, counter: state.counter + 1}
        case SUBTRACTION:
            return {...state, counter: state.counter - 1}
        default:
            return state;
    }
};