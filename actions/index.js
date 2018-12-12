import { AsyncStorage } from "react-native"
import DECK_SAVED_SUCCESS from './types';

export function createDeck(name) {
    return dispatch => {
      console.log("IN ACTION", name);
      AsyncStorage.setItem('test', 'saved').then(() => {
        AsyncStorage.getItem('test').then((res) => {
            dispatch({ 
                type: DECK_SAVED_SUCCESS
            })
        })
      })
    };
  }