import {
    DECK_SAVED_SUCCESS,
    DECK_NAME_CHANGED,
    GET_DECKS,
    DECK_DELETED_SUCCESS, QUESTION_CHANGED, ANSWER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    deckName: " ",
    decks: [], 
    question: " ",
    answer: " "
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DECK_SAVED_SUCCESS:
            return {
                ...state,
                decks: action.payload
            }
        case DECK_DELETED_SUCCESS:
            return {
                ...state,
                decks: action.payload
            }
        case DECK_NAME_CHANGED:
            return {
                ...state,
                deckName: action.payload
            }
        case QUESTION_CHANGED:
            return {
                ...state,
                question: action.payload
            }
        case ANSWER_CHANGED:
            return {
                ...state,
                answer: action.payload
            }
        case GET_DECKS:
            console.log('getting decks');
            return {
                ...state,
                decks: action.payload
            }


        default:
            return state;
    }
}