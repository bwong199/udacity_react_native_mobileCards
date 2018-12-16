import { AsyncStorage } from "react-native"
import { DECK_SAVED_SUCCESS, 
    DECK_NAME_CHANGED, 
    GET_DECKS,
    DECK_DELETED_SUCCESS,
    QUESTION_CHANGED,
    ANSWER_CHANGED,
    RESET_CREATED,
    CARD_SAVED_SUCCESS
} from './types';

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


export function addCardToDeck(id, question, answer) {
    return function (dispatch) {

        AsyncStorage.getItem('decks').then((res1) => {
            let decArr = JSON.parse(res1);
           
            const newQuestion = {
                id: generateUID(),
                question : question,
                answer : answer
            }

            const selected = decArr.find(function(item){
                return item.id == id
            })

            selected.questions.push(newQuestion);
            
            AsyncStorage.setItem('decks', JSON.stringify(decArr)).then(() => {
                AsyncStorage.getItem('decks').then((res2) => dispatch({
                    type: CARD_SAVED_SUCCESS,
                    payload: JSON.parse(res2)
                })
                )
            })
        })
    }
}

export function createDeck(name) {
    return function (dispatch) {

        AsyncStorage.getItem('decks').then((res1) => {
            let decArr = JSON.parse(res1);
            if (!decArr) {
                decArr = [];
            }
            var newDeck = {
                "id" : generateUID(),
                "name" : name,
                "questions": [],
                "createdDate" : Date.now()
            }
            decArr.push(newDeck);
            AsyncStorage.setItem('decks', JSON.stringify(decArr)).then(() => {
                AsyncStorage.getItem('decks').then((res2) => dispatch({
                    type: DECK_SAVED_SUCCESS,
                    payload: JSON.parse(res2)
                })
                )
            })
        })
    }
}

export function deleteDeck(id) {
    return function (dispatch) {

        AsyncStorage.getItem('decks').then((res1) => {
            let decArr = JSON.parse(res1);

            decArr = decArr.filter(function( obj ) {
                return obj.id !== id;
            });

            AsyncStorage.setItem('decks', JSON.stringify(decArr)).then(() => {
                AsyncStorage.getItem('decks').then((res2) => dispatch({
                    type: DECK_DELETED_SUCCESS,
                    payload: JSON.parse(res2)
                })
                )
            })
        })
    }
}


export function getDecks() {
    return function (dispatch) {
        AsyncStorage.getItem('decks').then((res) => dispatch({
            type: GET_DECKS,
            payload: JSON.parse(res)
        })
        )
    }
}

export const deckNameChanged = (text) => {
    return {
        type: DECK_NAME_CHANGED,
        payload: text
    }
}

export const questionChanged = (text) => {
    return {
        type: QUESTION_CHANGED,
        payload: text
    }
}

export const answerChanged = (text) => {
    return {
        type: ANSWER_CHANGED,
        payload: text
    }
}

export const resetCreated = (text) => {
    return {
        type: RESET_CREATED
        }
}