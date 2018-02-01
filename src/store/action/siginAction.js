import ActionTypes from '../constant/constant';
import configDefault from './firebaseConfig';
import { browserHistory } from 'react-router';

export function login(loginobj) {
    return dispatch => {
        dispatch(loginProgress());
        // console.log(obj)
        configDefault.auth().signInWithEmailAndPassword(loginobj.email, loginobj.password)
            .then((user) => {
                browserHistory.push('/')
                // console.log(user)
                let obj = {
                    name: user.displayName,
                    uid: user.uid,
                    email: user.email
                }

                dispatch(loginSucceed(obj))
            }).catch((error) => {
                dispatch(loginError(error.message))
            })
    }
}

export function loginError(error) {
    return {
        type: ActionTypes.LOGIN_ERROR,
        errorText: error
    }
}
export function loginProgress() {
    return {
        type: ActionTypes.LOGIN_PROGRESS
    }
}
export function loginSucceed(objValue) {
    return {
        type: ActionTypes.LOGIN_SUCCEED,
        payload: objValue
    }
}
export function loginErrorAlert() {
    return {
        type: ActionTypes.LOGIN_ERROR_ALERT
    }
}