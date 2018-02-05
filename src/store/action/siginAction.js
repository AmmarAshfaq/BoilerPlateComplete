import ActionTypes from '../constant/constant';
import configDefault from './firebaseConfig';
import { browserHistory } from 'react-router';

export function login(loginobj) {
    return dispatch => {
        dispatch(loginProgress());
        // console.log(obj)
        configDefault.auth().signInWithEmailAndPassword(loginobj.email, loginobj.password)
            .then((user) => {
                // let allUsers = {};
                configDefault.database().ref('users/').once('value', (snap) => {
                    let allUsers = snap.val();

                    let obj = {
                        name: user.displayName,
                        uid: user.uid,
                    }

                    dispatch(loginSucceed(obj));
                    let keysValue = Object.keys(allUsers);
                    console.log(keysValue)
                    keysValue.map((key) => {
                        dispatch({
                            type: ActionTypes.ALLUSER,
                            payload: allUsers[key],
                            id: key
                        })
                    })
                    browserHistory.push('/')
                    // dispatch(allUserData(allUsers));

                    configDefault.database().ref('message/').on('child_added', snap => {

                        let messages = snap.val();
                        console.log(messages)



                        dispatch({
                            type: ActionTypes.MESSEGES,
                            payload: messages
                        })
                        // let keyMsg = Object.keys(messages);
                        // console.log(keyMsg)

                        // keyMsg.map((keyVal)=>{
                        //     dispatch({
                        //         type:ActionTypes.MESSEGES,
                        //         payload: messages[keyVal]

                        //     })
                        // })

                        // let msgArr = [];
                        // for (var key in messages){
                        //     msgArr.push(messages[msgArr])
                        // }
                        // console.log(msgArr)
                    })





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
        configDefault.database().ref('/').child(`message/`).push(message)
            .then(() => {
                console.log("message sent");
            })

    }
}
export function allUserDelete() {
    return dispatch => {
        dispatch({

            type: ActionTypes.ALLUSERDELETE,
            payload: []
        })
    }
}