import {
    DECK_SAVED_SUCCESS,
    DECK_NAME_CHANGED,
    GET_DECKS,
    DECK_DELETED_SUCCESS,
    QUESTION_CHANGED,
    ANSWER_CHANGED,
    RESET_CREATED, CARD_SAVED_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    deckName: " ",
    decks: [],
    question: " ",
    answer: " ",
    created: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CARD_SAVED_SUCCESS:
        console.log('card saved in reducer', action.payload);
            return {
                ...state,
                decks: action.payload, 
                question: " ",
                answer: " ",
                deckName: " " 
            }
        case DECK_SAVED_SUCCESS:
            return {
                ...state,
                decks: action.payload,
                created: true, 
                question: " ",
                answer: " ",
                deckName: " " 
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
            return {
                ...state,
                decks: action.payload
            }
        case RESET_CREATED:
            return {
                ...state,
                created: false
            }

        default:
            return state;
    }
}