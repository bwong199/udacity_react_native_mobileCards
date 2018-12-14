import { AsyncStorage } from "react-native"
import {DECK_SAVED_SUCCESS, DECK_NAME_CHANGED} from './types';

export function createDeck(name) {
    return function (dispatch) {
        AsyncStorage.setItem('test', 'saved').then(dispatch({
            type: DECK_SAVED_SUCCESS,
            payload: {}
        })).then(() => {
            AsyncStorage.getItem('test').then((res) => {
                console.log(res)
            })
            
        })
    }
}

export const deckNameChanged = (text) => {
    return {
        type: DECK_NAME_CHANGED,
        payload: text
    }
}