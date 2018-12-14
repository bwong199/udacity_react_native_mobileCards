import { DECK_SAVED_SUCCESS, DECK_NAME_CHANGED } from '../actions/types';

const INITIAL_STATE = {
    deckName: " "
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DECK_SAVED_SUCCESS:
            console.log('made it to reducer');
        case DECK_NAME_CHANGED:
            return {
                ...state,
                deckName: action.payload
            }
        default:
            return state;
    }
}