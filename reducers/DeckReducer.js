import {DECK_SAVED_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case DECK_SAVED_SUCCESS:
            console.log('made it to reducer');
        default:
            return state;
    }
}