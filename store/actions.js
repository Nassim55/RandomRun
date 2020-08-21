import { ADDITION, SUBTRACTION } from './actionTypes';

// We now need to build 'action creators', theses are basically just
// functions that point to the action types...so that when the action 
// type is called, our reducers know how to modify the state.


export const addition = () => ({
    type: ADDITION,
});

export const subtraction = () => ({
    type: SUBTRACTION,
});