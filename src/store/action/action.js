import ActionTypes from '../constant/constant';
import configDefault from './firebaseConfig';

export function increment() {

    return dispatch => {
        dispatch({ type: ActionTypes.INCREMENT })
    }
}
export function decrement() {

    return dispatch => {
        dispatch({ type: ActionTypes.DECREMENT })
    }
}