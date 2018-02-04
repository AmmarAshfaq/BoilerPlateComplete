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
                let allUsers = {};
                configDefault.database().ref('users/').once('value', (snap) => {
                    allUsers = snap.val();

                    let obj = {
                        name: user.displayName,
                        uid: user.uid,
                    }

                    dispatch(loginSucceed(obj));
                    let keysValue = Object.keys(allUsers);
                    // console.log(keysValue)
                    keysValue.map((key) => {
                        dispatch({
                            type: ActionTypes.ALLUSER,
                            payload: allUsers[key],
                            id: key
                        })
                    })
                    // dispatch(allUserData(allUsers));

                })


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
        payload: objValue,
    }
}
export function loginErrorAlert() {
    return {
        type: ActionTypes.LOGIN_ERROR_ALERT
    }
}
export function recipient(recpUID) {
    // console.log(recpUID)
    return dispatch => {
        dispatch({ type: ActionTypes.RECIEPENTID, payload: recpUID })
    }
}

export function sendMessage(message) {
    console.log(message);
    return dispatch => {
        configDefault.database().ref('/').child(`message/${message.receiverID}/`).push(message)
            .then(() => {
                let allMessages = {};
                configDefault.database().ref('/').child(`message/${message.receiverID}/`).once("value", snap => {
                    let allMessages = snap.val();
                    console.log(message)
                    let keysVal = Object.keys(allMessages);
                    console.log(keysVal)
                    keysVal.map((keyInd) => {
                        dispatch({
                            type: ActionTypes.MESSEGES,
                            payload: allMessages[keyInd]

                        })
                    })
                })
            })

    }
}